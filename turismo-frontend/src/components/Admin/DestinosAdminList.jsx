import { useEffect, useState } from "react";
import DestinoForm from "./DestinoForm";
import api from "../../api/api";

const DestinosAdminList = ({ onEdit }) => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/destinos/");
      setDestinos(response.data);
    } catch (err) {
      console.error("Error al cargar destinos:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está Seguro de eliminar este destino?")) return;

    try {
      await api.delete(`/destinos/${id}`);
      setDestinos(destinos.filter(d => d.id_destino !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert(error.response?.data?.error || error.message || "Error al eliminar");
    }
  };

  useEffect(() => {
    fetchDestinos();
  }, []);

  if (loading) return <div className="alert alert-info">Cargando destinos...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {destinos.map(destino => (
            <tr key={destino.id_destino}>
              <td>{destino.nombre}</td>
              <td>{destino.ubicacion}</td>
              <td>COP {destino.precio.toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(destino)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(destino.id_destino)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DestinosAdminList;
