import { useContext, useState } from 'react';
import { apiURL } from "../../utils/apiURL"
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateAccountForm.scss'
import UserContext from '../../UserContext';
import { useCookies } from "react-cookie";

function CreateAccountForm({ setOpenLoginModal, setLoginMessage }) {
    const URL = apiURL();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formMessage, setFormMessage] = useState('');
    const [, setCookie] = useCookies('token');
    const { setUser } = useContext(UserContext)

    const validateUsername = () => {
        if (username.length < 4) {
            setUsernameError(true)
        } else {
            setUsernameError(false)
        }
    }

    const validateEmail = () => {
        if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    const createUser = () => {
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json', }
        }

        fetch(`${URL}/users`, reqOptions).then(res => res.json())
            .then(data => {
                console.log('IN CreateUser fetch, data:', data)

                if (data.status === 'error') {
                    // rough way to do this
                    if (data.message.includes('users_username_key')) {
                        setFormMessage('Please choose another username. This one is already taken.');
                    } else if (data.message.includes('users_email_key')) {
                        setFormMessage('Please choose another email. This one is already taken.');
                    } else if (data.message.includes('Password must be')) {
                        setFormMessage(data.message);
                    }
                    throw data.message;
                }

                setLoginMessage('Your account has been created!')
                setUsername('')
                setEmail('')
                setPassword('')
                setOpenLoginModal(false)
                //document.cookie = 'accessToken=' + data.accessToken;
                //setLoggedIn(true)

                //useContext
                setCookie('token', data.accessToken, { path: '/' });
                setCookie('user', data.user, { path: '/' });
                setUser({
                    username: data.user.username,
                    email: data.user.email,
                    id: data.user.id,
                    token: data.accessToken
                })

            }).catch(err => {
                console.log('catching error in createUser in CreateAccountForm')
                console.log(err)
            })
    }

    return (
        <>
            <Typography className='loginModal__title' id="modal-modal-title" variant="h6" component="h2">
                Create an account       
            </Typography>
            <Typography className='loginModal__title' id="modal-modal-title" variant="caption" component="h2">
                Explore and create incredible images made by AI, and learn how they were generated.      
            </Typography>
            
            {formMessage &&
                <div className="form__errorText" style={{ "color": "red" }}>
                    {formMessage}
                </div>
            }

            <TextField className='loginModal__textfield' id="outlined-basic-username"
                label="Username" variant="outlined" required
                onChange={(e) => setUsername(e.target.value)} value={username}
                error={usernameError} helperText={usernameError && "username must be at least 4 characters long"}
                onBlur={validateUsername} />

            <TextField className='loginModal__textfield' id="outddddlined-basic-email"
                label="Email" variant="outlined" required
                onChange={(e) => setEmail(e.target.value)} value={email}
                error={emailError} helperText={emailError ? "Please enter a valid email" : ""}
                onBlur={validateEmail} />

            <TextField className='loginModal__textfield' id="outlined-basic-password"
                label="Password" type='password' variant="outlined" required
                onChange={(e) => setPassword(e.target.value)} value={password}
                error={passwordError} helperText={passwordError && "Password must be at least 6 characters"}
                onBlur={validatePassword} />

            <Button variant="contained" onClick={e => createUser(e)}>Create account</Button>
        </>
    );
}

export default CreateAccountForm;