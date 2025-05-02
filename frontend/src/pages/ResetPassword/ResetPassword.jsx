import React from 'react';
import './ResetPassword.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log('رمز عبور جدید:', data);
    // اینجا می‌تونی به API بفرستی تا رمز عبور جدید را ذخیره کند
  };

  // بررسی می‌کنیم که رمز عبور و تایید رمز عبور یکسان باشند
  const password = watch('password');
  return (
    <>
      <Navbar />
      <div className="reset-password-container">
        <h2>تغییر رمز عبور</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
          <input
            type="password"
            placeholder="رمز عبور جدید"
            {...register('password', {
              required: 'رمز عبور جدید الزامی است',
              minLength: {
                value: 6,
                message: 'رمز عبور باید حداقل 6 کاراکتر باشد',
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="تایید رمز عبور"
            {...register('confirmPassword', {
              required: 'تایید رمز عبور الزامی است',
              validate: (value) =>
                value === password ||
                'رمز عبور و تایید رمز عبور باید یکسان باشند',
            })}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <button type="submit">تغییر رمز عبور</button>
          <p className="login-link">
            برگشت به <Link to="/login">صفحه ورود</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}
