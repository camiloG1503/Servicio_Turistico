import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import ListaReservasAdmin from "../components/Reservas/ListaReservasAdmin";
import ListaMisReservas from "../components/Reservas/ListaMisReservas";

const Reservas = () => {
    const { usuario } = useAuth();

    if (!usuario) return <Navigate to="/login" />;

    return (
    <SectionWrapper>
        <PageHeader
        iconClass="bi-journal-bookmark-fill"
        title={usuario.rol === "admin" ? "Reservas (Administrador)" : "Mis Reservas"}
        subtitle={
            usuario.rol === "admin"
            ? "Visualiza todas las reservas realizadas por los usuarios"
            : "Aquí puedes revisar tus reservas confirmadas"
        }
        />

        {usuario.rol === "admin" ? (
        <ListaReservasAdmin />
        ) : (
        <ListaMisReservas id_usuario={usuario.id_usuario} />
        )}
    </SectionWrapper>
    );
};

export default Reservas;