"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const PagosTurista = () => {
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
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

        // Obtener pagos del usuario
        const response = await axios.get("http://localhost:5000/api/pagos/", config)
        setPagos(response.data)
      } catch (error) {
        console.error("Error al cargar pagos:", error)
        setError(error.response?.data?.mensaje || "Error al cargar tus pagos")
      } finally {
        setLoading(false)
      }
    }

    fetchPagos()
  }, [])

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando tus pagos...</p>
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
        Mis Pagos
      </h2>

      {pagos.length === 0 ? (
        <div className="text-center my-5">
          <i className="bi bi-credit-card display-1 text-muted"></i>
          <h3 className="mt-3">No tienes pagos registrados</h3>
          <p className="text-muted mb-4">Cuando realices pagos por tus reservas, aparecerán aquí.</p>
          <Link to="/mis-reservas" className="btn btn-primary">
            <i className="bi bi-calendar-check me-2"></i>
            Ver Mis Reservas
          </Link>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-light">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="mb-0">Historial de Pagos</h5>
              </div>
              <div className="col-auto">
                <span className="badge bg-primary rounded-pill">
                  Total: {pagos.length} {pagos.length === 1 ? "pago" : "pagos"}
                </span>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID de Pago</th>
                  <th>Fecha</th>
                  <th>Reserva</th>
                  <th>Método</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Comprobante</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((pago) => (
                  <tr key={pago._id}>
                    <td>
                      <small className="text-muted">#{pago._id.substring(0, 8)}</small>
                    </td>
                    <td>{new Date(pago.fecha).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/mis-reservas`} className="text-decoration-none">
                        {pago.reserva?.destino?.nombre || "Reserva"}
                      </Link>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">
                        {pago.metodoPago === "tarjeta" ? (
                          <i className="bi bi-credit-card me-1"></i>
                        ) : pago.metodoPago === "transferencia" ? (
                          <i className="bi bi-bank me-1"></i>
                        ) : (
                          <i className="bi bi-cash me-1"></i>
                        )}
                        {pago.metodoPago}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          pago.estado === "completado"
                            ? "bg-success"
                            : pago.estado === "pendiente"
                              ? "bg-warning"
                              : "bg-danger"
                        }`}
                      >
                        {pago.estado}
                      </span>
                    </td>
                    <td className="fw-bold">${pago.monto.toFixed(2)}</td>
                    <td>
                      {pago.comprobante ? (
                        <a
                          href={pago.comprobante}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-file-earmark-text me-1"></i>
                          Ver
                        </a>
                      ) : (
                        <span className="text-muted">No disponible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Métodos de Pago</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-credit-card me-2 text-primary"></i>
                    Tarjeta de Crédito/Débito
                  </h5>
                  <p className="card-text text-muted">
                    Paga de forma segura con tu tarjeta. Aceptamos Visa, MasterCard y American Express.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-bank me-2 text-primary"></i>
                    Transferencia Bancaria
                  </h5>
                  <p className="card-text text-muted">
                    Realiza una transferencia a nuestra cuenta bancaria y envíanos el comprobante.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-cash me-2 text-primary"></i>
                    Efectivo
                  </h5>
                  <p className="card-text text-muted">
                    Paga en efectivo directamente en nuestras oficinas antes de la fecha de tu reserva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PagosTurista
