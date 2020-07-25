import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_USER } from '../../mutation/mutation';
import { cookieParser } from '../../helpers';

interface SettingsProps {
    userId: number
}

export default function Settings(props) {
    const [removeAccount] = useMutation(REMOVE_USER)

    const clearCookies = (keyName = null) => {
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() - 1);

        if (keyName) {
            document.cookie = `${keyName}=; expires=${expireDate.toUTCString()};Path=/;`;
        } else {
            const cookies = document.cookie.split(';');

            cookies.forEach((value) => {
                document.cookie = value.replace(/^ +/, '').replace(/=.*/, '=;expires=' + expireDate.toUTCString());
            });
        }
    };

    const deleteMe = (e) => {
        e.preventDefault();
        const checkit = confirm("Are you sure you want to delete your account?")

        if (checkit == true) {
            removeAccount({ variables: { id: props.userId } }).then((e) => {
                clearCookies('token');
                clearCookies('userID');
                location.replace('/')
            })
        }

    }

    return (
        <Fragment>
            <button id="deleteAccount" onClick={deleteMe}>Delete Account</button>
        </Fragment>
    )
}