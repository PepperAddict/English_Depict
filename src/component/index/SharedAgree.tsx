import React from 'react';
import { Link } from 'react-router-dom';
export default function Agree() {
    return (
        <p>
            By creating an account, you agree to our <Link to="/terms" target="_blank">Terms of Service</Link> and <Link target="_blank" to="/privacy">Privacy Policy</Link>.
        </p>
    )
}


