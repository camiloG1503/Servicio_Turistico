import { Link } from "react-router-dom"

const DestinoCard = ({ destino }) => {
  const { id, nombre, descripcion, imagen, precio } = destino

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={imagen || "/placeholder.svg"} className="card-img-top" alt={nombre} />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">{descripcion}</p>
          <p className="card-text text-primary fw-bold">${precio} / persona</p>
        </div>
        <div className="card-footer bg-white border-top-0">
          <Link to={`/destinos/${id}`} className="btn btn-primary w-100">
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DestinoCard
