import React, {useState, useEffect} from 'react'
import axios from "axios"

interface SignupProps {
  renderLogin:  () => void;
}

const Signup = ({renderLogin}: SignupProps) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(false)

  const onSubmit = () => {
    axios.post("/signup", {
      username: username,
      password: password,
    }).then(res => console.log(res))
  }

  useEffect(() => {
    if ((username) && (password) && (confirmPassword) && (password == confirmPassword)) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword])

  return (
    <div style={{height:'300px'}}>
      <h1 className='text-center text-gray-400 font-bold'>Register</h1>
        <div className='mb-4'>
            <div className='mb-2'><label >Username</label></div>
            <input onChange={(e) => setUsername(e.target.value)} className='w-full px-2 py-2 border border-gray-400 rounded-md' type="text" placeholder='Username' />
        </div>

      <div className='mb-5'>
            <div className='mb-2'><label>Password</label></div>
            <input onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' type="password" placeholder='Password' />
        </div>

      <div className='mb-5'>
            <div className='mb-2'><label>Confirm Password</label></div>
            <input onChange={(e) => setConfirmPassword(e.target.value)} className='w-full p-3 border border-gray-400 rounded-md' type="password" placeholder='Password' />
        </div>

        <div className='flex place-content-between items-center'>
          <div>Have an account?<span className='text-blue-400 ml-3 cursor-pointer hover:text-blue-600' onClick={renderLogin}>Log in!</span></div>
          <button onClick={onSubmit} disabled={disabled} className={`rounded-lg px-6 py-3 font-bold text-white  ${disabled ? "bg-gray-400 hover:bg-red-400" : "bg-blue-400 hover:bg-blue-600"} cursor-pointer`}>Sign up</button>
        </div>

    </div>
  )
}

export default Signup