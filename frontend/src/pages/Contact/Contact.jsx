import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>تماس با ما</h1>

        <div className="contact-content">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label>نام:</label>
            <input type="text" placeholder="نام شما" required />

            <label>ایمیل:</label>
            <input type="email" placeholder="ایمیل شما" required />

            <label>پیام:</label>
            <textarea placeholder="پیام خود را بنویسید..." rows={5} required />

            <button type="submit">ارسال پیام</button>
          </form>

          <div className="contact-info">
            <h2>اطلاعات تماس</h2>
            <p>📍 آدرس: تهران، خیابان مثال، کوچه تست، پلاک ۱۲۳</p>
            <p>📞 تلفن: 021-12345678</p>
            <p>✉️ ایمیل: contact@example.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
