import React, { useEffect, useState } from "react";
import DestinoCard from "../components/Destinos/DestinoCard";
import "../components/Destinos/DestinoCard.css";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import SpinnerCentered from "../components/UI/SpinnerCentered";
import EmptyState from "../components/UI/EmptyState";
import api from "../api/api";

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSort, setPriceSort] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeFilter, setActiveFilter] = useState("todos");

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await api.get("/destinos/");
        const data = response.data;
        setDestinos(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error al cargar los destinos:", err);
        // Mostrar un mensaje de error al usuario si es necesario
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  useEffect(() => {
    let result = destinos.filter((destino) =>
      destino.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtro por categoría con lógica específica
    if (activeFilter === "playa") {
      result = result.filter(destino => destino.nombre.toLowerCase().includes("san andrés"));
    } else if (activeFilter === "montaña") {
      result = result.filter(destino => 
        destino.nombre.toLowerCase().includes("guatape") || 
        destino.nombre.toLowerCase().includes("medellin")
      );
    } else if (activeFilter === "ciudad") {
      result = result.filter(destino => 
        destino.nombre.toLowerCase().includes("cali") || 
        destino.nombre.toLowerCase().includes("comuna 13")
      );
    }

    // Ordenamiento por precio
    if (priceSort === 'asc') {
      result.sort((a, b) => a.precio - b.precio);
    } else if (priceSort === 'desc') {
      result.sort((a, b) => b.precio - a.precio);
    }

    setFiltered(result);
  }, [searchTerm, destinos, priceSort, activeFilter]);

  const togglePriceSort = () => {
    setPriceSort(prev => {
      if (prev === null) return 'asc';
      if (prev === 'asc') return 'desc';
      return null;
    });
  };

  const handleFilter = (category) => {
    setActiveFilter(category);
    setVisibleCount(4);
  };

  if (loading) return <SpinnerCentered text="Cargando destinos turísticos..." />;

  return (
    <SectionWrapper>
      <PageHeader
        iconClass="bi-globe-americas"
        title="Explora Nuestros Destinos"
        subtitle="Descubre los lugares más increíbles para tu próxima aventura"
      />

      <div className="destinos-controls mb-5">
        <div className="search-container mb-4">
          <div className="input-group search-input">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Buscar destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div className="filter-buttons">
            <button 
              className={`btn btn-filter ${activeFilter === 'todos' ? 'active' : ''}`}
              onClick={() => handleFilter('todos')}
            >
              <i className="bi bi-collection me-2"></i>Todos
            </button>
            <button 
              className={`btn btn-filter ${activeFilter === 'playa' ? 'active' : ''}`}
              onClick={() => handleFilter('playa')}
            >
              <i className="bi bi-umbrella me-2"></i>Playa
            </button>
            <button 
              className={`btn btn-filter ${activeFilter === 'montaña' ? 'active' : ''}`}
              onClick={() => handleFilter('montaña')}
            >
              <i className="bi bi-mountain me-2"></i>Montaña
            </button>
            <button 
              className={`btn btn-filter ${activeFilter === 'ciudad' ? 'active' : ''}`}
              onClick={() => handleFilter('ciudad')}
            >
              <i className="bi bi-buildings me-2"></i>Ciudad
            </button>
          </div>

          <div className="sort-container">
            <button 
              className={`btn btn-sort ${priceSort ? 'active' : ''}`}
              onClick={togglePriceSort}
            >
              {priceSort === 'asc' && <i className="bi bi-sort-numeric-down me-2"></i>}
              {priceSort === 'desc' && <i className="bi bi-sort-numeric-up me-2"></i>}
              {!priceSort && <i className="bi bi-arrow-down-up me-2"></i>}
              Ordenar por precio {priceSort === 'asc' ? '(Menor a mayor)' : priceSort === 'desc' ? '(Mayor a menor)' : ''}
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState 
          message="No encontramos destinos que coincidan con tu búsqueda."
          icon="bi-binoculars"
          actionText="Reiniciar filtros"
          onAction={() => {
            setSearchTerm("");
            setActiveFilter("todos");
            setPriceSort(null);
          }}
        />
      ) : (
        <>
          <div className="row g-4">
            {filtered.slice(0, visibleCount).map((destino) => (
              <DestinoCard key={destino.id_destino} destino={destino} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="text-center mt-5">
              <button
                className="btn btn-load-more"
                onClick={() => setVisibleCount((prev) => prev + 4)}
              >
                <i className="bi bi-arrow-down-circle me-2"></i>
                Mostrar más destinos
              </button>
            </div>
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default Destinos;
