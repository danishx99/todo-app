import React, {useState} from 'react'
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const App = () => {

  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className='flex w-full h-screen '>

        <div className='flex w-1/2 max-w-xs mx-auto items-center relative'>
            <div className='absolute inset-0 m-auto' style={{height: '300px'}}>
              {(isSignup && <Signup renderLogin ={() => setIsSignup(false)}/>) || <Login renderSignup={() => setIsSignup(true)}/>}
            </div>
        </div>

        <div className='w-1/2 p-5 bg-blue-400 flex justify-center items-center flex-col'>
            <h2 className='text-gray-100'>To Do App</h2>
            <h4 className='text-gray-100'>Made by Danish Saleem</h4>
        </div>


    </div>
  )
}

export default App