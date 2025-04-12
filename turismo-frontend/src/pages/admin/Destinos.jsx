import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Destinos() {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/destinos')
      .then(res => setDestinos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Destinos</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Ubicación</th>
            <th className="border p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {destinos.map((d) => (
            <tr key={d.id_destino}>
              <td className="border p-2">{d.id_destino}</td>
              <td className="border p-2">{d.nombre}</td>
              <td className="border p-2">{d.ubicacion}</td>
              <td className="border p-2">${d.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}