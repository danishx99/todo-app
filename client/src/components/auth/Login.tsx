import React, {useState} from 'react'
import axios from 'axios';

interface LoginProps {
  renderSignup:  () => void;
}

const Login = ({renderSignup}: LoginProps) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

const onSubmit = () => {
  axios.post("http://localhost:5000/login", {
    username: username, 
    password: password,
  }).then(res => {
    if (res.status === 200) {
      const token = res.data.token;
      localStorage.setItem("token", token)
      window.location.href = "/dashboard"
    } else {

      //some validation
    
    }
  }).catch(function (err) {
        console.log(err.response)
  });
}

  return (
    <div style={{height:'300px'}}>
      <h1 className='text-center text-gray-400 font-bold'>Login</h1>
        <div className='mb-4'>
            <div className='mb-2'><label >Username</label></div>
            <input onChange={(e) => setUsername(e.target.value)} className='w-full px-2 py-2 border border-gray-400 rounded-md' type="text" placeholder='Username' />
        </div>

      <div className='mb-5'>
            <div className='mb-2'><label>Password</label></div>
            <input onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' type="password" placeholder='Password' />
        </div>

        <div className='flex place-content-between items-center'>
          <div>No account?<span className='text-blue-400 ml-3 cursor-pointer hover:text-blue-600' onClick={renderSignup}>Sign up!</span></div>
          <button onClick={onSubmit} className='rounded-lg px-4 py-3 font-bold bg-blue-400 text-white hover:bg-blue-600'>Login</button>
        </div>

    </div>
  )
}

export default Login