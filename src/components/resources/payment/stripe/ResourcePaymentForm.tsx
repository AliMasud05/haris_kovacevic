/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useStripeResourcePaymentMutation } from "@/redux/api/paymentsApi";
import getUserInfo from "@/utils/getUserInfo";

// paymentForm.tsx
export default function ResourcePaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const [resourcePayment] = useStripeResourcePaymentMutation();

  const myProfile = getUserInfo();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError("Stripe has not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(submitError.message || "Payment validation failed.");
        return;
      }

      // Create payment method with proper billing details
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            name: myProfile?.name || 'Customer',
            email: myProfile?.email,
            address: {
              country: 'US', // Provide a default country if needed
            },
          },
        },
      });

      if (stripeError) {
        setPaymentError(stripeError.message || "Payment method creation failed.");
        return;
      }

      if (!paymentMethod?.id) {
        setPaymentError("Failed to create payment method.");
        return;
      }

      console.log("Created payment method:", paymentMethod.id);

      const payload = {
        userId: myProfile?.id,
        resourceId: id,
        paymentMethodId: paymentMethod.id,
      };

      const response = await resourcePayment(payload);
      
      if ("data" in response) {
        toast.success("Resource purchased successfully");
        router.push('/');
      } else if ("error" in response) {
        throw response.error;
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentError(
        error?.data?.message || 
        error?.message || 
        "Payment processing failed"
      );
      toast.error(error?.data?.message || error?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:container mx-auto">
      <div className="mb-6">
        <PaymentElement
          options={{
            layout: "tabs",
            fields: {
              billingDetails: {
                address: {
                  country: "never",
                },
              },
            },
          }}
        />
      </div>

      {paymentError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{paymentError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="cursor-pointer w-full bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
}