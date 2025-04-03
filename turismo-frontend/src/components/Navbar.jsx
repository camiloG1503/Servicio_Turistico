import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/destinos">Destinos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
