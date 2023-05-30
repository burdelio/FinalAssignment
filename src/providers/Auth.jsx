import { createContext, useState } from 'react';

const AuthContext = createContext(null);

const isLogged = () => {
    return sessionStorage.getItem('logged');
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLogged);

    const toggleLoggedIn = () => {
        setIsLoggedIn((prevLoggedIn) => {
            prevLoggedIn && sessionStorage.removeItem('logged');
            !prevLoggedIn && sessionStorage.setItem('logged', true);
            return !prevLoggedIn;
        });
    };

    const authContextValue = {
        isLoggedIn,
        toggleLoggedIn,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;