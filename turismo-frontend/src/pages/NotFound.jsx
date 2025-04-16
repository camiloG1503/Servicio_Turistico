import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="text-center my-5">
      <div className="display-1 text-muted mb-3">404</div>
      <i className="bi bi-map text-primary display-4 mb-3"></i>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="text-muted mb-4">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
      <Link to="/" className="btn btn-primary">
        <i className="bi bi-house me-2"></i>
        Volver al Inicio
      </Link>
    </div>
  )
}

export default NotFound
