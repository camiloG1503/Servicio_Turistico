import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <span className="logo-text">Elite Tours</span>
          <span className="logo-dot"></span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/destinos">Destinos</Link>
            </li>

            {usuario && usuario.rol !== "guia" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservas">
                    {usuario.rol === "admin" ? "Reservas" : "Mis Reservas"}
                  </Link>
                </li>
                {(usuario.rol === "admin" || usuario.rol === "turista") && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/pagos">
                      {usuario.rol === "admin" ? "Pagos" : "Mis Pagos"}
                    </Link>
                  </li>
                )}
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/guias">Guías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reseñas">Reseñas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle user-menu"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle user-icon"></i>
                {usuario && <span className="user-name">{usuario.nombre}</span>}
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                {!usuario ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar sesión
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/registro">
                        <i className="bi bi-person-plus me-2"></i> Registrarse
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/perfil">
                        <i className="bi bi-person-gear me-2"></i> Mi Perfil
                      </Link>
                    </li>

                    {usuario.rol === "admin" && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/panelAdmin">
                            <i className="bi bi-speedometer2 me-2"></i> Panel
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/dashboard">
                            <i className="bi bi-bar-chart-line-fill me-2"></i> Dashboard
                          </Link>
                        </li>
                      </>
                    )}

                    {usuario.rol === "guia" && (
                      <li>
                        <Link className="dropdown-item" to="/panelGuia">
                          <i className="bi bi-speedometer2 me-2"></i> Panel
                        </Link>
                      </li>
                    )}

                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-left me-2"></i> Cerrar sesión
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
