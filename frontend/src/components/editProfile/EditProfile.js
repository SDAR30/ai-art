import React, { useState, useEffect } from 'react';
import { apiURL } from "../../utils/apiURL";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Notification from '../notifcation/Notification';
import './EditProfile.scss';

function EditProfile(props) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const URL = apiURL();
    let navigate = useNavigate();
    const [cookies] = useCookies('token');
    const user = cookies.token ? cookies.user : null;
    const defaultProfileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png";
    const [imageFile, setImageFile] = useState(user?.pic ? user?.pic : defaultProfileImage);

    const handleChange = (e) => {
        if (e.target.id === 'currentPassword') {
            setCurrentPassword(e.target.value);
        } else if (e.target.id === 'newPassword') {
            setNewPassword(e.target.value);
        }
    }


    useEffect(() => {
        //if not logged in, redirect to main page
        if (!user) {
            navigate('/');
            return;
        }


    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newPassword.length > 0 && newPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            return;
        }
        //send request to backend for password change and new image
        fetch(`${URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                pic: imageFile
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                setErrorMessage(data.message);
                return;
            } else {
                //window.location.reload(); //refresh page
                // success 
                //navigate to profile page
                setAlert(true);
                //navigate(`/`);
            }
        })
        
        setCurrentPassword('');
        setNewPassword('');
        setErrorMessage('');
    }


    const addPhoto = async event => {
        const file = event.target.files[0]
    
        //hide input button
        //document.querySelector('.newImageForm__input').style.setProperty("display", "none");
    
        //get secure url from backend
        fetch(`${URL}/s3url`, {}
        ).then(res => res.json()).then(data => {
          console.log('url taken from s3: ', data.url)
    
          //post image directly to s3 bucket
          fetch(data.url, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: file
          }).then(res => {
            //post image to appear on frontend
            let url = data.url.split('?')[0];
            setImageFile(url)
            console.log('res: ', res)
          })
    
        })
      }

    return (<>
    <Notification alert={alert} message={'changes saved successfully'}  severity={'success'}  setAlert={setAlert}  />
        <form onSubmit={handleSubmit} className='editForm' >
            <h1 className='editForm__header'>Edit Profile</h1>
            <div className='editForm__details'>
                <input id='username' placeholder='username' value={'Username: ' + user?.username} maxLength="30" readOnly />
                <input id='email' placeholder='email' value={'Email: ' + user?.email} maxLength="30" readOnly />
                <label id='info' className='info'>Update your password</label>
                <input id='currentPassword' type='password' placeholder='Current Password' value={currentPassword} onChange={handleChange} maxLength="20" />
                <input id='newPassword' type='password' placeholder='New Password' value={newPassword} onChange={handleChange} maxLength="20"  />
                <label id='error' className='info'>{errorMessage}</label>

            </div>
            <div className='editForm__image'>
                <button >Upload new image</button>
                <input className='editForm__input' onChange={addPhoto} type="file" accept="image/*" ></input>
                {imageFile ? <img src={imageFile} alt="" /> : null}
            </div>
            <button className='editForm__submit' type='submit'>save changes</button>
        </form>
        </>);
}

export default EditProfile;