import { TextField, Button, Input, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoEyeOff, IoEyeOffOutline } from "react-icons/io5";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e) => {
        e.preventDefault();
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
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
            setTimeout(() => {
                navigate('/')
            }, 1000);
        } else {
            setMessage('account or password is wrong')
            setPassword("")
        }
    }
    return (
        <div className='flex justify-center items-center absolute top-0 left-0 h-screen w-full border bg-white'>
            <div className='w-3/4 h-3/4 border flex justify-center items-center'>
                <form onSubmit={onSubmit} className='flex flex-col justify-center items-center gap-5 w-3/4'>
                    <h1 className='font-black text-3xl'>Login</h1>
                    <div className='text-red-500'>{message}</div>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Account</InputLabel>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            id="outlined-adornment-password"
                            label="Account"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <IoEyeOff /> : <IoEyeOffOutline />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Button variant='outlined' fullWidth sx={{ background: 'blue', color: 'black', ":hover": { opacity: 0.6 } }} type='submit'>Login</Button>
                </form>
            </div>
        </div >
    )
}
