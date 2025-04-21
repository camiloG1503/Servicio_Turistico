import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import ResumenEstadisticas from "../components/Dashboard/ResumenEstadisticas";

const Dashboard = () => {
    const { usuario } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
    const fetchStats = async () => {
        try {
        const res = await fetch("http://localhost:5000/api/dashboard");
        const data = await res.json();
        setStats(data);
        } catch (error) {
        console.error("Error al cargar estadísticas:", error);
        }
    };

    fetchStats();
    }, []);

    if (!usuario || usuario.rol !== "admin") return <Navigate to="/" />;
    if (!stats) return <p className="text-center mt-5">Cargando estadísticas...</p>;

    return (
    <SectionWrapper>
        <PageHeader
        iconClass="bi-bar-chart-line-fill"
        title="Dashboard administrativo"
        subtitle="Visualiza estadísticas claves del sistema"
        />

        <ResumenEstadisticas stats={stats} />
    </SectionWrapper>
    );
};

export default Dashboard;