import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ResenaItem from "./ResenaItem";
import FormResena from "./FormResena";
import api from "../../api/api";

const ListaResenas = () => {
  const { usuario } = useAuth();
  const [resenas, setResenas] = useState([]);
  const [filteredResenas, setFilteredResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filtroCalificacion, setFiltroCalificacion] = useState("todas");
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchResenas = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/resenas");
      const data = response.data;

      setResenas(data);
      setFilteredResenas(sortResenas(data, sortOrder));
    } catch (err) {
      console.error("Error al cargar reseñas:", err);
      const errorMessage = err.response?.data?.mensaje || 
                          err.response?.data?.error || 
                          err.message || 
                          "Error al cargar reseñas";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta reseña?")) return;

    try {
      await api.delete(`/resenas/${id}`);
      fetchResenas();
    } catch (err) {
      console.error("Error al eliminar:", err);
      const errorMessage = err.response?.data?.mensaje || 
                          err.response?.data?.error || 
                          err.message || 
                          "No se pudo eliminar la reseña";
      alert(errorMessage);
    }
  };

  const sortResenas = (resenas, order) => {
    return [...resenas].sort((a, b) => {
      return order === "asc"
        ? a.calificacion - b.calificacion || a.fecha.localeCompare(b.fecha)
        : b.calificacion - a.calificacion || b.fecha.localeCompare(a.fecha);
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    fetchResenas();
  }, []);

  useEffect(() => {
    let result = resenas.filter((resena) => {
      const matchesSearch = 
        resena.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resena.comentario.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCalificacion = 
        filtroCalificacion === "todas" || 
        resena.calificacion.toString() === filtroCalificacion;

      return matchesSearch && matchesCalificacion;
    });

    setFilteredResenas(sortResenas(result, sortOrder));
    setVisibleCount(4);
  }, [searchTerm, resenas, sortOrder, filtroCalificacion]);

  const renderResenaGroups = () => {
    const groups = [];
    for (let i = 0; i < Math.min(visibleCount, filteredResenas.length); i += 4) {
      groups.push(
        <div key={`group-${i}`} className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
          {filteredResenas.slice(i, i + 4).map((resena) => (
            <div key={resena.id_resena} className="col">
              <ResenaItem
                resena={resena}
                puedeEliminar={
                  usuario?.rol === "admin" || 
                  (usuario?.rol === "turista" && resena.id_usuario === usuario.id_usuario)
                }
                puedeEditar={
                  usuario?.rol === "turista" && resena.id_usuario === usuario.id_usuario
                }
                onDelete={() => handleDelete(resena.id_resena)}
                onUpdated={fetchResenas}
              />
            </div>
          ))}
        </div>
      );
    }
    return groups;
  };

  return (
    <div className="container py-4">
      {usuario?.rol === "turista" && (
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">
              <i className="bi bi-pencil-square me-2"></i>
              Comparte tu experiencia
            </h5>
            <FormResena onSuccess={fetchResenas} id_usuario={usuario.id_usuario} />
          </div>
        </div>
      )}

      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar reseñas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filtroCalificacion}
                onChange={(e) => setFiltroCalificacion(e.target.value)}
              >
                <option value="todas">Todas las calificaciones</option>
                <option value="5">⭐ 5 estrellas</option>
                <option value="4">⭐ 4 estrellas</option>
                <option value="3">⭐ 3 estrellas</option>
                <option value="2">⭐ 2 estrellas</option>
                <option value="1">⭐ 1 estrella</option>
              </select>
            </div>

            <div className="col-md-3">
              <button
                className={`btn w-100 ${sortOrder ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={toggleSortOrder}
              >
                <i className={`bi ${sortOrder === "asc" ? "bi-sort-down" : "bi-sort-up"} me-2`}></i>
                {sortOrder === "asc" ? "Menor valoradas" : "Mejor valoradas"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando reseñas...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            <strong>Error al cargar reseñas:</strong> {error}
            <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchResenas}>
              Reintentar
            </button>
          </div>
        </div>
      )}

      {!loading && !error && filteredResenas.length === 0 && (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-chat-square-text text-muted" style={{ fontSize: "3rem" }}></i>
            <h5 className="mt-3 text-muted">No hay reseñas disponibles</h5>
            <p className="text-muted">¡Sé el primero en compartir tu experiencia!</p>
            {usuario?.rol === "turista" && (
              <button 
                className="btn btn-primary mt-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="bi bi-pencil-square me-2"></i>
                Escribir reseña
              </button>
            )}
          </div>
        </div>
      )}

      {!loading && !error && filteredResenas.length > 0 && (
        <>
          {renderResenaGroups()}

          {visibleCount < filteredResenas.length && (
            <div className="text-center mt-3">
              <button 
                className="btn btn-primary px-4"
                onClick={loadMore}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Mostrar más reseñas
              </button>
            </div>
          )}

          <div className="text-center text-muted mt-3">
            Mostrando {Math.min(visibleCount, filteredResenas.length)} de {filteredResenas.length} reseñas
          </div>
        </>
      )}
    </div>
  );
};

export default ListaResenas;
