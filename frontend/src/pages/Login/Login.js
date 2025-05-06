import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";

export default function Login() {
  const { setUser } = useUser();
  const [errorMessageLogin, setErorMessageLogin] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_or_username: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErorMessageLogin(errorData.non_field_errors[0]);
        return;
      }

      // لاگین موفق بوده — حالا باید اطلاعات کاربر رو از سرور بگیری
      const userRes = await fetch("http://localhost:8000/api/auth/user-info", {
        method: "GET",
        credentials: "include",
      });

      if (!userRes.ok) {
        throw new Error("گرفتن اطلاعات کاربر ناموفق بود");
      }

      const userData = await userRes.json();
      setUser(userData); // الان اطلاعات کاربر رو داری
      navigate("/");
    } catch (error) {
      console.error("خطای ارتباط با سرور:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>ورود به حساب کاربری</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="text"
            placeholder="ایمیل یا نام کاربری"
            {...register("email")}
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

          {errorMessageLogin ? (
            <p className="error">{errorMessageLogin}</p>
          ) : (
            ""
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
