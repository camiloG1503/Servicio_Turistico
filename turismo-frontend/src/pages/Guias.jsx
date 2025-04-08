import GuiaCard from "../components/Guias/GuiaCard";
import guiasData from "../components/Guias/GuiasData";

const Guias = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Guías Turísticos</h1>
      <p className="text-center text-muted mb-5">Conoce a los expertos que te acompañarán en tus aventuras.</p>
      <div className="row">
        {guiasData.map((guia, index) => (
          <GuiaCard
            key={index}
            nombre={guia.nombre}
            imagen={guia.imagen}
            especialidad={guia.especialidad}
            descripcion={guia.descripcion}
            />
        ))}
        </div>
    </div>
  );
};

export default Guias;