import "./GuiaCard.css";

const GuiaCard = ({ nombre, imagen, especialidad, descripcion }) => {
    return (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow guia-card">
        <img src={imagen} className="card-img-top" alt={nombre} />
        <div className="card-body text-center">
            <h5 className="card-title">{nombre}</h5>
            <h6 className="text-primary">{especialidad}</h6>
            <p className="card-text">{descripcion}</p>
        </div>
        </div>
    </div>
    );
};

export default GuiaCard;