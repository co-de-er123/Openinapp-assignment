import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBorderAll, 
  faSquarePollVertical, 
  faTicket, 
  faFileInvoice, 
  faBell, 
  faGear,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const Items = ({ isDarkMode, isOpen }) => {
  const [selectedItem, setSelectedItem] = useState('upload'); // Set 'upload' as default

  const baseItemClass = isDarkMode ? "text-white" : "text-gray-700";
  const selectedItemClass = isDarkMode
    ? "bg-blue-100 border-l-4 border-blue-500 text-blue-700"
    : "bg-blue-50 border-l-4 border-blue-500 text-blue-700";

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const renderItem = (name, icon, text) => (
    <div
      className={`flex justify-start items-center gap-3 px-4 py-3 w-full transition-all duration-200 ${
        selectedItem === name ? selectedItemClass : `hover:bg-gray-100 ${baseItemClass}`
      }`}
      onClick={() => handleClick(name)}
    >
      <FontAwesomeIcon icon={icon} className={`w-[20px] h-[20px] ${selectedItem === name ? 'text-blue-700' : baseItemClass}`} />
      {isOpen && (
        <p
          className={`font-normal text-sm ${selectedItem === name ? 'font-semibold' : ''} ${
            selectedItem === name ? 'text-blue-700' : baseItemClass
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );

  return (
    <div className="cursor-pointer flex flex-col w-full space-y-2">
      {renderItem('dashboard', faBorderAll, 'Dashboard')}
      {renderItem('upload', faSquarePollVertical, 'Upload')}
      {renderItem('invoice', faTicket, 'Invoice')}
      {renderItem('schedule', faFileInvoice, 'Schedule')}
      {renderItem('calendar', faCalendarDays, 'Calendar')}
      {renderItem('notification', faBell, 'Notification')}
      {renderItem('settings', faGear, 'Settings')}

      <div className={`flex justify-start items-center gap-3 px-4 py-3 w-full hover:bg-gray-100 mt-4 ${baseItemClass}`} onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} className="w-[20px] h-[20px]" />
        {isOpen && <p className={`font-normal text-sm hover:font-semibold`}>Logout</p>}
      </div>
    </div>
  );
};

export default Items;