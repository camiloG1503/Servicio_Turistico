"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const ResenaForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()

  // Obtener destinoId o guiaId de los query params si existen
  const queryParams = new URLSearchParams(location.search)
  const destinoIdFromQuery = queryParams.get("destinoId")
  const guiaIdFromQuery = queryParams.get("guiaId")

  const [formData, setFormData] = useState({
    titulo: "",
    comentario: "",
    calificacion: 5,
    destino: destinoIdFromQuery || "",
    guia: guiaIdFromQuery || "",
  })
  const [destinos, setDestinos] = useState([])
  const [guias, setGuias] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar destinos
        const destinosResponse = await axios.get("http://localhost:5000/api/destinos/")
        setDestinos(destinosResponse.data)

        // Cargar guías
        const guiasResponse = await axios.get("http://localhost:5000/api/guias/")
        setGuias(guiasResponse.data)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        setError("Error al cargar destinos y guías")
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      // Eliminar campos vacíos
      const dataToSend = { ...formData }
      if (!dataToSend.destino) delete dataToSend.destino
      if (!dataToSend.guia) delete dataToSend.guia

      await axios.post("http://localhost:5000/api/resena/", dataToSend, config)
      navigate("/resenas")
    } catch (error) {
      console.error("Error al guardar reseña:", error)
      setError(error.response?.data?.mensaje || "Error al crear la reseña")
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando datos...</p>
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
            <Link to="/resenas">Reseñas</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Nueva Reseña
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-star me-2"></i>
                Escribir Reseña
              </h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Título de la Reseña
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ej: Experiencia increíble en..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="calificacion" className="form-label">
                    Calificación
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="range"
                      className="form-range me-3"
                      id="calificacion"
                      name="calificacion"
                      min="1"
                      max="5"
                      value={formData.calificacion}
                      onChange={handleChange}
                      style={{ flex: "1" }}
                    />
                    <div className="text-warning" style={{ width: "120px" }}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i
                          key={index}
                          className={`bi ${index < formData.calificacion ? "bi-star-fill" : "bi-star"} me-1`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="destino" className="form-label">
                      Destino (opcional)
                    </label>
                    <select
                      className="form-select"
                      id="destino"
                      name="destino"
                      value={formData.destino}
                      onChange={handleChange}
                      disabled={!!formData.guia}
                    >
                      <option value="">Selecciona un destino</option>
                      {destinos.map((destino) => (
                        <option key={destino._id} value={destino._id}>
                          {destino.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="guia" className="form-label">
                      Guía (opcional)
                    </label>
                    <select
                      className="form-select"
                      id="guia"
                      name="guia"
                      value={formData.guia}
                      onChange={handleChange}
                      disabled={!!formData.destino}
                    >
                      <option value="">Selecciona un guía</option>
                      {guias.map((guia) => (
                        <option key={guia._id} value={guia._id}>
                          {guia.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="comentario" className="form-label">
                    Tu Reseña
                  </label>
                  <textarea
                    className="form-control"
                    id="comentario"
                    name="comentario"
                    rows="5"
                    value={formData.comentario}
                    onChange={handleChange}
                    placeholder="Comparte tu experiencia..."
                    required
                  ></textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/resenas" className="btn btn-outline-secondary me-md-2">
                    Cancelar
                  </Link>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Publicando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-star me-2"></i>
                        Publicar Reseña
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResenaForm
