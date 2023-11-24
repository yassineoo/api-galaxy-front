// components/Header.js
"use client";
import { useState } from "react";

const Header = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white w-full text-black p-4 flex justify-between 2xl:justify-around items-center">
      {/* Left side: Dashboard */}
      <div>
        <span className="text-lg font-bold">Dashboard</span>
      </div>

      {/* Right side: Dropdown menu */}
      <div className="relative">
        {/* Dropdown toggle button */}
        <button
          onClick={toggleDropdown}
          className="focus:outline-none flex items-center space-x-2"
        >
          {/* Add your icons here */}
          <span>🔔</span>
          <span>⚙️</span>
          <span>👤</span>
        </button>

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded shadow-lg">
            <ul className="space-y-2 p-2">
              {/* Add your dropdown menu items here */}
              <li>Notification</li>
              <li>Settings</li>
              <li>Profile</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
