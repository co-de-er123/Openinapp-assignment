import React, { useState, useEffect } from "react";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import google from "../assets/google-icon 1.png";
import apple from "../assets/apple 1.png";
import github from "../assets/github.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import discord from "../assets/discord.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import profile_pic from "../assets/profile_pic.png";
import baseIcon from "../assets/data-analytics.png";

const Login = () => {
  const [value, setValue] = useState("");
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setAuthenticated(true);
    }
    setCheck(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setValue(result.user.email);
        localStorage.setItem("authenticated", true);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };

  if (authenticated && !check) {
    return <Navigate replace to="/home" />;
  } else {
    return (
      <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className={`w-1/2 ${isDarkMode ? 'bg-indigo-800' : 'bg-indigo-600'} p-12 hidden lg:block rounded-3xl`}>
          <div className={`${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-700'} rounded-3xl p-8 text-white h-full flex flex-col justify-between`}>
            <div>
            <div className={`inline-block mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-1 rounded-full mb-6`}>
              <div className="flex items-center">
                <img src={baseIcon} alt="Base Icon" className="w-8 h-8 mr-2" /> 
                <span className={`${isDarkMode ? 'text-white' : ' text-black'} text-base font-semibold`}>BASE</span>
              </div>
            </div>
              {/* <span className={`inline-block ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-indigo-600'} px-4 py-1 rounded-full text-sm font-semibold mb-6`}>Base</span> */}
              <h2 className="text-4xl font-semibold mb-4">Generate detailed reports with just one click</h2>
            </div>
            <div className="mt-auto flex justify-between items-end">
              <button
                onClick={toggleTheme}
                className={`w-13 h-7 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
              >
                <FontAwesomeIcon
                  icon={isDarkMode ? faMoon : faSun}
                  className={`w-12 h-4 ${isDarkMode ? 'text-gray-300' : 'text-yellow-500'} transition-transform duration-300`}
                  style={{
                    transform: isDarkMode ? 'translateX(-6px)' : 'translateX(6px)'
                  }}
                />
              </button>
              <img src={profile_pic} alt="Profile" className="w-80 h-96 object-cover" />
            </div>
          </div>
        </div>
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'}`}>
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-2 pt-5">Sign In</h2>
            <p className={`${isDarkMode ? 'text-white' : 'text-black'} mb-8`}>Sign in to your account</p>
            <div className="flex justify-between mb-6">
              <button
                onClick={handleClick}
                className={`flex items-center justify-center ${isDarkMode ? 'bg-black text-gray-400' : 'bg-white text-gray-700'} rounded-lg px-4 py-2 text-sm w-[48%]`}
              >
                <img src={google} alt="Google" className="w-4 h-4 mr-2" />
                Sign in with Google
              </button>
              <button className={`flex items-center justify-center ${isDarkMode ? 'bg-black text-gray-400' : 'bg-white text-gray-700'} rounded-lg px-4 py-2 text-sm  w-[48%]`}>
                <img src={apple} alt="Apple" className="w-4 h-4 mr-2" />
                Sign in with Apple
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} p-8 rounded-lg shadow-sm`}>
              <div className="mb-4">
                <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email address</label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} rounded-md ${isDarkMode ? 'placeholder-white' : 'placeholder-black'}`}
                  placeholder="johndoe@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Password</label>
                <input
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 text-lg border ${isDarkMode ? 'bg-gray-600 border-gray-500 ' : 'bg-white border-gray-300'} rounded-md ${isDarkMode ? 'placeholder-white' : 'placeholder-black'}`}
                  placeholder="••••••••"
                />
              </div>
              <a href="#" className="text-indigo-400 text-sm block mb-4">Forgot password?</a>
              <button className={`w-full bg-indigo-600 ${isDarkMode ? 'text-black' : 'text-white'} rounded-lg py-2 font-medium`}>
                Sign in
              </button>
            </div>
            
            <p className={`text-center mt-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account? <a href="#" className="text-indigo-400">Register here</a>
            </p>
            
            <div className="flex justify-center mt-8 space-x-4 pt-7 pb-5">
              <img src={github} alt="GitHub" className={`w-6 h-6 ${isDarkMode ? '' : 'filter invert'}`} />
              <img src={twitter} alt="Twitter" className={`w-6 h-6 ${isDarkMode ? '' : 'filter invert'}`} />
              <img src={linkedin} alt="LinkedIn" className={`w-6 h-6 ${isDarkMode ? '' : 'filter invert'}`} />
              <img src={discord} alt="Discord" className={`w-6 h-6 ${isDarkMode ? '' : 'filter invert'}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;