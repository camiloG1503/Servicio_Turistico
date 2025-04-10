import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ onClose }) => {
    const formRef = useRef();

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
    <div ref={formRef} className="login-form">
        <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Iniciar Sesión</h6>
        <button onClick={onClose} className="btn-close btn-sm"></button>
        </div>
        <form>
        <button type="submit" className="btn btn-primary btn-sm w-100">Iniciar sesión</button>
        <div className="mt-2 text-center">
            <Link to="/registro" onClick={onClose}>¿No tienes cuenta? Regístrate</Link>
        </div>
        </form>
    </div>
    );
};

export default LoginForm;