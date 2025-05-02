import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
      <div className="notfound-container">
        <div className="notfound-content">
          <div className="notfound-image">
            <img
              src="/Images/404.jpg"
              alt="404"
            />
          </div>
          <div className="notfound-text">
            <h1>Oops! صفحه پیدا نشد.</h1>
            <p>متاسفانه صفحه‌ای که به دنبال آن هستید در اینجا وجود ندارد.</p>
            <button className="back-home-btn" onClick={() => navigate('/')}>
              بازگشت به خانه
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
