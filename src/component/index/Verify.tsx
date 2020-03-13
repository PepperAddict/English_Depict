import React, { useState, useEffect, Fragment } from 'react';
import { decryptMe } from '../../helpers';
import { SET_VERIFIED } from '../../mutation/mutation';
import { useMutation } from '@apollo/react-hooks';
import '../../styles/verify.styl'


export default function Verify() {
    const urlpath = window.location.search.split('=');
    const token = urlpath[1];
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);

    const [setVerified] = useMutation(SET_VERIFIED);
    const [finished, setFinished] = useState(false)

    useEffect(e => {
        let newEmail
        try {
            newEmail = (token) ? decryptMe(token) : null;
            if (newEmail) {
                setVerified({ variables: { email: newEmail } }).then((e) => {
                    console.log(e)
                    if (e.data.setVerified.verified === true) {
                        setFinished(true)
                    }
                })
            }

        } catch {
            newEmail = null;
            setError('Something went wrong. Please try again later.')
        }

    }, [])

    useEffect((e) => {
        if (finished) {
            setTimeout(() => {
                window.location.href = '/'
            }, 5000)
        }
    }, [finished])

    return (
        <div className="verify-page">
            {!finished ? <div>Please wait a moment while we verify your account</div> :
                <div> Thank you for verifying your account! This page will redirect to the homepage in 5 seconds or simply
        <br /><a href="/">click here to return to the homepage.</a>
                </div>}
            {error && <div>{error}</div>}
        </div>
    )
}