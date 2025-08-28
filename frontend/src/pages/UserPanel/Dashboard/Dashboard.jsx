import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaUserEdit, FaShoppingBag } from 'react-icons/fa';
import { useUser } from '../../../UserContext/UserContext';
import './Dashboard.css';
import NavbarPanel from '../NavbarPanel/NavbarPanel';

const UserProfile = () => {
  const { user, setUser } = useUser(); // setUser اضافه شد
  const [profileImageUrl, setProfileImageUrl] = useState(
    '/Images/profile-empty.jpg'
  );

  // تابع برای گرفتن اطلاعات کاربر بدون نیاز به رفرش
  const loadUserData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/profile/', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      setUser(data);
      if (data.profile_picture) setProfileImageUrl(data.profile_picture);
    } catch (err) {
      console.log('کاربر لاگین نیست');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // بروزرسانی عکس وقتی user تغییر کرد
  useEffect(() => {
    if (user?.profile_picture) {
      setProfileImageUrl(user.profile_picture);
    }
  }, [user?.profile_picture]);

  return (
    <>
      <NavbarPanel />
      <div className="user-profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={profileImageUrl}
              alt="User Profile"
              className="profile-image"
              onError={(e) => {
                e.target.src = '/Images/profile-empty.jpg';
              }}
            />
          </div>
          <h2 className="user-name">{user?.first_name || 'کاربر'}</h2>
        </div>

        <div className="profile-links">
          <Link to="/user-panel/profile" className="profile-link">
            <FaUserEdit className="link-icon" />
            <span>ویرایش حساب</span>
          </Link>
          <Link to="/recent-purchases" className="profile-link">
            <FaShoppingBag className="link-icon" />
            <span>آخرین خریدها</span>
          </Link>
          <Link to="/tickets" className="profile-link">
            <FaTicketAlt className="link-icon" />
            <span>تیکت زدن</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
