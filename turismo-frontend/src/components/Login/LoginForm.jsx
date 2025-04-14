"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../../api/auth"

const LoginForm = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await login(credentials)
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      navigate("/dashboard")
    } catch (error) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </div>

          <div className="text-center mt-3">
            <p>
              ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
