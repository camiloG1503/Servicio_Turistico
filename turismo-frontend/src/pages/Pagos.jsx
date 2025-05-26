import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import SpinnerCentered from "../components/UI/SpinnerCentered";
import TablaPagos from "../components/Pagos/TablaPagos";
import api from "../api/api";

const Pagos = () => {
    const { usuario } = useAuth();
    const [allPagos, setAllPagos] = useState([]);
    const [filteredPagos, setFilteredPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                // Usar endpoint diferente según el rol del usuario
                const endpoint = usuario?.rol === "admin" ? "/pagos" : "/pagos/mis-pagos";
                const response = await api.get(endpoint);
                const data = response.data;

                if (!Array.isArray(data)) {
                    setAllPagos([]);
                    setFilteredPagos([]);
                    return;
                }

                setAllPagos(data);

                // Ya no necesitamos filtrar por usuario en el frontend para turistas
                // porque el backend ya devuelve solo los pagos del usuario
                const result = sortPagos(data, sortOrder);
                setFilteredPagos(result);
            } catch (error) {
                console.error("Error al cargar pagos:", error);
                setAllPagos([]);
                setFilteredPagos([]);

                // Manejar específicamente errores de permisos
                if (error.response && error.response.status === 403) {
                    setError("No tienes permisos suficientes para ver los pagos. Esta sección requiere privilegios especiales.");
                } else {
                    setError("Ocurrió un error al cargar los pagos. Por favor, intenta nuevamente más tarde.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchPagos();
    }, [usuario, sortOrder]);

    useEffect(() => {
        // Filtrar pagos basados en el término de búsqueda
        let result = allPagos.filter(pago => {
            // Asegurarse de que los campos existen antes de intentar buscar en ellos
            const usuarioText = pago.usuario || '';
            const destinoText = pago.destino || '';
            const metodoPagoText = pago.metodo_pago || '';

            return (
                usuarioText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                destinoText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                metodoPagoText.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        // Ya no necesitamos filtrar por usuario para turistas
        // porque el backend ya devuelve solo los pagos del usuario

        // Ordenar los resultados
        result = sortPagos(result, sortOrder);
        setFilteredPagos(result);
    }, [searchTerm, allPagos, sortOrder]);

    const sortPagos = (pagos, order) => {
        return [...pagos].sort((a, b) => {
            return order === "asc" 
                ? parseInt(a.monto) - parseInt(b.monto)
                : parseInt(b.monto) - parseInt(a.monto);
        });
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    if (!usuario) return <Navigate to="/login" />;
    if (loading) return <SpinnerCentered text="Cargando pagos..." />;

    // Mostrar mensaje de error si existe
    if (error) {
        return (
            <SectionWrapper>
                <PageHeader
                    iconClass="bi-credit-card-fill"
                    title="Pagos"
                    subtitle="Información de pagos"
                />
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper>
            <PageHeader
                iconClass="bi-credit-card-fill"
                title="Pagos"
                subtitle={
                    usuario.rol === "admin"
                    ? "Todos los pagos registrados en el sistema"
                    : "Resumen de tus pagos realizados"
                }
            />

            {usuario?.rol === "admin" && (
                <div className="row mb-4 align-items-center">
                    <div className="col-md-9">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar por usuario, destino o método de pago..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 mt-2 mt-md-0">
                        <button 
                            className="btn btn-sm btn-outline-primary w-100"
                            onClick={toggleSortOrder}
                        >
                            {sortOrder === "asc" ? (
                                <><i className="bi bi-sort-numeric-down"></i> Menor pago</>
                            ) : (
                                <><i className="bi bi-sort-numeric-up"></i> Mayor pago</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <TablaPagos pagos={filteredPagos} />
        </SectionWrapper>
    );
};

export default Pagos;
