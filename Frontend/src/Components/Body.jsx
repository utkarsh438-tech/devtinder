import React from 'react'
import { Outlet } from 'react-router-dom'
import Fotter from './Fotter'
import Navbar from './Navbar'

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Fotter />
    </div>
  )
}

export default Body