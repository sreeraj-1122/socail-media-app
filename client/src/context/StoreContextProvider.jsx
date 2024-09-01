import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

const StoreContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("token")
  ); // Boolean value
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    isDarkMode,
    setIsDarkMode,
    isOpen, setIsOpen
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
