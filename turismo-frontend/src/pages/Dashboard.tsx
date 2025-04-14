"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../api/api"
import { getCurrentUser } from "../api/auth"

interface User {
  id: number
  nombre: string
  email: string
  role: string
}

interface Reserva {
  id: number
  destino: string
  fechaInicio: string
  fechaFin: string
  personas: number
  estado: string
  precio: number
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null)
  const [reservasRecientes, setReservasRecientes] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    const fetchReservasRecientes = async () => {
      try {
        const data = await fetchData("/reservas?limit=3")
        setReservasRecientes(data)
      } catch (error) {
        console.error("Error fetching reservas recientes:", error)
        setError("Error al cargar las reservas recientes.")
        // Use placeholder data if API fails
        setReservasRecientes(placeholderReservas)
      } finally {
        setLoading(false)
      }
    }

    fetchReservasRecientes()
  }, [])

  // Placeholder data in case API fails
  const placeholderReservas: Reserva[] = [
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
  ]

  const getStatusBadgeClass = (estado: string) => {
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
      <h2 className="mb-4">Mi Dashboard</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Perfil</h5>
              {user ? (
                <div>
                  <p>
                    <strong>Nombre:</strong> {user.nombre}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Rol:</strong> {user.role === "admin" ? "Administrador" : "Usuario"}
                  </p>
                  <button className="btn btn-primary">Editar Perfil</button>
                </div>
              ) : (
                <p>Cargando información del usuario...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-8 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Reservas Recientes</h5>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                <>
                  {reservasRecientes.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Destino</th>
                            <th>Fecha Inicio</th>
                            <th>Personas</th>
                            <th>Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservasRecientes.map((reserva) => (
                            <tr key={reserva.id}>
                              <td>{reserva.destino}</td>
                              <td>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                              <td>{reserva.personas}</td>
                              <td>
                                <span className={`badge ${getStatusBadgeClass(reserva.estado)}`}>{reserva.estado}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <a href="/reservas" className="btn btn-outline-primary">
                        Ver Todas
                      </a>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p>No tienes reservas recientes.</p>
                      <a href="/destinos" className="btn btn-primary">
                        Explorar Destinos
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Destinos Favoritos</h5>
              <p className="card-text">Aún no has marcado ningún destino como favorito.</p>
              <a href="/destinos" className="btn btn-outline-primary">
                Explorar Destinos
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Mis Reseñas</h5>
              <p className="card-text">Aún no has dejado ninguna reseña.</p>
              <a href="/resenas" className="btn btn-outline-primary">
                Escribir Reseña
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
