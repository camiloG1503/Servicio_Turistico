import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./RegistroForm.css";

const RegistroForm = () => {
    const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    confirmar: "",
    });

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    const togglePassword = () => setMostrarPassword(!mostrarPassword);
    const toggleConfirmar = () => setMostrarConfirmar(!mostrarConfirmar);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.contraseña !== formulario.confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }
    console.log("Registro exitoso:", formulario);
    };

    return (
    <div className="registro-form-container d-flex justify-content-center align-items-center">
        <div className="registro-form p-4 shadow rounded bg-white">
        <h4 className="mb-4 text-center">Crear cuenta</h4>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                value={formulario.correo}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3 position-relative">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <input
                type={mostrarPassword ? "text" : "password"}
                className="form-control"
                id="contraseña"
                name="contraseña"
                value={formulario.contraseña}
                onChange={handleChange}
                required
            />
            <i
                className={`bi ${mostrarPassword ? "bi-eye-slash" : "bi-eye"} toggle-icon`}
                onClick={togglePassword}
            ></i>
            </div>
            <div className="mb-3 position-relative">
            <label htmlFor="confirmar" className="form-label">Confirmar contraseña</label>
            <input
                type={mostrarConfirmar ? "text" : "password"}
                className="form-control"
                id="confirmar"
                name="confirmar"
                value={formulario.confirmar}
                onChange={handleChange}
                required
            />
            <i
                className={`bi ${mostrarConfirmar ? "bi-eye-slash" : "bi-eye"} toggle-icon`}
                onClick={toggleConfirmar}
            ></i>
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
        </div>
    </div>
    );
};

export default RegistroForm;