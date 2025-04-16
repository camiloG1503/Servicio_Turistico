"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const ResenasList = () => {
  const [resenas, setResenas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filtroCalificacion, setFiltroCalificacion] = useState(0)
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resenas")
        setResenas(response.data)
      } catch (error) {
        console.error("Error al cargar reseñas:", error)
        setError(error.response?.data?.mensaje || "Error al cargar las reseñas")
      } finally {
        setLoading(false)
      }
    }

    fetchResenas()
  }, [])

  const handleDeleteResena = async (resenaId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reseña?")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/resena/${resenaId}`, config)

        // Actualizar la lista de reseñas
        setResenas(resenas.filter((resena) => resena._id !== resenaId))
      } catch (error) {
        console.error("Error al eliminar reseña:", error)
        setError(error.response?.data?.mensaje || "Error al eliminar la reseña")
      }
    }
  }

  // Filtrar reseñas por calificación
  const resenasFiltradas = resenas.filter(
    (resena) => filtroCalificacion === 0 || resena.calificacion === filtroCalificacion,
  )

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando reseñas...</p>
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-star me-2"></i>
          Reseñas de Clientes
        </h2>
        {currentUser && (
          <Link to="/resenas/nueva" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Escribir Reseña
          </Link>
        )}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="mb-0">Filtrar por calificación</h5>
            </div>
            <div className="col-md-6">
              <div className="btn-group w-100">
                <button
                  type="button"
                  className={`btn ${filtroCalificacion === 0 ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setFiltroCalificacion(0)}
                >
                  Todas
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`btn ${filtroCalificacion === rating ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFiltroCalificacion(rating)}
                  >
                    {rating} <i className="bi bi-star-fill"></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {resenasFiltradas.length === 0 ? (
        <div className="text-center my-5">
          <i className="bi bi-star display-1 text-muted"></i>
          <h3 className="mt-3">No hay reseñas disponibles</h3>
          <p className="text-muted mb-4">
            {filtroCalificacion > 0
              ? `No hay reseñas con calificación de ${filtroCalificacion} estrellas.`
              : "Sé el primero en compartir tu experiencia."}
          </p>
          {currentUser && (
            <Link to="/resenas/nueva" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Escribir Reseña
            </Link>
          )}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {resenasFiltradas.map((resena) => (
            <div className="col" key={resena._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={resena.usuario?.foto || "https://via.placeholder.com/40?text=U"}
                        alt={resena.usuario?.nombre}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div>
                        <h6 className="mb-0">{resena.usuario?.nombre || "Usuario Anónimo"}</h6>
                        <small className="text-muted">{new Date(resena.fecha).toLocaleDateString()}</small>
                      </div>
                    </div>
                    <div className="text-warning">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i
                          key={index}
                          className={`bi ${index < resena.calificacion ? "bi-star-fill" : "bi-star"} me-1`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {resena.titulo || `Reseña sobre ${resena.destino?.nombre || resena.guia?.nombre || "Destino"}`}
                  </h5>
                  <p className="card-text">{resena.comentario}</p>
                  {resena.destino && (
                    <div className="mt-3">
                      <small className="text-muted">Destino:</small>
                      <Link to={`/destinos/${resena.destino._id}`} className="d-flex align-items-center mt-1">
                        <img
                          src={resena.destino.imagen || "https://via.placeholder.com/30?text=D"}
                          alt={resena.destino.nombre}
                          className="rounded me-2"
                          width="30"
                          height="30"
                        />
                        <span>{resena.destino.nombre}</span>
                      </Link>
                    </div>
                  )}
                  {resena.guia && (
                    <div className="mt-3">
                      <small className="text-muted">Guía:</small>
                      <Link to={`/guias/${resena.guia._id}`} className="d-flex align-items-center mt-1">
                        <img
                          src={resena.guia.foto || "https://via.placeholder.com/30?text=G"}
                          alt={resena.guia.nombre}
                          className="rounded-circle me-2"
                          width="30"
                          height="30"
                        />
                        <span>{resena.guia.nombre}</span>
                      </Link>
                    </div>
                  )}
                </div>
                {currentUser && resena.usuario?._id === currentUser._id && (
                  <div className="card-footer bg-white">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteResena(resena._id)}>
                      <i className="bi bi-trash me-1"></i>
                      Eliminar Reseña
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResenasList
