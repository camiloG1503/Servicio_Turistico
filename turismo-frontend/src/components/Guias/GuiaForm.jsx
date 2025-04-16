"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const GuiaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    descripcion: "",
    especialidades: "",
    idiomas: "",
    experiencia: "",
    foto: "",
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(isEditing)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEditing) {
      const fetchGuia = async () => {
        try {
          const token = localStorage.getItem("token")
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          const response = await axios.get(`http://localhost:5000/api/guias/${id}`, config)
          const guia = response.data

          setFormData({
            nombre: guia.nombre || "",
            email: guia.email || "",
            telefono: guia.telefono || "",
            descripcion: guia.descripcion || "",
            especialidades: guia.especialidades ? guia.especialidades.join(", ") : "",
            idiomas: guia.idiomas ? guia.idiomas.join(", ") : "",
            experiencia: guia.experiencia || "",
            foto: guia.foto || "",
          })
        } catch (error) {
          console.error("Error al cargar guía:", error)
          setError(error.response?.data?.mensaje || "Error al cargar los datos del guía")
        } finally {
          setLoadingData(false)
        }
      }

      fetchGuia()
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

      // Convertir especialidades e idiomas de string a array
      const dataToSend = {
        ...formData,
        especialidades: formData.especialidades ? formData.especialidades.split(",").map((item) => item.trim()) : [],
        idiomas: formData.idiomas ? formData.idiomas.split(",").map((item) => item.trim()) : [],
      }

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/guias/${id}`, dataToSend, config)
      } else {
        await axios.post("http://localhost:5000/api/guias/", dataToSend, config)
      }

      navigate("/guias")
    } catch (error) {
      console.error("Error al guardar guía:", error)
      setError(error.response?.data?.mensaje || `Error al ${isEditing ? "actualizar" : "crear"} el guía`)
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
        <p className="mt-3">Cargando datos del guía...</p>
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
            <Link to="/guias">Guías</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {isEditing ? "Editar Guía" : "Nuevo Guía"}
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className={`bi ${isEditing ? "bi-pencil" : "bi-plus-circle"} me-2`}></i>
            {isEditing ? "Editar Guía" : "Nuevo Guía"}
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
                  Nombre Completo
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
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="foto" className="form-label">
                  URL de Foto
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="foto"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/foto.jpg"
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
                rows="3"
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="especialidades" className="form-label">
                Especialidades (separadas por comas)
              </label>
              <input
                type="text"
                className="form-control"
                id="especialidades"
                name="especialidades"
                value={formData.especialidades}
                onChange={handleChange}
                placeholder="Ecoturismo, Turismo de aventura, Turismo cultural"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="idiomas" className="form-label">
                Idiomas (separados por comas)
              </label>
              <input
                type="text"
                className="form-control"
                id="idiomas"
                name="idiomas"
                value={formData.idiomas}
                onChange={handleChange}
                placeholder="Español, Inglés, Francés"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="experiencia" className="form-label">
                Experiencia
              </label>
              <textarea
                className="form-control"
                id="experiencia"
                name="experiencia"
                rows="3"
                value={formData.experiencia}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link to="/guias" className="btn btn-outline-secondary me-md-2">
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
                    {isEditing ? "Actualizar Guía" : "Crear Guía"}
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

export default GuiaForm
