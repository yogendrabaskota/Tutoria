import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectIsAuthenticated,
  selectCurrentUser,
} from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-teal-800 shadow-lg" : "bg-teal-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <h1 className="text-2xl font-bold font-serif tracking-widest">
                T U T O R I A
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              <NavLink to="/" text="Home" />
              <NavLink to="/about" text="About" />
              <NavLink to="/contact" text="Contact" />
              {isAuthenticated && user?.role === "tutor" && (
                <NavLink to="/tutor-dashboard" text="Tutor Portal" />
              )}
            </div>

            {!isAuthenticated ? (
              <div className="flex space-x-4 ml-4">
                <AuthButton to="/login" text="Login" variant="white" />
                <AuthButton to="/register" text="Register" variant="teal" />
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <div className="text-sm text-teal-100 hidden lg:block">
                  Welcome, {user?.name}
                </div>
                <AuthButton to="/dashboard" text="Dashboard" variant="teal" />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md text-sm font-semibold transition duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal-200 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-teal-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink
            to="/"
            text="Home"
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink
            to="/about"
            text="About"
            onClick={() => setIsMenuOpen(false)}
          />
          <MobileNavLink
            to="/contact"
            text="Contact"
            onClick={() => setIsMenuOpen(false)}
          />
          {isAuthenticated && user?.role === "tutor" && (
            <MobileNavLink
              to="/tutor-dashboard"
              text="Tutor Portal"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
        <div className="bg-teal-800 pt-4 pb-3 border-t border-teal-700 px-5">
          {!isAuthenticated ? (
            <div className="space-y-3">
              <MobileAuthButton
                to="/login"
                text="Login"
                variant="white"
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileAuthButton
                to="/register"
                text="Register"
                variant="teal"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center text-teal-100 pb-2">
                Welcome, {user?.name}
              </div>
              <MobileAuthButton
                to="/dashboard"
                text="Dashboard"
                variant="teal"
                onClick={() => setIsMenuOpen(false)}
              />
              <button
                onClick={handleLogout}
                className="w-full block text-center bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md text-base font-medium shadow-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable components for cleaner code
const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="text-white hover:text-teal-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
  >
    {text}
  </Link>
);

const MobileNavLink = ({ to, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-700"
  >
    {text}
  </Link>
);

const AuthButton = ({ to, text, variant }) => (
  <Link
    to={to}
    className={`${
      variant === "white"
        ? "bg-white text-teal-700 hover:bg-gray-100"
        : "bg-teal-500 text-white hover:bg-teal-600"
    } px-4 py-2 rounded-md text-sm font-semibold transition duration-300 shadow-sm`}
  >
    {text}
  </Link>
);

const MobileAuthButton = ({ to, text, variant, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`w-full block text-center ${
      variant === "white"
        ? "bg-white text-teal-700 hover:bg-gray-100"
        : "bg-teal-500 text-white hover:bg-teal-600"
    } px-4 py-2 rounded-md text-base font-medium shadow-sm`}
  >
    {text}
  </Link>
);

export default Navbar;
