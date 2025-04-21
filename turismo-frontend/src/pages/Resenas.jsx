import ListaResenas from "../components/Resenas/ListaResenas";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import "../components/Resenas/ListaResenas.css";

const Resenas = () => (
    <SectionWrapper>
    <PageHeader
        iconClass="bi-chat-dots-fill"
        title="Opiniones de nuestros viajeros"
        subtitle="Descubre lo que otros viajeros piensan sobre nuestros destinos y servicios."
    />
    <ListaResenas />
    </SectionWrapper>
);

export default Resenas;