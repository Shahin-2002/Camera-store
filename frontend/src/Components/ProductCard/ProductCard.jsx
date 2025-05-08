import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({product}) {
  return (
    <>
      <Link to={`/product/${product.id}`} key={product.id} className="product-card">
        <img
          src={product.images[0].image}
          alt={product.title}
          className="product-image"
        />
        <h3 className="product-title">{product.name}</h3>
        <div className="product-prices">
          <span className="old-price">{product.price} تومان</span>
          <span className="new-price">{product.new_price} تومان</span>
        </div>
        <button className="product-btn">مشاهده</button>
      </Link>
    </>
  );
}
