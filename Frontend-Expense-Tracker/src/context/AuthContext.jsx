import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, register as registerService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (storedToken && storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from local storage", error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginService(email, password);
            localStorage.setItem('token', data.token);
            // Since backend login response currently only returns token, we might not have user details immediately.
            // For now, let's assume we can derive user info or separate call needed. 
            // But typically, we might want to decode the token or fetch user profile. 
            // For this implementation, I will store a minimal user object or fetch it if needed.
            // Wait, the backend doesn't return user details on login, just token.
            // So detailed user info might be missing. I'll store the email for now.
            const userData = { email };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await registerService(name, email, password);
            localStorage.setItem('token', data.token);
            const userData = { name, email };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const loginWithToken = (token) => {
        localStorage.setItem('token', token);
        // We might not have user details immediately, but we can set a basic state
        // or fetch user profile if an endpoint exists. 
        // For now, we'll assume the token is valid and set a placeholder user
        // The App will behave as authenticated.
        const userData = { email: 'google-user@example.com' }; // Placeholder until we can fetch real profile
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, loginWithToken, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
