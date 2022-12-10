import React, { useContext, useEffect } from 'react';
import './NewImage.scss'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';


function NewImage() {
    let navigate = useNavigate();
    const {user} = useContext(UserContext)

    useEffect(() => {//check if user is logged in or not
        if (user === null) {
          navigate('/');
        }
      }, [navigate, user]);

    // useEffect(() => {
    //     const cookie = getCookie('accessToken');
    //     console.log('cookie: ', cookie)
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Authorization': `Bearer ${cookie}` }
    //     }

    //     fetch('http://localhost:3333/images/authenticate', requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.error) {
    //                 console.log('date . error')
    //                 navigate('/');
    //             } else {
    //                 console.log('Youre logged in')
    //             }
    //         }).catch(error => {
    //             console.log('inside catch: ')
    //             console.log(error);
    //             navigate('/')
    //         })


    // }, [navigate])

    return (
        <div>
            New Image
        </div>
    );
}

export default NewImage;