import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/common/ProtectedRoute"
import AdminRoute from "./components/common/AdminRoute"
import GuideRoute from "./components/common/GuideRoute"
import Layout from "./components/layout/Layout"

// Auth
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

// Usuario
import Perfil from "./components/usuario/Perfil"
import UsuarioList from "./components/usuario/UsuarioList"
import UsuarioDetalle from "./components/usuario/UsuarioDetalle"

// Admin
import AdminDashboard from "./components/admin/AdminDashboard"

// Guias
import GuiasList from "./components/guias/GuiasList"
import GuiaDetalle from "./components/guias/GuiaDetalle"
import GuiaForm from "./components/guias/GuiaForm"
import ReservasGuias from "./components/guias/ReservasGuias"

// Destinos
import DestinosList from "./components/destinos/DestinosList"
import DestinoDetalle from "./components/destinos/DestinoDetalle"
import DestinoForm from "./components/destinos/DestinoForm"

// Reservas
import ReservasTurista from "./components/reservas/ReservasTurista"
import ReservasAdminGuia from "./components/reservas/ReservasAdminGuia"
import ReservaForm from "./components/reservas/ReservaForm"

// Reseñas
import ResenasList from "./components/resenas/ResenasList"
import ResenaForm from "./components/resenas/ResenaForm"

// Pagos
import PagosTurista from "./components/pagos/PagosTurista"
import PagosAdmin from "./components/pagos/PagosAdmin"

// Páginas públicas
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Rutas públicas */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="guias" element={<GuiasList />} />
            <Route path="guias/:id" element={<GuiaDetalle />} />
            <Route path="destinos" element={<DestinosList />} />
            <Route path="destinos/:id" element={<DestinoDetalle />} />
            <Route path="resenas" element={<ResenasList />} />

            {/* Rutas protegidas para usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
              <Route path="perfil" element={<Perfil />} />
              <Route path="mis-reservas" element={<ReservasTurista />} />
              <Route path="reservas/nueva" element={<ReservaForm />} />
              <Route path="reservas/editar/:id" element={<ReservaForm />} />
              <Route path="resenas/nueva" element={<ResenaForm />} />
              <Route path="pagos" element={<PagosTurista />} />
            </Route>

            {/* Rutas protegidas para guías */}
            <Route element={<GuideRoute />}>
              <Route path="guias/reservas" element={<ReservasGuias />} />
            </Route>

            {/* Rutas protegidas para administradores */}
            <Route element={<AdminRoute />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/usuarios" element={<UsuarioList />} />
              <Route path="admin/usuarios/:id" element={<UsuarioDetalle />} />
              <Route path="admin/guias/nuevo" element={<GuiaForm />} />
              <Route path="admin/guias/editar/:id" element={<GuiaForm />} />
              <Route path="admin/destinos/nuevo" element={<DestinoForm />} />
              <Route path="admin/destinos/editar/:id" element={<DestinoForm />} />
              <Route path="admin/reservas" element={<ReservasAdminGuia />} />
              <Route path="admin/pagos" element={<PagosAdmin />} />
            </Route>

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
