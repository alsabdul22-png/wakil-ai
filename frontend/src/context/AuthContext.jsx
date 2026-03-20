import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount: check if there's a valid token in localStorage
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('/api/ai/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.warn('[Auth] Token invalid or expired, clearing.');
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        // Timeout safety: never block rendering more than 5s
        const timer = setTimeout(() => setLoading(false), 5000);
        checkUser().finally(() => clearTimeout(timer));
        return () => clearTimeout(timer);
    }, []);

    // LOGIN — returns user data; page handles navigation
    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data.user;
    };

    // SIGNUP — returns user data; page handles navigation
    const signup = async (name, email, password) => {
        const res = await axios.post('/api/auth/signup', { name, email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data.user;
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
