import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinos from "./pages/Destinos";
import Reservas from "./pages/Reservas";
import Guias from "./pages/Guias";
import Reseñas from "./pages/Reseñas";
import Contacto from "./pages/Contacto";
import Informacion from "./pages/Informacion";
import Registro from "./pages/Registro";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/guias" element={<Guias />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;