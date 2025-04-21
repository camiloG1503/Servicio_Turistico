import { useEffect, useState } from "react";

const ListaMisReservas = ({ id_usuario }) => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:5000/api/reservas")
        .then(res => res.json())
        .then(data => {
        const propias = data.filter(r => r.id_usuario === id_usuario);
        setReservas(propias);
        setLoading(false);
        })
        .catch(() => setLoading(false));
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
                <td>{r.nombre_destino}</td>
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