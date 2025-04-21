import { useState } from "react";
import StatCard from "./StatCard";
import "./ResumenEstadisticas.css";

const ResumenEstadisticas = ({ stats }) => {
    const [activeTab, setActiveTab] = useState(null);

    const handleCardClick = (tab) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Panel de Estadísticas</h2>
                <p className="dashboard-subtitle">Resumen general de la plataforma</p>
            </div>
            
            <div className="dashboard-grid">
                <StatCard 
                    title="Usuarios registrados" 
                    value={stats?.usuarios?.length ?? 0} 
                    icon="bi-people-fill" 
                    color="primary"
                    onClick={() => handleCardClick('usuarios')}
                    active={activeTab === 'usuarios'}
                />
                <StatCard 
                    title="Destinos turísticos" 
                    value={stats?.destinos?.length ?? 0} 
                    icon="bi-geo-alt-fill" 
                    color="success"
                    onClick={() => handleCardClick('destinos')}
                    active={activeTab === 'destinos'}
                />
                <StatCard 
                    title="Reservas realizadas" 
                    value={stats?.reservas?.length ?? 0} 
                    icon="bi-calendar-check-fill" 
                    color="danger"
                    onClick={() => handleCardClick('reservas')}
                    active={activeTab === 'reservas'}
                />
                <StatCard 
                    title="Pagos realizados" 
                    value={stats?.pagos?.length ?? 0} 
                    icon="bi-cash-coin" 
                    color="dark"
                    onClick={() => handleCardClick('pagos')}
                    active={activeTab === 'pagos'}
                />
                <StatCard 
                    title="Guías activos" 
                    value={stats?.guias?.length ?? 0} 
                    icon="bi-person-badge-fill" 
                    color="info"
                    onClick={() => handleCardClick('guias')}
                    active={activeTab === 'guias'}
                />
                <StatCard
                    title="Reseñas recibidas" 
                    value={stats?.resenas?.length ?? 0} 
                    icon="bi-star-fill" 
                    color="warning"
                    onClick={() => handleCardClick('reseñas')}
                    active={activeTab === 'reseñas'}
                />
            </div>

            {activeTab && (
                <div className="dashboard-details">
                    <DetailsPanel tab={activeTab} stats={stats} onClose={() => setActiveTab(null)} />
                </div>
            )}
        </div>
    );
};

const DetailsPanel = ({ tab, stats, onClose }) => {
    const getPanelTitle = () => {
        const titles = {
            'usuarios': 'Usuarios Registrados',
            'destinos': 'Destinos Turísticos',
            'reservas': 'Reservas Realizadas',
            'pagos': 'Transacciones de Pago',
            'guias': 'Guías Turísticos Activos',
            'reseñas': 'Reseñas y Calificaciones'
        };
        return titles[tab] || 'Detalles';
    };

    const renderTable = () => {
        switch(tab) {
            case 'usuarios':
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-person-fill me-2"></i>Nombre</th>
                                <th><i className="bi bi-envelope-fill me-2"></i>Email</th>
                                <th><i className="bi bi-person-rolodex me-2"></i>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.usuarios.map((u, i) => (
                                <tr key={i}>
                                    <td>{u.nombre}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`badge bg-${u.rol === 'admin' ? 'danger' : u.rol === 'guia' ? 'info' : 'primary'}`}>
                                            {u.rol}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'destinos':
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-geo-alt-fill me-2"></i>Nombre</th>
                                <th><i className="bi bi-pin-map-fill me-2"></i>Ubicación</th>
                                <th><i className="bi bi-currency-dollar me-2"></i>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.destinos.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.nombre}</td>
                                    <td>{d.ubicacion}</td>
                                    <td className="fw-bold">${Number(d.precio).toLocaleString("es-CO")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'reservas':
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-person-fill me-2"></i>Usuario</th>
                                <th><i className="bi bi-geo-alt-fill me-2"></i>Destino</th>
                                <th><i className="bi bi-calendar-event me-2"></i>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.reservas.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.usuario}</td>
                                    <td>{r.destino}</td>
                                    <td>
                                        <span className="badge bg-light text-dark">
                                            <i className="bi bi-calendar-check me-1"></i>
                                            {r.fecha_reserva?.split('T')[0]}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'pagos':
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-cash-stack me-2"></i>Monto</th>
                                <th><i className="bi bi-credit-card me-2"></i>Método</th>
                                <th><i className="bi bi-check-circle-fill me-2"></i>Estado</th>
                                <th><i className="bi bi-person-fill me-2"></i>Usuario</th>
                                <th><i className="bi bi-geo-alt-fill me-2"></i>Destino</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.pagos.map((p, i) => (
                                <tr key={i}>
                                    <td className="fw-bold">${Number(p.monto).toLocaleString("es-CO")}</td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {p.metodo_pago}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge bg-${p.estado_pago === 'completado' ? 'success' : 'warning'}`}>
                                            {p.estado_pago}
                                        </span>
                                    </td>
                                    <td>{p.usuario}</td>
                                    <td>{p.destino}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'guias':
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-person-badge-fill me-2"></i>Nombre</th>
                                <th><i className="bi bi-envelope-fill me-2"></i>Email</th>
                                <th><i className="bi bi-translate me-2"></i>Idiomas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.guias.map((g, i) => (
                                <tr key={i}>
                                    <td>{g.nombre}</td>
                                    <td>{g.email}</td>
                                    <td>
                                        {g.idiomas.split(',').map((idioma, idx) => (
                                            <span key={idx} className="badge bg-info me-1">
                                                {idioma.trim()}
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'reseñas':
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-star-fill me-2"></i>Calificación</th>
                                <th><i className="bi bi-chat-left-text-fill me-2"></i>Comentario</th>
                                <th><i className="bi bi-person-fill me-2"></i>Usuario</th>
                                <th><i className="bi bi-geo-alt-fill me-2"></i>Destino</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.resenas.map((r, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="star-rating">
                                            {[...Array(5)].map((_, idx) => (
                                                <i 
                                                    key={idx} 
                                                    className={`bi bi-star${idx < r.calificacion ? '-fill' : ''} ${idx < r.calificacion ? 'text-warning' : 'text-muted'}`}
                                                ></i>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        {r.comentario ? (
                                            <div className="comment-truncate" title={r.comentario}>
                                                {r.comentario.length > 50 ? `${r.comentario.substring(0, 50)}...` : r.comentario}
                                            </div>
                                        ) : 'Sin comentario'}
                                    </td>
                                    <td>{r.usuario}</td>
                                    <td>{r.destino}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div className="details-panel">
            <div className="panel-header">
                <h3 className="panel-title">
                    <i className={`bi ${tab === 'usuarios' ? 'bi-people-fill' : 
                                  tab === 'destinos' ? 'bi-geo-alt-fill' : 
                                  tab === 'reservas' ? 'bi-calendar-check-fill' : 
                                  tab === 'pagos' ? 'bi-cash-coin' : 
                                  tab === 'guias' ? 'bi-person-badge-fill' : 
                                  'bi-star-fill'} me-2`}></i>
                    {getPanelTitle()}
                </h3>
                <button className="btn-close-panel" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="panel-content">
                {renderTable()}
            </div>
        </div>
    );
};

export default ResumenEstadisticas;