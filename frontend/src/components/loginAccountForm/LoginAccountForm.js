import { useContext, useState } from 'react';
import { apiURL } from "../../utils/apiURL";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserContext from '../../UserContext';
import { useCookies } from "react-cookie";

function LoginAccountForm({setOpenLoginModal, setMessage, setAlert, setSeverity}) {
    const URL = apiURL();
    let navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formMessage, setFormMessage] = useState('');
    const [, setCookie] = useCookies('token');
    const {setUser} = useContext(UserContext);

    const validateUsername = () => {
        if (username.length < 4) {
            setUsernameError(true)
        } else {
            setUsernameError(false)
        }
    }

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    const loginUser = () => {
        const reqOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({username, password})
        }
        fetch(`${URL}/users/login`, reqOptions)
        .then(response => response.json())
        .then(data => {
            
            if(data.error){
                console.log('login NOT succesful')
                setFormMessage(data.message)
                throw data.message;
            } 

            console.log('login succesful')
            setMessage('You have logged in!')
            setAlert(true)
            setSeverity('success')
            setUsername('');
            setPassword('');
            setOpenLoginModal(false);

            
            setCookie('token', data.accessToken, { path: '/' });
            setCookie('user', data.user, { path: '/' });
            
            //useContext
            setUser({
                username: data.user.username,
                email: data.user.email,
                id: data.user.id,
                token: data.accessToken
            })

            navigate('/');
            
            // save token to cookie
            //document.cookie = 'accessToken=' + data.accessToken;
            //setLoggedIn(true);
            
        }).catch(error => {
            console.log('inside catch of loginAccountForm')
            console.log(error);
        })

    }

    return (
        <>
            <Typography className='loginModal__title' id="modal-modal-title" variant="h6" component="h2">
                Log In
            </Typography>
            <div className="form__errorText" style={{"color" : "red"}}>
                {formMessage}
            </div>

            <TextField className='loginModal__textfield' id="outlined-basic-username"
                label="Username" variant="outlined" required
                onChange={(e) => setUsername(e.target.value)} value={username}
                error={usernameError} helperText={usernameError && "username must be at least 4 characters long"}
                onBlur={validateUsername} />

            <TextField className='loginModal__textfield' id="outlined-basic-password"
                label="Password" type='password' variant="outlined" required
                onChange={(e) => setPassword(e.target.value)} value={password}
                error={passwordError} helperText={passwordError && "Password must be at least 6 characters"}
                onBlur={validatePassword} />

            <Button variant="contained" onClick={e => loginUser(e)}>Log in</Button>
        </>
    );
}

export default LoginAccountForm;