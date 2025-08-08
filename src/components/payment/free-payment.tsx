/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFreeCoursePaymentMutation } from "@/redux/api/paymentsApi";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const FreePayment = () => {
  const [freeCoursePaymentFN] = useFreeCoursePaymentMutation();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      const response = await freeCoursePaymentFN({
        courseId: id,
      });

      if ("data" in response) {
        toast.success("Course purchased successfully");
        
        router.push("/user-dashboard");
      } else if ("error" in response) {
        const errorData = response.error as {
          status: number;
          data?: {
            message?: string;
          };
        };
        const errorMessage = errorData.data?.message || "Payment failed";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative h-full min-h-[200px]">
      {" "}
      {/* Container with relative positioning */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {" "}
        {/* Fixed bottom container */}
        <button
          type="submit"
          disabled={isProcessing}
          onClick={handleSubmit}
          className="w-[200px] bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default FreePayment;
