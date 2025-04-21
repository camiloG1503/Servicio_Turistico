import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa esto
import AuthForm from "./AuthForm";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  const navigate = useNavigate(); // 👈 Instancia el hook de navegación

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          contraseña: formData.password,
          rol: "turista", // ✅ forzamos rol turista
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error desconocido");

      setSuccess("Usuario registrado exitosamente. Redirigiendo al inicio de sesión...");

      setTimeout(() => {
        navigate("/login"); // ✅ Redirige al formulario de login después de éxito
      }, 1500);

      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
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