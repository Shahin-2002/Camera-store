import React, { useState, useEffect } from 'react';

import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './BuyProduct.css';

export default function BuyProduct() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  
  
  

  

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

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/${productId}/`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('خطا در حذف محصول از سبد خرید');
      }

      const itemToRemove = cartItems.find(
        (item) => item.product?.id === productId
      );
      if (!itemToRemove) return;

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product.id !== productId)
      );

      setTotalPrice(
        (prevTotal) =>
          prevTotal - itemToRemove.product.new_price * itemToRemove.quantity
      );
    } catch (error) {
      console.error('مشکل در حذف محصول:', error);
    }
  };

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

                <button
                  className="delete-btn"
                  onClick={() => handleRemoveItem(item.product.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 7h12v2H6V7zm1 4h10l-1 10H8L7 11zm5-9c1.1 0 2 .9 2 2H8c0-1.1.9-2 2-2z" />
                  </svg>{' '}
                  حذف
                </button>
              </div>
            ))}
          </div>
          <div className="checkout-address-form">
            <h3>اطلاعات ارسال</h3>
            <label>
              آدرس:
              <textarea placeholder="آدرس کامل خود را وارد کنید" />
            </label>
            <label>
              کد پستی:
              <input type="text" placeholder="کد پستی" />
            </label>
            <label>
              استان:
              <input type="text" placeholder="نام استان" />
            </label>
            <label>
              شهر:
              <input type="text" placeholder="نام شهر" />
            </label>
          </div>

          <div className="checkout-total">
            مجموع قابل پرداخت: {totalPrice.toLocaleString('fa-IR')} تومان
            <button className="checkout-pay-btn">رفتن به درگاه پرداخت</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
