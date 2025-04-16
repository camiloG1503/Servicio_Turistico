"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const PagosAdmin = () => {
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get("http://localhost:5000/api/pagos/", config)
        setPagos(response.data)
      } catch (error) {
        console.error("Error al cargar pagos:", error)
        setError(error.response?.data?.mensaje || "Error al cargar los pagos")
      } finally {
        setLoading(false)
      }
    }

    fetchPagos()
  }, [])

  const handleCambiarEstado = async (pagoId, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.put(
        `http://localhost:5000/api/pagos/${pagoId}`,
        { estado: nuevoEstado },
        config
      )

      // Actualizar la lista de pagos
      setPagos((prevPagos) =>
        prevPagos.map((pago) =>
          pago._id === pagoId ? { ...pago, estado: nuevoEstado } : pago
        )
      )
    } catch (error) {
      console.error("Error al cambiar estado de pago:", error)
      setError(error.response?.data?.mensaje || "Error al actualizar el estado del pago")
    }
  }

  // Filtrar pagos por estado y búsqueda
  const pagosFiltrados = pagos.filter(
    (pago) =>
      (filtroEstado === "todos" || pago.estado === filtroEstado) &&
      (busqueda === "" ||
        pago.usuario?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        pago.reserva?.destino?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        pago._id?.toLowerCase().includes(busqueda.toLowerCase()))
  )

  // Calcular estadísticas
  const totalMonto = pagosFiltrados.reduce((total, pago) => total + (pago.monto || 0), 0)
  const pagosCompletados = pagosFiltrados.filter((pago) => pago.estado === "completado")
  const montoCompletado = pagosCompletados.reduce((total, pago) => total + (pago.monto || 0), 0)

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando pagos...</p>
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
        <i className="bi bi-credit-card me-2"></i>
        Gestión de Pagos
      </h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Total de Pagos</h5>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{pagos.length}</h2>
                <i className="bi bi-credit-card fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Pagos Completados</h5>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{pagosCompletados.length}</h2>
                <i className="bi bi-check-circle fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Monto Total</h5>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">${montoCompletado.toFixed(2)}</h2>
                <i className="bi bi-cash-stack fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  placeholder="Buscar por usuario, destino o ID..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select
                className="form-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div className="col-md-2">
              <span className="badge bg-primary rounded-pill p-2">
                Total: {pagosFiltrados.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {pagosFiltrados.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No hay pagos que coincidan con los criterios de búsqueda.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Destino</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pagosFiltrados.map((pago) => (
                <tr key={pago._id}>
                  <td>{pago._id}</td>
                  <td>{pago.usuario?.nombre || "N/A"}</td>
                  <td>{pago.reserva?.destino?.nombre || "N/A"}</td>
                  <td>${pago.monto?.toFixed(2) || "0.00"}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(pago.estado)}`}>
                      {pago.estado}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={pago.estado}
                      onChange={(e) => handleCambiarEstado(pago._id, e.target.value)}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="completado">Completado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PagosAdmin