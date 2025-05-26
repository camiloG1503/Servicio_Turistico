import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userStored = localStorage.getItem("usuario");
        const tokenStored = localStorage.getItem("token");

        if (userStored) setUsuario(JSON.parse(userStored));
        if (tokenStored) setToken(tokenStored);
    }, []);

    const login = (userData, authToken) => {
        setUsuario(userData);
        localStorage.setItem("usuario", JSON.stringify(userData));

        if (authToken) {
            setToken(authToken);
            localStorage.setItem("token", authToken);
        }
    };

    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
