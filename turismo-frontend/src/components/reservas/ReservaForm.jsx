"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const ReservaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()
  const isEditing = !!id

  // Obtener destinoId de los query params si existe
  const queryParams = new URLSearchParams(location.search)
  const destinoIdFromQuery = queryParams.get("destinoId")

  const [formData, setFormData] = useState({
    destino: destinoIdFromQuery || "",
    fecha: "",
    hora: "",
    cantidadPersonas: 1,
    comentarios: "",
  })
  const [destinos, setDestinos] = useState([])
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/destinos/")
        setDestinos(response.data)

        // Si hay un destino seleccionado en la URL, establecerlo como seleccionado
        if (destinoIdFromQuery) {
          const destino = response.data.find((d) => d._id === destinoIdFromQuery)
          if (destino) {
            setDestinoSeleccionado(destino)
          }
        }
      } catch (error) {
        console.error("Error al cargar destinos:", error)
        setError("Error al cargar la lista de destinos")
      } finally {
        if (!isEditing) {
          setLoadingData(false)
        }
      }
    }

    const fetchReserva = async () => {
      if (isEditing) {
        try {
          const token = localStorage.getItem("token")
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          const response = await axios.get(`http://localhost:5000/api/reservas/${id}`, config)
          const reserva = response.data

          // Formatear la fecha para el input date
          const fecha = new Date(reserva.fecha)
          const fechaFormateada = fecha.toISOString().split("T")[0]

          setFormData({
            destino: reserva.destino?._id || "",
            fecha: fechaFormateada,
            hora: reserva.hora || "",
            cantidadPersonas: reserva.cantidadPersonas || 1,
            comentarios: reserva.comentarios || "",
          })

          setDestinoSeleccionado(reserva.destino)
        } catch (error) {
          console.error("Error al cargar reserva:", error)
          setError(error.response?.data?.mensaje || "Error al cargar los datos de la reserva")
        } finally {
          setLoadingData(false)
        }
      }
    }

    fetchDestinos()
    if (isEditing) {
      fetchReserva()
    }
  }, [id, isEditing, destinoIdFromQuery])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "destino") {
      const destino = destinos.find((d) => d._id === value)
      setDestinoSeleccionado(destino)
    }

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

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/reservas/${id}`, formData, config)
      } else {
        await axios.post("http://localhost:5000/api/reservas/", formData, config)
      }

      navigate("/mis-reservas")
    } catch (error) {
      console.error("Error al guardar reserva:", error)
      setError(error.response?.data?.mensaje || `Error al ${isEditing ? "actualizar" : "crear"} la reserva`)
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

  // Calcular el precio total
  const precioTotal = destinoSeleccionado ? destinoSeleccionado.precio * formData.cantidadPersonas : 0

  return (
    <div>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/mis-reservas">Mis Reservas</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {isEditing ? "Editar Reserva" : "Nueva Reserva"}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className={`bi ${isEditing ? "bi-pencil" : "bi-calendar-plus"} me-2`}></i>
                {isEditing ? "Editar Reserva" : "Nueva Reserva"}
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
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  <select
                    className="form-select"
                    id="destino"
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    required
                    disabled={isEditing}
                  >
                    <option value="">Selecciona un destino</option>
                    {destinos.map((destino) => (
                      <option key={destino._id} value={destino._id}>
                        {destino.nombre} - {destino.ubicacion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="fecha" className="form-label">
                      Fecha
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="hora" className="form-label">
                      Hora
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="cantidadPersonas" className="form-label">
                    Cantidad de Personas
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cantidadPersonas"
                    name="cantidadPersonas"
                    value={formData.cantidadPersonas}
                    onChange={handleChange}
                    min="1"
                    max={destinoSeleccionado?.capacidad || 10}
                    required
                  />
                  {destinoSeleccionado?.capacidad && (
                    <small className="text-muted">Capacidad máxima: {destinoSeleccionado.capacidad} personas</small>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="comentarios" className="form-label">
                    Comentarios o Solicitudes Especiales
                  </label>
                  <textarea
                    className="form-control"
                    id="comentarios"
                    name="comentarios"
                    rows="3"
                    value={formData.comentarios}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/mis-reservas" className="btn btn-outline-secondary me-md-2">
                    Cancelar
                  </Link>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {isEditing ? "Actualizando..." : "Reservando..."}
                      </>
                    ) : (
                      <>
                        <i className={`bi ${isEditing ? "bi-check-circle" : "bi-calendar-check"} me-2`}></i>
                        {isEditing ? "Actualizar Reserva" : "Confirmar Reserva"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          {destinoSeleccionado && (
            <div className="card shadow-sm">
              <img
                src={destinoSeleccionado.imagen || "https://via.placeholder.com/300x200?text=Destino"}
                className="card-img-top"
                alt={destinoSeleccionado.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{destinoSeleccionado.nombre}</h5>
                <p className="card-text text-muted">
                  <i className="bi bi-geo-alt me-1"></i>
                  {destinoSeleccionado.ubicacion}
                </p>
                <p className="card-text">
                  {destinoSeleccionado.descripcion?.substring(0, 150)}
                  {destinoSeleccionado.descripcion?.length > 150 ? "..." : ""}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <i className="bi bi-currency-dollar me-1"></i>
                    <strong>{destinoSeleccionado.precio}</strong> / persona
                  </span>
                  <span>
                    <i className="bi bi-people me-1"></i>
                    {formData.cantidadPersonas} {formData.cantidadPersonas === 1 ? "persona" : "personas"}
                  </span>
                </div>
              </div>
              <div className="card-footer bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Precio Total:</span>
                  <span className="fs-4">${precioTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="card mt-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Información Importante</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <i className="bi bi-info-circle text-primary me-3 fs-4"></i>
                  <div>
                    <strong>Política de Cancelación</strong>
                    <p className="mb-0 text-muted">Cancelación gratuita hasta 48 horas antes de la fecha de reserva.</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-credit-card text-primary me-3 fs-4"></i>
                  <div>
                    <strong>Pago</strong>
                    <p className="mb-0 text-muted">El pago se realizará después de confirmar la reserva.</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-shield-check text-primary me-3 fs-4"></i>
                  <div>
                    <strong>Seguridad</strong>
                    <p className="mb-0 text-muted">Todos nuestros tours cumplen con los protocolos de seguridad.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservaForm
