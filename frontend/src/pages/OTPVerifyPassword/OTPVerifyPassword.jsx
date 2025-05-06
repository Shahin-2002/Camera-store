import './OTPVerifyPassword.css';
import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function OTPVerifyPassword() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(180);
  const [resendEnabled, setResendEnabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) inputRefs.current[index + 1].focus();

    if (newOtp.every((digit) => digit !== '')) {
      const email = localStorage.getItem('userEmail');
      const finalCode = newOtp.join('');
      console.log('کد وارد شده:', finalCode);
      // ارسال به API

      fetch('http://localhost:8000/api/auth/email-verify/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verification_code: finalCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            toast.success('کد با موفقیت تأیید شد', {
              position: 'top-center',
              autoClose: 2000,
            });

            setTimeout(() => {
              navigate('/register'); // ریدایرکت به صفحه ثبت‌نام
            }, 2000);
          } else {
            toast.error('کد وارد شده نادرست است', {
              position: 'top-center',
              autoClose: 2500,
            });
            setOtp(['', '', '', '', '']);
            inputRefs.current[0].focus();
          }
        })
        .catch((err) => {
          console.error('خطا در تایید کد:', err);
          toast.error('مشکلی در ارتباط با سرور پیش آمد', {
            position: 'top-center',
            autoClose: 2500,
          });
        });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (timeLeft === 0) {
      setResendEnabled(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendCode = () => {
    console.log('🔁 ارسال مجدد کد انجام شد');
    setOtp(['', '', '', '', '']);
    inputRefs.current[0].focus();
    setTimeLeft(60);
    setResendEnabled(false);

    // درخواست مجدد به بک‌اند اینجا زده میشه
  };

  return (
    <>
      <Navbar />
      <div className="otp-container">
        <h2>تأیید هویت</h2>
        <p className="otp-instruction">کد ارسال شده به گوشی را وارد کنید</p>

        <div
          className="otp-inputs-wrapper"
          dir="ltr"
          style={{ direction: 'ltr' }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="otp-input"
              dir="ltr"
              style={{ direction: 'ltr', textAlign: 'center' }}
            />
          ))}
        </div>

        <div className="resend-section">
          {resendEnabled ? (
            <button onClick={handleResendCode} className="resend-btn">
              ارسال مجدد کد
            </button>
          ) : (
            <p className="resend-timer">
              ارسال مجدد کد تا {timeLeft} ثانیه دیگر
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
