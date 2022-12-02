import React, { useState } from 'react'
import './LoginModal.scss'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import LoginAccountForm from "../loginAccountForm/LoginAccountForm";
import CreateAccountForm from '../createAccountForm/CreateAccountForm';


function LoginModal({ openLoginModal, setOpenLoginModal, setLoggedIn, setLoginMessage }) {
    const [login, setLogin] = useState(true);

    const handleClose = () => {
        setOpenLoginModal(false);
    }

    return (
        <Modal
            className='loginModal'
            open={openLoginModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="loginModal__box"
                component="form"
                sx={{ '& .MuiTextField-root': { my: 1, width: '30ch' }, }}
                noValidate
                autoComplete="off"
            >
                {login ? <LoginAccountForm setOpenLoginModal={setOpenLoginModal} setLoggedIn={setLoggedIn} setLoginMessage={setLoginMessage}/> :
                    <CreateAccountForm setOpenLoginModal={setOpenLoginModal} setLoggedIn={setLoggedIn}  setLoginMessage={setLoginMessage}/>}
                <div onClick={() => setLogin(!login)}>{login ? "Don't have an Account? Sign up Instead" : "Already a member? Log in"}</div>
            </Box>
        </Modal>
    );
}

export default LoginModal;