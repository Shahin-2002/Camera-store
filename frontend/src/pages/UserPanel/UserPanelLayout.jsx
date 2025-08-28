import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaUserEdit, FaShoppingBag, FaTicketAlt , FaArrowAltCircleLeft} from "react-icons/fa";
import "./UserPanel.css";

export default function UserPanelLayout() {
  return (
    <div className="user-panel-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="title-panel-user">پنل کاربری</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/user-panel/profile" className="sidebar-link">
            <FaUserEdit className="link-icon" />
            <span>ویرایش حساب</span>
          </NavLink>
          <NavLink to="/user-panel/recent-purchases" className="sidebar-link">
            <FaShoppingBag className="link-icon" />
            <span>آخرین خریدها</span>
          </NavLink>
          <NavLink to="/user-panel/tickets" className="sidebar-link">
            <FaTicketAlt className="link-icon" />
            <span>تیکت‌ها</span>
          </NavLink>
          <NavLink to="/" className="sidebar-link">
            <FaArrowAltCircleLeft className="link-icon" />
            <span>صفحه اصلی</span>
          </NavLink>
        </nav>
      </aside>

      <main className="user-panel-content">
        <Outlet />
      </main>
    </div>
  );
}
