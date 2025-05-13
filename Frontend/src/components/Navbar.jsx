import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-md w-full m-0">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold">Tuition M.S</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200">About</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
