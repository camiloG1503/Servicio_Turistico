import HomeBanner from "../components/HomeBanner/HomeBanner";
import GuiaList from "../components/Guias/GuiaList";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <SectionWrapper>
        <PageHeader
          iconClass="bi-person-bounding-box"
          title="Nuestros guías certificados"
          subtitle="Conecta con expertos locales para una experiencia auténtica y segura."
        />
        <GuiaList />
      </SectionWrapper>

      <SectionWrapper className="text-center">
        <h3 className="text-primary mb-3">¿Listo para tu próxima aventura?</h3>
        <p className="mb-4">Explora destinos únicos, reserva con confianza y vive una experiencia inolvidable.</p>
        <a href="/destinos" className="btn btn-outline-primary btn-lg">Ver Destinos</a>
      </SectionWrapper>
    </>
  );
};

export default Home;
