import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  FaHeart,
  FaComments,
  FaBell,
  FaPlus,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/');
        setUserMenuOpen(false);
      })
      .catch((error) => console.error('Logout error:', error));
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-white shadow-md px-4 lg:px-12 py-4 sticky top-0 z-50 justify-between md:justify-around lg:justify-between">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className="text-xl font-bold text-primary">SellZone</Link>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <FaComments className="text-xl cursor-pointer hover:text-blue-500" />
                <div className="relative" ref={userMenuRef}>
                  <div
                    className="avatar cursor-pointer"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {user.photoURL && <img src={user.photoURL} alt="User Avatar" />}
                    </div>
                  </div>
                  {userMenuOpen && (
                    <div className="absolute top-10 right-0 w-56 bg-white border rounded-xl shadow-xl p-2 space-y-2 z-50">
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">📋 My Ads</button>
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">🏢 My Business Account</button>
                      <Link to="/profile">
                        <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full" onClick={() => setUserMenuOpen(false)}>👤 My Profile</button>
                      </Link>
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">⚙️ Settings</button>
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">🛠 Help & Support</button>
                      <button className="hover:bg-red-100 text-red-600 p-2 rounded-lg text-left font-semibold w-full" onClick={handleLogout}>🚪 Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/form">
                  <button className="btn btn-sm bg-primary hover:bg-white hover:ring-primary hover:text-primary text-white px-2 py-1 gap-1">
                    <FaPlus className="text-xs" />
                    <span className="text-xs">Sell</span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn btn-sm ring-primary ring-1 hover:bg-gray-100 px-2 py-1 gap-1">
                    <FaUser className="text-xs" />
                    <span className="text-xs">Login</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-primary">SellZone</Link>
            <label className="input input-bordered hidden sm:flex items-center gap-3 px-3 py-2 w-52 text-base">
              <FaMapMarkerAlt className="text-gray-500 text-lg" />
              <input type="text" className="grow text-sm" placeholder="Your location" />
            </label>
          </div>

          <div className="flex items-center gap-6 relative">
            {user && (
              <>
                <FaHeart className="text-xl cursor-pointer hover:text-red-500" />
                <FaComments className="text-xl cursor-pointer hover:text-blue-500" />
                <FaBell className="text-xl cursor-pointer hover:text-yellow-500" />
                <div className="relative flex items-center gap-1 cursor-pointer" ref={userMenuRef}>
                  <div
                    className="avatar"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {user.photoURL && <img src={user.photoURL} alt="User Avatar" />}
                    </div>
                  </div>
                  {userMenuOpen && (
                    <div className="absolute top-16 right-0 w-64 bg-white border rounded-xl shadow-xl p-4 space-y-3 z-50">
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">📋 My Ads</button>
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">🏢 My Business Account</button>
                      <Link to="/profile">
                        <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full" onClick={() => setUserMenuOpen(false)}>👤 My Profile</button>
                      </Link>
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">⚙️ Settings</button>
                      <button className="hover:bg-gray-100 p-2 rounded-lg text-left w-full">🛠 Help & Support</button>
                      <button className="hover:bg-red-100 text-red-600 p-2 rounded-lg text-left font-semibold w-full" onClick={handleLogout}>🚪 Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <Link to="/form">
                <button className="btn bg-primary hover:bg-white hover:ring-primary ring-1 hover:text-primary text-white text-sm px-4 py-2 gap-2">
                  <FaPlus /> Sell
                </button>
              </Link>
              {!user && (
                <Link to="/login">
                  <button className="btn ring-primary ring-1 hover:bg-gray-100 text-sm px-4 py-2 gap-2">
                    <FaUser /> Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button className="text-2xl" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          <label className="input input-bordered flex items-center gap-3 px-3 py-2 text-base">
            <FaMapMarkerAlt className="text-gray-500" />
            <input type="text" className="grow text-sm" placeholder="Location" />
          </label>
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
          {user && (
            <div className="flex gap-4 text-xl text-gray-600 justify-start">
              <FaHeart />
              <FaBell />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Link to="/form" className="w-full" onClick={() => setMobileMenuOpen(false)}>
              <button className="btn bg-primary hover:bg-white hover:ring-primary ring-1 hover:text-primary text-white w-full">
                <FaPlus className="mr-2" /> Sell
              </button>
            </Link>
            {!user ? (
              <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn ring-primary ring-1 hover:bg-gray-100 w-full">
                  <FaUser className="mr-2" /> Login
                </button>
              </Link>
            ) : (
              <button
                className="btn ring-primary ring-1 hover:bg-gray-100 w-full"
                onClick={() => {
                  handleLogout();  // Log out the user
                  setMobileMenuOpen(false);  // Close the mobile menu
                }}
              >
                <FaUser className="mr-2" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
