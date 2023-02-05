import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

function Notification({message, severity, loginAlert, setLoginAlert}) {

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setLoginAlert(false);
      };
    

    return (
        <Snackbar open={loginAlert} autoHideDuration={5000} onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }} >
            <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity} variant="filled"
              sx={{ width: '100%', position: 'relative', pr: 5}}> {message} 
                <CloseIcon fontSize='small' sx={{ position: 'absolute', top: 14, right: 8, cursor: 'pointer' }} 
                   onClick={() => setLoginAlert(false)} />
            </Alert>
          </Snackbar>
    );
}

export default Notification;