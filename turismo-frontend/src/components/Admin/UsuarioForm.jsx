import { useState, useEffect } from "react";

const UsuarioForm = ({ initialData, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "turista",
    contraseña: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, contraseña: "" });
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
    const method = initialData ? "PUT" : "POST";
    const endpoint = initialData
      ? `http://localhost:5000/api/usuarios/${initialData.id_usuario}`
      : "http://localhost:5000/api/usuarios";

    const payload = { ...form };

    const rolesValidos = ["turista", "admin", "guia"];
    if (!rolesValidos.includes(payload.rol)) {
      alert("Rol no válido");
      return;
    }

    if (initialData && !payload.contraseña?.trim()) {
      delete payload.contraseña;
    } else if (!payload.contraseña?.trim()) {
      alert("La contraseña es obligatoria");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const message = initialData
          ? "Usuario actualizado exitosamente"
          : "Usuario creado exitosamente";
        alert(message);
        setForm({ nombre: "", email: "", contraseña: "", rol: "turista" });
        onSuccess();
      } else {
        const error = await res.json();
        alert("Error al guardar usuario: " + (error.error || "desconocido"));
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      alert("Error en la conexión con el servidor");
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
            name="contraseña"
            type={showPassword ? "text" : "password"}
            value={form.contraseña}
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