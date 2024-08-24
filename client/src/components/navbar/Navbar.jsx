import React from "react";
import { GoSearch } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";
import { useStore } from "../../context/StoreContextProvider";

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useStore();

  return (
    <nav className="flex justify-between items-center px-8 py-3 shadow-lg dark:bg-custom-bg">
      {/* Logo */}
      <div className="text-3xl font-bold text-blue-600 cursor-pointer">
        Insta<span className="text-orange-600">Stream</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-1/3 dark:border-gray-500 rounded-md border border-gray-300 ">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border-none outline-none w-full dark:text-white dark:bg-[#212b36] rounded-s-md"
        />
        <button className="bg-blue-800 h-full py-2 px-4 text-white rounded-e-md cursor-pointer">
          Search
        </button>
      </div>

      {/* Theme Switcher and Notifications */}
      <div className="flex items-center space-x-4">
        {/* Theme Switcher */}
        <label
          className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center"
          htmlFor="themeSwitch"
        >
          <input
            id="themeSwitch"
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            className="sr-only"
            aria-label="Toggle theme"
          />
          <span
            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
              isDarkMode ? "bg-[#25313d]" : "bg-[#c0c0c3]"
            }`}
          >
            <span
              className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                isDarkMode ? "translate-x-[28px]" : ""
              }`}
            ></span>
          </span>
        </label>

        {/* Notification Icon */}
        <span className="text-xl text-gray-600 dark:text-gray-200">
          <FaRegBell aria-label="Notifications" />
        </span>

        {/* Logout Button */}
        <button className="border-red-400 border rounded-md inline-flex items-center justify-center py-2 px-7 text-center text-base font-medium  hover:bg-[#de2828]">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
