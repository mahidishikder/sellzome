import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Category from '../components/Header/Category';

function Root() {
  const location = useLocation();
  console.log(location);

  // Hide Header/Footer for 'form', 'login', or 'register' paths
  const noHeaderFooter =
    location.pathname.includes('form') ||
    location.pathname.includes('login') ||
    location.pathname.includes('register');

  return (
    <div>
      {!noHeaderFooter && <Header />}
      {!noHeaderFooter && <Category />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
    </div>
  );
}

export default Root;
