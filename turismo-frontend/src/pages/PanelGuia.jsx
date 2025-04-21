import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import ListaReservasGuia from "../components/Reservas/ListaReservasGuia";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PanelGuia = () => {
  const { usuario } = useAuth();
  if (!usuario || usuario.rol !== "guia") return <Navigate to="/" />;

  return (
    <SectionWrapper>
      <PageHeader
        iconClass="bi-person-badge-fill"
        title="Panel del Guía"
        subtitle="Visualiza las reservas realizadas por los turistas"
      />
      <ListaReservasGuia />
    </SectionWrapper>
  );
};

export default PanelGuia;
