import { Link } from "react-router-dom";

const GuiaCard = ({ guia }) => {
  const rating = guia.calificacion ?? 0;

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="text-center pt-4">
          <img
            src={guia.foto || "https://via.placeholder.com/150?text=Guía"}
            className="rounded-circle"
            alt={guia.nombre}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{guia.nombre}</h5>
          <p className="card-text text-muted">
            <i className="bi bi-translate me-1"></i>
            {Array.isArray(guia.idiomas) ? guia.idiomas.join(", ") : "Español"}
          </p>
          <p className="card-text">
            {guia.descripcion?.length > 100
              ? `${guia.descripcion.substring(0, 100)}...`
              : guia.descripcion ||
                "Guía turístico profesional con experiencia en diversos destinos."}
          </p>
          <div className="d-flex justify-content-center">
            <Link
              to={`/guias/${guia.id}`}
              className="btn btn-outline-primary"
            >
              <i className="bi bi-info-circle me-1"></i>
              Ver Perfil
            </Link>
          </div>
        </div>
        <div className="card-footer bg-white">
          <div className="d-flex justify-content-center">
            <div className="text-warning">
              {Array.from({ length: 5 }).map((_, index) => (
                <i
                  key={index}
                  className={`bi ${
                    index < rating ? "bi-star-fill" : "bi-star"
                  } me-1`}
                ></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaCard;
