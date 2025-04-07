import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>“Explora con nosotros”</h1>
      <p>"Descubre experiencias únicas en los destinos más fascinantes. Desde playas paradisíacas hasta ciudades llenas de historia, diseñamos cada aventura para que vivas momentos inolvidables.”</p>
      <Link to="/destinos">Ver Destinos</Link>
    </div>
  );
};

export default Home;
