import React from 'react';

export default function LoginWith(props) {
    return (
        <div className="login-with">
            <h3>Sign in with</h3>
            <a id="LoginWithAmazon" onClick={e => props.gohere(e)}>
                <img border="0" alt="Login with Amazon"
                    src="http://g-ecx.images-amazon.com/images/G/01/lwa/btnLWA_gold_32x32._CB372226927_.png"
                    width="32" height="32" />
                Amazon
        </a>
        </div>
    )
}