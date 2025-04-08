import React from "react";
import "./DestinoCard.css";

const DestinoCard = ({ destino }) => {
    return (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow-sm">
        {destino.imagen_url && (
            <img
            src={destino.imagen_url}
            alt={destino.nombre}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
            />
        )}
        <div className="card-body">
            <h5 className="card-title">{destino.nombre}</h5>
            <p className="card-text">{destino.descripcion}</p>
            <p className="text-muted">
            <small>Ubicación: {destino.ubicacion}</small>
            </p>
            <button className="btn btn-primary mt-auto">Comprar</button>
        </div>
        </div>
    </div>
    );
};

export default DestinoCard;