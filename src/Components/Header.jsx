import React from "react";
import { useNavigate } from "react-router-dom";
import logo_icon from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/signup");

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/GameSelect")}
        >
          <img
            src={logo_icon}
            alt="Logo Icon"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-2xl font-bold text-white">
            Pixel-Page <span className="text-blue-400">Gamez</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate("/GameSelect")}
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
          >
            Play
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
          >
            Leaderboard
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-200 font-medium cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25 cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-300 hover:text-white p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
