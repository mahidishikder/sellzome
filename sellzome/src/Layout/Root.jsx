import React from 'react'
import {Outlet, useLocation}  from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Category from '../components/Header/Category'

function Root() {
  const location = useLocation()
  console.log(location)
  const noHeaderFooter = location.pathname.includes('form')
  return (
    <div>
        {noHeaderFooter || <Header></Header>}
        {noHeaderFooter || <Category></Category>}
        <Outlet></Outlet>
        {noHeaderFooter || <Footer></Footer>}
    </div>
  )
}

export default Root