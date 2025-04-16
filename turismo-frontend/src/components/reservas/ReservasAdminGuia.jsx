"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const ReservasAdminGuia = () => {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const { currentUser, isAdmin } = useAuth()

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        let endpoint = "http://localhost:5000/api/reservas/"

        if (isAdmin()) {
          endpoint = "http://localhost:5000/api/reservas/admin/reservas-usuarios"
        }

        const response = await axios.get(endpoint, config)
        setReservas(response.data)
      } catch (error) {
        console.error("Error al cargar reservas:", error)
        setError(error.response?.data?.mensaje || "Error al cargar las reservas")
      } finally {
        setLoading(false)
      }
    }

    fetchReservas()
  }, [isAdmin])

  const handleCambiarEstado = async (reservaId, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.put(`http://localhost:5000/api/reservas/${reservaId}`, { estado: nuevoEstado }, config)

      // Actualizar la lista de reservas
      setReservas(
        reservas.map((reserva) => (reserva._id === reservaId ? { ...reserva, estado: nuevoEstado } : reserva)),
      )
    } catch (error) {
      console.error("Error al cambiar estado de reserva:", error)
      setError(error.response?.data?.mensaje || "Error al actualizar el estado de la reserva")
    }
  }

  // Filtrar reservas por estado y búsqueda
  const reservasFiltradas = reservas.filter(
    (reserva) =>
      (filtroEstado === "todos" || reserva.estado === filtroEstado) &&
      (busqueda === "" ||
        reserva.destino?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        reserva.usuario?.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        reserva._id.toLowerCase().includes(busqueda.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando reservas...</p>
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
      <h2 className="mb-4">
        <i className="bi bi-calendar-check me-2"></i>
        Gestión de Reservas
      </h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por destino, usuario o ID..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select className="form-select" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div className="col-md-2">
              <span className="badge bg-primary rounded-pill p-2">Total: {reservasFiltradas.length}</span>
            </div>
          </div>
        </div>
      </div>

      {reservasFiltradas.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No hay reservas que coincidan con los criterios de búsqueda.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Turista</th>
                <th>Destino</th>
                <th>Fecha</th>
                <th>Personas</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map((reserva) => (
                <tr key={reserva._id}>
                  <td>
                    <small className="text-muted">#{reserva._id.substring(0, 8)}</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={reserva.usuario?.foto || "https://via.placeholder.com/40?text=U"}
                        alt={reserva.usuario?.nombre}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div>
                        <div>{reserva.usuario?.nombre}</div>
                        <small className="text-muted">{reserva.usuario?.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>{reserva.destino?.nombre}</td>
                  <td>
                    {new Date(reserva.fecha).toLocaleDateString()}
                    <br />
                    <small className="text-muted">{reserva.hora || "No especificada"}</small>
                  </td>
                  <td className="text-center">{reserva.cantidadPersonas}</td>
                  <td>${reserva.precioTotal?.toFixed(2)}</td>
                  <td>
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
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Acciones
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to={`/admin/reservas/${reserva._id}`} className="dropdown-item">
                            <i className="bi bi-eye me-2"></i>
                            Ver detalles
                          </Link>
                        </li>
                        {reserva.estado === "pendiente" && (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleCambiarEstado(reserva._id, "confirmada")}
                            >
                              <i className="bi bi-check-circle me-2 text-primary"></i>
                              Confirmar
                            </button>
                          </li>
                        )}
                        {reserva.estado === "confirmada" && (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleCambiarEstado(reserva._id, "completada")}
                            >
                              <i className="bi bi-check-all me-2 text-success"></i>
                              Completar
                            </button>
                          </li>
                        )}
                        {(reserva.estado === "pendiente" || reserva.estado === "confirmada") && (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleCambiarEstado(reserva._id, "cancelada")}
                            >
                              <i className="bi bi-x-circle me-2 text-danger"></i>
                              Cancelar
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ReservasAdminGuia
