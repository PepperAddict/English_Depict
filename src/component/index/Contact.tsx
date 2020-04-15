import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responsePathAsArray } from 'graphql';

export default function Contact() {
    const [msg, setMsg] = useState(null)
    const [percent, setUploadPercentage] = useState('0');
    const [contact, setContact] = useState({
        name: null,
        email: null,
        reason: null,
        message: null
    })

    const contactMe = e => {

        e.preventDefault();

        axios.post('/contact', {
            name: contact.name,
            email: contact.email,
            reason: contact.reason,
            message: contact.message
        }, {
            headers: {
                'accept': 'application/json'
            },
            onUploadProgress: progressEvent => {
                setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                // clear percentage
                setTimeout(() => setUploadPercentage(0), 10000)
              }
        })
    }

    useEffect(() => {
        if (percent === 100) {
            setContact(null)
            setMsg('Message sent! Thank you')
        }
    }, [percent])

    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }
    return (
        <div>
            {msg}
            <form onSubmit={contactMe}>
                <label>
                    <p>name</p>
                    <input name="name" onChange={onChange} />
                </label>
                <label>
                    <p>email</p>
                    <input name="email" onChange={onChange} />
                </label>
                <label>
                    <p>reason</p>
                    <input name="reason" onChange={onChange} />
                </label>
                <label>
                    <p>Message</p>
                    <textarea name="message" onChange={onChange} />
                </label>
                <button type="submit">Send Email</button>
            </form>
        </div>
    )
}