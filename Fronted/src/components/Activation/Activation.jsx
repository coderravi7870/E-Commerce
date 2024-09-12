import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';

const Activation = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activateAccount = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation`, { activation_token }, { withCredentials: true });
                    // console.log("Activation response:", res);
                    setSuccess(true);
                } catch (err) {
                    console.error("Activation error:", err.message);
                    setError(true);
                }
            };
            activateAccount();
        }
    }, [activation_token]);

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            {error ? (
                <p>Your token is expired or invalid.</p>
            ) : success ? (
                <p>Your account has been created successfully!</p>
            ) : (
                <p>Activating your account, please wait...</p>
            )}
        </div>
    );
};

export default Activation;
