import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        const email = localStorage.getItem('userEmail');
        const role = localStorage.getItem('userRole');

        if ( email && role) {
            setIsLoggedIn(true);
            // setUser(JSON.parse(storedUser));
            setUserEmail(email);
            setUserRole(role);
        }
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUserEmail(userData.email);
        setUserRole(userData.role); // Make sure your backend returns this

        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userRole', userData.role);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserEmail(null);
        setUserRole(null);

        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);