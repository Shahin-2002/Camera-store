import React, { useState } from "react";
import "./Navbar.css";
import { MdLogout } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [dropShow, setDropShow] = useState(false);
  const { user } = useUser();

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

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
            <button className="login" onClick={() => setDropShow((prev) => !prev)}>
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
            <div className="notification-user">
              <Link to="/" className="enter-panel">
                ورود به پنل
              </Link>
              <div className="form-logout">
                <Link to="/" className="logout-panel">
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
