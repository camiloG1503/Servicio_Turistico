import { Link } from "react-router-dom";
import "./GuiaCard.css";

const GuiaCard = ({ guia }) => {
  const getGuiaImage = (id) => {
    const images = {
      1: '/img/persona-a.jpg',
      2: '/img/persona-b.jpg',
      3: '/img/persona-c.jpg'
    };
    return images[id] || '/img/guia-default.jpg';
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 guia-card">
        <div className="guia-imagen-container">
          <img 
            src={getGuiaImage(guia.id_guia)} 
            alt={`Guía ${guia.nombre}`}
            className="guia-imagen"
          />
          <div className="guia-badge">
            <i className="bi bi-patch-check-fill"></i> Certificado
          </div>
        </div>
        <div className="card-body">
          <h5 className="guia-nombre">{guia.nombre}</h5>
          <div className="guia-meta">
            <div className="guia-calificacion">
              <i className="bi bi-star-fill"></i>
              <span>{guia.calificacion_promedio || '5.0'}</span>
            </div>
            <div className="guia-excursiones">
              <i className="bi bi-signpost-split"></i>
              <span>{guia.excursiones || '15+'} tours</span>
            </div>
          </div>
          <p className="guia-experiencia">
            <i className="bi bi-quote"></i> {guia.experiencia.substring(0, 80)}...
          </p>
          <div className="guia-idiomas">
            <i className="bi bi-globe2"></i>
            <span>{guia.idiomas}</span>
          </div>
          <div className="d-grid mt-3">
            <Link to={`/guias/${guia.id_guia}`} className="btn btn-outline-primary btn-ver-perfil">
              <i className="bi bi-person-lines-fill me-2"></i>Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaCard;
