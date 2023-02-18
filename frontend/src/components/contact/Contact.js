import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './Contact.scss'

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        //e.preventDefault();
        // Handle form submission
    };

    return (
        <div className='contact'>
            <h2 className='contact__header'>Contact Developer</h2>
            <form className='contact__form' onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    fullWidth
                />
                <TextField
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    multiline
                    fullWidth
                />
                <button type="submit" className='contact__submit'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Contact;
