"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, logout, getCurrentUser } from "../../api/auth"

const Navbar = () => {
  const navigate = useNavigate()
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const authenticated = isAuthenticated()
  const currentUser = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Servicio Turístico
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/destinos">
                Destinos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/guias">
                Guías
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/informacion">
                Información
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
            {authenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservas">
                    Reservas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resenas">
                    Reseñas
                  </Link>
                </li>
              </>
            )}
            {authenticated && currentUser?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <div className="navbar-nav">
            {authenticated ? (
              <>
                <Link className="nav-link" to="/dashboard">
                  Mi Cuenta
                </Link>
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Iniciar Sesión
                </Link>
                <Link className="nav-link" to="/registro">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
