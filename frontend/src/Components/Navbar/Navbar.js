import React, { useState,useEffect } from "react";
import "./Navbar.css";
import { MdLogout } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


export default function Navbar() {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [dropShow, setDropShow] = useState(false);
  const { user } = useUser();
  const { setUser } = useUser();
  const dropRef = useRef(null);
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handlerLogOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        // هدایت کاربر به صفحه لاگین یا صفحه اصلی
        setUser(null);
        navigate("/login");
      } else {
        console.error("خطا در لاگ‌اوت");
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDropShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="all">
        <IoMdMenu className="icon-menu" onClick={toggleMenu} />
        <div className="logo">Logo</div>
        <div className={`menus ${!isOpenMenu ? "open" : ""}`}>
          <IoMdClose className="close-icon" onClick={toggleMenu} />
          <ul className={`menu ${!isOpenMenu ? "open-menu" : ""}`}>
            <li className="menu-items">
              <Link to="/" className="item-links">
                صفحه اصلی
              </Link>
            </li>
            <li className="menu-items">
              <Link to="/category" className="item-links">
                {" "}
                محصولات
              </Link>
            </li>
            <li className="menu-items">
              <a href="#" className="item-links">
                ارتباط با ما
              </a>
            </li>
          </ul>
        </div>
        <div className="input-search">
          <input type="text" placeholder="جست و جو ..." className="search" />
          <IoMdSearch className="icon-search" />
        </div>
        <div className="left-navbar">
          <div className="container-basket-icon">
            <SlBasket className="icon-basket" />
            <button
              className="login"
              onClick={() => setDropShow((prev) => !prev)}
            >
              {user ? (
                <>
                  <Link to="#" className="login-link">
                    {user.username}
                  </Link>
                </>
              ) : (
                <Link to="/verify-user" className="login-link">
                  ورود / ثبت نام
                </Link>
              )}
            </button>
          </div>
          {user && dropShow ? (
            <div className="notification-user" ref={dropRef}>
              <Link to="/user-panel/dashboard" className="enter-panel">
                ورود به پنل
              </Link>
              <div className="form-logout">
                <Link to="/" className="logout-panel" onClick={handlerLogOut}>
                  خروج از حساب
                </Link>
                <MdLogout className="icon-logout" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
