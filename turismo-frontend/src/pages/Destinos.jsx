"use client"

import { useState, useEffect } from "react"
import DestinoCard from "../components/Destinos/DestinoCard"
import { fetchData } from "../api/api"

const Destinos = () => {
  const [destinos, setDestinos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtro, setFiltro] = useState("")
  const [ordenarPor, setOrdenarPor] = useState("nombre")

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const data = await fetchData("/destinos")
        setDestinos(data)
      } catch (error) {
        console.error("Error fetching destinos:", error)
        setError("Error al cargar los destinos. Por favor, inténtalo de nuevo más tarde.")
        // Use placeholder data if API fails
        setDestinos(placeholderDestinos)
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
    {
      id: 4,
      nombre: "Tokio",
      descripcion: "Capital de Japón, mezcla de lo tradicional y lo ultramoderno.",
      imagen:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      precio: 2500,
    },
    {
      id: 5,
      nombre: "Santorini",
      descripcion: "Isla griega con impresionantes vistas al mar Egeo.",
      imagen:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      precio: 1900,
    },
    {
      id: 6,
      nombre: "Nueva York",
      descripcion: "La Gran Manzana, ciudad que nunca duerme.",
      imagen:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      precio: 2300,
    },
  ]

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }

  const handleOrdenarChange = (e) => {
    setOrdenarPor(e.target.value)
  }

  const destinosFiltrados = destinos.filter(
    (destino) =>
      destino.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      destino.descripcion.toLowerCase().includes(filtro.toLowerCase()),
  )

  const destinosOrdenados = [...destinosFiltrados].sort((a, b) => {
    if (ordenarPor === "nombre") {
      return a.nombre.localeCompare(b.nombre)
    } else if (ordenarPor === "precioAsc") {
      return a.precio - b.precio
    } else if (ordenarPor === "precioDesc") {
      return b.precio - a.precio
    }
    return 0
  })

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Nuestros Destinos</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar destinos..."
              value={filtro}
              onChange={handleFiltroChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">Ordenar por</span>
            <select className="form-select" value={ordenarPor} onChange={handleOrdenarChange}>
              <option value="nombre">Nombre</option>
              <option value="precioAsc">Precio: Menor a Mayor</option>
              <option value="precioDesc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {destinosOrdenados.length > 0 ? (
            destinosOrdenados.map((destino) => <DestinoCard key={destino.id} destino={destino} />)
          ) : (
            <div className="col-12 text-center">
              <p>No se encontraron destinos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Destinos
