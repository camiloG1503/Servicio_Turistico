"use client"

import { useState, useEffect } from "react"
import GuiaCard from "../components/Guias/GuiaCard"
import { fetchData } from "../api/api"

const Guias = () => {
  const [guias, setGuias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGuias = async () => {
      try {
        const data = await fetchData("/guias")
        setGuias(data)
      } catch (error) {
        console.error("Error fetching guias:", error)
        setError("Error al cargar los guías. Por favor, inténtalo de nuevo más tarde.")
        // Use placeholder data if API fails
        setGuias(placeholderGuias)
      } finally {
        setLoading(false)
      }
    }

    fetchGuias()
  }, [])

  // Placeholder data in case API fails
  const placeholderGuias = [
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      especialidad: "Montañismo",
      experiencia: 8,
      imagen:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      nombre: "Ana Martínez",
      especialidad: "Turismo Cultural",
      experiencia: 10,
      imagen:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
    },
    {
      id: 3,
      nombre: "Miguel López",
      especialidad: "Ecoturismo",
      experiencia: 6,
      imagen:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      nombre: "Laura Sánchez",
      especialidad: "Turismo Gastronómico",
      experiencia: 7,
      imagen:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
    },
    {
      id: 5,
      nombre: "Javier Torres",
      especialidad: "Turismo de Aventura",
      experiencia: 9,
      imagen:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      id: 6,
      nombre: "Sofía Ramírez",
      especialidad: "Turismo Histórico",
      experiencia: 12,
      imagen:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
    },
  ]

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Nuestros Guías Turísticos</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {guias.map((guia) => (
              <GuiaCard key={guia.id} guia={guia} />
            ))}
          </div>

          <div className="mt-5">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">¿Quieres unirte a nuestro equipo de guías?</h3>
                <p className="card-text">
                  Si eres un guía turístico con experiencia y pasión por mostrar lo mejor de nuestros destinos, nos
                  encantaría contar contigo.
                </p>
                <a href="#" className="btn btn-primary">
                  Más Información
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Guias
