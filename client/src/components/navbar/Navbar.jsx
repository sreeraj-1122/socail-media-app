import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaRegBell, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useStore } from "../../context/StoreContextProvider";
import { RiHomeLine, RiLogoutBoxRLine, RiUserLine } from "react-icons/ri";

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="shadow-lg dark:bg-custom-bg">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-8 py-3">
        {/* Logo */}
        <div className="text-3xl font-bold text-blue-500 cursor-pointer ">
          Insta<span className="text-orange-600">Stream</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-1/3 dark:border-gray-500 rounded-full border border-gray-300 shadow dark:bg-[#212b36]">
          <input
            type="text"
            placeholder="Search..."
            className="ps-4 py-3 border-none outline-none w-full dark:text-white dark:bg-[#212b36] rounded-s-full h-full"
          />
          <span className="bg-blue-800 h-full py-3 px-5 text-white rounded-e-full cursor-pointer shadow dark:border-gray-500  border border-gray-300 ">
            <GoSearch className="text-xl font-bold" />
          </span>
        </div>

        {/* Theme Switcher and Notifications */}
        <div className="flex items-center space-x-4 gap-1">
          {/* Theme Switcher */}
          <span onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? (
              <MdOutlineLightMode className="text-2xl" />
            ) : (
              <MdOutlineDarkMode className="text-2xl" />
            )}
          </span>

          {/* Notification Icon */}
          <span className="text-xl text-gray-600 dark:text-gray-200">
            <FaRegBell aria-label="Notifications" />
          </span>

          {/* Logout Button */}
          <button className="border-red-400 border rounded-full inline-flex items-center justify-center py-2 px-3 text-center text-base font-medium hover:bg-[#d63d0f] text-white flext gap-2 bg-orange-600 shadow-md">
            Logout
            <RiLogoutBoxRLine />
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center px-3 gap-3 py-3 ">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          Insta<span className="text-orange-600">Stream</span>
        </div>
        <div className="flex items-center w-[40%] dark:border-gray-500 rounded-full border border-gray-300 shadow dark:bg-[#212b36]">
          <input
            type="text"
            placeholder="Search..."
            className="ps-2 py-1 border-none outline-none w-full dark:text-white dark:bg-[#212b36] rounded-s-full"
          />
          <span className="bg-blue-800 h-full py-2 px-3 text-white rounded-e-full cursor-pointer shadow  dark:border-gray-500  border border-gray-300">
            <GoSearch className="text-xl font-bold" />
          </span>
        </div>

        {/* Theme Switcher */}
        <span
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="transition-all duration-600 ease-in-out transform hover:scale-110"
        >
          {isDarkMode ? (
            <MdOutlineLightMode className="text-2xl " />
          ) : (
            <MdOutlineDarkMode className="text-2xl" />
          )}
        </span>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-gray-600 dark:text-gray-200"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 h-full w-[40%]  bg-[#e9e9e9] dark:bg-[#121212] shadow-md transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-2 pt-3">
          <li className=" items-center justify-center text-center text-base font-medium hover:text-white flex gap-2 hover:bg-slate-700 w-full py-2">
            Home
            <RiHomeLine /> {/* Replace with appropriate icon */}
          </li>
          <li className=" items-center justify-center text-center text-base font-medium hover:text-white flex gap-2 hover:bg-slate-600 w-full py-2">
            Profile
            <RiUserLine /> {/* Replace with appropriate icon */}
          </li>
          <li className=" items-center justify-center text-center text-base font-medium hover:text-white flex gap-2 hover:bg-slate-600 w-full py-2">
            Logout
            <RiLogoutBoxRLine />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
