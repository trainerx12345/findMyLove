import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
// import {useDispatch, useSelector} from 'react-redux'
// import { UserActionTypes }  from '../redux/ActionTypes.js'
const AuthModal = ({ setShowModal,  isSignUp }) => {
    const [_email, setEmail] = useState(null)
    const [_password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null)

   
    let navigate = useNavigate()

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (_password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }
            const  response = await axios.post(`http://127.0.0.1:8090/api/v1/auth/${isSignUp ? 'register' : 'login'}`, { email:_email, password:_password })

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success && isSignUp) navigate ('/onboarding')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()

        } catch (error) {
            if(error.code==="ERR_BAD_REQUEST")
            {
                setError('Incorrect Credentials.')
                return
            }
            console.log(error)
        }
    }
    
    const onChangeHandler = (e )=>
    {  
        
        switch(e.target.id){
            case 'email':setEmail(e.target.value) 
            break;
            case 'password':setPassword(e.target.value)
            break;
            case 'password-check':setConfirmPassword(e.target.value)
            break;
            default: return;
        }
        setError(null)
    

    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>

            <h2>{isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => onChangeHandler(e)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => onChangeHandler(e)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => onChangeHandler(e)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
        </div>
    )
}
export default AuthModal
