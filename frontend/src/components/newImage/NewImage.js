import React, { useContext, useEffect, useState } from 'react';
import './NewImage.scss'
import { apiURL } from "../../utils/apiURL"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import { useCookies } from 'react-cookie';

function NewImage() {
  const URL = apiURL();
  let navigate = useNavigate();
  const [cookies] = useCookies('token');
  const { user } = useContext(UserContext)
  const date = new Date();
  const currentDate = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
  const [imageFile, setImageFile] = useState('')
  const [image, setImage] = useState({
    title: "",
    ai: "",
    instructions: "",
    prompt: "",
    date: currentDate,
    url: '',
    user_id: cookies.token ? cookies.user.id : 0
  })

  const handleChange = (e) => {
    setImage({ ...image, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('user cookies: ', cookies.user)

    //post image to backend
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    }
    fetch(`${URL}/images`, requestOptions).then(res => res.json()).then(data => {
      //image posted to backend
      //show success toast message
      console.log('data: ', data)
      navigate('/')
    }).catch(err => {
      //image failed to post to backend
      //show error toast message
      console.log(err)

    })

  }

  useEffect(() => {//check if user is logged in or not
    if (user === null) {
      navigate('/');
    }
  }, [navigate, user]);

  const addPhoto = async event => {
    const file = event.target.files[0]

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
        setImage({ ...image, url: url })
        console.log('res: ', res)
      })
     
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='newImageform'>
        <input id='title' placeholder='enter title' value={image.title} onChange={handleChange} maxLength="50" required />
        <input id='ai' placeholder='AI' value={image.ai} onChange={handleChange} maxLength="50" required />
        <textarea id='instructions' placeholder='instructions' value={image.instructions} onChange={handleChange} maxLength="50" required />
        <textarea id='prompt' placeholder='prompt' value={image.prompt} onChange={handleChange} maxLength="50" required />
        <div>
          <input onChange={addPhoto} type="file" accept="image/*" required></input>
          <img src={imageFile ? imageFile : ''} alt="upoad to see"></img>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default NewImage;