import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext/UserContext';
import './Profile.css';

export default function Profile() {
  const { user } = useUser();

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    console.log('درخواست تغییر رمز:', passwordData);
    // TODO: ارسال به سرور
  };

  return (
    <div className="profile-wrapper">
      <h2 className="title-panel">جزئیات حساب کاربری</h2>

      <div className="profile-form">
        <div className="form-row">
        <div className="form-row upload-btn">
          <img className='image-profile' src="/Images/profile-empty.jpg" alt="لود نشده..."/>
          <label>عکس پروفایل</label>
          <button>آپلود عکس پروفایل</button>
        </div>
          <label>نام کاربری</label>
          <input className='input-panel-user' type="text" value={user?.username || ''} disabled />
        </div>
        <div className="form-row">
          <label>نام </label>
          <input className='input-panel-user' type="text" value={user?.fullName || 'وارد نشده'} />
        </div>
        <div className="form-row">
          <label>نام خانوادگی</label>
          <input className='input-panel-user' type="text" value={user?.fullName || 'وارد نشده'} />
        </div>
        <div className="form-row">
          <label>ایمیل</label>
          <input className='input-panel-user' type="email" value={user?.email || ''} disabled />
        </div>

        <div className="form-row">
          <label>شماره تلفن</label>
          <input className='input-panel-user' type="text" value={user?.phone || 'وارد نشده'} disabled />
        </div>

      </div>

      <form className="password-form" onSubmit={handleSubmitPassword}>
        <h3 className='title-panel-password'>تغییر رمز عبور</h3>

        <div className="form-row">
          <label >رمز عبور فعلی</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="form-row">
          <label>رمز عبور جدید</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit" className="save-button">
          تغییر رمز عبور
        </button>
      </form>
    </div>
  );
}
