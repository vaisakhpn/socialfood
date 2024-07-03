import Image from "next/image";
import React from "react";

interface RoundImageProps {
  label: string;
  src: string;
  alt: string;
}

const RoundImageItem: React.FC<RoundImageProps> = ({ label, src, alt }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="border shadow-md shadow-slate-950  w-28 h-28 rounded-full relative overflow-hidden">
        <Image
          src={src}
          objectFit="cover"
          fill
          sizes="(max-width: 768px) 100vw"
          alt={alt}
        />
      </div>
      <p className=" text-gray-700 font-semibold text-lg">{label}</p>
    </div>
  );
};

export default RoundImageItem;
