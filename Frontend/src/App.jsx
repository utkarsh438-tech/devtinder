import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Body from './Components/Body'
import Login from './Components/login'
import Fotter from './Components/Fotter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import appstore from './utils/appstore'
import Feed from './Components/Feed'


function App() {
  return (
    <Provider store={appstore}> 
    <BrowserRouter basename='/'>
    
      <Routes>
        <Route path='/' element={<Body />} />
        <Route path='/' element={<Feed />} />
        <Route path='/loginpage' element={<Login />} />
      </Routes>
      <Fotter />
    </BrowserRouter>
     </Provider>
  )
}

export default App