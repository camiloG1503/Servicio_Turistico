import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminPanel from "./pages/adminPanel.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida para admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute rolRequerido="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Agrega más rutas aquí */}
      </Routes>
    </Router>
  );
};

export default App;