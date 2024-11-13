import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 mb-8 sketch-border">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-cursive sketch-text">Task Manager</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-700 font-semibold focus:outline-none"
          >
            Menu
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg sketch-border z-10">
              <ul className="py-2">
                <li><a href="profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a></li>
                <li><a href="#calendar" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Calendar</a></li>
                <li><a href="#settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a></li>
                <li><a href="#tasks" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tasks</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
