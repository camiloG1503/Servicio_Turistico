import { useState, useEffect } from "react";
import api from "../../api/api";

const UsuarioForm = ({ initialData, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "turista",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, password: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };

    const rolesValidos = ["turista", "admin", "guia"];
    if (!rolesValidos.includes(payload.rol)) {
      alert("Rol no válido");
      return;
    }

    if (initialData && !payload.password?.trim()) {
      delete payload.password;
    } else if (!payload.password?.trim()) {
      alert("La contraseña es obligatoria");
      return;
    }

    try {
      let response;

      if (initialData) {
        // Actualizar usuario existente
        response = await api.put(`/usuarios/${initialData.id_usuario}`, payload);
      } else {
        // Crear nuevo usuario
        response = await api.post('/usuarios/register', payload);
      }

      const message = initialData
        ? "Usuario actualizado exitosamente"
        : "Usuario creado exitosamente";

      alert(message);
      setForm({ nombre: "", email: "", password: "", rol: "turista" });
      onSuccess();
    } catch (error) {
      console.error("Error al guardar usuario:", error);

      // Mostrar mensaje de error más detallado
      const errorMessage = error.response?.data?.mensaje || 
                          error.response?.data?.error || 
                          error.message || 
                          "Error desconocido";

      alert("Error al guardar usuario: " + errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h5 className="card-title">
        <i className="bi bi-person-plus"></i>
        {initialData ? "Editar Usuario" : "Nuevo Usuario"}
      </h5>

      <div className="form-group input-icon">
        <i className="bi bi-person"></i>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="form-control"
          placeholder="Nombre completo"
          required
        />
      </div>

      <div className="form-group input-icon">
        <i className="bi bi-envelope"></i>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Correo electrónico"
          required
        />
      </div>

      <div className="form-group">
        <div className="input-icon">
          <i className="bi bi-lock"></i>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Contraseña"
            required={!initialData}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
      </div>

      <div className="form-group input-icon">
        <i className="bi bi-person-badge"></i>
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="turista">Turista</option>
          <option value="admin">Administrador</option>
          <option value="guia">Guía turístico</option>
        </select>
      </div>

      <button className="btn btn-primary" type="submit">
        <i className={initialData ? "bi bi-arrow-repeat" : "bi bi-save"}></i>
        {initialData ? "Actualizar Usuario" : "Crear Usuario"}
      </button>
    </form>
  );
};

export default UsuarioForm;
