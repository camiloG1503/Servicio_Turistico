import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import api from "../../api/api";


const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await api.post("/usuarios/login", { 
            email, 
            password 
        });

        const data = response.data;

        // Asumiendo que el backend devuelve un token en la respuesta
        const token = data.token || data.accessToken || data.access_token;

        login(data.usuario, token);
        navigate("/");
    } catch (err) {
        console.error("Error de login:", err);
        setError(err.response?.data?.error || "Error al iniciar sesión");
    }
    };

    return (
    <AuthForm title="Iniciar Sesión" onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
        <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
        />
        </div>
    </AuthForm>
    );
};

export default LoginForm;
