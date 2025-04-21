import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerCentered from "../components/UI/SpinnerCentered";
import PageHeader from "../components/UI/PageHeader";
import DetalleDestinoCard from "../components/Destinos/DetalleDestinoCard";

const DestinoDetalle = () => {
    const { id } = useParams();
    const [destino, setDestino] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchDestino = async () => {
        try {
        const response = await fetch(`http://localhost:5000/api/destinos/${id}`);
        const data = await response.json();
        setDestino(data);
        } catch (err) {
        console.error("Error al cargar el destino:", err);
        } finally {
        setLoading(false);
        }
    };

    fetchDestino();
    }, [id]);

    if (loading) return <SpinnerCentered text="Cargando información del destino..." />;
    if (!destino) return <p>No se encontró el destino.</p>;

    return (
    <>
        <PageHeader
        iconClass="bi-geo-alt-fill"
        title={destino.nombre}
        subtitle={destino.ubicacion}
        />
        <DetalleDestinoCard destino={destino} />
    </>
    );
};

export default DestinoDetalle;