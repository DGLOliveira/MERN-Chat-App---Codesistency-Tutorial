import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import {Routes, Route, Navigate} from 'react-router'
import {Toaster} from 'react-hot-toast'
import { Loader } from 'lucide-react'

import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  
  useEffect(() => {
    checkAuth();
  },[])

  if(isCheckingAuth & !authUser){
    return (
      <div data-theme={theme} className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App