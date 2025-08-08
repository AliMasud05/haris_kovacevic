"use client";
import Image from 'next/image';
import success from '@/assets/payment/Success.png';

export default function SuccessPage() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-96 w-96 flex flex-col items-center justify-center gap-10 text-center">
        <Image
          src={success.src}
          alt="success"
          width={100}
          height={100}
          className="w-24 h-24"
        />
        <h1 className="text-4xl font-bold">Thank You</h1>
        <p>
          Your registration is complete, and your spot in the course is now confirmed. We&apos;re excited to have you our course!
        </p>
      </div>
    </div>
  );
}