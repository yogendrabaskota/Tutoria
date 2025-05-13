import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // convert token to true/false
  }, []);

  return (
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-md w-full m-0">
      <div className="flex justify-between items-center w-full">
        <Link to="/">
          <h1 className="text-xl font-bold font-serif tracking-widest">T U T O R I A</h1>
        </Link>

        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-white text-teal-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-white text-teal-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/dashboard"
                className="bg-white text-teal-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
