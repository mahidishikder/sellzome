import React, { useState } from 'react';
import {
  FaHeart,
  FaComments,
  FaBell,
  FaPlus,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar bg-white shadow-md px-4 lg:px-12 py-4 sticky top-0 z-50 justify-between md:justify-around lg:justify-between">
        {/* Mobile and iPad Left Side: Menu and Logo */}
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

          {/* Mobile and iPad Right Side: Chat and User */}
          <div className="flex items-center gap-4">
            <FaComments className="text-xl cursor-pointer hover:text-blue-500" />
            <div className="relative" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="avatar">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pravatar.cc/30" alt="User Avatar" />
                </div>
              </div>
              {userMenuOpen && (
                <div className="absolute top-10 right-0 w-48 bg-white border rounded-xl shadow-xl p-2 space-y-2 z-50">
                  <button className="hover:bg-gray-100 p-1 rounded-lg text-left text-sm">👤 My Profile</button>
                  <button className="hover:bg-gray-100 p-1 rounded-lg text-left text-sm">⚙️ Settings</button>
                  <button className="hover:bg-red-100 text-red-600 p-1 rounded-lg text-left text-sm font-semibold">🚪 Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left Side: Logo and Location */}
          <div className="flex items-center gap-4">
            <a className="text-2xl font-bold text-primary">SellZone</a>
            <label className="input input-bordered hidden sm:flex items-center gap-3 px-3 py-2 w-52 text-base">
              <FaMapMarkerAlt className="text-gray-500 text-lg" />
              <input type="text" className="grow text-sm" placeholder="Your location" />
            </label>
          </div>

          {/* Right Side: Icons and User */}
          <div className="flex items-center gap-6 relative">
            <select className="select select-bordered w-24 text-sm">
              <option>🇬🇧 EN</option>
              <option>🇧🇩 BN</option>
            </select>

            <FaHeart className="text-xl cursor-pointer hover:text-red-500" />
            <FaComments className="text-xl cursor-pointer hover:text-blue-500" />
            <FaBell className="text-xl cursor-pointer hover:text-yellow-500" />

            {/* User Avatar */}
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pravatar.cc/40" alt="Desktop User Avatar" />
                </div>
              </div>
              {userMenuOpen && (
                <div className="absolute top-16 right-0 w-64 bg-white border rounded-xl shadow-xl p-4 space-y-3 z-50">
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left">📋 My Ads</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left">🏢 My Business Account</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left">👤 My Profile</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left">⚙️ Settings</button>
                  <button className="hover:bg-gray-100 p-2 rounded-lg text-left">🛠 Help & Support</button>
                  <button className="hover:bg-red-100 text-red-600 p-2 rounded-lg text-left font-semibold">🚪 Logout</button>
                </div>
              )}
            </div>

            {/* Sell Button */}
            <button className="btn bg-primary text-white text-sm px-4 py-2 hover:bg-secondary gap-2">
              <FaPlus /> Sell
            </button>
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
          <select className="select select-bordered w-full text-sm">
            <option>🇬🇧 EN</option>
            <option>🇧🇩 BN</option>
          </select>
          <div className="flex gap-4 text-xl text-gray-600 justify-start">
            <FaHeart />
            <FaBell />
          </div>
          <button className="btn bg-primary text-white w-full mt-3">
            <FaPlus className="mr-2" /> Sell
          </button>
        </div>
      )}
    </>
  );
}

export default Header;