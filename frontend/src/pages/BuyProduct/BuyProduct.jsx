import React, { useState, useEffect } from 'react';

import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './BuyProduct.css';

export default function BuyProduct() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cart/', {
          method: 'GET',
          credentials: 'include', // ارسال کوکی برای شناسایی کاربر
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }

        const data = await response.json();
        setCartItems(data.items); // گرفتن آیتم‌ها
        setTotalPrice(data.cart_total_price);
        
      } catch (error) {
        console.error('خطا در دریافت اطلاعات سبد خرید:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);



  return (
    <>
      <Navbar />
      {loading ? (
        <div className="checkout-loading">در حال بارگذاری...</div>
      ) : (
        <div className="checkout-container">
          <h2 className="checkout-title">خرید نهایی</h2>

          <div className="checkout-list">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="product-name">{item.product.name}</div>
                <div className="product-discount">
                  تخفیف: {item.product.off}%
                </div>
                <div className="product-price-original">
                  قیمت قبل تخفیف: {item.product.price.toLocaleString('fa-IR')}{' '}
                  تومان
                </div>
                <div className="product-price-discounted">
                  قیمت بعد تخفیف:{' '}
                  {item.product.new_price.toLocaleString('fa-IR')} تومان
                </div>
                <div className="product-quantity">تعداد: {item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            مجموع قابل پرداخت: {totalPrice.toLocaleString('fa-IR')} تومان
            <button className="checkout-pay-btn" >
              رفتن به درگاه پرداخت
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
