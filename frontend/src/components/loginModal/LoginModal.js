import React from 'react'
import './LoginModal.scss'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import LoginAccountForm from "../loginAccountForm/LoginAccountForm";
import CreateAccountForm from '../createAccountForm/CreateAccountForm';


function LoginModal({ openLoginModal, setOpenLoginModal, setLoginMessage, isLoggedIn, setIsLoggedIn }) {
    //const [login, setLogin] = useState(true);

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
                {!isLoggedIn ? <LoginAccountForm setOpenLoginModal={setOpenLoginModal} setLoginMessage={setLoginMessage} /> :
                    <CreateAccountForm setOpenLoginModal={setOpenLoginModal} setLoginMessage={setLoginMessage} />}
                <div>{!isLoggedIn ?
                    <p className='loginModal__para'>Don't have an Account? <span onClick={() => setIsLoggedIn(!isLoggedIn)}>Sign up here</span></p> :
                    <p className='loginModal__para'>Already a member? <span  onClick={() => setIsLoggedIn(!isLoggedIn)}>Log in here</span></p>}
                </div>
            </Box>
        </Modal>
    );
}

export default LoginModal;