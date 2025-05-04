import React from 'react';
import './ProductCard.css';

export default function ProductCard({product}) {
  return (
    <>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <h3 className="product-title">{product.title}</h3>
        <div className="product-prices">
          <span className="old-price">{product.oldPrice.toLocaleString('fa-IR')} تومان</span>
          <span className="new-price">{product.newPrice.toLocaleString('fa-IR')} تومان</span>
        </div>
        <button className="product-btn">مشاهده</button>
      </div>
    </>
  );
}
