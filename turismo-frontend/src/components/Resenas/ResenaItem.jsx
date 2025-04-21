import { useState } from "react";
import FormResena from "./FormResena";
import "./ResenaItem.css";

const ResenaItem = ({ resena, puedeEliminar, puedeEditar, onDelete, onUpdated }) => {
  const [editando, setEditando] = useState(false);

  if (editando) {
    return (
      <div className="resena-card shadow-sm p-3 rounded mb-3">
        <FormResena
          initialData={resena}
          onSuccess={() => {
            setEditando(false);
            onUpdated();
          }}
          id_usuario={resena.id_usuario}
        />
        <button 
          className="btn btn-outline-secondary mt-2"
          onClick={() => setEditando(false)}
        >
          Cancelar edición
        </button>
      </div>
    );
  }

  return (
    <div className="resena-card shadow-sm p-3 rounded mb-3">
      <div className="resena-header d-flex justify-content-between align-items-center mb-2">
        <h6 className="resena-usuario mb-0">
          {resena.usuario || 'Usuario desconocido'} opinó sobre{" "}
          <span className="resena-destino fw-semibold">{resena.destino || 'Destino desconocido'}</span>
        </h6>
        <span className="resena-calificacion text-warning fw-bold">
          {Array.from({ length: resena.calificacion }).map((_, i) => (
            <i key={i} className="bi bi-star-fill me-1"></i>
          ))}
        </span>
      </div>
      <p className="resena-comentario fst-italic text-secondary mb-2">
        "{resena.comentario}"
      </p>
      <p className="resena-fecha small text-muted mb-2">
        <i className="bi bi-calendar-event me-1"></i>
        Publicado el {new Date(resena.fecha).toLocaleDateString("es-CO", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      {(puedeEditar || puedeEliminar) && (
        <div className="mt-2 d-flex gap-2">
          {puedeEditar && (
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => setEditando(true)}
            >
              <i className="bi bi-pencil-fill me-1"></i> Editar
            </button>
          )}
          {puedeEliminar && (
            <button 
              className="btn btn-sm btn-danger"
              onClick={onDelete}
            >
              <i className="bi bi-trash-fill me-1"></i> Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResenaItem;