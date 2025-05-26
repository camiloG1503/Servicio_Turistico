import { useEffect, useState } from "react";
import GuiaCard from "./GuiaCard";
import SpinnerCentered from "../UI/SpinnerCentered";
import EmptyState from "../UI/EmptyState";

const GuiaList = () => {
  const [guias, setGuias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuias = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/guias/");
        if (!response.ok) throw new Error("Error al cargar los guías");
        const data = await response.json();
        setGuias(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuias();
  }, []);

  if (loading) return <SpinnerCentered text="Cargando guías..." />;
  if (error) return <EmptyState message={error} />;
  if (guias.length === 0) return <EmptyState message="No hay guías disponibles" />;

  return (
    <div className="row">
      {guias.map((guia) => (
        <GuiaCard key={guia.id_guia} guia={guia} />
      ))}
    </div>
  );
};

export default GuiaList;
