import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>Servicio Turístico</h5>
            <p>
              Ofrecemos los mejores destinos turísticos con guías expertos para que disfrutes de una experiencia
              inolvidable.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white text-decoration-none" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/destinos">
                  Destinos
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/guias">
                  Guías
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/informacion">
                  Información
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Contacto</h5>
            <address>
              <p>
                <i className="bi bi-geo-alt-fill me-2"></i> Calle Principal #123, Ciudad
              </p>
              <p>
                <i className="bi bi-telephone-fill me-2"></i> +123 456 7890
              </p>
              <p>
                <i className="bi bi-envelope-fill me-2"></i> info@servicioturistico.com
              </p>
            </address>
            <div className="social-icons">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Servicio Turístico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
