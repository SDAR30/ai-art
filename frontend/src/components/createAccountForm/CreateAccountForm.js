import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateAccountForm.scss'

function CreateAccountForm({ setOpenLoginModal, setLoggedIn }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

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

        fetch('http://localhost:3333/users', reqOptions).then(res => res.json())
            .then(data => {
                console.log('IN CreateUser fetch, data:', data)
                setUsername('')
                setEmail('')
                setPassword('')
                setOpenLoginModal(false)
                localStorage.setItem('accessToken', data.accessToken);
                setLoggedIn(true)
            }).catch(err => {
                console.log('catching error in createUser in CreateAccountForm')
                console.log(err)
            })
    }

    return (
        <div>
            <Typography className='loginModal__title' id="modal-modal-title" variant="h6" component="h2">
                Create an account:
            </Typography>

            <TextField className='loginModal__textfield' id="outlined-basic-username"
                label="Username" variant="outlined" required
                onChange={(e) => setUsername(e.target.value)} value={username}
                error={usernameError} helperText={usernameError && "username must be at least 4 characters long"}
                onBlur={validateUsername} />

            <TextField className='loginModal__textfield' id="outlined-basic-email"
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
        </div>
    );
}

export default CreateAccountForm;