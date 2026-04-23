import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const navbar = () => {
    const {authUser} = useAuthStore()
  return (
    <div className='text-red-500'>navbar</div>
  )
}

export default navbar