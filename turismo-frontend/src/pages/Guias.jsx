import GuiaList from "../components/Guias/GuiaList";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";

const Guias = () => (
  <SectionWrapper>
    <PageHeader
      iconClass="bi-person-badge-fill"
      title="Nuestros Guías Certificados"
      subtitle="Profesionales locales que harán de tu experiencia algo inolvidable"
    />
    <div className="container">
      <GuiaList />
    </div>
  </SectionWrapper>
);

export default Guias;
