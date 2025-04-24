import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../Auth/PasswordInput";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const ProfileForm = () => {
  const { usuario, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        password: "",
        confirmPassword: ""
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!form.nombre.trim()) {
      setIsLoading(false);
      return setError("El nombre es requerido");
    }

    if (!form.email.trim()) {
      setIsLoading(false);
      return setError("El email es requerido");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setIsLoading(false);
      return setError("Por favor ingresa un email válido");
    }

    if (form.password && form.password.length < 8) {
      setIsLoading(false);
      return setError("La contraseña debe tener al menos 8 caracteres");
    }

    if (form.password && form.password !== form.confirmPassword) {
      setIsLoading(false);
      return setError("Las contraseñas no coinciden");
    }

    if (form.email !== usuario.email) {
      if (!window.confirm("¿Estás seguro de cambiar tu email? Serás desconectado después de este cambio.")) {
        setIsLoading(false);
        return;
      }
    }

    try {
      const payload = {
        nombre: form.nombre.trim(),
        email: form.email.trim()
      };

      if (form.password) {
        payload.password = form.password;
      }

      const response = await fetch(`http://localhost:5000/api/usuarios/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al actualizar el perfil");
      }

      updateUser(data.usuario);
      setSuccess("Perfil actualizado correctamente");
      setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
      
      if (form.email !== usuario.email) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadgeClass = () => {
    switch(usuario?.rol) {
      case 'admin': return 'badge bg-danger';
      case 'guia': return 'badge bg-primary';
      default: return 'badge bg-success';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-banner mb-4">
        <div className="banner-content">
          <h2>
            <i className="bi bi-person-gear me-2"></i>
            Configuración de Perfil
          </h2>
          <p className="mb-0">Administra tu información personal y preferencias</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card profile-card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="profile-avatar-container mb-3">
                <img 
                  src="/img/default-avatar.jpg" 
                  alt="Avatar" 
                  className="profile-avatar img-fluid rounded-circle"
                />
              </div>
              <h4 className="mb-1">{usuario?.nombre}</h4>
              <span className={getRoleBadgeClass()}>
                {usuario?.rol === 'guia' ? 'Guía turístico' : 
                 usuario?.rol === 'admin' ? 'Administrador' : 'Turista'}
              </span>
              
              <div className="mt-3">
                <p className="text-muted mb-1">
                  <i className="bi bi-envelope-fill me-2"></i>
                  {usuario?.email}
                </p>
                <p className="text-muted mb-1">
                  <i className="bi bi-person-badge-fill me-2"></i>
                  ID: {usuario?.id_usuario}
                </p>
                <p className="text-muted">
                  <i className="bi bi-calendar-check-fill me-2"></i>
                  Miembro desde {new Date(usuario?.fecha_registro).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Editar Perfil</h3>
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setError("")}
                  ></button>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success alert-dismissible fade show">
                  {success}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSuccess("")}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-person-fill me-2"></i>
                    Nombre completo
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-envelope-fill me-2"></i>
                    Correo electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-lock-fill me-2"></i>
                    Nueva contraseña (opcional)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-key"></i>
                    </span>
                    <PasswordInput
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Dejar en blanco para no cambiar"
                    />
                  </div>
                  <div className="form-text">
                    La contraseña debe tener al menos 8 caracteres
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-lock-fill me-2"></i>
                    Confirmar nueva contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-key-fill"></i>
                    </span>
                    <PasswordInput
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmar nueva contraseña"
                    />
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save-fill me-2"></i>
                        Guardar cambios
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
