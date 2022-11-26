import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function LoginAccountForm({setOpenLoginModal, setLoggedIn}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

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

        fetch('http://localhost:3333/users/login', reqOptions)
        .then(response => response.json())
        .then(data => {

            console.log('login succesful')
            if(!data) console.log('no access token')

            setUsername('');
            setPassword('');
            setOpenLoginModal(false);
            
            // save token to local storage
            localStorage.setItem('accessToken', data.accessToken);
            setLoggedIn(true);
            
        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { my: 1, width: '30ch' }, }}
            noValidate
            autoComplete="off"
        >

            <Typography className='loginModal__title' id="modal-modal-title" variant="h6" component="h2">
                Log In:
            </Typography>

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
        </Box>
    );
}

export default LoginAccountForm;