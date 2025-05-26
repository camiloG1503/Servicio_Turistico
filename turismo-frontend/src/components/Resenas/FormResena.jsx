import { useState, useEffect } from "react";
import api from "../../api/api";

const FormResena = ({ initialData = null, onSuccess, id_usuario }) => {
  const [form, setForm] = useState({
    id_destino: "",
    calificacion: 5,
    comentario: ""
  });

  const [destinos, setDestinos] = useState([]);
  const [loadingDestinos, setLoadingDestinos] = useState(true);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await api.get("/destinos/");
        setDestinos(response.data);
      } catch (error) {
        console.error("Error al cargar destinos:", error);
      } finally {
        setLoadingDestinos(false);
      }
    };

    fetchDestinos();

    if (initialData) {
      setForm({
        id_destino: initialData.id_destino,
        calificacion: initialData.calificacion,
        comentario: initialData.comentario
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id_destino: parseInt(form.id_destino),
        calificacion: parseInt(form.calificacion),
        comentario: form.comentario.trim(),
        id_usuario: initialData?.id_usuario || id_usuario
      };

      let response;
      if (initialData) {
        // Update existing review
        response = await api.put(`/resenas/${initialData.id_resena}`, payload);
      } else {
        // Create new review
        response = await api.post('/resenas', payload);
      }

      setForm({ id_destino: "", calificacion: 5, comentario: "" });
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.mensaje || 
                          error.response?.data?.error || 
                          error.message || 
                          "Error al guardar reseña";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3 shadow-sm">
      <div className="mb-3">
        <label className="form-label">Destino</label>
        {loadingDestinos ? (
          <p>Cargando destinos...</p>
        ) : (
          <select
            name="id_destino"
            className="form-select"
            value={form.id_destino}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un destino</option>
            {destinos.map(destino => (
              <option key={destino.id_destino} value={destino.id_destino}>
                {destino.nombre}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Calificación</label>
        <select
          name="calificacion"
          className="form-select"
          value={form.calificacion}
          onChange={handleChange}
          required
        >
          {[5, 4, 3, 2, 1].map(n => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Comentario</label>
        <textarea
          name="comentario"
          className="form-control"
          placeholder="Escribe tu experiencia..."
          rows="3"
          value={form.comentario}
          onChange={handleChange}
          required
          minLength="10"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {initialData ? "Actualizar" : "Publicar"} Reseña
      </button>
    </form>
  );
};

export default FormResena;
