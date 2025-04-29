import React from "react";
import "./Poster.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

export default function Poster() {
  return (
    <>
      <div className="container">
        <div className="main">
          <div className="title-poster">
            <h1 className="title-poster-products">محصولات</h1>
          </div>
          <div className="image-camera">
            <Swiper
              style={{ width: "100%", height: "100% " }}
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{
                delay: 3000,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1, // موبایل
                },
                768: {
                  slidesPerView: 2, // تبلت
                },
                992: {
                  slidesPerView: 3, // دسکتاپ
                },
              }}
            >
              <SwiperSlide className="slider">
                <img
                  src="/Images/camera2.jpg"
                  alt="عکس لود نشد"
                  className="image-camera-logo"
                />
              </SwiperSlide>
              <SwiperSlide className="slider">
                <img
                  src="/Images/camera3.jpg"
                  alt="عکس لود نشد"
                  className="image-camera-logo"
                />
              </SwiperSlide>
              <SwiperSlide className="slider">
                <img
                  src="/Images/camera4.jpg"
                  alt="عکس لود نشد"
                  className="image-camera-logo"
                />
              </SwiperSlide>
              <SwiperSlide className="slider">
                <img
                  src="/Images/camera2.jpg"
                  alt="عکس لود نشد"
                  className="image-camera-logo"
                />
              </SwiperSlide>
              <SwiperSlide className="slider">
                <img
                  src="/Images/camera3.jpg"
                  alt="عکس لود نشد"
                  className="image-camera-logo"
                />
              </SwiperSlide>
              <SwiperSlide className="slider">
                <img
                  src="/Images/camera4.jpg"
                  alt="عکس لود نشد"
                  className="image-camera-logo"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
