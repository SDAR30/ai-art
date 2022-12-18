import React, { useContext, useEffect, useState } from 'react';
import './NewImage.scss'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import { useCookies } from 'react-cookie';

function NewImage() {
  let navigate = useNavigate();
  const [cookies] = useCookies('token');
  const { user } = useContext(UserContext)
  const date = new Date();
  const currentDate = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
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
    console.log(cookies.user)
    debugger

  }

  useEffect(() => {//check if user is logged in or not
    if (user === null) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div>
      <form onSubmit={handleSubmit} className='newImageform'>
        <input id='title' placeholder='enter title' value={image.title} onChange={handleChange} maxLength="50" required />
        <input id='ai' placeholder='AI' value={image.ai} onChange={handleChange} maxLength="50" required />
        <textarea id='instructions' placeholder='instructions' value={image.instructions} onChange={handleChange} maxLength="50" required />
        <textarea id='prompt' placeholder='prompt' value={image.prompt} onChange={handleChange} maxLength="50" required />
        <input id='url' placeholder='url' value={image.url} onChange={handleChange} maxLength="50" required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default NewImage;