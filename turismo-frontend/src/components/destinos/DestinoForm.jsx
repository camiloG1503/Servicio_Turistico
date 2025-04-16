"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const DestinoForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    descripcion: "",
    precio: "",
    duracion: "",
    capacidad: "",
    actividades: "",
    imagen: "",
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(isEditing)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEditing) {
      const fetchDestino = async () => {
        try {
          const token = localStorage.getItem("token")
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          const response = await axios.get(`http://localhost:5000/api/destinos/${id}`, config)
          const destino = response.data

          setFormData({
            nombre: destino.nombre || "",
            ubicacion: destino.ubicacion || "",
            descripcion: destino.descripcion || "",
            precio: destino.precio || "",
            duracion: destino.duracion || "",
            capacidad: destino.capacidad || "",
            actividades: destino.actividades ? destino.actividades.join(", ") : "",
            imagen: destino.imagen || "",
          })
        } catch (error) {
          console.error("Error al cargar destino:", error)
          setError(error.response?.data?.mensaje || "Error al cargar los datos del destino")
        } finally {
          setLoadingData(false)
        }
      }

      fetchDestino()
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
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

      // Convertir actividades de string a array
      const dataToSend = {
        ...formData,
        precio: Number.parseFloat(formData.precio),
        capacidad: Number.parseInt(formData.capacidad, 10) || undefined,
        actividades: formData.actividades ? formData.actividades.split(",").map((item) => item.trim()) : [],
      }

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/destinos/${id}`, dataToSend, config)
      } else {
        await axios.post("http://localhost:5000/api/destinos/", dataToSend, config)
      }

      navigate("/destinos")
    } catch (error) {
      console.error("Error al guardar destino:", error)
      setError(error.response?.data?.mensaje || `Error al ${isEditing ? "actualizar" : "crear"} el destino`)
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
        <p className="mt-3">Cargando datos del destino...</p>
      </div>
    )
  }

  return (
    <div>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/destinos">Destinos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {isEditing ? "Editar Destino" : "Nuevo Destino"}
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className={`bi ${isEditing ? "bi-pencil" : "bi-plus-circle"} me-2`}></i>
            {isEditing ? "Editar Destino" : "Nuevo Destino"}
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
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre del Destino
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="ubicacion" className="form-label">
                  Ubicación
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="precio" className="form-label">
                  Precio ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="duracion" className="form-label">
                  Duración
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="duracion"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  placeholder="Ej: 3 días, 5 horas"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="capacidad" className="form-label">
                  Capacidad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="capacidad"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="actividades" className="form-label">
                Actividades (separadas por comas)
              </label>
              <input
                type="text"
                className="form-control"
                id="actividades"
                name="actividades"
                value={formData.actividades}
                onChange={handleChange}
                placeholder="Ej: Senderismo, Natación, Fotografía"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="imagen" className="form-label">
                URL de Imagen
              </label>
              <input
                type="url"
                className="form-control"
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.imagen && (
                <div className="mt-2">
                  <img
                    src={formData.imagen || "/placeholder.svg"}
                    alt="Vista previa"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link to="/destinos" className="btn btn-outline-secondary me-md-2">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? "Actualizando..." : "Guardando..."}
                  </>
                ) : (
                  <>
                    <i className={`bi ${isEditing ? "bi-check-circle" : "bi-plus-circle"} me-2`}></i>
                    {isEditing ? "Actualizar Destino" : "Crear Destino"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DestinoForm
