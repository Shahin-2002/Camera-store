// EmailContext.js
import { createContext, useContext, useState, useEffect } from "react";

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const saveEmail = (newEmail) => {
    setEmail(newEmail);
    localStorage.setItem("userEmail", newEmail);
  };

  const clearEmail = () => {
    setEmail("");
    localStorage.removeItem("userEmail");
  };

  return (
    <EmailContext.Provider value={{ email, saveEmail, clearEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
