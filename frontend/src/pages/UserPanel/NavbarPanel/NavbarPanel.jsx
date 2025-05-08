import React, { useState, useEffect } from 'react';
import './NavbarPanel.css';

const NavbarPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="time-display">
          {formatTime(currentTime)}
        </div>
        <div className="date-display">
          {formatDate(currentTime)}
        </div>
      </div>
    </nav>
  );
};

export default NavbarPanel;
