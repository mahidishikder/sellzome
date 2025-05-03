import React from 'react'
import {Outlet}  from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Category from '../components/Header/Category'

function Root() {
  return (
    <div>
        <Header></Header>
        <Category></Category>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Root