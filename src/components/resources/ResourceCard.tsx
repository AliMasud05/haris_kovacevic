"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuDownload } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { TResource } from "@/types/resource.type"; 
import fileIcon from "@/assets/resources/file.svg"
import message from "@/assets/resources/message.svg"

const ResourceCard: React.FC<TResource> = ({
  id,
  title,
  topic,
  type,
  status,
  price,
  thumbnail,
  file,
}) => {
  const router = useRouter();

  const handleFreeDownloadBtn = () => {
    if (file) {
      window.open(file, "_blank");
    }
  };

  const handleBuyNowBtn = () => {
    router.push(`/resources/${id}`);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Resource Thumbnail */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Status Badge */}
      <button className="absolute px-4 py-1 rounded-full bg-white/40 backdrop-blur-md top-4 left-4 flex items-center justify-center border border-white/30 shadow-md text-sm font-medium">
        {status === "FREE" ? "Free" : "Premium"}
      </button>

      {/* Content */}
      <div className="p-6">
        <h3
          className={`${
            status === "FREE" ? "text-center" : ""
          } text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2`}
        >
          {title}
        </h3>

        <div
          className={`${
            status === "FREE" ? "justify-center" : "justify-start"
          } flex items-center gap-3 pb-6 text-sm text-gray-600`}
        >
          <div className="flex items-center gap-2">
            <Image src={fileIcon} alt="file icon" height={20} width={20} />
            <span>File type: {type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={message} alt="file icon" height={20} width={20} />
            <span>Topic: {topic}</span>
          </div>
        </div>

        {status === "PAID" && (
          <p className="text-2xl font-semibold text-text-primary pb-5">
            € {price}
          </p>
        )}

        {/* Action Button */}
        <div className="flex">
          {status === "FREE" ? (
            <button
              onClick={handleFreeDownloadBtn}
              className="cursor-pointer flex items-center justify-center gap-2.5 w-full bg-text-secondary hover:bg-primary text-white font-semibold py-3 px-4 rounded-full transition duration-200"
            >
              <LuDownload />
              Free Download
            </button>
          ) : (
            <button
              onClick={handleBuyNowBtn}
              className="cursor-pointer flex items-center justify-center gap-2.5 w-full bg-text-secondary hover:bg-primary text-white font-semibold py-3 px-4 rounded-full transition duration-200"
            >
              <BsCart3 />
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
