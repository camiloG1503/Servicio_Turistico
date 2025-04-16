
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const GuiaDetalle = () => {
  const { id } = useParams()
  const [guia, setGuia] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { currentUser, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGuia = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/guias/${id}`)
        setGuia(response.data)
      } catch (error) {
        console.error("Error al cargar guía:", error)
        setError(error.response?.data?.mensaje || "Error al cargar los detalles del guía")
      } finally {
        setLoading(false)
      }
    }

    fetchGuia()
  }, [id])

  const handleDeleteGuia = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este guía? Esta acción no se puede deshacer.")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/guias/${id}`, config)
        navigate("/guias")
      } catch (error) {
        console.error("Error al eliminar guía:", error)
        setError(error.response?.data?.mensaje || "Error al eliminar el guía")
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando detalles del guía...</p>
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

  if (!guia) {
    return (
      <div className="text-center my-5">
        <i className="bi bi-person-x display-1 text-muted"></i>
        <h3 className="mt-3">Guía no encontrado</h3>
        <p className="text-muted">El guía que buscas no existe o ha sido eliminado.</p>
        <Link to="/guias" className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left me-2"></i>
          Volver a Guías
        </Link>
      </div>
    )
  }

  return (
    <div>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/guias">Guías</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {guia.nombre}
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={guia.foto || "https://via.placeholder.com/300?text=Guía"}
                alt={guia.nombre}
                className="img-fluid rounded-circle mb-3"
                style={{ maxWidth: "250px" }}
              />
              <div className="d-flex justify-content-center">
                <div className="text-warning mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${index < (guia.calificacion || 4) ? "bi-star-fill" : "bi-star"} me-1`}
                    ></i>
                  ))}
                  <span className="text-muted ms-2">({guia.totalResenas || 0} reseñas)</span>
                </div>
              </div>
              {isAdmin() && (
                <div className="mt-3">
                  <Link to={`/admin/guias/editar/${guia._id}`} className="btn btn-outline-primary me-2">
                    <i className="bi bi-pencil me-1"></i>
                    Editar
                  </Link>
                  <button className="btn btn-outline-danger" onClick={handleDeleteGuia}>
                    <i className="bi bi-trash me-1"></i>
                    Eliminar
                  </button>
                </div>
              )}
            </div>
            <div className="col-md-8">
              <h2 className="mb-3">{guia.nombre}</h2>

              <div className="mb-4">
                <h5>Sobre mí</h5>
                <p>{guia.descripcion || "No hay descripción disponible para este guía."}</p>
              </div>

              <div className="row mb-4">
                {/* Especialidades */}
                <div className="col-md-6">
                  <h5>Especialidades</h5>
                  {(() => {
                    const especialidades = Array.isArray(guia.especialidades)
                      ? guia.especialidades
                      : typeof guia.especialidades === "string"
                      ? guia.especialidades.split(",").map((e) => e.trim())
                      : []

                    return especialidades.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {especialidades.map((esp, index) => (
                          <li key={index} className="list-group-item px-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {esp}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No hay especialidades especificadas</p>
                    )
                  })()}
                </div>

                {/* Idiomas */}
                <div className="col-md-6">
                  <h5>Idiomas</h5>
                  {(() => {
                    const idiomas = Array.isArray(guia.idiomas)
                      ? guia.idiomas
                      : typeof guia.idiomas === "string"
                      ? guia.idiomas.split(",").map((i) => i.trim())
                      : []

                    return idiomas.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {idiomas.map((idioma, index) => (
                          <li key={index} className="list-group-item px-0">
                            <i className="bi bi-translate me-2"></i>
                            {idioma}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No hay idiomas especificados</p>
                    )
                  })()}
                </div>
              </div>

              <div className="mb-4">
                <h5>Experiencia</h5>
                <p>{guia.experiencia || "No hay información sobre la experiencia de este guía."}</p>
              </div>

              <div className="mb-4">
                <h5>Contacto</h5>
                <p>
                  <i className="bi bi-envelope me-2"></i>
                  {guia.email || "No disponible"}
                </p>
                <p>
                  <i className="bi bi-telephone me-2"></i>
                  {guia.telefono || "No disponible"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinos que guía */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light">
          <h4 className="mb-0">Destinos que guía</h4>
        </div>
        <div className="card-body">
          {guia.destinos && guia.destinos.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {guia.destinos.map((destino) => (
                <div className="col" key={destino._id}>
                  <div className="card h-100">
                    <img
                      src={destino.imagen || "https://via.placeholder.com/300x200?text=Destino"}
                      className="card-img-top"
                      alt={destino.nombre}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{destino.nombre}</h5>
                      <p className="card-text text-muted">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {destino.ubicacion}
                      </p>
                      <Link to={`/destinos/${destino._id}`} className="btn btn-sm btn-outline-primary">
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Este guía no tiene destinos asignados actualmente.</p>
          )}
        </div>
      </div>

      {/* Reseñas */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h4 className="mb-0">Reseñas de Turistas</h4>
        </div>
        <div className="card-body">
          {guia.resenas && guia.resenas.length > 0 ? (
            <div className="list-group list-group-flush">
              {guia.resenas.map((resena) => (
                <div key={resena._id} className="list-group-item border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <img
                        src={resena.usuario?.foto || "https://via.placeholder.com/40?text=U"}
                        alt={resena.usuario?.nombre}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div>
                        <h6 className="mb-0">{resena.usuario?.nombre || "Usuario Anónimo"}</h6>
                        <small className="text-muted">{new Date(resena.fecha).toLocaleDateString()}</small>
                      </div>
                    </div>
                    <div className="text-warning">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i
                          key={index}
                          className={`bi ${index < resena.calificacion ? "bi-star-fill" : "bi-star"} me-1`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="mb-0">{resena.comentario}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No hay reseñas disponibles para este guía.</p>
          )}

          {currentUser && (
            <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
              <Link to={`/resenas/nueva?guiaId=${id}`} className="btn btn-outline-primary">
                <i className="bi bi-star me-2"></i>
                Escribir una Reseña
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuiaDetalle
