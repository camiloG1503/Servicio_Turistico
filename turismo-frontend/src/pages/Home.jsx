"use client"

import React from "react"
import HomeBanner from "../components/HomeBanner/HomeBanner"
import DestinoCard from "../components/Destinos/DestinoCard"
import { fetchData } from "../api/api"
import { Link } from "react-router-dom"

const Home = () => {
  const [destinos, setDestinos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const data = await fetchData("/destinos?limit=3")
        setDestinos(data)
      } catch (error) {
        console.error("Error fetching destinos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinos()
  }, [])

  // Placeholder data in case API fails
  const placeholderDestinos = [
    {
      id: 1,
      nombre: "Playa del Carmen",
      descripcion: "Hermosas playas de arena blanca y aguas cristalinas.",
      imagen:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      precio: 1200,
    },
    {
      id: 2,
      nombre: "Machu Picchu",
      descripcion: "Antigua ciudad inca en lo alto de los Andes peruanos.",
      imagen:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      precio: 1800,
    },
    {
      id: 3,
      nombre: "Venecia",
      descripcion: "Ciudad de canales y arquitectura histórica en Italia.",
      imagen:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      precio: 2200,
    },
  ]

  const displayDestinos = destinos.length > 0 ? destinos : placeholderDestinos

  return (
    <div>
      <HomeBanner />

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Destinos Populares</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row">
                {displayDestinos.map((destino) => (
                  <DestinoCard key={destino.id} destino={destino} />
                ))}
              </div>

              <div className="text-center mt-4">
                <Link to="/destinos" className="btn btn-outline-primary">
                  Ver Todos los Destinos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2>¿Por qué elegirnos?</h2>
              <p className="lead">
                Ofrecemos experiencias turísticas únicas con guías expertos y precios competitivos.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i> Destinos exclusivos
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i> Guías profesionales
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i> Seguridad garantizada
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i> Precios competitivos
                </li>
              </ul>
              <Link to="/informacion" className="btn btn-primary mt-3">
                Más Información
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
                alt="Turistas felices"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
