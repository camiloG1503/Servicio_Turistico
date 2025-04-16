"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const DestinoDetalle = () => {
  const { id } = useParams()
  const [destino, setDestino] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { currentUser, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/destinos/${id}`)
        setDestino(response.data)
      } catch (error) {
        console.error("Error al cargar destino:", error)
        setError("Error al cargar los detalles del destino. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchDestino()
  }, [id])

  const handleReservar = () => {
    if (!currentUser) {
      navigate("/login")
      return
    }

    navigate(`/reservas/nueva?destinoId=${id}`)
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando detalles del destino...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    )
  }

  if (!destino) {
    return (
      <div className="text-center my-5">
        <i className="bi bi-geo-alt-fill display-1 text-muted"></i>
        <h3 className="mt-3">Destino no encontrado</h3>
        <p className="text-muted">El destino que buscas no existe o ha sido eliminado.</p>
        <Link to="/destinos" className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left me-2"></i>
          Volver a Destinos
        </Link>
      </div>
    )
  }

  return (
    <div>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/destinos">Destinos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {destino.nombre}
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm mb-4">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={destino.imagen || "https://via.placeholder.com/500x400?text=Destino+Turístico"}
              className="img-fluid rounded-start"
              alt={destino.nombre}
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h2 className="card-title">{destino.nombre}</h2>
                {isAdmin() && (
                  <div>
                    <Link to={`/admin/destinos/editar/${destino._id}`} className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </Link>
                  </div>
                )}
              </div>

              <p className="card-text text-muted mb-3">
                <i className="bi bi-geo-alt-fill me-1"></i>
                {destino.ubicacion}
              </p>

              <div className="mb-3">
                <h5>Descripción</h5>
                <p className="card-text">{destino.descripcion}</p>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Detalles</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span>
                        <i className="bi bi-currency-dollar me-2"></i>Precio:
                      </span>
                      <span className="badge bg-primary rounded-pill">${destino.precio}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span>
                        <i className="bi bi-clock me-2"></i>Duración:
                      </span>
                      <span>{destino.duracion || "No especificada"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span>
                        <i className="bi bi-people me-2"></i>Capacidad:
                      </span>
                      <span>{destino.capacidad || "No especificada"}</span>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <h5>Actividades</h5>
                  {destino.actividades && destino.actividades.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {destino.actividades.map((actividad, index) => (
                        <li key={index} className="list-group-item px-0">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {actividad}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No hay actividades especificadas</p>
                  )}
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" onClick={handleReservar}>
                  <i className="bi bi-calendar-plus me-2"></i>
                  Reservar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h4 className="mb-0">
            <i className="bi bi-star me-2"></i>
            Reseñas
          </h4>
        </div>
        <div className="card-body">
          {/* Aquí se mostrarían las reseñas del destino */}
          <p className="text-muted text-center py-3">No hay reseñas disponibles para este destino.</p>

          {currentUser && (
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link to={`/resenas/nueva?destinoId=${id}`} className="btn btn-outline-primary">
                <i className="bi bi-star me-2"></i>
                Escribir una Reseña
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DestinoDetalle
