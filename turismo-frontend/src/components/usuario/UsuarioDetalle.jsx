"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const UsuarioDetalle = () => {
  const { id } = useParams()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rol: "",
  })
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`, config)
        setUsuario(response.data)
        setFormData({
          nombre: response.data.nombre || "",
          email: response.data.email || "",
          telefono: response.data.telefono || "",
          rol: response.data.rol || "turista",
        })
      } catch (error) {
        console.error("Error al cargar usuario:", error)
        setError(error.response?.data?.mensaje || "Error al cargar los detalles del usuario")
      } finally {
        setLoading(false)
      }
    }

    fetchUsuario()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.put(`http://localhost:5000/api/usuarios/${id}`, formData, config)

      // Actualizar el usuario en el estado
      setUsuario({
        ...usuario,
        ...formData,
      })

      setEditMode(false)
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
      setError(error.response?.data?.mensaje || "Error al actualizar el usuario")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/usuarios/${id}`, config)
        navigate("/admin/usuarios")
      } catch (error) {
        console.error("Error al eliminar usuario:", error)
        setError(error.response?.data?.mensaje || "Error al eliminar el usuario")
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando detalles del usuario...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="bi bi-exclamation-circle me-2"></i>
        Usuario no encontrado
      </div>
    )
  }

  return (
    <div>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {usuario.nombre}
          </li>
        </ol>
      </nav>

      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">
            <i className="bi bi-person-circle me-2"></i>
            Detalles del Usuario
          </h3>
          <div>
            {!editMode ? (
              <button className="btn btn-light btn-sm" onClick={() => setEditMode(true)}>
                <i className="bi bi-pencil me-1"></i>
                Editar
              </button>
            ) : (
              <button className="btn btn-light btn-sm" onClick={() => setEditMode(false)}>
                <i className="bi bi-x-circle me-1"></i>
                Cancelar
              </button>
            )}
          </div>
        </div>
        <div className="card-body">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="rol" className="form-label">
                    Rol
                  </label>
                  <select
                    className="form-select"
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                  >
                    <option value="admin">Administrador</option>
                    <option value="guia">Guía</option>
                    <option value="turista">Turista</option>
                  </select>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Guardar Cambios
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="row">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img
                  src={usuario.foto || "https://via.placeholder.com/200?text=Usuario"}
                  alt={usuario.nombre}
                  className="img-fluid rounded-circle mb-3"
                  style={{ maxWidth: "200px" }}
                />
                <div className="badge bg-primary p-2 mb-2">
                  {usuario.rol === "admin" ? "Administrador" : usuario.rol === "guia" ? "Guía Turístico" : "Turista"}
                </div>
                {usuario._id === currentUser._id && <div className="badge bg-info p-2">Este eres tú</div>}
              </div>
              <div className="col-md-8">
                <h4>{usuario.nombre}</h4>
                <p className="text-muted">
                  <i className="bi bi-envelope me-2"></i>
                  {usuario.email}
                </p>
                <p className="text-muted">
                  <i className="bi bi-telephone me-2"></i>
                  {usuario.telefono || "No disponible"}
                </p>
                <p className="text-muted">
                  <i className="bi bi-calendar me-2"></i>
                  Miembro desde: {new Date(usuario.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-4">
                  <h5>Estadísticas</h5>
                  <div className="row g-3 mt-2">
                    {usuario.rol === "turista" && (
                      <>
                        <div className="col-6 col-md-4">
                          <div className="card bg-light">
                            <div className="card-body text-center">
                              <h6 className="card-title">Reservas</h6>
                              <p className="card-text fs-4">{usuario.reservas?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-4">
                          <div className="card bg-light">
                            <div className="card-body text-center">
                              <h6 className="card-title">Reseñas</h6>
                              <p className="card-text fs-4">{usuario.resenas?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {usuario.rol === "guia" && (
                      <div className="col-6 col-md-4">
                        <div className="card bg-light">
                          <div className="card-body text-center">
                            <h6 className="card-title">Tours Guiados</h6>
                            <p className="card-text fs-4">{usuario.toursGuiados?.length || 0}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!editMode && usuario._id !== currentUser._id && (
            <div className="border-top pt-4 mt-4">
              <h5>Acciones</h5>
              <button className="btn btn-outline-danger mt-2" onClick={handleDeleteUser}>
                <i className="bi bi-trash me-2"></i>
                Eliminar Usuario
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UsuarioDetalle
