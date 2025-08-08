"use client";
import CourseBillingDetails from "@/components/courses/payment/CourseBillingDetails";
import CoursePaymentInfo from "@/components/courses/payment/CoursePaymentInfo";
import FreePayment from "@/components/payment/free-payment";
import CourseBillingDetailsSkeleton from "@/components/skeleton/CourseBillingDetailsSkeleton";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { useParams } from "next/navigation";
import React from "react";

export default function CoursePaymentPage() {
  const params = useParams();

  const { data: courses, isLoading } = useGetCourseByIdQuery(params.id);

  if (isLoading) return <CourseBillingDetailsSkeleton />;
  console.log(courses?.data?.discountedPrice, "courses from payment page");
  const discountedPrice = courses?.data?.discountedPrice;

  console.log(params.id, "courseId from payment page");

  return (
    <div className="pt-40 pb-24 container mx-auto flex flex-col md:flex-row gap-16">
      <CourseBillingDetails />
      {discountedPrice === 0 ? (
        <FreePayment />
      ) : (
        <CoursePaymentInfo />
      )}
    </div>
  );
}
