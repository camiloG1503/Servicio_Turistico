import React, { useEffect, useState } from "react";

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/destinos");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setDestinos(data);
      } catch (error) {
        console.error("Error al cargar los destinos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  if (loading) {
    return <p>Cargando destinos...</p>;
  }

  return (
    <div>
      <h1>Destinos Turísticos</h1>
      <ul>
        {destinos.map((destino) => (
          <li key={destino.id_destino}>{destino.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Destinos;