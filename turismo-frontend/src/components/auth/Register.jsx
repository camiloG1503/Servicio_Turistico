"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    rol: "turista", // Por defecto, los usuarios se registran como turistas
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register } = useAuth()
  const navigate = useNavigate()

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

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    try {
      // Eliminar confirmPassword antes de enviar al servidor
      const { confirmPassword, ...userData } = formData
      await register(userData)
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <i className="bi bi-person-plus-fill display-1 text-primary"></i>
              <h2 className="mt-2">Crear Cuenta</h2>
              <p className="text-muted">Regístrate para disfrutar de nuestros servicios turísticos</p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre Completo
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Crea una contraseña"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repite tu contraseña"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-telephone"></i>
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Crear Cuenta
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-decoration-none">
                  Inicia Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
