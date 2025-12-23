import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const localToken = localStorage.getItem("userToken");
    const sessionToken = sessionStorage.getItem("userToken");
    setIsAuthenticated(localToken !== null || sessionToken !== null);
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userData");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            Lilies
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition">
              Home
            </Link>
            <a href="#specials" className="text-gray-700 hover:text-orange-500 transition">
              Specials
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 transition">
              About
            </a>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#specials"
              className="block text-gray-700 hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Specials
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-orange-500 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-orange-500 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-center transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;