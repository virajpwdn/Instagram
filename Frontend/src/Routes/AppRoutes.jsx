import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import MobileHome from '../pages/MobileHome'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/home' element={<MobileHome />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes