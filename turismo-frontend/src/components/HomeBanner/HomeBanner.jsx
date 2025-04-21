import { Link } from "react-router-dom";
import "./HomeBanner.css";

const HomeBanner = () => (
  <div className="home-banner">
    <div className="banner-overlay"></div>
    <div className="banner-image"></div>
    <div className="container">
      <div className="banner-content">
        <h1 className="banner-title">
          <span className="title-line">Descubre el</span>
          <span className="title-line">país</span>
          <span className="title-line">con guías locales</span>
        </h1>
        <p className="banner-subtitle">
          Experiencias auténticas diseñadas por expertos en cada destino
        </p>
        <div className="banner-cta">
          <Link to="/destinos" className="btn btn-primary">
            Explorar destinos
          </Link>
          <Link to="/guias" className="btn btn-outline">
            Conoce a nuestros guías
          </Link>
        </div>
      </div>
    </div>
    <div className="scroll-indicator">
      <span></span>
    </div>
  </div>
);

export default HomeBanner;