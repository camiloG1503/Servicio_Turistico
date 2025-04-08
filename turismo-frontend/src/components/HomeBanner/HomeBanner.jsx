import { Link } from "react-router-dom";
import "./HomeBanner.css";

const HomeBanner = () => {
    return (
    <div className="home-banner d-flex align-items-center justify-content-center text-center">
        <div className="container">
        <h1 className="display-4 fw-bold mb-4 text-primary">Explora con nosotros</h1>
        <p className="lead mb-4 text-dark">
            Descubre experiencias únicas en los destinos más fascinantes. Desde playas paradisíacas hasta ciudades llenas de historia, diseñamos cada aventura para que vivas momentos inolvidables.
        </p>
        <Link to="/destinos" className="btn btn-primary btn-lg">
            Ver Destinos
        </Link>
        </div>
    </div>
    );
};

export default HomeBanner;