import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useAddToCart } from '../../hooks/useCart';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { mutate: addToCart, isPending } = useAddToCart();



  useEffect(() => {
    fetch(`http://localhost:8000/api/store/products/${id}/`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product || !product.images || product.images.length === 0) {
    return (
      <>
        <Navbar />
        <div className="loading">در حال بارگذاری محصول...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="products-image">
          <img src={product.images[0].image} alt={product.images[0].alt_text} />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-pricing">
            <span className="old-price">
              {product.price.toLocaleString('fa-IR')} تومان
            </span>
            <span className="new-price">
              {product.new_price.toLocaleString('fa-IR')} تومان
            </span>
          </div>
          <p className="product-stock">موجودی: {product.stock} عدد</p>
          {/* <button className="add-to-cart" onClick={addToCart}>
            افزودن به سبد خرید
          </button> */}
          <button onClick={() => addToCart(product.id)} className='add-to-cart'>
            {isPending ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
