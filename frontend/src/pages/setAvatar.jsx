import { useEffect, useState } from 'react'
import { Container } from './style'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import loader from '../images/loader.gif'
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer';

const toastOptions = {
    position: "bottom-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

function SetAvatar() {
    const apiUrl = "https://api.multiavatar.com/4645646"
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    }, [])

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error('Please select an avatar!!', toastOptions)
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image : avatars[selectedAvatar]
            })
            if(data.isSet){
                user.isAvatarImage = true,
                user.avatarImage = data.image,
                localStorage.setItem('chat-app-user', JSON.stringify(user))
                navigate('/')
            }else{
                toast.error('Error setting avatar. PLease try again!!', toastOptions)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const response = await axios.get(`${apiUrl}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer(response.data);
                    data.push(buffer.toString('base64'));
                }
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des données :", error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [])

    return (
        <>
            {
                isLoading ? 
                <Container>
                    <img src={loader} className='loader' alt="" />
                </Container>
                :
                
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {
                            avatars.map((avatar, index) => (
                                <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} key={index}>
                                    <img
                                        src={`data:image/svg+xml;base64, ${avatar}`} 
                                        alt="avatar" 
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                </Container>
            }
            <ToastContainer/>
        </>
    )
}

export default SetAvatar