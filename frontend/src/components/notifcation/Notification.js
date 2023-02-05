import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Notification({message, severity, alert, setAlert}) {

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert(false);
      };
    

    return (
        <Snackbar open={alert} autoHideDuration={3000} onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }} > 
            <Alert icon={severity === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorOutlineIcon />} severity={severity} variant="filled"
              sx={{ width: '100%', position: 'relative', pr: 5}}> {message} 
                <CloseIcon fontSize='small' sx={{ position: 'absolute', top: 14, right: 8, cursor: 'pointer' }} 
                   onClick={() => setAlert(false)} />
            </Alert>
          </Snackbar>
    );
}

export default Notification;