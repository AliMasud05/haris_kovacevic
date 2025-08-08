"use client";

import CourseBillingDetailsSkeleton from "@/components/skeleton/CourseBillingDetailsSkeleton";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const BillingDetails: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetResourceByIdQuery(id as string);
  const resource = data?.data;

  if(isLoading) return <CourseBillingDetailsSkeleton />

  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Billing Details
      </h2>
      <div className="flex flex-col mb-6 gap-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Image
            src={resource?.thumbnail}
            alt="Course Thumbnail"
            width={150}
            height={100}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-medium text-gray-900">
            {resource?.title}
          </h3>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 md:pl-6">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Payment Details
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Resource Price</span>
            <span className="text-gray-900">€{resource?.price}</span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-800">total payment</span>
              <span className="text-gray-900">€{resource?.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
