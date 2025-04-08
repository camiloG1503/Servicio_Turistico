import { useEffect, useState } from "react";
import GuiaCard from "../components/Guias/GuiaCard";

const Guias = () => {
  const [guias, setGuias] = useState([]);

  useEffect(() => {
    fetch("/api/guias")
      .then((res) => res.json())
      .then((data) => setGuias(data))
      .catch((err) => console.error("Error al cargar los guías:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Guías Turísticos</h1>
      <p className="text-center text-muted mb-5">
        Conoce a los expertos que te acompañarán en tus aventuras.
      </p>
      <div className="row">
        {guias.map((guia, index) => (
          <GuiaCard
            key={index}
            nombre={guia.nombre}
            experiencia={guia.experiencia}
            idiomas={guia.idiomas}
          />
        ))}
      </div>
    </div>
  );
};

export default Guias;