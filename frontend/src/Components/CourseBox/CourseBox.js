import React from "react";
import "./CourseBox.css";
import { SlBasket } from "react-icons/sl";

export default function CourseBox() {
  return (
    <>
      <div className="products">
        <img
          src="/Images/camera2.jpg"
          alt="لود نشده..."
          className="image-products"
        />
        <p className="caption-product">دوربین مداربسته مدل k-14</p>
        <div className="section-price">
          <div className="section-basket">
            <SlBasket className="section-baskets" />
          </div>
          <div className="price">
            <span className="offer">20%</span>
            <span className="price-org">250000</span>
          </div>
        </div>
      </div>
    </>
  );
}
