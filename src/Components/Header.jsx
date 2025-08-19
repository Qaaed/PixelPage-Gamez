import React from 'react';

const Header = () => {
  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log('Login clicked');
  };

  const handleSignUp = () => {
    // TODO: Implement signup functionality
    console.log('Sign up clicked');
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-lg">
            <div className="w-6 h-6 grid grid-cols-3 gap-px">
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white/70 rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white/70 rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white/70 rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white/70 rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">
            TTT <span className="text-blue-400">Gamez</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#" 
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Play
          </a>
          <a 
            href="#" 
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Leaderboard
          </a>
          <a 
            href="#" 
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
          >
            About
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-200 font-medium"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-300 hover:text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;