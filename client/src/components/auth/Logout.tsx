import React from 'react'

const Logout = () => {
  return (
    <div className='cursor-pointer' onClick={() =>{
      localStorage.removeItem("token")
      window.location.href = "/"
    } }>Logout</div>
  )
}

export default Logout