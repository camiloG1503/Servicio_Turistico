"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    usuarios: { total: 0, turistas: 0, guias: 0, admins: 0 },
    destinos: { total: 0 },
    reservas: { total: 0, pendientes: 0, completadas: 0, canceladas: 0 },
    pagos: { total: 0, monto: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get("http://localhost:5000/api/admin/dashboard", config)
        console.log("Dashboard data:", response.data) // 👉 Depuración
        setStats(response.data)
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error)
        setError(error.response?.data?.mensaje || "Error al cargar los datos del dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando datos del dashboard...</p>
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
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard de Administración
        </h2>
        <div className="text-muted">
          <i className="bi bi-calendar3 me-2"></i>
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="alert alert-info mb-4" role="alert">
        <div className="d-flex">
          <div className="me-3">
            <i className="bi bi-person-circle fs-3"></i>
          </div>
          <div>
            <h5 className="alert-heading">¡Bienvenido, {currentUser?.nombre || "Admin"}!</h5>
            <p className="mb-0">Desde este panel podrás gestionar todos los aspectos de tu servicio turístico.</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title">Usuarios</h6>
                  <h2 className="display-6 fw-bold mb-0">{stats.usuarios?.total ?? 0}</h2>
                </div>
                <div className="bg-white rounded-circle p-2 text-primary">
                  <i className="bi bi-people fs-3"></i>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between small">
                  <span>Turistas: {stats.usuarios?.turistas ?? 0}</span>
                  <span>Guías: {stats.usuarios?.guias ?? 0}</span>
                  <span>Admins: {stats.usuarios?.admins ?? 0}</span>
                </div>
              </div>
            </div>
            <div className="card-footer bg-primary border-0">
              <Link to="/admin/usuarios" className="text-white text-decoration-none small">
                Ver detalles <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title">Destinos</h6>
                  <h2 className="display-6 fw-bold mb-0">{stats.destinos?.total ?? 0}</h2>
                </div>
                <div className="bg-white rounded-circle p-2 text-success">
                  <i className="bi bi-geo-alt fs-3"></i>
                </div>
              </div>
              <div className="mt-3">
                <div className="progress bg-success bg-opacity-50" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-white"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-success border-0">
              <Link to="/admin/destinos" className="text-white text-decoration-none small">
                Ver detalles <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title">Reservas</h6>
                  <h2 className="display-6 fw-bold mb-0">{stats.reservas?.total ?? 0}</h2>
                </div>
                <div className="bg-white rounded-circle p-2 text-warning">
                  <i className="bi bi-calendar-check fs-3"></i>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between small">
                  <span>Pendientes: {stats.reservas?.pendientes ?? 0}</span>
                  <span>Completadas: {stats.reservas?.completadas ?? 0}</span>
                </div>
              </div>
            </div>
            <div className="card-footer bg-warning border-0">
              <Link to="/admin/reservas" className="text-dark text-decoration-none small">
                Ver detalles <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title">Pagos</h6>
                  <h2 className="display-6 fw-bold mb-0">
                    ${stats.pagos?.monto?.toFixed(2) ?? "0.00"}
                  </h2>
                </div>
                <div className="bg-white rounded-circle p-2 text-info">
                  <i className="bi bi-credit-card fs-3"></i>
                </div>
              </div>
              <div className="mt-3">
                <div className="small">Total de transacciones: {stats.pagos?.total ?? 0}</div>
              </div>
            </div>
            <div className="card-footer bg-info border-0">
              <Link to="/admin/pagos" className="text-white text-decoration-none small">
                Ver detalles <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default AdminDashboard
