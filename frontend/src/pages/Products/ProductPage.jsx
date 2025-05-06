import React from 'react'
import './ProductPage.css'
import { useParams } from 'react-router-dom'
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export default function ProductPage() {


    const product = {
        title: "دوربین مداربسته AHD مدل X100",
        description:
          "این دوربین مناسب برای فضای داخلی و خارجی است و دارای کیفیت تصویر 1080p می‌باشد.",
        image: "/images/camera3.jpg",
        oldPrice: 1200000,
        newPrice: 950000,
        stock: 12,
      };
    

    const {id} = useParams()
    return (
        <>
          <Navbar />
          <div className="product-container">
            <div className="products-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-details">
              <h1 className="product-title">{product.title}</h1>
              <p className="product-description">{product.description}</p>
              <div className="product-pricing">
                <span className="old-price">{product.oldPrice.toLocaleString()} تومان</span>
                <span className="new-price">{product.newPrice.toLocaleString()} تومان</span>
              </div>
              <p className="product-stock">موجودی: {product.stock} عدد</p>
              <button className="add-to-cart">افزودن به سبد خرید</button>
            </div>
          </div>
          <Footer />
        </>
      );
    }
    
