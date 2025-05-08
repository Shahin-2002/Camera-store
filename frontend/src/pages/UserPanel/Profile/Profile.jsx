import React, { useState, useEffect } from 'react';
import { useUser } from '../../../UserContext/UserContext';
import './Profile.css';
import NavbarPanel from '../NavbarPanel/NavbarPanel';

export default function Profile() {
  const { user, setUser, refreshUser } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/Images/profile-empty.jpg');

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (user?.profile_picture) {
      setPreviewUrl(user.profile_picture);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('profile_picture', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/api/auth/profile/', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      alert('تصویر پروفایل با موفقیت آپلود شد');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('خطا در آپلود تصویر');
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    console.log('درخواست تغییر رمز:', passwordData);
    // TODO: ارسال به سرور
  };

  return (
    <>
      <NavbarPanel />
      <div className="profile-wrapper">
        <h2 className="title-panel">جزئیات حساب کاربری</h2>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-row upload-btn">
              <img
                className="image-profile"
                src={previewUrl}
                alt="پروفایل"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.target.src = '/Images/profile-empty.jpg';
                }}
              />
              <label>عکس پروفایل</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="profile-image-input"
              />
              <label htmlFor="profile-image-input" className="upload-button">
                انتخاب تصویر
              </label>
              {selectedImage && (
                <button onClick={handleImageUpload} className="upload-button">
                  آپلود تصویر
                </button>
              )}
            </div>
            <label>نام کاربری</label>
            <input
              className="input-panel-user"
              type="text"
              value={user?.username || ''}
              disabled
            />
          </div>
          <div className="form-row">
            <label>نام </label>
            <input
              className="input-panel-user"
              type="text"
              value={user?.first_name || 'وارد نشده'}
            />
          </div>
          <div className="form-row">
            <label>نام خانوادگی</label>
            <input
              className="input-panel-user"
              type="text"
              value={user?.last_name || 'وارد نشده'}
            />
          </div>
          <div className="form-row">
            <label>ایمیل</label>
            <input
              className="input-panel-user"
              type="email"
              value={user?.email || ''}
              disabled
            />
          </div>

          <div className="form-row">
            <label>شماره تلفن</label>
            <input
              className="input-panel-user"
              type="text"
              value={user?.phone || 'وارد نشده'}
              disabled
            />
          </div>
        </div>

        <form className="password-form" onSubmit={handleSubmitPassword}>
          <h3 className="title-panel-password">تغییر رمز عبور</h3>

          <div className="form-row">
            <label>رمز عبور فعلی</label>
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
    </>
  );
}
