import { useState } from "react";

const TablaPagos = ({ pagos, rol }) => {
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [ordenMonto, setOrdenMonto] = useState("desc");

    if (!pagos || pagos.length === 0) {
        return (
            <div className="alert alert-light border d-flex align-items-center">
                <i className="bi bi-info-circle-fill text-primary me-2"></i>
                No se encontraron registros de pagos
            </div>
        );
    }

    const pagosFiltrados = pagos
        .filter(pago => filtroEstado === "todos" || pago.estado_pago.toLowerCase() === filtroEstado.toLowerCase())
        .sort((a, b) => ordenMonto === "desc" ? b.monto - a.monto : a.monto - b.monto);

    const toggleOrdenMonto = () => setOrdenMonto(ordenMonto === "desc" ? "asc" : "desc");

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-primary">
                        <i className="bi bi-credit-card me-2"></i>
                        Historial de Pagos
                    </h5>
                    {rol === "admin" && (
                        <div className="d-flex">
                            <select 
                                className="form-select form-select-sm me-2"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                                style={{ width: '150px' }}
                            >
                                <option value="todos">Todos los estados</option>
                                <option value="pagado">Pagados</option>
                                <option value="pendiente">Pendientes</option>
                                <option value="rechazado">Rechazados</option>
                            </select>
                            <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={toggleOrdenMonto}
                                title={`Ordenar por monto (${ordenMonto === 'desc' ? 'mayor a menor' : 'menor a mayor'})`}
                            >
                                <i className={`bi ${ordenMonto === 'desc' ? 'bi-sort-down' : 'bi-sort-up'}`}></i>
                                Monto
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr className="bg-light">
                                <th className="text-muted">ID</th>
                                <th className="text-muted">Usuario</th>
                                <th className="text-muted">Destino</th>
                                <th className="text-muted">Método</th>
                                <th className="text-muted text-end">Monto</th>
                                <th className="text-muted text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagosFiltrados.map((pago) => (
                                <tr key={pago.id_pago}>
                                    <td className="text-secondary">#{pago.id_pago}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-person-circle me-2 text-muted"></i>
                                            {pago.usuario ? (
                                                <span>
                                                    <span className="badge bg-info text-dark me-2">
                                                        {pago.id_usuario}
                                                    </span>
                                                    {pago.usuario}
                                                </span>
                                            ) : 'N/A'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-geo-alt me-2 text-muted"></i>
                                            {pago.destino ? (
                                                <span>
                                                    <span className="badge bg-success text-white me-2">
                                                        {pago.id_destino}
                                                    </span>
                                                    {pago.destino}
                                                </span>
                                            ) : 'N/A'}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill ${
                                            pago.metodo_pago === 'tarjeta' ? 'bg-primary' :
                                            pago.metodo_pago === 'nequi' ? 'bg-indigo' :
                                            'bg-info'
                                        }`}>
                                            <i className={`bi ${
                                                pago.metodo_pago === 'tarjeta' ? 'bi-credit-card' :
                                                pago.metodo_pago === 'nequi' ? 'bi-wallet' :
                                                'bi-bank'
                                            } me-1`}></i>
                                            {pago.metodo_pago.charAt(0).toUpperCase() + pago.metodo_pago.slice(1)}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <span className="text-nowrap">
                                            <strong className="text-second">COP</strong> {parseInt(pago.monto).toLocaleString("es-CO")}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className={`badge rounded-pill ${
                                            pago.estado_pago.toLowerCase() === 'pagado' ? 'bg-success' :
                                            pago.estado_pago.toLowerCase() === 'pendiente' ? 'bg-warning text-dark' :
                                            'bg-danger'
                                        }`}>
                                            <i className={`bi ${
                                                pago.estado_pago.toLowerCase() === 'pagado' ? 'bi-check-circle' :
                                                pago.estado_pago.toLowerCase() === 'pendiente' ? 'bi-hourglass' :
                                                'bi-x-circle'
                                            } me-1`}></i>
                                            {pago.estado_pago.charAt(0).toUpperCase() + pago.estado_pago.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card-footer bg-light border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        Mostrando {pagosFiltrados.length} de {pagos.length} registros
                    </small>
                    {rol === "admin" && filtroEstado !== "todos" && (
                        <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setFiltroEstado("todos")}
                        >
                            <i className="bi bi-x-circle me-1"></i>
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            <style>{`
                .bg-indigo {
                    background-color: #6f42c1;
                    color: white;
                }
                .bg-indigo:hover {
                    background-color: #5e36b1;
                }
            `}</style>
        </div>
    );
};

export default TablaPagos;
