import React from 'react';
import './VerifyUser.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEmail } from '../../EmailContext/EmailContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function VerifyUser() {
  const { saveEmail } = useEmail();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    console.log('ایمیل وارد شده برای دریافت کد:', email);

    const res = await fetch(
      'http://localhost:8000/api/auth/email-verify/request/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    );

    if (res.ok) {
      saveEmail(email); // ذخیره در context و localStorage
      navigate('/verify'); // هدایت به صفحه وارد کردن کد
    } else {
      // اگر خطا داشت
      console.error('درخواست کد با خطا مواجه شد');
    }
  };

  return (
    <>
      <Navbar />

      <div className="forgot-password-container">
        <h2>تایید کاربر حقیقی</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forgot-password-form"
        >
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            {...register('email', {
              required: 'وارد کردن ایمیل الزامی است',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'ایمیل معتبر نیست',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <button type="submit">ارسال کد تایید</button>
          <p className="login-link">
            برگشت به <Link to="/login">صفحه ورود</Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}
