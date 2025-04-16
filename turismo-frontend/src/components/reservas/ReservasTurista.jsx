"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const ReservasTurista = () => {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get("http://localhost:5000/api/reservas/mis-reservas", config)
        setReservas(response.data)
      } catch (error) {
        console.error("Error al cargar reservas:", error)
        setError(error.response?.data?.mensaje || "Error al cargar tus reservas")
      } finally {
        setLoading(false)
      }
    }

    fetchReservas()
  }, [])

  const handleCancelarReserva = async (reservaId) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/reservas/${reservaId}`, config)

        // Actualizar la lista de reservas
        setReservas(reservas.filter((reserva) => reserva._id !== reservaId))
      } catch (error) {
        console.error("Error al cancelar reserva:", error)
        setError(error.response?.data?.mensaje || "Error al cancelar la reserva")
      }
    }
  }

  // Filtrar reservas por estado
  const reservasFiltradas = reservas.filter((reserva) => filtroEstado === "todos" || reserva.estado === filtroEstado)

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando tus reservas...</p>
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
          <i className="bi bi-calendar-check me-2"></i>
          Mis Reservas
        </h2>
        <Link to="/reservas/nueva" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Reserva
        </Link>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="mb-0">Filtrar por estado</h5>
            </div>
            <div className="col-md-6">
              <select className="form-select" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {reservasFiltradas.length === 0 ? (
        <div className="text-center my-5">
          <i className="bi bi-calendar-x display-1 text-muted"></i>
          <h3 className="mt-3">No tienes reservas {filtroEstado !== "todos" ? `con estado "${filtroEstado}"` : ""}</h3>
          <p className="text-muted mb-4">¡Explora nuestros destinos y reserva tu próxima aventura!</p>
          <Link to="/destinos" className="btn btn-primary">
            <i className="bi bi-geo-alt me-2"></i>
            Ver Destinos
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {reservasFiltradas.map((reserva) => (
            <div className="col" key={reserva._id}>
              <div className="card h-100 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={reserva.destino?.imagen || "https://via.placeholder.com/300x200?text=Destino"}
                      className="img-fluid rounded-start h-100"
                      alt={reserva.destino?.nombre}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{reserva.destino?.nombre}</h5>
                        <span
                          className={`badge ${
                            reserva.estado === "pendiente"
                              ? "bg-warning"
                              : reserva.estado === "confirmada"
                                ? "bg-primary"
                                : reserva.estado === "completada"
                                  ? "bg-success"
                                  : "bg-danger"
                          }`}
                        >
                          {reserva.estado}
                        </span>
                      </div>
                      <p className="card-text text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {reserva.destino?.ubicacion}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          Fecha: {new Date(reserva.fecha).toLocaleDateString()}
                        </small>
                        <br />
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>
                          Hora: {reserva.hora || "No especificada"}
                        </small>
                        <br />
                        <small className="text-muted">
                          <i className="bi bi-people me-1"></i>
                          Personas: {reserva.cantidadPersonas}
                        </small>
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-bold text-primary">${reserva.precioTotal?.toFixed(2)}</span>
                        <div>
                          {reserva.estado !== "cancelada" && reserva.estado !== "completada" && (
                            <>
                              <Link
                                to={`/reservas/editar/${reserva._id}`}
                                className="btn btn-sm btn-outline-primary me-2"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCancelarReserva(reserva._id)}
                              >
                                <i className="bi bi-x-circle"></i>
                              </button>
                            </>
                          )}
                          {reserva.estado === "completada" && !reserva.resena && (
                            <Link
                              to={`/resenas/nueva?destinoId=${reserva.destino?._id}`}
                              className="btn btn-sm btn-outline-success"
                            >
                              <i className="bi bi-star me-1"></i>
                              Reseña
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Resumen</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3 mb-md-0">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title">Total</h6>
                  <p className="card-text fs-4">{reservas.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <div className="card bg-warning bg-opacity-25">
                <div className="card-body text-center">
                  <h6 className="card-title">Pendientes</h6>
                  <p className="card-text fs-4">{reservas.filter((r) => r.estado === "pendiente").length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <div className="card bg-primary bg-opacity-25">
                <div className="card-body text-center">
                  <h6 className="card-title">Confirmadas</h6>
                  <p className="card-text fs-4">{reservas.filter((r) => r.estado === "confirmada").length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success bg-opacity-25">
                <div className="card-body text-center">
                  <h6 className="card-title">Completadas</h6>
                  <p className="card-text fs-4">{reservas.filter((r) => r.estado === "completada").length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservasTurista
