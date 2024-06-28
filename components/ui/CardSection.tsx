import React from "react";
import Cards from "../Cards";

const CardSection = () => {
  return (
    <div className="grid grid-cols-4 max-w-7xl mx-auto gap-6 ">
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
    </div>
  );
};

export default CardSection;
