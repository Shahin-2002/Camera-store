import React from 'react';
import NavbarPanel from '../NavbarPanel/NavbarPanel';

export default function ComingSoon({ title }) {
  return (
    <>
    <NavbarPanel/>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          color: '#333',
        }}
      >
        <h1>{title}</h1>
        <p>این صفحه بزودی در دسترس قرار می‌گیرد.</p>
      </div>
    </>
  );
}
