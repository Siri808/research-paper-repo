import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { isLoggedIn, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && localStorage.getItem('userRole') === 'admin') {
            navigate('/admin/dashboard');
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if(email == "admin@gmail.com" && password == "admin123") {
            const userData = {
                    email: email,
                    role: 'admin'
                };
                console.log("s")
                login(userData); // Sets state and localStorage
                navigate('/admin/dashboard');
        }
        else{
            setError('Invalid email or password');
        }

       
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                    {error && <p style={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        outlineColor: '#667eea',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#667eea',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '8px',
    },
};

export default Login;
