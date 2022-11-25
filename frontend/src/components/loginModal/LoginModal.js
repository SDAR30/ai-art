import React, { useState } from 'react';
import './LoginModal.scss'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function LoginModal({ openLoginModal, setOpenLoginModal, setLoggedIn }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const handleClose = () => {
        setOpenLoginModal(false)
    }

    const createUser = () => {
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json', }
        }

        fetch('http://localhost:3333/users', reqOptions).then(res => res.json())
            .then(data => {
                setName('')
                setEmail('')
                setPassword('')
                setOpenLoginModal(false)
                localStorage.setItem('accessToken', data.accessToken);
                setLoggedIn(true)
                //show toast that user was created.
            }).catch(err => {
                console.log(err)
                //handle err
            })
    }

    const validateName = () => {
        if (name.length < 4) {
            setNameError(true)
        } else {
            setNameError(false)
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    //https://mui.com/system/getting-started/the-sx-prop/

    return (
        <Modal
            className='loginModal'
            open={openLoginModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack
                component="form"
                sx={style}
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <Typography className='loginModal__title' id="modal-modal-title" variant="h6" component="h2">
                    Create an account:
                </Typography>

                <TextField className='loginModal__textfield' id="outlined-basic-username"
                    label="Username" variant="outlined" required
                    onChange={(e) => setName(e.target.value)} value={name}
                    error={nameError} helperText={nameError && "username must be at least 4 characters long"}
                    onBlur={validateName} />

                <TextField className='loginModal__textfield' id="outlined-basic-email"
                    label="Email" variant="outlined" required
                    onChange={(e) => setEmail(e.target.value)} value={email}
                    error={emailError} helperText={emailError ? "Please enter a valid email" : ""}
                    onBlur={validateEmail} />

                <TextField className='loginModal__textfield' id="outlined-basic-password"
                    label="Password" type='password' variant="outlined" required
                    onChange={(e) => setPassword(e.target.value)} value={password} 
                    error={passwordError} helperText={passwordError && "Password must be at least 6 characters"}
                    onBlur={validatePassword}/>

                <Button variant="contained" onClick={e => createUser(e)}>Create account</Button>
            </Stack>

        </Modal>
    );
}

export default LoginModal;