import React from 'react'
import './App.css'
import Body from './Components/Body'
import Login from './Components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import appstore from './utils/appstore'
import Feed from './Components/Feed'
import Profile from './Components/Profile'


function App() {
  return (
    <Provider store={appstore}> 
    <BrowserRouter basename='/'>
      <Routes>
        {/* Layout route: Body contains Navbar, Outlet and Footer and will run fetchUserData on mount */}
        <Route path='/' element={<Body />}>
          {/* index route renders Feed at '/' */}
          <Route index element={<Feed />} />
          {/* protected/profile route will be rendered inside Body so fetchUserData runs first */}
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='loginpage' element={<Login />} />
      </Routes>
      {/* <Fotter /> */}
    </BrowserRouter>
     </Provider>
  )
}

export default App