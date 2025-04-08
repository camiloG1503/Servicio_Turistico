import React, { useEffect, useState } from "react";
import DestinoCard from "../components/Destinos/DestinoCard";

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
    return <p className="text-center mt-5">Cargando destinos...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Destinos Turísticos</h1>
      <div className="row">
        {destinos.map((destino) => (
          <DestinoCard key={destino.id_destino} destino={destino} />
        ))}
      </div>
    </div>
  );
};

export default Destinos;