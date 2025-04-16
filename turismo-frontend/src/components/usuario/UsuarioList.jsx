"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("todos")
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get("http://localhost:5000/api/usuarios/", config)
        setUsuarios(response.data)
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
        setError(error.response?.data?.mensaje || "Error al cargar la lista de usuarios")
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/usuarios/${userId}`, config)
        // Actualizar la lista de usuarios después de eliminar
        setUsuarios(usuarios.filter((user) => user._id !== userId))
      } catch (error) {
        console.error("Error al eliminar usuario:", error)
        setError(error.response?.data?.mensaje || "Error al eliminar el usuario")
      }
    }
  }

  // Filtrar usuarios según búsqueda y rol
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === "todos" || usuario.rol === filterRole

    return matchesSearch && matchesRole
  })

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando usuarios...</p>
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

  return (
    <div>
      <h2 className="mb-4">
        <i className="bi bi-people me-2"></i>
        Gestión de Usuarios
      </h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="todos">Todos los roles</option>
                <option value="admin">Administradores</option>
                <option value="guia">Guías</option>
                <option value="turista">Turistas</option>
              </select>
            </div>
            <div className="col-md-2">
              <span className="badge bg-primary rounded-pill p-2">Total: {filteredUsuarios.length}</span>
            </div>
          </div>
        </div>
      </div>

      {filteredUsuarios.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No se encontraron usuarios con los criterios de búsqueda.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={usuario.foto || "https://via.placeholder.com/40?text=U"}
                        alt={usuario.nombre}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <span>{usuario.nombre}</span>
                      {usuario._id === currentUser._id && <span className="badge bg-info ms-2">Tú</span>}
                    </div>
                  </td>
                  <td>{usuario.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        usuario.rol === "admin" ? "bg-danger" : usuario.rol === "guia" ? "bg-success" : "bg-primary"
                      }`}
                    >
                      {usuario.rol === "admin" ? "Administrador" : usuario.rol === "guia" ? "Guía" : "Turista"}
                    </span>
                  </td>
                  <td>{usuario.telefono || "No disponible"}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/admin/usuarios/${usuario._id}`}
                        className="btn btn-sm btn-outline-primary"
                        title="Ver detalles"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>
                      {usuario._id !== currentUser._id && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteUser(usuario._id)}
                          title="Eliminar usuario"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UsuarioList
