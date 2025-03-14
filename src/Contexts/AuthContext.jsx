import { createContext } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    isAdmin: false,
    setIsAuthenticated: () => {},
    setToken: () => {},
    token: null,
    clientId: null,
    login: () => {},
    logout: () => {},
});

export default AuthContext;
