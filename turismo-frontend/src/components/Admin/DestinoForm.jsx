import { useState, useEffect } from "react";
import api from "../../api/api";

const DestinoForm = ({ initialData, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    ubicacion: "",
    descripcion: "",
    imagen: "",
    precio: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        ubicacion: initialData.ubicacion || "",
        descripcion: initialData.descripcion || "",
        imagen: initialData.imagen || "",
        precio: initialData.precio || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (initialData) {
        // Actualizar destino existente
        response = await api.put(`/destinos/${initialData.id_destino}`, form);
      } else {
        // Crear nuevo destino
        response = await api.post('/destinos', form);
      }

      const message = initialData
        ? "Destino actualizado exitosamente"
        : "Destino creado exitosamente";

      alert(message);
      setForm({ nombre: "", ubicacion: "", descripcion: "", imagen: "", precio: "" });
      onSuccess();
    } catch (error) {
      console.error("Error al guardar el destino:", error);

      // Mostrar mensaje de error más detallado
      const errorMessage = error.response?.data?.mensaje || 
                          error.response?.data?.error || 
                          error.message || 
                          "Desconocido";

      alert(`Error al guardar el destino: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group input-icon">
        <i className="bi bi-geo-alt"></i>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="form-control"
          placeholder="Nombre del destino"
          required
        />
      </div>

      <div className="form-group input-icon">
        <i className="bi bi-geo"></i>
        <input
          name="ubicacion"
          value={form.ubicacion}
          onChange={handleChange}
          className="form-control"
          placeholder="Ubicación"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="form-control"
          placeholder="Descripción"
          rows="4"
          required
        />
      </div>

      <div className="form-group input-icon">
        <i className="bi bi-image"></i>
        <input
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          className="form-control"
          placeholder="URL de imagen (opcional)"
        />
      </div>

      <div className="form-group input-icon">
        <i className="bi bi-currency-dollar"></i>
        <input
          name="precio"
          value={form.precio}
          onChange={handleChange}
          type="number"
          className="form-control"
          placeholder="Precio en COP"
          required
        />
      </div>

      <button className="btn btn-primary" type="submit">
        <i className={initialData ? "bi bi-arrow-repeat" : "bi bi-plus-circle"}></i>
        {initialData ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default DestinoForm;
