import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerCentered from "../components/UI/SpinnerCentered";
import PageHeader from "../components/UI/PageHeader";
import DetalleGuiaCard from "../components/Guias/DetalleGuiaCard";

const GuiaDetalle = () => {
    const { id } = useParams();
    const [guia, setGuia] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchGuia = async () => {
        try {
        const response = await fetch(`http://localhost:5000/api/guias/${id}`);
        const data = await response.json();
        setGuia(data);
        } catch (err) {
        console.error("Error al cargar el guía:", err);
        } finally {
        setLoading(false);
        }
    };

    fetchGuia();
    }, [id]);

    if (loading) return <SpinnerCentered text="Cargando información del guía..." />;
    if (!guia) return <p>No se encontró el guía.</p>;

    return (
    <>
        <PageHeader
        iconClass="bi-person-badge-fill"
        title={guia.nombre}
        subtitle="Guía turístico certificado"
        />
        <DetalleGuiaCard guia={guia} />
    </>
    );
};

export default GuiaDetalle;
