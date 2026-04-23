import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import {Routes, Route} from 'react-router'

import { useAuthStore } from './store/useAuthStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App = () => {
  const {authUser, checkAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  },[])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App