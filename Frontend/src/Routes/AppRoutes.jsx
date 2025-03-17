import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import MobileHome from '../pages/MobileHome'
import Login from '../pages/Login'

const AppRoutes = () => {
    //TODO This approach of rendering two components over here will cause performance issues later, becuases it is rendering both the compoents for mobile view as well as for desktop view. TO fix this later add conditional rendering and also add debouncer in it which later will improve performance, There is a very big bug in this right now and that is while this 2 pages are being rendered there are 2 forms rendered and both of this forms have same ID, it can cause app to crash, FIX THIS ASAP
  return (
    <Router>
        <Routes>
            <Route path='/home' element={<>
                <div className="desktop hidden sm:block">
                    <Home />
                </div>
                <div className="mobile sm:hidden">
                    <MobileHome />
                </div>
            </>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes