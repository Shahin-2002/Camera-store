import React from "react";
import "./RecomendBox.css";
import CourseBox from "../CourseBox/CourseBox";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
export default function RecomendBox({title}) {
  return (
    <>
      <div className="container title-products">
        <h3 className="title-last-products">{title}</h3>
        <button className="btn-last-products">همه محصولات</button>
      </div>
      <div className="container">
        <div className="main-products">
          <Swiper
            style={{ width: "100%", height: "100% " }}
            slidesPerView={6}
            spaceBetween={30}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{
              delay: 3000,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2, // موبایل
              },
              768: {
                slidesPerView: 3, // تبلت
              },
              992: {
                slidesPerView: 6, // دسکتاپ
              },
            }}
          >
            <SwiperSlide>
              <CourseBox />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
