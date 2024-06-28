import Link from "next/link";
import React from "react";

const CardTitleSpot = () => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold p-3">
          Best Spots in <span className="text-red-500">Kochi</span>
        </h1>
        <Link href="#" className="text-[18px] text-blue-500 font-semibold p-4">
          more...
        </Link>
      </div>

      <div className="border-t  border-gray-300 mb-2 " />
    </div>
  );
};

export default CardTitleSpot;
