import React from "react";
import { Link } from "react-router-dom";
import "./DetalleDestinoCard.css";

const DetalleDestinoCard = ({ destino }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(price);
    };

    const servicios = [
        "Alojamiento en hotel 4 estrellas",
        "Desayuno buffet incluido",
        "Traslados aeropuerto-hotel-aeropuerto",
        "Tour guiado por la ciudad",
        "Seguro básico de viaje",
        "WiFi gratuito en habitaciones"
    ];

    return (
        <div className="detalle-destino-container">
            <div className="volver-wrapper">
                <Link to="/destinos" className="btn-volver">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver a todos los destinos
                </Link>
            </div>

            <div className="destino-grid">
                <div className="destino-gallery">
                    <div className="main-image">
                        <img
                            src={destino.imagen.startsWith('http') ? destino.imagen : `/img/${destino.imagen}`}
                            alt={destino.nombre}
                            className="img-principal"
                            loading="eager"
                        />
                    </div>
                    <div className="thumbnail-grid">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="thumbnail">
                                <img
                                    src={destino.imagen.startsWith('http') ? destino.imagen : `/img/${destino.imagen}`}
                                    alt={`Vista ${item} de ${destino.nombre}`}
                                    className="img-thumb"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="destino-info">
                    <div className="info-header">
                        <div className="destino-meta">
                            <span className="destino-categoria">
                                <i className={`bi ${destino.categoria === 'playa' ? 'bi-umbrella' : 
                                              destino.categoria === 'montaña' ? 'bi-mountain' : 
                                              'bi-buildings'}`}></i>
                                {destino.categoria}
                            </span>
                            <span className="destino-rating">
                                <i className="bi bi-star-fill"></i>
                                {destino.calificacion || '4.8'}
                            </span>
                        </div>
                        <h1 className="destino-titulo">{destino.nombre}</h1>
                        <p className="destino-ubicacion">
                            <i className="bi bi-geo-alt-fill"></i>
                            {destino.ubicacion}
                        </p>
                    </div>

                    <div className="info-content">
                        <h3 className="section-title">
                            <i className="bi bi-info-circle me-2"></i>
                            Descripción
                        </h3>
                        <p className="destino-descripcion">{destino.descripcion}</p>

                        <h3 className="section-title">
                            <i className="bi bi-check-circle me-2"></i>
                            Servicios incluidos
                        </h3>
                        <ul className="servicios-lista">
                            {servicios.map((servicio, index) => (
                                <li key={index}>
                                    <i className="bi bi-check2-circle"></i>
                                    {servicio}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-footer">
                        <div className="precio-container">
                            <span className="desde">Desde</span>
                            <span className="precio">{formatPrice(destino.precio)}</span>
                            <span className="iva">IVA incluido</span>
                        </div>
                        <button className="btn-reservar">
                            <i className="bi bi-calendar-check me-2"></i>
                            Reservar ahora
                        </button>
                    </div>
                </div>

                <div className="destino-extra">
                    <div className="extra-card clima">
                        <h4>
                            <i className="bi bi-cloud-sun me-2"></i>
                            Clima actual
                        </h4>
                        <p>Temperatura promedio: 28°C</p>
                        <p>Época seca: Noviembre - Abril</p>
                    </div>

                    <div className="extra-card recomendaciones">
                        <h4>
                            <i className="bi bi-lightbulb me-2"></i>
                            Recomendaciones
                        </h4>
                        <ul>
                            <li>Llevar protector solar</li>
                            <li>Ropa cómoda y fresca</li>
                            <li>Zapatos para caminar</li>
                            <li>Cámara fotográfica</li>
                        </ul>
                    </div>

                    <div className="extra-card map-container">
                        <h4>
                            <i className="bi bi-map me-2"></i>
                            Ubicación
                        </h4>
                        <div className="map-placeholder">
                            [Mapa interactivo de {destino.ubicacion}]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleDestinoCard;
