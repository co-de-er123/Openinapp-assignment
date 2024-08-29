import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Items from "./Items";
import baseIcon from "../assets/data-analytics.png"; 

const SideBar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    if (savedSidebarState !== null) {
      setIsOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);
  const sidebarBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div
      className={`sidebar-container ${sidebarBg} h-screen relative flex flex-col py-6 transition-all duration-300 ease-in-out ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      style={{ width: isOpen ? '250px' : '80px' }}
    >
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
        <div className="pl-2 pt-2" style={{ maxWidth: '50px' }}>
          <img src={baseIcon} alt="Base Logo" className="w-full h-full" />
        </div>
        {isOpen && <h1 className={`text-xl font-semibold ${textColor} mx-4`}>Base</h1>}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-lg transition-all duration-300 pr-3`}
        >
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            className="w-5 h-5 text-gray-300"
          />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 mb-4 ml-4">
        <button
          onClick={toggleTheme}
          className={`w-13 h-7 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-100' : 'bg-gray-200'}`}
        >
          <FontAwesomeIcon
            icon={isDarkMode ? faMoon : faSun}
            className={`w-12 h-4 ${isDarkMode ? 'text-gray-600' : 'text-yellow-500'} transition-transform duration-300`}
            style={{
              transform: isDarkMode ? 'translateX(-6px)' : 'translateX(6px)'
            }}
          />
        </button>
      </div>
      
      <div className={`flex-grow ${!isOpen ? "flex flex-col items-start sidebar-closed" : ""}`}>
        <Items isDarkMode={isDarkMode} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default SideBar;