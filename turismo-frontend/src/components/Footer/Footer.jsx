import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
    return (
    <footer className="footer">
        <div className="footer-container">
        <div className="footer-section">
            <h4 className="footer-title">Elite Tours</h4>
            <p>
            Cali, Cra 25,<br />
            Calle 50,<br />
            Colombia
            </p>
            <p className="footer-copy">
            2025 Elite Tours. Todos los derechos reservados
            </p>
        </div>

        <div className="footer-section">
            <h5 className="footer-subtitle">Links</h5>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destinos">Destinos</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/guias">Guias</Link></li>
            <li><Link to="/reseñas">Reseñas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            </ul>
        </div>

        <div className="footer-section">
            <h5 className="footer-subtitle">Información</h5>
            <ul>
            <li><Link to="/informacion">Sobre nosotros</Link></li>
            <li><Link to="/informacion">Opciones de pago</Link></li>
            <li><Link to="/informacion">Reembolso</Link></li>
            <li><Link to="/informacion">Políticas de privacidad</Link></li>
            </ul>
        </div>

        <div className="footer-section">
            <h5 className="footer-subtitle">Ofertas exclusivas en tu email</h5>
            <form className="footer-form">
            <input type="email" placeholder="Ingresa tu correo electrónico" />
            <button type="submit">Enviar</button>
            </form>
        </div>
        </div>
    </footer>
    );
};

export default Footer;
