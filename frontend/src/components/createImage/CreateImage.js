import { useState } from 'react';
import { apiURL } from "../../utils/apiURL"
import { useCookies } from 'react-cookie';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './CreateImage.scss';
import CircularProgress from '@mui/material/CircularProgress';

function CreateImage({ setMessage, setAlert, setSeverity }) {
    const URL = apiURL();
    const [cookies] = useCookies('token');
    const [loading, setLoading] = useState(false);
    const date = new Date();
    const currentDate = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
    const [image, setImage] = useState({
        title: "", ai: "DALL-E", instructions: "", prompt: "",
        date: currentDate, url: '', user_id: cookies.token ? cookies.user.id : 0
    })
    const [imageFile, setImageFile] = useState('')

    const handleChange = (e) => {
        setImage({ ...image, [e.target.id]: e.target.value });
    };

    const submitToGallery = (e) => {
        e.preventDefault();
        if (!image.user_id) {
            //show error toast message
            setMessage('You need an account to submit an image')
            setAlert(true);
            setSeverity('error');
            return;
        }
        //if no title, show error toast message
        if(!image.title){
            setMessage('Please enter a title for your image')
            setAlert(true);
            setSeverity('error');
            return;
        }
        console.log('submitting image to backend')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image)
        }
        fetch(`${URL}/images`, requestOptions).then(res => res.json()).then(data => {
            //image posted to backend
            //show success toast message
            setAlert(true);
            setMessage('Image sumbitted to gallery!');
            setSeverity('success');
            data.error ? console.log('error: ', data.message) : console.log('data: ', data)
        }).catch(err => {
            //image failed to post to backend
            //show error toast message
            setMessage('Image failed to upload. Please try again.')
            setAlert(true);
            setSeverity('error');
            console.log('error in submitToGallery in CreateImage')

        })
    }

    const generateImage = (e) => {
        e.preventDefault();
        setLoading(true);
        let { prompt, ai } = image;
        let aiCompany = ai === 'DALL-E' ? 'openai' : 'stability'

        const reqOptions = {
            method: 'POST',
            body: JSON.stringify({ prompt }),
            headers: { 'Content-Type': 'application/json', }
        }
        fetch(`${URL}/${aiCompany}`, reqOptions)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                console.log('blob: ', blob)

                //get secure url from backend
                fetch(`${URL}/s3url`, {}
                ).then(res => res.json()).then(data => {
                    console.log('url taken from s3 ')

                    //post image directly to s3 bucket by saving blob to s3
                    fetch(data.url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        body: blob
                    }).then(res => {
                        //post image to appear on frontend
                        let url = data.url.split('?')[0];
                        setImageFile(url)
                        setImage({ ...image, url: url })
                        console.log('res: ', res)
                    })
                })
                setLoading(false);
                console.log('past s3 block')

            }).catch(err => {
                console.log('catching error in generateImage in CreateImage')
                console.log('err: ', err)
            })
    }

    let infoLink = <> For higher quality images generated with {image.ai}, visit
        {(image.ai === 'DALL-E') ? <a href="https://labs.openai.com/"> OpenAI.com</a> : <a href="https://beta.dreamstudio.ai/"> DreamStudio.ai</a>}</>

    return (
        <form className='createImageForm' onSubmit={generateImage} >

            <h1 className='createImageForm__header'> Generate an image using AI</h1>

            <div className='createImageForm__details'>
                <select id='ai' onChange={handleChange} required defaultValue={0}>
                    <option value=""> Select AI</option>
                    <option value="DALL-E">DALL-E</option>
                    <option value="Stable Diffusion">Stable Diffusion</option>
                </select>
                <textarea id='prompt' placeholder='Enter a detailed description of an image to generate' value={image.prompt} onChange={handleChange} maxLength="90" required />
                {imageFile && <input id='title' placeholder='choose a title for this image' value={image.title} onChange={handleChange} maxLength="30" required />}
                {imageFile && <div id='info' className='info'><InfoOutlinedIcon /> {infoLink}</div>}
            </div>

            <div className='createImageForm__image'>
                {loading ? <CircularProgress className='createImageForm__loading' thickness={7} size={'5rem'} /> : <> </>}
                {imageFile && <img src={imageFile} id='generated_image' alt="generated by DALLE" />}
            </div>



            {!imageFile ? <button className='createImageForm__generate createImageForm__button' type='submit'>{imageFile ? 'Generate again?' : 'Generate'}</button>
                : <button className='createImageForm__submit createImageForm__button' onClick={submitToGallery}>Submit to Gallery</button>}



        </form>
    );
}

export default CreateImage;