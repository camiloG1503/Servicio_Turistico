import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a Turismo Colombia</h1>
      <p>Explora los mejores destinos turísticos con nosotros.</p>
      <Link to="/destinos">Ver Destinos</Link>
    </div>
  );
};

export default Home;
