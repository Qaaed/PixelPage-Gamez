import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth"; // Optional: if using this library
import logo_icon from "../assets/logo.png";

const Header = () => {
  const [user, loading] = useAuthState(auth); // If using react-firebase-hooks
  // Alternative: const [user, setUser] = useState(auth.currentUser); // If not using the library
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Optional: redirect to home page
      // window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                src={logo_icon}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-white">
                Pixel-Page <span className="text-blue-400">Gamez</span>
              </span>
            </a>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/games"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Games
            </a>
            {user && (
              <a
                href="/leaderboard"
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                Leaderboard
              </a>
            )}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            ) : user ? (
              // Logged in user options
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-slate-300 text-sm">
                    {user.displayName || user.email}
                  </span>
                </div>
                
                <a
                  href="/profile"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Profile
                </a>
                
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Guest user options
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-300 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-700 border-t border-slate-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Navigation Links */}
            <a
              href="/"
              className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-md transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/games"
              className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-md transition-colors duration-200"
            >
              Games
            </a>
            {user && (
              <a
                href="/leaderboard"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-md transition-colors duration-200"
              >
                Leaderboard
              </a>
            )}

            {/* User Actions */}
            <div className="border-t border-slate-600 pt-3">
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : user ? (
                // Logged in user options
                <>
                  <div className="px-3 py-2 text-slate-300 text-sm border-b border-slate-600 mb-2">
                    Welcome, {user.displayName || user.email}
                  </div>
                  <a
                    href="/profile"
                    className="block px-3 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors duration-200"
                  >
                    View Profile
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-md transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                // Guest user options
                <>
                  <a
                    href="/login"
                    className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-md transition-colors duration-200"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="block px-3 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 mx-3 mt-2"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;