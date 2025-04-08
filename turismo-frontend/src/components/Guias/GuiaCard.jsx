import "./GuiaCard.css";

const GuiaCard = ({ nombre, experiencia, idiomas }) => {
    return (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow guia-card">
        <div className="card-body text-center">
            <h5 className="card-title">{nombre}</h5>
            <h6 className="text-primary">Guía Turístico</h6>
            <p className="card-text">{experiencia}</p>
            <p className="text-muted"><strong>Idiomas:</strong> {idiomas}</p>
        </div>
        </div>
    </div>
    );
};

export default GuiaCard;