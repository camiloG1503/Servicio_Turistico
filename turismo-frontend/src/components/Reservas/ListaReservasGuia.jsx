import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

const ListaReservasGuia = () => {
  const { usuario } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [reservasFiltradas, setReservasFiltradas] = useState([]);
  const [guias, setGuias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    turista: '',
    destino: '',
    fecha: '',
    estado: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [resReservas, resGuias] = await Promise.all([
        api.get("/reservas/"),
        api.get("/guias/")
      ]);

      const dataReservas = resReservas.data;
      const dataGuias = resGuias.data;

      setReservas(dataReservas.map(reserva => ({
        ...reserva,
        nombre_guia: dataGuias.find(g => g.id_guia === reserva.id_guia)?.nombre
      })));

      setReservasFiltradas(dataReservas.map(reserva => ({
        ...reserva,
        nombre_guia: dataGuias.find(g => g.id_guia === reserva.id_guia)?.nombre
      })));

      setGuias(dataGuias);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, reservas]);

  const aplicarFiltros = () => {
    let resultado = [...reservas];

    if (filtros.turista) {
      resultado = resultado.filter(reserva => 
        reserva.usuario?.toLowerCase().includes(filtros.turista.toLowerCase())
      );
    }

    if (filtros.destino) {
      resultado = resultado.filter(reserva => 
        reserva.destino?.toLowerCase().includes(filtros.destino.toLowerCase())
      );
    }

    if (filtros.fecha) {
      resultado = resultado.filter(reserva => 
        reserva.fecha_reserva.includes(filtros.fecha)
      );
    }

    if (filtros.estado) {
      resultado = resultado.filter(reserva => 
        reserva.estado.toLowerCase() === filtros.estado.toLowerCase()
      );
    }

    setReservasFiltradas(resultado);
  };

  const handleChangeFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTomarReserva = async (idReserva) => {
    if (!usuario?.id_usuario) {
      setError("Debes iniciar sesión como guía para tomar reservas");
      return;
    }

    try {
      const response = await api.put(`/reservas/${idReserva}`, {
        id_guia: usuario.id_usuario,
        estado: 'confirmada'
      });

      const data = response.data;

      const guiaAsignado = guias.find(g => g.id_guia === usuario.id_usuario);
      const actualizarReservas = (prevReservas) => 
        prevReservas.map(reserva => 
          reserva.id_reserva === idReserva 
            ? { 
                ...reserva, 
                estado: 'confirmada', 
                id_guia: usuario.id_usuario,
                nombre_guia: guiaAsignado?.nombre
              }
            : reserva
        );

      setReservas(actualizarReservas);
      setReservasFiltradas(actualizarReservas);

      alert(`¡Reserva asignada con éxito a ${guiaAsignado?.nombre || 'ti'}!`);
    } catch (error) {
      setError(error.message);
      console.error("Error al tomar reserva:", error);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <span className="ms-3">Cargando reservas...</span>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {error}
      <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchData}>
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="container-fluid py-3">
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-funnel-fill me-2"></i>
            Filtros de Reservas
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="turista" className="form-label">Turista</label>
              <input 
                type="text" 
                className="form-control" 
                id="turista" 
                name="turista"
                value={filtros.turista}
                onChange={handleChangeFiltro}
                placeholder="Filtrar por turista"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="destino" className="form-label">Destino</label>
              <input 
                type="text" 
                className="form-control" 
                id="destino" 
                name="destino"
                value={filtros.destino}
                onChange={handleChangeFiltro}
                placeholder="Filtrar por destino"
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="fecha" className="form-label">Fecha</label>
              <input 
                type="date" 
                className="form-control" 
                id="fecha" 
                name="fecha"
                value={filtros.fecha}
                onChange={handleChangeFiltro}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="estado" className="form-label">Estado</label>
              <select 
                className="form-select" 
                id="estado" 
                name="estado"
                value={filtros.estado}
                onChange={handleChangeFiltro}
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button 
                className="btn btn-outline-danger w-100"
                onClick={() => setFiltros({
                  turista: '',
                  destino: '',
                  fecha: '',
                  estado: ''
                })}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-list-check me-2"></i>
            Listado de Reservas
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Turista</th>
                  <th>Destino</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Guía Asignado</th>
                  <th>Personas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.length > 0 ? (
                  reservasFiltradas.map((reserva) => (
                    <tr key={reserva.id_reserva}>
                      <td>
                        <span className="badge bg-info text-dark">
                          {reserva.id_usuario}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person me-2 text-muted"></i>
                          <span>{reserva.usuario || 'Sin nombre'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt me-2 text-muted"></i>
                          <span>
                            <span className="badge bg-success text-white me-2">
                              {reserva.id_destino}
                            </span>
                            {reserva.destino || 'Sin destino'}
                          </span>
                        </div>
                      </td>
                      <td>
                        {new Date(reserva.fecha_reserva).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${
                          reserva.estado === 'confirmada' ? 'bg-success' : 
                          reserva.estado === 'pendiente' ? 'bg-warning text-dark' : 
                          'bg-danger'
                        }`}>
                          <i className={`bi ${
                            reserva.estado === 'confirmada' ? 'bi-check-circle-fill' : 
                            reserva.estado === 'pendiente' ? 'bi-hourglass-split' : 
                            'bi-x-circle-fill'
                          } me-1`}></i>
                          {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                        </span>
                      </td>
                      <td>
                        {reserva.estado === 'confirmada' ? (
                          reserva.nombre_guia ? (
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-badge me-2 text-primary"></i>
                              <span className="text-primary fw-bold">{reserva.nombre_guia}</span>
                            </div>
                          ) : (
                            <span className="text-muted">Asignado (sin nombre)</span>
                          )
                        ) : (
                          <span className="text-muted">No asignado</span>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-secondary rounded-pill">
                          {reserva.cantidad_personas}
                        </span>
                      </td>
                      <td>
                        {reserva.estado === 'pendiente' && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleTomarReserva(reserva.id_reserva)}
                            disabled={!usuario || usuario.rol !== 'guia'}
                            title={!usuario ? "Debes iniciar sesión" : usuario.rol !== 'guia' ? "Solo para guías" : ""}
                          >
                            <i className="bi bi-person-check me-1"></i>
                            Tomar Reserva
                          </button>
                        )}
                        {reserva.estado === 'confirmada' && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            title="Ver detalles"
                          >
                            <i className="bi bi-info-circle me-1"></i>
                            Detalles
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <div className="alert alert-info mb-0">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        No se encontraron reservas con los filtros aplicados
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaReservasGuia;
