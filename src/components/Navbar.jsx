import React, { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
  ];

  return (
    <nav className={`${darkMode ? 'dark' : ''}`}>
      <div className="bg-indigo-600 dark:bg-gray-900 text-white shadow-md">
        <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <div className="flex-shrink-0 font-bold text-xl">
                VoiceToText
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 dark:hover:bg-gray-800 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

 

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-indigo-700 dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800 dark:hover:bg-gray-700"
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 flex items-center space-x-4">
                <FiSearch className="h-5 w-5" />
                <FiUser className="h-5 w-5" />
                <div className="relative">
                  <FiShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </div>
                <button onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;