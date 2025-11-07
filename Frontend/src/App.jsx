import React from 'react'
import './App.css'
import Navbar from './Navbar'
import Body from './Body'
import Login from './login'
import Fotter from './Fotter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename='/'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Body />} />
        <Route path='/loginpage' element={<Login />} />
      </Routes>
      <Fotter />
    </BrowserRouter>
  )
}

export default App