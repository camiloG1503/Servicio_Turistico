"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../api/api"

const Resenas = () => {
  const [resenas, setResenas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nuevaResena, setNuevaResena] = useState({
    destino: "",
    calificacion: 5,
    comentario: "",
  })
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const data = await fetchData("/resenas")
        setResenas(data)
      } catch (error) {
        console.error("Error fetching reseñas:", error)
        setError("Error al cargar las reseñas. Por favor, inténtalo de nuevo más tarde.")
        // Use placeholder data if API fails
        setResenas(placeholderResenas)
      } finally {
        setLoading(false)
      }
    }

    fetchResenas()
  }, [])

  // Placeholder data in case API fails
  const placeholderResenas = [
    {
      id: 1,
      usuario: "Juan Pérez",
      destino: "Playa del Carmen",
      calificacion: 5,
      comentario: "Excelente experiencia, las playas son hermosas y el servicio fue impecable.",
      fecha: "2023-10-15",
    },
    {
      id: 2,
      usuario: "María López",
      destino: "Machu Picchu",
      calificacion: 4,
      comentario: "Un lugar mágico, aunque el clima fue un poco impredecible. El guía fue muy profesional.",
      fecha: "2023-09-22",
    },
    {
      id: 3,
      usuario: "Carlos Rodríguez",
      destino: "Venecia",
      calificacion: 5,
      comentario: "Una ciudad increíble, los paseos en góndola son una experiencia única.",
      fecha: "2023-08-10",
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevaResena((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setMensaje(null)

    try {
      const response = await fetchData("/resenas", {
        method: "POST",
        body: JSON.stringify(nuevaResena),
      })

      setResenas([...resenas, response])
      setNuevaResena({
        destino: "",
        calificacion: 5,
        comentario: "",
      })
      setMensaje({
        tipo: "success",
        texto: "Reseña enviada correctamente.",
      })
    } catch (error) {
      console.error("Error al enviar reseña:", error)
      setMensaje({
        tipo: "danger",
        texto: "Error al enviar la reseña. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setEnviando(false)
    }
  }

  const renderStars = (calificacion) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<i key={i} className={`bi ${i <= calificacion ? "bi-star-fill text-warning" : "bi-star"}`}></i>)
    }
    return stars
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Reseñas de Nuestros Clientes</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <div className="row">
        <div className="col-lg-8">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <>
              {resenas.length > 0 ? (
                <div className="row">
                  {resenas.map((resena) => (
                    <div key={resena.id} className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">{resena.destino}</h5>
                          <div className="mb-2">{renderStars(resena.calificacion)}</div>
                          <p className="card-text">{resena.comentario}</p>
                        </div>
                        <div className="card-footer bg-white">
                          <small className="text-muted">
                            Por {resena.usuario} - {new Date(resena.fecha).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p>No hay reseñas disponibles.</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Deja tu Reseña</h5>
            </div>
            <div className="card-body">
              {mensaje && <div className={`alert alert-${mensaje.tipo} mb-3`}>{mensaje.texto}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  <select
                    className="form-select"
                    id="destino"
                    name="destino"
                    value={nuevaResena.destino}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un destino</option>
                    <option value="Playa del Carmen">Playa del Carmen</option>
                    <option value="Machu Picchu">Machu Picchu</option>
                    <option value="Venecia">Venecia</option>
                    <option value="Tokio">Tokio</option>
                    <option value="Santorini">Santorini</option>
                    <option value="Nueva York">Nueva York</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="calificacion" className="form-label">
                    Calificación
                  </label>
                  <select
                    className="form-select"
                    id="calificacion"
                    name="calificacion"
                    value={nuevaResena.calificacion}
                    onChange={handleChange}
                    required
                  >
                    <option value="5">5 estrellas - Excelente</option>
                    <option value="4">4 estrellas - Muy bueno</option>
                    <option value="3">3 estrellas - Bueno</option>
                    <option value="2">2 estrellas - Regular</option>
                    <option value="1">1 estrella - Malo</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="comentario" className="form-label">
                    Comentario
                  </label>
                  <textarea
                    className="form-control"
                    id="comentario"
                    name="comentario"
                    rows="4"
                    value={nuevaResena.comentario}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar Reseña"}
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

export default Resenas
