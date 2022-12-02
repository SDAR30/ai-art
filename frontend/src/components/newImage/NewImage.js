import React, { useEffect } from 'react';
import './NewImage.scss'
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookieUtils';

function NewImage({ loggedIn }) {
    let navigate = useNavigate();

    useEffect(() => {
        const cookie = getCookie('accessToken');
        console.log('cookie: ', cookie)
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${cookie}` }
        }

        fetch('http://localhost:3333/images/authenticate', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log('date . error')
                    navigate('/');
                } else {
                    console.log('Youre logged in')
                }
            }).catch(error => {
                console.log('inside catch: ')
                console.log(error);
                navigate('/')
            })


    }, [navigate])

    return (
        <div>
            New Image
        </div>
    );
}

export default NewImage;