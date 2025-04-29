import React, { useState } from "react";
import "./Navbar.css";
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { SlBasket } from "react-icons/sl";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState("false");

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
              <a href="#" className="item-links">
                صفحه اصلی
              </a>
            </li>
            <li className="menu-items">
              <a href="#" className="item-links">
                {" "}
                محصولات
              </a>
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
        <SlBasket className="icon-basket" />
        <button className="login">ورود / ثبت نام</button>
        </div>
      </div>
    </>
  );
}
