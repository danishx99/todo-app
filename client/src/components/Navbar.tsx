import React from 'react'
import Logout from './auth/Logout'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-blue-400 p-8 text-white font-bold'>
        <p className='font-bold text-lg'>ToDo App</p>
        <Logout/>
    </div>
  )
}

export default Navbar 