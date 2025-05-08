import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./UserPanel.css";

export default function UserPanelLayout() {
  return (
    <div className="user-panel-layout">
      <Sidebar />
      <div className="user-panel-content">
        
        <Outlet />
      </div>
    </div>
  );
}
