"use client";

import {  useCreatePaypalResourcePaymentMutation } from "@/redux/api/paymentsApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function ResourcePaypalPaymentForm() {
  const params = useParams();
  const resourceId = params?.id as string;

  const [createPaypalPayment, { isLoading }] =
    useCreatePaypalResourcePaymentMutation();
  const [error, setError] = useState<string | null>(null);

  const handlePaypalPayment = async () => {
    try {
      setError(null);

      const res = await createPaypalPayment({ resourceId }).unwrap();

      const approvalLink = res?.data?.paypalOrder?.approvalLink;

      if (approvalLink) {
        // Redirect to PayPal checkout
        window.location.href = approvalLink;
      } else {
        setError("Approval link not found.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="md:pt-20 lg:pt-32">
      <button
        onClick={handlePaypalPayment}
        disabled={isLoading}
        className="cursor-pointer w-full bg-text-secondary text-white py-4 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Proceed with Paypal"}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
      )}
    </div>
  );
}
