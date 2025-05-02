import React from 'react';
import './ForgotPassword.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('ایمیل وارد شده برای بازیابی رمز عبور:', data);
    // اینجا می‌تونی به API بفرستی
  };

  return (
    <>
      <Navbar />

      <div className="forgot-password-container">
        <h2>بازیابی رمز عبور</h2>
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

          <button type="submit">ارسال لینک بازیابی</button>
          <p className="login-link">
            برگشت به <Link to="/login">صفحه ورود</Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}
