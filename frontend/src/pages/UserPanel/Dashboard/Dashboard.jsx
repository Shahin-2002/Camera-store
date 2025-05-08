import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaUserEdit, FaShoppingBag } from 'react-icons/fa';
import { useUser } from '../../../UserContext/UserContext';
import './Dashboard.css';
import NavbarPanel from '../NavbarPanel/NavbarPanel';

const UserProfile = () => {
  const { user } = useUser();
  
  useEffect(() => {
    console.log('Dashboard user data:', user);
  }, [user]);

  const profileImageUrl = user?.profile_picture 
    ? user.profile_picture
    : '/Images/profile-empty.jpg';

  console.log('Profile image URL:', profileImageUrl);

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
                console.error('Image failed to load:', e);
                e.target.src = '/Images/profile-empty.jpg';
              }}
            />
          </div>
          <h2 className="user-name">{user?.first_name || 'کاربر'}</h2>
        </div>

        <div className="profile-links">
          <Link to="/tickets" className="profile-link">
            <FaTicketAlt className="link-icon" />
            <span>تیکت زدن</span>
          </Link>

          <Link to="/user-panel/profile" className="profile-link">
            <FaUserEdit className="link-icon" />
            <span>ویرایش حساب</span>
          </Link>

          <Link to="/recent-purchases" className="profile-link">
            <FaShoppingBag className="link-icon" />
            <span>آخرین خریدها</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;