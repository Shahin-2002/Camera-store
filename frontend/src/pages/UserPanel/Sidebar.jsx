import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>پنل کاربری</h3>
      <ul>
        <li>
          <NavLink to="/user-panel/dashboard">داشبورد</NavLink>
        </li>
        <li>
          <NavLink to="/user-panel/profile">پروفایل</NavLink>
        </li>
        <li>
          <NavLink to="/">بازگشت به سایت</NavLink>
        </li>
        <li>
          <NavLink to="/" style={{color:'red'}}>خروج از حساب</NavLink>
        </li>
      </ul>
    </div>
  );
}
