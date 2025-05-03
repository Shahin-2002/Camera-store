import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // وقتی اپ اجرا میشه بررسی کن که کاربر لاگین هست یا نه
  useEffect(() => {
    fetch('http://localhost:8000/api/auth/user-info', {
      method: 'GET',
      credentials: 'include', // برای ارسال کوکی HttpOnly
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data); // فرض: data = { username: 'Ali' }
      })
      .catch((err) => {
        console.log('کاربر لاگین نیست');
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
