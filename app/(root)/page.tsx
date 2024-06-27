import HomeSlider from "@/components/ui/HomeSlider";
import RoundImage from "@/components/ui/RoundImage";
import React from "react";

const Home = () => {
  return (
    <section className="home">
      <div>
        <HomeSlider />
      </div>
      <RoundImage />
    </section>
  );
};

export default Home;
