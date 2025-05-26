import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const ListaReservasAdmin = () => {
    const [reservas, setReservas] = useState([]);
    const [filteredReservas, setFilteredReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByRecent, setSortByRecent] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                setLoading(true);
                const response = await api.get("/reservas/admin/reservas-usuarios");
                const data = response.data;
                setReservas(data);
                const sortedData = [...data].sort((a, b) => 
                    new Date(b.fecha_reserva) - new Date(a.fecha_reserva)
                );
                setFilteredReservas(sortedData);
            } catch (error) {
                console.error("Error fetching reservas:", error);
                alert(error.response?.data?.error || "Error al cargar reservas. Intente nuevamente.");
            } finally {
                setLoading(false);
            }
        };
        fetchReservas();
    }, []);

    useEffect(() => {
        let result = reservas.filter(reserva => {
            const matchesSearch =
                (reserva.nombre_usuario?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                (reserva.destino?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                new Date(reserva.fecha_reserva).toLocaleDateString('es-ES').includes(searchTerm);

            const matchesEstado =
                filtroEstado === "todos" ||
                (reserva.estado?.toLowerCase() || "") === filtroEstado.toLowerCase();

            return matchesSearch && matchesEstado;
        });

        result.sort((a, b) => 
            sortByRecent 
                ? new Date(b.fecha_reserva) - new Date(a.fecha_reserva)
                : new Date(a.fecha_reserva) - new Date(b.fecha_reserva)
        );

        setFilteredReservas(result);
    }, [searchTerm, reservas, sortByRecent, filtroEstado]);

    const toggleSortOrder = () => setSortByRecent(!sortByRecent);

    const handleVerDetalle = (idReserva) => {
        navigate(`/admin/reservas/${idReserva}`);
    };

    if (loading) return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <span className="ms-3">Cargando reservas...</span>
        </div>
    );

    return (
        <div className="container-fluid py-4">
            {/* Panel de Filtros */}
            <div className="card mb-4 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="card-header bg-light border-0">
                    <h5 className="mb-0 text-primary">
                        <i className="bi bi-sliders me-2"></i>
                        Panel de Control de Reservas
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text" style={{ backgroundColor: '#e9ecef' }}>
                                    <i className="bi bi-search text-secondary"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Buscar por usuario, destino o fecha..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <select 
                                className="form-select"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                            >
                                <option value="todos">Todos los estados</option>
                                <option value="confirmada">Confirmadas</option>
                                <option value="pendiente">Pendientes</option>
                                <option value="cancelada">Canceladas</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <button 
                                className="btn btn-outline-primary w-100"
                                onClick={toggleSortOrder}
                            >
                                <i className={`bi ${sortByRecent ? 'bi-sort-down' : 'bi-sort-up'} me-2`}></i>
                                {sortByRecent ? 'Más recientes' : 'Más antiguas'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de Resultados */}
            <div className="card shadow-sm border-0">
                <div className="card-header bg-light border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-primary">
                            <i className="bi bi-list-check me-2"></i>
                            Listado de Reservas
                        </h5>
                        <span className="badge bg-primary">
                            {filteredReservas.length} {filteredReservas.length === 1 ? 'reserva' : 'reservas'}
                        </span>
                    </div>
                </div>
                <div className="card-body p-0">
                    {filteredReservas.length === 0 ? (
                        <div className="alert alert-light m-4 border">
                            <i className="bi bi-info-circle text-primary me-2"></i>
                            No se encontraron reservas con los filtros aplicados
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead>
                                    <tr className="bg-light">
                                        <th className="text-primary">Usuario</th>
                                        <th className="text-primary">Destino</th>
                                        <th className="text-primary">Fecha</th>
                                        <th className="text-primary text-center">Personas</th>
                                        <th className="text-primary">Estado</th>
                                        <th className="text-primary text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReservas.map((reserva) => (
                                        <tr key={reserva.id_reserva} className="align-middle">
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-person-circle me-2 text-muted"></i>
                                                    <span className="text-dark">
                                                        <span className="badge bg-info text-dark me-2">
                                                            {reserva.id_usuario}
                                                        </span>
                                                        {reserva.nombre_usuario}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-geo-alt me-2 text-muted"></i>
                                                    <span className="text-dark">
                                                        <span className="badge bg-success text-white me-2">
                                                            {reserva.id_destino}
                                                        </span>
                                                        {reserva.destino}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-calendar-date me-2 text-muted"></i>
                                                    <span className="text-dark">
                                                        {new Date(reserva.fecha_reserva).toLocaleDateString('es-ES', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-light text-dark border rounded-pill">
                                                    <i className="bi bi-people me-1 text-primary"></i>
                                                    {reserva.cantidad_personas}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge rounded-pill ${
                                                    reserva.estado.toLowerCase() === 'confirmada' ? 'bg-success' :
                                                    reserva.estado.toLowerCase() === 'pendiente' ? 'bg-warning text-dark' :
                                                    'bg-danger'
                                                }`}>
                                                    <i className={`bi ${
                                                        reserva.estado.toLowerCase() === 'confirmada' ? 'bi-check-circle' :
                                                        reserva.estado.toLowerCase() === 'pendiente' ? 'bi-hourglass' :
                                                        'bi-x-circle'
                                                    } me-1`}></i>
                                                    {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    onClick={() => handleVerDetalle(reserva.id_reserva)}
                                                    title="Ver detalles"
                                                    style={{ width: '32px', height: '32px' }}
                                                >
                                                    <i className="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListaReservasAdmin;
