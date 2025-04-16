"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import GuiaCard from "../../components/guias/GuiaCard";

const GuiasList = () => {
  const [guias, setGuias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchGuias = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guias/");
        setGuias(response.data);
      } catch (error) {
        console.error("Error al cargar guías:", error);
        setError(
          error.response?.data?.message ||
            "Error al cargar los guías. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGuias();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando guías turísticos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (guias.length === 0) {
    return (
      <div className="text-center my-5">
        <i className="bi bi-people-fill display-1 text-muted"></i>
        <h3 className="mt-3">No hay guías disponibles</h3>
        <p className="text-muted">
          Vuelve pronto para conocer a nuestros guías turísticos.
        </p>
        {isAdmin() && (
          <Link to="/admin/guias/nuevo" className="btn btn-primary mt-3">
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Guía
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-people me-2"></i>
          Nuestros Guías Turísticos
        </h2>
        {isAdmin() && (
          <Link to="/admin/guias/nuevo" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Guía
          </Link>
        )}
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {guias.map((guia) => (
          <GuiaCard key={guia.id} guia={guia} />
        ))}
      </div>
    </div>
  );
};

export default GuiasList;
