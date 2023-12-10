import { useEffect, useState } from 'react'
import { FormContainer } from './style'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.svg'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'


const toastOptions = {
    position: "bottom-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

function Register() {
    const navigate = useNavigate('/')
    const [values, setValues] = useState({userName : '', password : '' })

    // useEffect(() => {
    //     if(localStorage.getItem('chat-app-user')) {
    //         navigate("/");
    //     }
    // }, []);

    // function for validate the input values
    const handleValidation = () => {
        const { userName, password } = values
        if(userName == '' || password == ''){
            toast.error('username and Password is required!', toastOptions)
            return false
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
                password : values.password                
            }
            const { data } = await axios.post(loginRoute, newUser)
            if(data.status === false){
                toast.error(data.msg, toastOptions)
            }else if(data.status === true){
                console.log(data)
                localStorage.setItem(
                    'chat-app-user',
                    JSON.stringify(data.checkUserName)
                );
                navigate('/')
            }
        }
        setValues({
            userName : '',
            password : '',
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
                        type="password" 
                        placeholder='Password' 
                        name="password" id="" 
                        value={values.password}
                        onChange={(e) => setValues({
                            ...values,
                            password : e.target.value
                        })}
                    />
                    <button type='submit'>Log In</button>
                    <span>Don't have an account ?<Link to={'/register'}>Create One.</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

export default Register