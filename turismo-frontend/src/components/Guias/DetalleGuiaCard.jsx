import { Link } from "react-router-dom";
import "./DetalleGuiaCard.css";

const DetalleGuiaCard = ({ guia }) => {
  const getGuiaImage = (id) => {
    const images = {
      1: '/img/persona-a.jpg',
      2: '/img/persona-b.jpg',
      3: '/img/persona-c.jpg'
    };
    return images[id] || '/img/guia-default.jpg';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 5);
    const hasHalfStar = (rating || 5) % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }
    
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }
    
    return stars;
  };

  return (
    <div className="detalle-guia-container">
      <div className="volver-container">
        <Link to="/guias" className="btn-volver">
          <i className="bi bi-arrow-left"></i> Volver a guías
        </Link>
      </div>
      
      <div className="detalle-guia-content">
        <div className="imagen-container">
          <img 
            src={getGuiaImage(guia.id_guia)} 
            alt={`Guía ${guia.nombre}`}
            className="imagen-guia"
          />
          <div className="guia-certificado">
            <i className="bi bi-patch-check-fill"></i>
            <span>Guía Certificado</span>
          </div>
        </div>
        
        <div className="info-container">
          <div className="guia-header">
            <h1 className="nombre-guia">{guia.nombre}</h1>
            <div className="guia-especialidad">
              <i className="bi bi-award-fill"></i>
              <span>{guia.especialidad || 'Experto en cultura local'}</span>
            </div>
          </div>
          
          <div className="calificacion-container">
            <div className="calificacion-estrellas">
              {renderStars(guia.calificacion_promedio || 5)}
            </div>
            <div className="calificacion-texto">
              <span className="valor">{guia.calificacion_promedio || '5.0'}</span>
              <span className="texto">Calificación promedio</span>
              <span className="reseñas">({guia.reseñas || '8'} reseñas)</span>
            </div>
          </div>
          
          <div className="guia-stats">
            <div className="stat-item">
              <i className="bi bi-signpost-split"></i>
              <div>
                <span className="stat-valor">{guia.excursiones || '8+'}</span>
                <span className="stat-label">Tours realizados</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="bi bi-people-fill"></i>
              <div>
                <span className="stat-valor">{guia.clientes || '12+'}</span>
                <span className="stat-label">Clientes satisfechos</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="bi bi-calendar2-check-fill"></i>
              <div>
                <span className="stat-valor">{guia.experiencia_anos || '5+'}</span>
                <span className="stat-label">Años de experiencia</span>
              </div>
            </div>
          </div>
          
          <div className="seccion-info">
            <div className="seccion-header">
              <i className="bi bi-person-badge-fill"></i>
              <h3>Acerca de {(guia.nombre || '').split(' ')[0]}</h3>
            </div>
            <p>{guia.biografia || guia.experiencia}</p>
          </div>
          
          <div className="seccion-info">
            <div className="seccion-header">
              <i className="bi bi-translate"></i>
              <h3>Idiomas</h3>
            </div>
            <div className="idiomas-container">
              {(guia.idiomas || '').split(',').map((idioma, index) => (
                <span key={index} className="idioma-badge">
                  {idioma.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="seccion-info">
            <div className="seccion-header">
              <i className="bi bi-envelope-fill"></i>
              <h3>Contacto</h3>
            </div>
            <div className="contacto-info">
              <div className="contacto-item">
                <i className="bi bi-envelope"></i>
                <span>{guia.email}</span>
              </div>
              <div className="contacto-item">
                <i className="bi bi-telephone-fill"></i>
                <span>{guia.telefono || '+1 (234) 567-8900'}</span>
              </div>
            </div>
          </div>
          
          <button className="btn btn-primary btn-contactar">
            <i className="bi bi-chat-left-text-fill me-2"></i>Contactar al guía
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleGuiaCard;
