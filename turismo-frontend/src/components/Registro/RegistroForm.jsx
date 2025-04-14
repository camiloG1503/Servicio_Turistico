"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../../api/auth"

const RegistroForm = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { confirmPassword, ...registerData } = userData
      const response = await register(registerData)
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      navigate("/dashboard")
    } catch (error) {
      setError("Error al registrar. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-center mb-4">Registro</h3>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="registro-form">
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
              Email
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
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>

          <div className="text-center mt-3">
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistroForm
