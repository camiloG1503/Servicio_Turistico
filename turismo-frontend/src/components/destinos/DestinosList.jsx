"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const DestinosList = () => {
  const [destinos, setDestinos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/destinos/")
        setDestinos(response.data)
      } catch (error) {
        console.error("Error al cargar destinos:", error)
        setError("Error al cargar los destinos. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchDestinos()
  }, [])

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando destinos...</p>
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

  if (destinos.length === 0) {
    return (
      <div className="text-center my-5">
        <i className="bi bi-geo-alt-fill display-1 text-muted"></i>
        <h3 className="mt-3">No hay destinos disponibles</h3>
        <p className="text-muted">Vuelve pronto para ver nuevos destinos turísticos.</p>
        {isAdmin() && (
          <Link to="/admin/destinos/nuevo" className="btn btn-primary mt-3">
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Destino
          </Link>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-geo-alt me-2"></i>
          Destinos Turísticos
        </h2>
        {isAdmin() && (
          <Link to="/admin/destinos/nuevo" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Destino
          </Link>
        )}
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {destinos.map((destino) => (
          <div className="col" key={destino._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={destino.imagen || "https://via.placeholder.com/300x200?text=Destino+Turístico"}
                className="card-img-top"
                alt={destino.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{destino.nombre}</h5>
                <p className="card-text text-muted">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {destino.ubicacion}
                </p>
                <p className="card-text">
                  {destino.descripcion.length > 100
                    ? `${destino.descripcion.substring(0, 100)}...`
                    : destino.descripcion}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary rounded-pill">
                    <i className="bi bi-currency-dollar me-1"></i>
                    {destino.precio}
                  </span>
                  <Link to={`/destinos/${destino._id}`} className="btn btn-outline-primary">
                    <i className="bi bi-info-circle me-1"></i>
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinosList
