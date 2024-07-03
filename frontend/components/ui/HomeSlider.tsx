"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import Image from "next/image";

const HomeSlider = () => {
  SwiperCore.use([Navigation]);

  return (
    <div className="w-full">
      <Swiper navigation>
        <SwiperSlide>
          <div className="relative w-full h-[550px]">
            <Image
              src={"/assets/hero.png"}
              layout="fill"
              objectFit="cover"
              alt="slider"
              sizes="100vw"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
