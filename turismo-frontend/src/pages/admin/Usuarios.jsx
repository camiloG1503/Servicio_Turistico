import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td className="border p-2">{u.id_usuario}</td>
              <td className="border p-2">{u.nombre}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}