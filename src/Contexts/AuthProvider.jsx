import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import ClientService from '../Services/ClientService';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = window.localStorage.getItem('authToken');
            
        if (storedToken && ClientService.isAuthenticated()) {
            try {
                const decodedToken = jwtDecode(storedToken);
    
                setClientId(decodedToken.client_id || decodedToken.id);
                setIsAuthenticated(true);
                setToken(storedToken);
                setIsAdmin(ClientService.isAdmin());
            } catch (error) {
                console.error('Erreur lors du décodage du token :', error);
                setIsAuthenticated(false);
                setClientId(null);
                setToken(null);
                setIsAdmin(false);
            }
        } else {
            setIsAuthenticated(false);
            setClientId(null);
            setToken(null);
            setIsAdmin(false);
        }
    }, []);
    

    const login = (newToken) => {
        window.localStorage.setItem('authToken', newToken);
        ClientService.setAxiosToken(newToken);
        try {
            const decodedToken = jwtDecode(newToken);
            setClientId(decodedToken.client_id || decodedToken.id);
            setIsAuthenticated(true);
            setToken(newToken);
            setIsAdmin(ClientService.isAdmin());
        } catch (error) {
            console.error('Erreur lors du décodage du token :', error);
            setIsAuthenticated(false);
            setClientId(null);
            setToken(null);
            setIsAdmin(false);
        }
    };

    const logout = () => {
        if (clientId) {
            window.localStorage.removeItem(`favoris_${clientId}`);
        }
        window.localStorage.removeItem('authToken');
        ClientService.logout();
        setIsAuthenticated(false);
        setClientId(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, clientId, token, login, logout, setIsAuthenticated, setToken, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
