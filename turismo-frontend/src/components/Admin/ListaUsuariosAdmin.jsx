import { useEffect, useState } from "react";
import UsuarioForm from "./UsuarioForm";
import api from "../../api/api";

const ListaUsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/usuarios");
      const data = response.data;

      // Ensure data is an array
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setUsuarios([]);
        setError("Error: Los datos de usuarios no tienen el formato esperado");
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setUsuarios([]);
      setError(error.message || "Error al cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este usuario?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar: " + (error.response?.data?.mensaje || error.message));
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-md-5">
        <UsuarioForm
          initialData={editing}
          onSuccess={() => {
            setEditing(null);
            fetchUsuarios();
          }}
        />
      </div>
      <div className="col-md-7">
        <div className="card p-3 shadow-sm">
          <h5>Listado de Usuarios</h5>

          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <span className="ms-3">Cargando usuarios...</span>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchUsuarios}>
                Reintentar
              </button>
            </div>
          ) : usuarios.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle-fill me-2"></i>
              No se encontraron usuarios registrados
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id_usuario}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge ${
                          u.rol === 'admin' ? 'bg-danger' : 
                          u.rol === 'guia' ? 'bg-success' : 
                          'bg-primary'
                        }`}>
                          {u.rol}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => setEditing(u)}
                        >
                          <i className="bi bi-pencil-fill me-1"></i>
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarUsuario(u.id_usuario)}
                        >
                          <i className="bi bi-trash-fill me-1"></i>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaUsuariosAdmin;
