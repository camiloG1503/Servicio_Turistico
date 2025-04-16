const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Servicio Turístico</h5>
            <p className="text-muted">Descubre los mejores destinos turísticos con nuestros guías expertos.</p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none text-white-50">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/destinos" className="text-decoration-none text-white-50">
                  Destinos
                </a>
              </li>
              <li>
                <a href="/guias" className="text-decoration-none text-white-50">
                  Guías
                </a>
              </li>
              <li>
                <a href="/resenas" className="text-decoration-none text-white-50">
                  Reseñas
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-envelope me-2"></i>info@servicioturistico.com
              </li>
              <li>
                <i className="bi bi-telephone me-2"></i>+123 456 7890
              </li>
              <li>
                <i className="bi bi-geo-alt me-2"></i>Calle Principal 123, Ciudad
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-3 bg-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} Servicio Turístico. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="text-white me-3">
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-twitter fs-5"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-instagram fs-5"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-youtube fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
