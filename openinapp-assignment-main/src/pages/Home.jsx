import React, { useEffect, useState } from "react";
import Papa from 'papaparse';
import { Bell, User, X } from 'lucide-react';
import SideBar from "../components/SideBar";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [check, setCheck] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState({});
  const [detailsExist, setDetailsExist] = useState(false);
  const [isBasicSelected, setIsBasicSelected] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [file, setFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setAuthenticated(true);
    }
    setCheck(false);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsLoading(true);
      Papa.parse(file, {
        complete: (result) => {
          setCSVData(result.data.map(row => ({
            ...row,
            selectedTags: []
          })));
          setIsUploaded(true);
          setIsLoading(false);
        },
        header: true,
      });
    }
  };

  const handleTagSelect = (index, tag) => {
    setCSVData(prevData => prevData.map((row, i) => 
      i === index
        ? { ...row, selectedTags: [...new Set([...row.selectedTags, tag])] }
        : row
    ));
  };

  const handleTagRemove = (index, tag) => {
    setCSVData(prevData => prevData.map((row, i) => 
      i === index
        ? { ...row, selectedTags: row.selectedTags.filter(t => t !== tag) }
        : row
    ));
  };

  const getThemeClass = (lightClass, darkClass) => isDarkMode ? darkClass : lightClass;
  const formatLink = (link) => {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return `http://${link}`;
    }
    return link;
  };

  if (!authenticated && !check) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={`relative flex w-full h-screen ${isDarkMode ? "bg-[#1A1A1A] text-white" : "bg-[#F5F5F5] text-black"}`}>
      <SideBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="flex-grow flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4">
          <h1 className="font-bold text-[21px] sm:text-[24px]">
            Upload CSV
          </h1>
          <div className="flex justify-between items-center gap-3">
            
            <Bell className="w-[18px] h-[20px]" />
            <User className="w-[30px] h-[30px] rounded-full bg-gray-300" />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow flex flex-col gap-4 lg:gap-6 px-10 py-32" style={{ marginLeft: isDarkMode ? '70px' : '70px', overflowY: 'auto', height: '100vh' }}>
          <div className={`w-full p-4 ${getThemeClass('bg-white', 'bg-black')} rounded-lg shadow-md`}>
            
            <div className={`border-2 border-dashed rounded-lg px-24 py-12 mb-6 flex flex-col items-center justify-center ${getThemeClass('border-gray-200', 'border-gray-700')}`} style={{ minHeight: "200px" }}>
              <svg className="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className={`mb-2 text-sm ${getThemeClass('text-gray-600', 'text-gray-300')}`}>
                Drop your excel sheet here or{" "}
                <label className="text-indigo-500 cursor-pointer hover:underline">
                  browse
                  <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
                </label>
              </p>
              {file && <p className={`text-sm ${getThemeClass('text-gray-500', 'text-gray-400')}`}>{file.name}</p>}
            </div>
            <button
              onClick={handleUpload}
              disabled={!file || isLoading}
              className={`w-full ${isLoading ? 'bg-indigo-400' : getThemeClass('bg-indigo-500 hover:bg-indigo-600', 'bg-indigo-600 hover:bg-indigo-700')} text-white px-4 py-3 rounded transition-colors flex items-center justify-center text-sm`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  Upload
                </>
              )}
            </button>
            {isUploaded && (
  <>
    <h1 className={`text-xl font-semibold mb-4 mt-8 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>
      Uploads
    </h1>
    <div className={`${getThemeClass('bg-white', 'bg-gray-800')} p-8 rounded-lg shadow-md w-full`}>
      <table className="w-full">
        <thead className={getThemeClass('bg-gray-50', 'bg-gray-700')}>
          <tr>
            <th className={`text-left py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>SI No.</th>
            <th className={`text-left py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>Links</th>
            <th className={`text-left py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>Prefix</th>
            <th className={`text-left py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>Add Tags</th>
                        <th className={`text-left py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>
                          <div className="scrollable-tags">
                            Selected Tags
                          </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index} className={`border-b ${getThemeClass('border-gray-200', 'border-gray-700')} ${getThemeClass('hover:bg-gray-50', 'hover:bg-gray-700')}`}>
              <td className={`py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>{index + 1}</td>
              <td className={`py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>
                <a href={formatLink(row.links)} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {row.links}
                </a>
              </td>
              <td className={`py-2 px-4 ${getThemeClass('text-gray-900', 'text-gray-200')}`}>{row.prefix}</td>
              <td className="py-2 px-4">
                <select 
                  className={`border rounded px-2 py-1 ${getThemeClass('bg-white text-gray-900', 'bg-gray-700 text-gray-200')}`}
                  onChange={(e) => handleTagSelect(index, e.target.value)}
                  value=""
                >
                  <option value="">Select Tags</option>
                  {row['select tags'].split(', ').map((tag, i) => (
                    <option key={i} value={tag}>{tag}</option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4">
                <div className="max-w-full overflow-x-auto">
                  <div className="inline-flex gap-1">
                    {row.selectedTags.map((tag, i) => (
                      <span key={i} className="bg-blue-800 text-white text-xs font-semibold px-1 py-0.5 rounded flex items-center whitespace-nowrap">
                        {tag}
                        <button onClick={() => handleTagRemove(index, tag)} className="ml-1">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
