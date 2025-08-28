import React, { useState, useEffect } from 'react';
import { useUser } from '../../../UserContext/UserContext';
import './Profile.css';
import NavbarPanel from '../NavbarPanel/NavbarPanel';

export default function Profile() {
  const { user, setUser } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/Images/profile-empty.jpg');

  const [editableData, setEditableData] = useState({
    username: user?.username || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  // گرفتن اطلاعات کاربر بدون نیاز به رفرش
  const loadUserData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/profile/', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      setUser(data);
      setEditableData({
        username: data.username || '',
        phone: data.phone || '',
      });
      if (data.profile_picture) setPreviewUrl(data.profile_picture);
    } catch (err) {
      console.log('کاربر لاگین نیست');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (user?.profile_picture) setPreviewUrl(user.profile_picture);
    setEditableData({
      username: user?.username || '',
      phone: user?.phone || '',
    });
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
      if (!response.ok) throw new Error('Upload failed');
      alert('تصویر پروفایل با موفقیت آپلود شد');
      setSelectedImage(null);
      loadUserData(); // بروزرسانی اطلاعات کاربر بعد از آپلود
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('خطا در آپلود تصویر');
    }
  };

  const handleEditableChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const handleSubmitEditable = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/auth/profile/', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editableData),
      });
      if (!res.ok) throw new Error('خطا در آپدیت');
      const updatedUser = await res.json();
      setUser(updatedUser);
      alert('اطلاعات با موفقیت بروزرسانی شد');
    } catch (err) {
      console.error(err);
      alert('خطا در بروزرسانی اطلاعات');
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
          <div className="form-row upload-btn">
            <img
              className="image-profile"
              src={previewUrl}
              alt="پروفایل"
              onError={(e) => (e.target.src = '/Images/profile-empty.jpg')}
            />
            <label htmlFor="profile-image-input" className="upload-button">
              انتخاب تصویر
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="profile-image-input"
            />
            {selectedImage && (
              <button onClick={handleImageUpload} className="upload-button">
                آپلود تصویر
              </button>
            )}
          </div>

          <form onSubmit={handleSubmitEditable}>
            <div className="form-row">
              <label>نام کاربری</label>
              <input
                className="input-panel-user"
                type="text"
                name="username"
                value={editableData.username}
                onChange={handleEditableChange}
              />
            </div>

            <div className="form-row">
              <label>شماره تلفن</label>
              <input
                className="input-panel-user"
                type="text"
                name="phone"
                value={editableData.phone}
                onChange={handleEditableChange}
              />
            </div>

            <button type="submit" className="save-button">
              تایید تغییرات
            </button>
          </form>

          <div className="form-row">
            <label>ایمیل</label>
            <input
              className="input-panel-user"
              type="email"
              value={user?.email || ''}
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
