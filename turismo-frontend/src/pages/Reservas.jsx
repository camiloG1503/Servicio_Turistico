"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../api/api"

const Reservas = () => {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await fetchData("/reservas")
        setReservas(data)
      } catch (error) {
        console.error("Error fetching reservas:", error)
        setError("Error al cargar las reservas. Por favor, inténtalo de nuevo más tarde.")
        // Use placeholder data if API fails
        setReservas(placeholderReservas)
      } finally {
        setLoading(false)
      }
    }

    fetchReservas()
  }, [])

  // Placeholder data in case API fails
  const placeholderReservas = [
    {
      id: 1,
      destino: "Playa del Carmen",
      fechaInicio: "2023-12-15",
      fechaFin: "2023-12-22",
      personas: 2,
      estado: "Confirmada",
      precio: 2400,
    },
    {
      id: 2,
      destino: "Machu Picchu",
      fechaInicio: "2024-01-10",
      fechaFin: "2024-01-17",
      personas: 3,
      estado: "Pendiente",
      precio: 5400,
    },
    {
      id: 3,
      destino: "Venecia",
      fechaInicio: "2024-02-05",
      fechaFin: "2024-02-12",
      personas: 2,
      estado: "Cancelada",
      precio: 4400,
    },
  ]

  const getStatusBadgeClass = (estado) => {
    switch (estado.toLowerCase()) {
      case "confirmada":
        return "bg-success"
      case "pendiente":
        return "bg-warning text-dark"
      case "cancelada":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Mis Reservas</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {reservas.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Destino</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Personas</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.destino}</td>
                      <td>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                      <td>{new Date(reserva.fechaFin).toLocaleDateString()}</td>
                      <td>{reserva.personas}</td>
                      <td>${reserva.precio}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(reserva.estado)}`}>{reserva.estado}</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <i className="bi bi-eye"></i>
                        </button>
                        {reserva.estado !== "Cancelada" && (
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-x-circle"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center">
              <p>No tienes reservas actualmente.</p>
              <a href="/destinos" className="btn btn-primary">
                Explorar Destinos
              </a>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Reservas
