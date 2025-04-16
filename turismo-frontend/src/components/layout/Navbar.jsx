import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"

const Navbar = () => {
  const { currentUser, logout, isAdmin, isGuide } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Reinicializa todos los dropdowns de Bootstrap manualmente
    const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]')
    dropdownTriggerList.forEach((dropdownToggleEl) => {
      new window.bootstrap.Dropdown(dropdownToggleEl)
    })
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-globe-americas me-2"></i>
          Servicio Turístico
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/destinos">Destinos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/guias">Guías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/resenas">Reseñas</NavLink>
            </li>

            {currentUser && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/mis-reservas">Mis Reservas</NavLink>
              </li>
            )}

            {isGuide() && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/guias/reservas">Reservas de Turistas</NavLink>
              </li>
            )}

            {isAdmin() && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Administración
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/admin/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin/usuarios">Usuarios</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin/reservas">Reservas</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin/pagos">Pagos</NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {currentUser ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {currentUser.nombre}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink className="dropdown-item" to="/perfil">
                      <i className="bi bi-person me-2"></i>Mi Perfil
                    </NavLink>
                  </li>
                  {!isAdmin() && (
                    <li>
                      <NavLink className="dropdown-item" to="/pagos">
                        <i className="bi bi-credit-card me-2"></i>Mis Pagos
                      </NavLink>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    <i className="bi bi-person-plus me-1"></i>
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
