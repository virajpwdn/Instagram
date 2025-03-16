import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import MobileHome from '../pages/MobileHome'
import Login from '../pages/Login'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/home' element={<MobileHome />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes