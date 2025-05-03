import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("اطلاعات ورود:", data);
    // اینجا می‌تونی به API بفرستی
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>ورود به حساب کاربری</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="email"
            placeholder="ایمیل"
            {...register("email", {
              required: "وارد کردن ایمیل الزامی است",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "ایمیل معتبر نیست",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password", { required: "رمز عبور الزامی است" })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit">ورود</button>
          <p className="register-link">
            حساب ندارید؟ <Link to="/verify-user">ثبت‌نام کنید</Link>
          </p>
          <p className="forgot-password-link">
            <Link to="/forgot-password">فراموشی رمز عبور؟</Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}
