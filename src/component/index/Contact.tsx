import React, {useState} from 'react';
import axios from 'axios';

export default function Contact() {

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
        }).then((res) => console.log(res))
    }

    const onChange = e => {
        setContact({...contact, [e.target.name]: e.target.value})
    }
    return (
        <div> hello 

            <form onSubmit={contactMe}>
                <label>
                    <p>name</p>
                    <input name="name" onChange={onChange}/>
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
                    <input name="message" onChange={onChange} type="textarea" />
                </label>
                <button type="submit">Send Email</button>
            </form>
        </div>
    )
}