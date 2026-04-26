import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import {Routes, Route, Navigate} from 'react-router'
import {Toaster} from 'react-hot-toast'
import { Loader } from 'lucide-react'

import { useAuthStore } from './store/useAuthStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  },[])

  if(isCheckingAuth & !authUser){
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/register" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/register" />} />
      </Routes>
    </div>
  )
}

export default App