import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cards = () => {
  return (
    <div className="relative rounded-xl grid h-[350px] w-full mt-5 mb-5 max-w-[250px] items-end justify-center overflow-hidden text-center">
      <div className="absolute inset-0">
        <Image
          src="/assets/noon.jpg"
          alt="Thumbnail"
          layout="fill"
          objectFit="cover"
          sizes="100vw"
          className="hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>
      <div className="relative py-14 px-6 md:px-14">
        <h2 className="mb-6 text-white font-medium leading-[1.5] text-xl">
          Chicken Biriyani
        </h2>
        <h5 className="mb-4 text-gray-400">Vaisakh</h5>
        <div className="flex justify-center">
          <Image
            src={"/assets/noon.jpg"}
            alt="channel name"
            width={64}
            height={64}
            className="border-2 border-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
