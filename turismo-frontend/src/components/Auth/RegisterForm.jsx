import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import PasswordInput from "./PasswordInput";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/usuarios/register", {
        nombre: formData.name,
        email: formData.email,
        password: formData.password,
        rol: "turista",
      });

      const data = response.data;

      // Verificar si el backend devuelve un token y usuario
      const token = data.token || data.accessToken || data.access_token;

      if (token && data.usuario) {
        // Si hay token y usuario, iniciar sesión directamente
        login(data.usuario, token);
        setSuccess("Usuario registrado exitosamente. Redirigiendo al inicio...");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        // Si no hay token o usuario, redirigir al login
        setSuccess("Usuario registrado exitosamente. Redirigiendo al inicio de sesión...");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Error de registro:", err);
      setError(err.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <AuthForm title="Registrarse" onSubmit={handleRegister}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre completo"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo electrónico"
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <PasswordInput
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Contraseña"
        />
      </div>
    </AuthForm>
  );
};

export default RegisterForm;
