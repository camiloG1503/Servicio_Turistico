import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <div className="flex flex-col gap-4">
        <Link to="/admin/usuarios" className="p-4 bg-blue-100 rounded hover:bg-blue-200">Gestionar Usuarios</Link>
        <Link to="/admin/destinos" className="p-4 bg-green-100 rounded hover:bg-green-200">Gestionar Destinos</Link>
      </div>
    </div>
  );
}