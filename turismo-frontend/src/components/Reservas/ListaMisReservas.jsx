import { useEffect, useState } from "react";
import api from "../../api/api";

const ListaMisReservas = ({ id_usuario }) => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await api.get("/reservas/mis-reservas");
                const data = response.data;
                // No need to filter by id_usuario as the backend should return only the user's reservations
                setReservas(data);
            } catch (error) {
                console.error("Error al cargar reservas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [id_usuario]);

    if (loading) return <p>Cargando tus reservas...</p>;

    if (reservas.length === 0) return <p>No tienes reservas registradas.</p>;

    return (
    <div className="table-responsive">
        <table className="table table-bordered table-striped">
        <thead className="table-light">
            <tr>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            {reservas.map((r) => (
            <tr key={r.id_reserva}>
                <td>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt me-2 text-muted"></i>
                    <span>
                      <span className="badge bg-success text-white me-2">
                        {r.id_destino}
                      </span>
                      {r.destino || 'Sin destino'}
                    </span>
                  </div>
                </td>
                <td>{new Date(r.fecha_reserva).toLocaleDateString()}</td>
                <td>{r.cantidad_personas}</td>
                <td>
                <span className="badge bg-info text-dark">{r.estado}</span>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};

export default ListaMisReservas;
