import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const {
    id,
    name,
    title,
    price,
    new_price,
    images
  } = product;

  const imageUrl = images?.[0]?.image || '/default-image.jpg';

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div>
        <img
          src={imageUrl}
          alt={title || name}
          className="product-image"
          loading="lazy"
        />
        <h3 className="product-title">{name}</h3>
        <div className="product-prices p-p">
          {price && (
            <span className="old-price">
              {price.toLocaleString('fa-IR')} تومان
            </span>
          )}
          {new_price && (
            <span className="new-price">
              {new_price.toLocaleString('fa-IR')} تومان
            </span>
          )}
        </div>
      </div>
      <button className="product-btn">مشاهده</button>
    </Link>
  );
}
