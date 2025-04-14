const GuiaCard = ({ guia }) => {
  const { nombre, especialidad, experiencia, imagen } = guia

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 text-center">
        <img
          src={imagen || "/placeholder.svg"}
          className="card-img-top rounded-circle mx-auto mt-3"
          alt={nombre}
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text text-muted">{especialidad}</p>
          <p className="card-text">{experiencia} años de experiencia</p>
        </div>
        <div className="card-footer bg-white border-top-0">
          <button className="btn btn-outline-primary w-100">Contactar</button>
        </div>
      </div>
    </div>
  )
}

export default GuiaCard
