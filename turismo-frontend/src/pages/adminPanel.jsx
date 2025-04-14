"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../api/api"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("destinos")
  const [destinos, setDestinos] = useState([])
  const [guias, setGuias] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true)
      try {
        const data = await fetchData(`/admin/${activeTab}`)
        switch (activeTab) {
          case "destinos":
            setDestinos(data)
            break
          case "guias":
            setGuias(data)
            break
          case "usuarios":
            setUsuarios(data)
            break
          case "reservas":
            setReservas(data)
            break
          default:
            break
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error)
        setError(`Error al cargar ${activeTab}. Por favor, inténtalo de nuevo más tarde.`)
        // Use placeholder data if API fails
        switch (activeTab) {
          case "destinos":
            setDestinos(placeholderDestinos)
            break
          case "guias":
            setGuias(placeholderGuias)
            break
          case "usuarios":
            setUsuarios(placeholderUsuarios)
            break
          case "reservas":
            setReservas(placeholderReservas)
            break
          default:
            break
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [activeTab])

  // Placeholder data in case API fails
  const placeholderDestinos = [
    {
      id: 1,
      nombre: "Playa del Carmen",
      descripcion: "Hermosas playas de arena blanca y aguas cristalinas.",
      precio: 1200,
      activo: true,
    },
    {
      id: 2,
      nombre: "Machu Picchu",
      descripcion: "Antigua ciudad inca en lo alto de los Andes peruanos.",
      precio: 1800,
      activo: true,
    },
    {
      id: 3,
      nombre: "Venecia",
      descripcion: "Ciudad de canales y arquitectura histórica en Italia.",
      precio: 2200,
      activo: false,
    },
  ]

  const placeholderGuias = [
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      especialidad: "Montañismo",
      experiencia: 8,
      activo: true,
    },
    {
      id: 2,
      nombre: "Ana Martínez",
      especialidad: "Turismo Cultural",
      experiencia: 10,
      activo: true,
    },
    {
      id: 3,
      nombre: "Miguel López",
      especialidad: "Ecoturismo",
      experiencia: 6,
      activo: false,
    },
  ]

  const placeholderUsuarios = [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@example.com",
      role: "user",
      activo: true,
    },
    {
      id: 2,
      nombre: "María López",
      email: "maria@example.com",
      role: "user",
      activo: true,
    },
    {
      id: 3,
      nombre: "Admin",
      email: "admin@example.com",
      role: "admin",
      activo: true,
    },
  ]

  const placeholderReservas = [
    {
      id: 1,
      usuario: "Juan Pérez",
      destino: "Playa del Carmen",
      fechaInicio: "2023-12-15",
      fechaFin: "2023-12-22",
      personas: 2,
      estado: "Confirmada",
      precio: 2400,
    },
    {
      id: 2,
      usuario: "María López",
      destino: "Machu Picchu",
      fechaInicio: "2024-01-10",
      fechaFin: "2024-01-17",
      personas: 3,
      estado: "Pendiente",
      precio: 5400,
    },
    {
      id: 3,
      usuario: "Carlos Rodríguez",
      destino: "Venecia",
      fechaInicio: "2024-02-05",
      fechaFin: "2024-02-12",
      personas: 2,
      estado: "Cancelada",
      precio: 4400,
    },
  ]

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>
    }

    switch (activeTab) {
      case "destinos":
        return (
          <div className="table-responsive">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Nuevo Destino
              </button>
            </div>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {destinos.map((destino) => (
                  <tr key={destino.id}>
                    <td>{destino.id}</td>
                    <td>{destino.nombre}</td>
                    <td>{destino.descripcion.substring(0, 50)}...</td>
                    <td>${destino.precio}</td>
                    <td>
                      <span className={`badge ${destino.activo ? "bg-success" : "bg-danger"}`}>
                        {destino.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case "guias":
        return (
          <div className="table-responsive">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Nuevo Guía
              </button>
            </div>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Experiencia</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {guias.map((guia) => (
                  <tr key={guia.id}>
                    <td>{guia.id}</td>
                    <td>{guia.nombre}</td>
                    <td>{guia.especialidad}</td>
                    <td>{guia.experiencia} años</td>
                    <td>
                      <span className={`badge ${guia.activo ? "bg-success" : "bg-danger"}`}>
                        {guia.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case "usuarios":
        return (
          <div className="table-responsive">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Nuevo Usuario
              </button>
            </div>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role === "admin" ? "Administrador" : "Usuario"}</td>
                    <td>
                      <span className={`badge ${usuario.activo ? "bg-success" : "bg-danger"}`}>
                        {usuario.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case "reservas":
        return (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Destino</th>
                  <th>Fecha Inicio</th>
                  <th>Personas</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.usuario}</td>
                    <td>{reserva.destino}</td>
                    <td>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                    <td>{reserva.personas}</td>
                    <td>${reserva.precio}</td>
                    <td>
                      <span
                        className={`badge ${reserva.estado === "Confirmada" ? "bg-success" : reserva.estado === "Pendiente" ? "bg-warning text-dark" : "bg-danger"}`}
                      >
                        {reserva.estado}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Panel de Administración</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "destinos" ? "active" : ""}`}
            onClick={() => handleTabChange("destinos")}
          >
            Destinos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "guias" ? "active" : ""}`}
            onClick={() => handleTabChange("guias")}
          >
            Guías
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "usuarios" ? "active" : ""}`}
            onClick={() => handleTabChange("usuarios")}
          >
            Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "reservas" ? "active" : ""}`}
            onClick={() => handleTabChange("reservas")}
          >
            Reservas
          </button>
        </li>
      </ul>

      {renderContent()}
    </div>
  )
}

export default AdminPanel
