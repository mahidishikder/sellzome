import React, { useState, useRef, useEffect } from 'react';
import {
  FaHeart,
  FaComments,
  FaBell,
  FaPlus,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaSearch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar bg-white shadow-md px-4 lg:px-12 py-4 sticky top-0 z-50 justify-between md:justify-around lg:justify-between">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xl transition-all duration-300"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <a className="text-xl font-bold text-primary">SellZone</a>
          </div>

          <div className="flex items-center gap-4">
            <FaComments className="text-xl cursor-pointer hover:text-blue-500" />
            <div className="relative" ref={userMenuRef}>
              <div className="avatar cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pravatar.cc/30" alt="User Avatar" />
                </div>
              </div>
              {userMenuOpen && (
                <div className="absolute top-10 right-0 w-48 bg-white border rounded-xl shadow-xl p-2 space-y-2 z-50">
                  <button className="hover:bg-gray-100 p-1 rounded-lg text-left text-sm w-full">👤 My Profile</button>
                  <button className="hover:bg-gray-100 p-1 rounded-lg text-left text-sm w-full">⚙️ Settings</button>
                  <button className="hover:bg-red-100 text-red-600 p-1 rounded-lg text-left text-sm font-semibold w-full">🚪 Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left */}
          <div className="flex items-center gap-4">
            <a className="text-2xl font-bold text-primary">SellZone</a>
            <label className="input input-bordered hidden sm:flex items-center gap-3 px-3 py-2 w-52 text-base">
              <FaMapMarkerAlt className="text-gray-500 text-lg" />
              <input type="text" className="grow text-sm" placeholder="Your location" />
            </label>
          </div>

          {/* Center - Product Search */}
          <div className="flex items-center rounded-md overflow-hidden border border-gray-300 w-96">
            <input
              type="text"
              placeholder="Search for products..."
              className="input input-sm w-full focus:outline-none"
            />
            <button className="btn btn-sm bg-primary text-white hover:bg-secondary">
              <FaSearch />
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 relative">
            <FaHeart className="text-xl cursor-pointer hover:text-red-500" />
            <FaComments className="text-xl cursor-pointer hover:text-blue-500" />
            <FaBell className="text-xl cursor-pointer hover:text-yellow-500" />

            {/* Avatar */}
            <div className="relative flex items-center gap-1 cursor-pointer" ref={userMenuRef} onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pravatar.cc/40" alt="Desktop User Avatar" />
                </div>
              </div>
              {userMenuOpen && (
                <div className="absolute top-16 right-0 w-64 bg-white border rounded-xl shadow-xl p-4 space-y-3 z-50">
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">📋 My Ads</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">🏢 My Business Account</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">👤 My Profile</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">⚙️ Settings</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">🛠 Help & Support</button>
                  <button className="hover:bg-red-100 text-red-600 p-2 rounded-lg text-left font-semibold w-full">🚪 Logout</button>
                </div>
              )}
            </div>

            {/* Sell Button */}
            <Link to={`/form`}>
            <button className="btn bg-primary hover:bg-white hover:ring-primary ring-1 hover:text-primary text-white text-sm px-4 py-2 gap-2">
              <FaPlus /> Sell
            </button>
            </Link>
           
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-4 transition-transform transform duration-300 ease-in-out z-50"
          style={{
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button className="text-2xl" onClick={() => setMobileMenuOpen(false)}>
              ✕
            </button>
          </div>
          <label className="input input-bordered flex items-center gap-3 px-3 py-2 text-base">
            <FaMapMarkerAlt className="text-gray-500" />
            <input type="text" className="grow text-sm" placeholder="Location" />
          </label>
          {/* Product Search in Mobile Drawer */}
          <div className="flex items-center rounded-md overflow-hidden border border-gray-300">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-sm w-full focus:outline-none"
            />
            <button className="btn btn-sm bg-primary text-white hover:bg-secondary">
              <FaSearch />
            </button>
          </div>
          <div className="flex gap-4 text-xl text-gray-600 justify-start">
            <FaHeart />
            <FaBell />
          </div>
          <button className="btn bg-primary hover:bg-white hover:ring-primary ring-1 hover:text-primary text-white w-full mt-3">
            <FaPlus className="mr-2" /> Sell
          </button>
        </div>
      )}
    </>
  );
}

export default Header;