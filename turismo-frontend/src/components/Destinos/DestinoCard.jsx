import React from "react";
import { useNavigate } from "react-router-dom";
import "./DestinoCard.css";

const DestinoCard = ({ destino }) => {
    const navigate = useNavigate();

    const verDetalle = () => {
        navigate(`/destinos/${destino.id_destino}`);
    };

    const getCategoryIcon = () => {
        switch(destino.categoria) {
            case 'playa': return 'bi-umbrella';
            case 'montaña': return 'bi-mountain';
            case 'ciudad': return 'bi-buildings';
            default: return 'bi-geo-alt';
        }
    };

    const calificacion = destino.calificacion || (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

    return (
        <div className="col-lg-3 col-md-6 mb-4">
            <div className="destino-card" onClick={verDetalle}>
                <div className="destino-card-inner">
                    <div className="destino-image-container">
                        {destino.imagen && (
                            <img
                                src={destino.imagen.startsWith('http') ? destino.imagen : `/img/${destino.imagen}`}
                                alt={destino.nombre}
                                loading="lazy"
                                className="destino-image"
                            />
                        )}
                        <div className="destino-badge">
                            <i className={`bi ${getCategoryIcon()}`}></i>
                            <span>{destino.categoria}</span>
                        </div>
                        <div className="destino-price">
                            ${destino.precio.toLocaleString()}
                        </div>
                    </div>
                    <div className="destino-content">
                        <h3 className="destino-title">{destino.nombre}</h3>
                        <p className="destino-description">{destino.descripcion}</p>
                        <div className="destino-meta">
                            <span className="destino-location">
                                <i className="bi bi-geo-alt"></i>
                                {destino.ubicacion}
                            </span>
                            <span className="destino-rating">
                                <i className="bi bi-star-fill"></i>
                                {calificacion}
                            </span>
                        </div>
                        <button className="destino-button" onClick={(e) => {
                            e.stopPropagation();
                            verDetalle();
                        }}>
                            <i className="bi bi-eye-fill me-2"></i>
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinoCard;
