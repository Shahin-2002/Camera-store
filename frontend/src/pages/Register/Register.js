import React from "react";
import "./Register.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEmail } from "../../EmailContext/EmailContext";
import { useUser } from "../../UserContext/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { email } = useEmail();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // اینجا می‌تونی درخواست به بک‌اند بفرستی

    const res = await fetch("http://localhost:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        username: data.username,
        phone: data.mobile,
        password: data.password,
      }),
    });
    if (res.ok) {
      const data = await res.json(); // ⬅️ اینجا اطلاعات دریافتی از بک‌اند
      setUser({ username: data.user.username });
      console.log("پاسخ بک‌اند:", data);
      toast.success("ثبت نام با موفقیت انجام شد", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/"); // ریدایرکت به صفحه ثبت‌نام
      }, 2000);
    } else {
      toast.success("خطا در ثبت نام", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      <Navbar />

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>ثبت‌نام</h2>

          <label>نام کاربری</label>
          <input
            type="text"
            {...register("username", { required: "نام کاربری الزامی است" })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}

          <label>ایمیل</label>
          <input type="email" value={email} disabled />

          <div className="form-group">
            <label>شماره موبایل</label>
            <input
              type="tel"
              {...register("mobile", {
                required: "شماره موبایل الزامی است",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "شماره موبایل معتبر نیست",
                },
              })}
            />
            {errors.mobile && <p className="error">{errors.mobile.message}</p>}
          </div>

          <label>رمز عبور</label>
          <input
            type="password"
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit">ثبت‌نام</button>
          <p className="login-link">
            قبلاً ثبت‌نام کرده‌اید؟ <Link to="/login">وارد شوید</Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}
