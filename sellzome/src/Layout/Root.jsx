import React from 'react'
import {Outlet}  from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function Root() {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Root