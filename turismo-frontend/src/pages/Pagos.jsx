import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import SpinnerCentered from "../components/UI/SpinnerCentered";
import TablaPagos from "../components/Pagos/TablaPagos";

const Pagos = () => {
    const { usuario } = useAuth();
    const [allPagos, setAllPagos] = useState([]);
    const [filteredPagos, setFilteredPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/pagos");
                const data = await res.json();
                setAllPagos(data);
                
                // Filtrar según rol y ordenar por defecto (mayor a menor)
                let result = usuario?.rol === "turista" 
                    ? data.filter((p) => p.usuario === usuario.nombre) 
                    : data;
                
                result = sortPagos(result, sortOrder);
                setFilteredPagos(result);
            } catch (error) {
                console.error("Error al cargar pagos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchPagos();
    }, [usuario]);

    useEffect(() => {
        let result = allPagos.filter(pago => {
            return (
                pago.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pago.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pago.metodo_pago.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        if (usuario?.rol === "turista") {
            result = result.filter((p) => p.usuario === usuario.nombre);
        }

        result = sortPagos(result, sortOrder);
        setFilteredPagos(result);
    }, [searchTerm, allPagos, sortOrder, usuario]);

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
