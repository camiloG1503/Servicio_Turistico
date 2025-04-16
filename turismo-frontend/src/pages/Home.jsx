"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Home = () => {
  const [destinosDestacados, setDestinosDestacados] = useState([])
  const [guiasDestacados, setGuiasDestacados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener destinos destacados (limitados a 3)
        const destinosResponse = await axios.get("http://localhost:5000/api/destinos/")
        setDestinosDestacados(destinosResponse.data.slice(0, 3))

        // Obtener guías destacados (limitados a 4)
        const guiasResponse = await axios.get("http://localhost:5000/api/guias/")
        setGuiasDestacados(guiasResponse.data.slice(0, 4))
      } catch (error) {
        console.error("Error al cargar datos para la página de inicio:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white rounded-3 p-5 mb-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-3">Descubre el mundo con nosotros</h1>
            <p className="lead mb-4">
              Explora destinos increíbles con los mejores guías turísticos. Vive experiencias inolvidables y crea
              recuerdos que durarán toda la vida.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/destinos" className="btn btn-light btn-lg px-4 me-md-2">
                <i className="bi bi-geo-alt me-2"></i>
                Explorar Destinos
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg px-4">
                <i className="bi bi-person-plus me-2"></i>
                Registrarse
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src="https://via.placeholder.com/600x400?text=Turismo+Aventura"
              alt="Turismo de Aventura"
              className="img-fluid rounded-3 mt-4 mt-lg-0"
            />
          </div>
        </div>
      </section>

      {/* Destinos Destacados */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="bi bi-geo-alt me-2"></i>
            Destinos Destacados
          </h2>
          <Link to="/destinos" className="btn btn-outline-primary">
            Ver Todos <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {destinosDestacados.length > 0 ? (
              destinosDestacados.map((destino) => (
                <div className="col" key={destino._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={destino.imagen || "https://via.placeholder.com/300x200?text=Destino+Turístico"}
                      className="card-img-top"
                      alt={destino.nombre}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{destino.nombre}</h5>
                      <p className="card-text text-muted">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {destino.ubicacion}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary rounded-pill">
                          <i className="bi bi-currency-dollar me-1"></i>
                          {destino.precio}
                        </span>
                        <Link to={`/destinos/${destino._id}`} className="btn btn-sm btn-outline-primary">
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">No hay destinos destacados disponibles.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Guías Destacados */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="bi bi-people me-2"></i>
            Guías Destacados
          </h2>
          <Link to="/guias" className="btn btn-outline-primary">
            Ver Todos <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {guiasDestacados.length > 0 ? (
              guiasDestacados.map((guia) => (
                <div className="col" key={guia._id}>
                  <div className="card h-100 shadow-sm text-center">
                    <div className="pt-3">
                      <img
                        src={guia.foto || "https://via.placeholder.com/100?text=Guía"}
                        className="rounded-circle"
                        alt={guia.nombre}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{guia.nombre}</h5>
                      <div className="text-warning mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <i
                            key={index}
                            className={`bi ${index < (guia.calificacion || 4) ? "bi-star-fill" : "bi-star"} me-1`}
                          ></i>
                        ))}
                      </div>
                      <Link to={`/guias/${guia._id}`} className="btn btn-sm btn-outline-primary">
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">No hay guías destacados disponibles.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sección de Beneficios */}
      <section className="mb-5">
        <div className="card bg-light border-0">
          <div className="card-body p-4">
            <h2 className="text-center mb-4">¿Por qué elegirnos?</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
              <div className="col">
                <div className="p-3">
                  <i className="bi bi-shield-check text-primary display-4 mb-3"></i>
                  <h4>Seguridad Garantizada</h4>
                  <p className="text-muted">
                    Todos nuestros tours cuentan con medidas de seguridad y guías certificados para tu tranquilidad.
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <i className="bi bi-cash-coin text-primary display-4 mb-3"></i>
                  <h4>Precios Competitivos</h4>
                  <p className="text-muted">
                    Ofrecemos la mejor relación calidad-precio en todos nuestros paquetes turísticos.
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <i className="bi bi-heart text-primary display-4 mb-3"></i>
                  <h4>Experiencias Únicas</h4>
                  <p className="text-muted">
                    Creamos experiencias personalizadas que se adaptan a tus intereses y necesidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-5">
        <div className="card bg-primary text-white">
          <div className="card-body p-5 text-center">
            <h2 className="mb-3">¿Listo para tu próxima aventura?</h2>
            <p className="lead mb-4">Regístrate ahora y comienza a planificar tu próximo viaje con nosotros.</p>
            <Link to="/register" className="btn btn-light btn-lg">
              <i className="bi bi-person-plus me-2"></i>
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
