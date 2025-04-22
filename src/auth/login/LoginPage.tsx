import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const aAccount = {
        aaccount: 'admin',
        apass: '12345'
    }
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn")
        if (isLoggedIn === "true") {
            navigate("/")
        }
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        if (email.toString() === aAccount.aaccount && password.toString() === aAccount.apass) {
            localStorage.setItem("isLoggedIn", "true")
            setMessage("ok")
            setTimeout(() => {
                navigate('/')
            }, 4000);
        } else {
            setMessage('account or password is wrong')
            setPassword("")
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='border border-black w-1/2 h-2/3 flex flex-col items-center justify-center' onSubmit={onSubmit}>
                <h1 className='text-3xl  font-bold'>Login</h1>
                <div className='flex flex-col gap-5 w-full items-center'>
                    <fieldset className='border w-2/3 h-16 flex justify-center '>
                        <legend className='ml-2'>Email</legend>
                        <input type="text"
                            className='outline-none w-[98%] h-fit'
                            required name='email'
                            onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className='border w-2/3 h-16 flex justify-center items-center'>
                        <legend className='ml-2'>Password</legend>
                        <input type="password"
                            className='outline-none w-[98%] h-fit'
                            required name='password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <button className='border border-black w-2/3 h-12 bg-green-500 hover:opacity-80 cursor-pointer'>Login</button>
                    <p className={`w-full text-center mt-5 `}>{message}</p>
                </div>
            </form>
        </div>
    )
}
