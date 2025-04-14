import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Header/Navbar"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import Destinos from "./pages/Destinos"
import Guias from "./pages/Guias"
import Informacion from "./pages/Informacion"
import Contacto from "./pages/Contacto"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Reservas from "./pages/Reservas"
import Resenas from "./pages/Resenas"
import Dashboard from "./pages/Dashboard"
import AdminPanel from "./pages/AdminPanel"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/guias" element={<Guias />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/reservas"
            element={
              <ProtectedRoute>
                <Reservas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resenas"
            element={
              <ProtectedRoute>
                <Resenas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminRoute={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
