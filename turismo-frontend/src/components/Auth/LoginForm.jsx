import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";


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
        const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        login(data.usuario);
        navigate("/");
    } catch (err) {
        setError(err.message);
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