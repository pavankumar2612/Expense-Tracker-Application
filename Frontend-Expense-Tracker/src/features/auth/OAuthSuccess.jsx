import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const { loginWithToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            loginWithToken(token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [searchParams, loginWithToken, navigate]);

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">Authenticating...</h2>
                <p className="text-gray-500">Please wait while we log you in.</p>
            </div>
        </div>
    );
};

export default OAuthSuccess;
