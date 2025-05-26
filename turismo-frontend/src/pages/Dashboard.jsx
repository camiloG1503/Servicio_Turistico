import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import ResumenEstadisticas from "../components/Dashboard/ResumenEstadisticas";
import api from "../api/api";

const Dashboard = () => {
    const { usuario } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Intentando cargar estadísticas del dashboard...");

            const response = await api.get("/admin/dashboard");
            console.log("Estadísticas recibidas:", response.data);

            // Log específico para pagos y guias
            console.log("Pagos recibidos del backend:", response.data?.pagos);
            console.log("Guias recibidos del backend:", response.data?.guias);
            console.log("Totales recibidos del backend:", response.data?.totales);

            if (!response.data) {
                throw new Error("No se recibieron datos del servidor");
            }

            setStats(response.data);
            console.log("Estadísticas establecidas en el estado");
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);
            console.error("Detalles del error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });

            // Obtener el mensaje de error más específico posible
            let errorMessage = "No se pudieron cargar las estadísticas.";

            if (error.response?.data?.mensaje) {
                // Usar el mensaje específico del servidor
                errorMessage = error.response.data.mensaje;
            } else if (error.message) {
                // Usar el mensaje general del error
                errorMessage = `${errorMessage} ${error.message}`;
            }

            // Añadir información sobre el tipo de error si está disponible
            if (error.response?.data?.tipo) {
                console.log(`Tipo de error detectado: ${error.response.data.tipo}`);

                // Añadir sugerencias basadas en el tipo de error
                switch (error.response.data.tipo) {
                    case 'timeout_error':
                        errorMessage += " La conexión con la base de datos está tardando demasiado.";
                        break;
                    case 'connection_refused':
                        errorMessage += " No se pudo conectar con el servidor de base de datos.";
                        break;
                    case 'access_denied':
                        errorMessage += " Problema con las credenciales de la base de datos.";
                        break;
                    case 'database_not_found':
                        errorMessage += " La base de datos especificada no existe.";
                        break;
                }
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats, retryCount]);

    if (!usuario || usuario.rol !== "admin") return <Navigate to="/" />;

    if (loading) return <p className="text-center mt-5">Cargando estadísticas...</p>;

    if (error) return (
        <div className="alert alert-danger text-center mt-5" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button 
                className="btn btn-outline-danger ms-3"
                onClick={() => setRetryCount(prev => prev + 1)}
            >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Reintentar
            </button>
        </div>
    );

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
