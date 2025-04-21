import ContenidoInfo from "../components/Informacion/ContenidoInfo";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import "../components/Informacion/ContenidoInfo.css";

const Informacion = () => (
    <SectionWrapper>
    <PageHeader
        iconClass="bi-info-circle-fill"
        title="Información general"
        subtitle="Todo lo que necesitas saber sobre nuestra plataforma y servicios"
    />
    <ContenidoInfo />
    </SectionWrapper>
);

export default Informacion;