import React, { useState } from 'react'
import { FormContainer } from './style'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.svg'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'


const toastOptions = {
    position: "bottom-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

function Register() {
    const navigate = useNavigate('/')
    const [values, setValues] = useState({userName : '', email : '', password : '', confirmPassword : ''})

    // function for validate the input values
    const handleValidation = () => {
        const { userName, email, password, confirmPassword } = values

        if(password !== confirmPassword){
            toast.error('Password and confirn password should be same!!', toastOptions)
            return false
        }else if(userName.length < 3){
            toast.error('Username should be greater than 3 characters!!', toastOptions)
            return false
        }else if(password.length < 8){
            toast.error('Password should be greater than 3 characters!!', toastOptions)
            return false
        }else if(email === ''){
            toast.error('Email is required!!', toastOptions)
        }
        return true
    }

    // function for handling the submit event
    const handleSubmit = async(e) => {
        e.preventDefault()
        // If the validation good
        if(handleValidation()){
            const newUser = {
                userName : values.userName,
                email : values.email,
                password : values.password                
            }
            const { data } = await axios.post(registerRoute, newUser)
            if(data.status === false){
                toast.error(data.msg, toastOptions)
            }else if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.newUser))
                console.log(data)
                navigate('/setAvatar')
            }
        }
        setValues({
            userName : '',
            email : '',
            password : '',
            confirmPassword : ''
        })
    }
    
    return (
        <>
            <FormContainer>
                <form action="" method="post" onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={logo} alt="" />
                        <h1>Snappy</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        name="username" id=""
                        value={values.userName}
                        onChange={(e) => setValues({
                            ...values,
                            userName : e.target.value
                        })} 
                    />
                    <input 
                        type="email" 
                        placeholder='Email' 
                        name="email" id="" 
                        value={values.email}
                        onChange={(e) => setValues({
                            ...values,
                            email : e.target.value
                        })}
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        name="password" id="" 
                        value={values.password}
                        onChange={(e) => setValues({
                            ...values,
                            password : e.target.value
                        })}
                    />
                    <input 
                        type="password" 
                        placeholder='Confirm password' 
                        name="confirm_password" id="" 
                        value={values.confirmPassword}
                        onChange={(e) => setValues({
                            ...values,
                            confirmPassword : e.target.value
                        })}
                    />
                    <button type='submit'>Create user</button>
                    <span>Aleady have an account ?<Link to={'/login'}>Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

export default Register