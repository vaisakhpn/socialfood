import React from "react";
import RoundImageItem from "../RoundImageItem";

const RoundImage = () => {
  return (
    <div className="max-w-6xl mx-auto  p-5 py-14 ">
      <div className="flex flex-row gap-56 items-center ">
        <RoundImageItem
          src={"/assets/morning.jpg"}
          alt="Morning"
          label="Morning"
        />
        <RoundImageItem src={"/assets/noon.jpg"} alt="Noon" label="Noon" />
        <RoundImageItem
          src={"/assets/evening.jpg"}
          alt="Evening"
          label="Evening"
        />
        <RoundImageItem src={"/assets/night.jpg"} alt="Night" label="Night" />
      </div>
    </div>
  );
};

export default RoundImage;
