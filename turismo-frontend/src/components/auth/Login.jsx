"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
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

    try {
      await login(formData.email, formData.password)
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <i className="bi bi-person-circle display-1 text-primary"></i>
              <h2 className="mt-2">Iniciar Sesión</h2>
              <p className="text-muted">Ingresa tus credenciales para acceder</p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
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

              <div className="mb-4">
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
                    placeholder="Tu contraseña"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar Sesión
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p>
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-decoration-none">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
