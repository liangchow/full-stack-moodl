'use client'
import { Fugaz_One } from "next/font/google";
import React, {useState} from 'react'
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const {signup, login} = useAuth()

  async function handleSubmit(){
    if (!email || !password || password.length < 6){
      return
    }
    setAuthenticating(true)
    try {
      if (isRegister){
        console.log('Signing up a new user')
        await signup(email, password)
      } else {
        console.log('Logging in an existing user')
        await login(email, password)
      }
    } catch(err){
      console.log(err.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl '+fugaz.className}>{isRegister ? 'Register' : 'Log In'}</h3>
      <p>You&#39;re one step away!</p>
      <input value={email} onChange={(e)=>{
        setEmail(e.target.value)
      }} className='max-w-[400px] w-full mx-auto duration-200 hover:border-indigo-600 focus:border-indigo-600
       px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Email' / >
      <input value={password} onChange={(e)=>{
        setPassword(e.target.value)
      }} className='max-w-[400px] w-full mx-auto duration-200 hover:border-indigo-600 focus:border-indigo-600
       px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Password' type='password'/ >
      <div className='max-w-[400px] w-full mx-auto'> 
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submiting' : 'Submit'} full />
      </div>
      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} 
        <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600 cursor-pointer '>{isRegister ? 'Sign In' : 'Sign Up'}</button>
      </p>
      <p className="text-sm bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-background bg-[length:_400%_400%] [animation-duration:_3s]">
        Login with <span className="font-bold">test@testing.com</span> and <span className="font-bold">testing123</span> to see Dashboard 
      </p>
    </div>
  )
}
