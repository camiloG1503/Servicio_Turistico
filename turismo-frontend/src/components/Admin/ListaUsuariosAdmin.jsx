import { useEffect, useState } from "react";
import UsuarioForm from "./UsuarioForm";

const ListaUsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchUsuarios = async () => {
    const res = await fetch("http://localhost:5000/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este usuario?")) return;
    const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchUsuarios();
    else alert("Error al eliminar");
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
                  <td>{u.rol}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditing(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarUsuario(u.id_usuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaUsuariosAdmin;