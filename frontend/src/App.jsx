import React from 'react';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <UserProfile />
      </div>
    </div>
  );
}

export default App; 