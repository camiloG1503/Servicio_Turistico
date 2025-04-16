"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const Perfil = () => {
  const { currentUser, logout } = useAuth()
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setUserData({
        nombre: currentUser.nombre || "",
        email: currentUser.email || "",
        telefono: currentUser.telefono || "",
        password: "",
        confirmPassword: "",
      })
    }
  }, [currentUser])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    // Validar que las contraseñas coincidan si se están actualizando
    if (userData.password && userData.password !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      // Eliminar confirmPassword y campos vacíos antes de enviar
      const dataToSend = { ...userData }
      delete dataToSend.confirmPassword
      if (!dataToSend.password) delete dataToSend.password

      await axios.put(`http://localhost:5000/api/usuarios/${currentUser._id}`, dataToSend, config)
      setSuccess("Perfil actualizado correctamente")
      setEditMode(false)
    } catch (error) {
      console.error("Error al actualizar perfil:", error)
      setError(error.response?.data?.mensaje || "Error al actualizar el perfil")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/usuarios/${currentUser._id}`, config)
        logout()
        navigate("/")
      } catch (error) {
        console.error("Error al eliminar cuenta:", error)
        setError(error.response?.data?.mensaje || "Error al eliminar la cuenta")
      }
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              <i className="bi bi-person-circle me-2"></i>
              Mi Perfil
            </h3>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {success}
              </div>
            )}

            <div className="row mb-4">
              <div className="col-md-3 text-center">
                <div className="mb-3">
                  <img
                    src={currentUser?.foto || "https://via.placeholder.com/150?text=Usuario"}
                    alt="Foto de perfil"
                    className="rounded-circle img-thumbnail"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="badge bg-primary mb-2">
                  {currentUser?.rol === "admin"
                    ? "Administrador"
                    : currentUser?.rol === "guia"
                      ? "Guía Turístico"
                      : "Turista"}
                </div>
              </div>
              <div className="col-md-9">
                {!editMode ? (
                  <div>
                    <h4>{currentUser?.nombre}</h4>
                    <p className="text-muted">
                      <i className="bi bi-envelope me-2"></i>
                      {currentUser?.email}
                    </p>
                    {currentUser?.telefono && (
                      <p className="text-muted">
                        <i className="bi bi-telephone me-2"></i>
                        {currentUser?.telefono}
                      </p>
                    )}
                    <button className="btn btn-outline-primary mt-3" onClick={() => setEditMode(true)}>
                      <i className="bi bi-pencil me-2"></i>
                      Editar Perfil
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="telefono" className="form-label">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Nueva Contraseña (dejar en blanco para mantener la actual)
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
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
                )}
              </div>
            </div>

            <div className="border-top pt-4 mt-4">
              <h5>Acciones de Cuenta</h5>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-outline-danger" onClick={handleDeleteAccount}>
                  <i className="bi bi-trash me-2"></i>
                  Eliminar Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil
