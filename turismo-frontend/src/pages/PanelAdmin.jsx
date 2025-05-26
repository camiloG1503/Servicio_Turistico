import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DestinoForm from "../components/Admin/DestinoForm";
import DestinosAdminList from "../components/Admin/DestinosAdminList";
import ListaUsuariosAdmin from "../components/Admin/ListaUsuariosAdmin";
import "../components/Admin/AdminPanel.css";
import api from "../api/api";

const PanelAdmin = () => {
    const { usuario } = useAuth();
    const [tab, setTab] = useState("destinos");
    const [editingDestino, setEditingDestino] = useState(null);
    const [destinos, setDestinos] = useState([]);
    const [loadingDestinos, setLoadingDestinos] = useState(false);
    const [errorDestinos, setErrorDestinos] = useState(null);

    const fetchDestinos = async () => {
        try {
            setLoadingDestinos(true);
            setErrorDestinos(null);

            const response = await api.get("/destinos/");
            setDestinos(response.data);
        } catch (err) {
            console.error("Error al cargar destinos:", err);
            const errorMessage = err.response?.data?.mensaje || 
                               err.response?.data?.error || 
                               err.message || 
                               "Error desconocido";
            setErrorDestinos(errorMessage);
        } finally {
            setLoadingDestinos(false);
        }
    };

    useEffect(() => {
        if (tab === "destinos") {
            fetchDestinos();
        }

        if (tab === "estadisticas") {
            // Usar el cliente API para obtener estadísticas del dashboard
            api.get("/admin/dashboard")
                .then(response => {
                    // Procesar los datos del dashboard si es necesario
                    console.log("Datos del dashboard:", response.data);
                })
                .catch(error => {
                    console.error("Error al cargar estadísticas:", error);
                });
        }
    }, [tab]);

    const handleSuccess = () => {
        setEditingDestino(null);
        fetchDestinos();
    };

    if (!usuario || usuario.rol !== "admin") return <Navigate to="/" />;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title">
                    <i className="bi bi-shield-lock"></i>
                    Panel de Administración
                </h2>
                <p className="admin-subtitle">
                    Gestión completa de destinos, usuarios y configuración del sistema
                </p>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${tab === "destinos" ? "active" : ""}`}
                    onClick={() => setTab("destinos")}
                >
                    <i className="bi bi-geo-alt"></i>
                    Destinos
                </button>
                <button 
                    className={`tab-btn ${tab === "usuarios" ? "active" : ""}`}
                    onClick={() => setTab("usuarios")}
                >
                    <i className="bi bi-people"></i>
                    Usuarios
                </button>
            </div>

            {tab === "destinos" && (
                <div className="row g-4">
                    <div className="col-md-5">
                        <div className="card-admin">
                            <h5 className="card-title">
                                <i className="bi bi-pencil-square"></i>
                                {editingDestino ? "Editar Destino" : "Nuevo Destino"}
                            </h5>
                            <DestinoForm
                                initialData={editingDestino}
                                onSuccess={handleSuccess}
                            />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card-admin">
                            <h5 className="card-title">
                                <i className="bi bi-list-ul"></i>
                                Listado de Destinos
                            </h5>
                            {loadingDestinos ? (
                                <div className="alert alert-info">
                                    <i className="bi bi-hourglass-split"></i>
                                    Cargando destinos...
                                </div>
                            ) : errorDestinos ? (
                                <div className="alert alert-danger">
                                    <i className="bi bi-exclamation-triangle"></i>
                                    Error: {errorDestinos}
                                </div>
                            ) : (
                                <DestinosAdminList 
                                    destinos={destinos} 
                                    onEdit={setEditingDestino} 
                                    onDelete={fetchDestinos}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {tab === "usuarios" && <ListaUsuariosAdmin />}
        </div>
    );
};

export default PanelAdmin;
