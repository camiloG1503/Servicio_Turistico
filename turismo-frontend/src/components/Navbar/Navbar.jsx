import { Link } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../Login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './Navbar.css';

const Navbar = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  return (
    <nav className="navbar navbar-light bg-light position-relative">
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          {/* Logo */}
          <div className="col-3 text-start">
            <Link className="navbar-brand fs-3 fw-bold" to="/">Elite Tours</Link>
          </div>

          {/* Menú */}
          <div className="col-6 text-center">
            <ul className="navbar-nav d-flex flex-row justify-content-center gap-4">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/destinos">Destinos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reservas">Reservas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/guias">Guias</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reseñas">Reseñas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Íconos */}
          <div className="col-3 text-end d-flex justify-content-end align-items-center gap-3 position-relative">
            <button onClick={toggleFormulario} className="btn p-0 border-0 bg-transparent">
              <i className="bi bi-person-circle fs-4"></i>
            </button>
            <Link to="/carrito" className="nav-link">
              <i className="bi bi-cart fs-4"></i>
            </Link>

            {mostrarFormulario && <LoginForm onClose={cerrarFormulario} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;