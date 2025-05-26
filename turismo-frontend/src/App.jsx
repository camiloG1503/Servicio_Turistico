// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// Páginas públicas
import Home from "./pages/Home";
import Destinos from "./pages/Destinos";
import DestinoDetalle from "./pages/DestinoDetalle";
import Guias from "./pages/Guias";
import GuiaDetalle from "./pages/GuiaDetalle";
import Reseñas from "./pages/Resenas";
import Contacto from "./pages/Contacto";
import Informacion from "./pages/Informacion";

// Autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Funcionalidades
import Reservas from "./pages/Reservas";
import Pagos from "./pages/Pagos";
import Profile from "./pages/Profile"; // Nueva importación

// Administración
import PanelAdmin from "./pages/PanelAdmin";
import Dashboard from "./pages/Dashboard";

// Guias
import PanelGuia from "./pages/PanelGuia";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/destinos/:id" element={<DestinoDetalle />} />
        <Route path="/guias" element={<Guias />} />
        <Route path="/guias/:id" element={<GuiaDetalle />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/informacion" element={<Informacion />} />

        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Usuario autenticado */}
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/pagos" element={
          <ProtectedRoute allowedRoles={["admin", "turista"]}>
            <Pagos />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={<Profile />} />

        {/* Administración */}
        <Route path="/panelAdmin" element={<PanelAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Panel de guías */}
        <Route path="/panelGuia" element={<PanelGuia />} />

        {/* Manejo de rutas no encontradas */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
