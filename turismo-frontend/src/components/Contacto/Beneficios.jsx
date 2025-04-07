import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Beneficios.css";

const Beneficios = () => {
    return (
        <section className="benefits container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="benefit-item">
                        <i className="bi bi-trophy-fill benefit-icon"></i>
                        <strong>Alta Calidad</strong>
                        <p>Sitios turísticos de primera calidad</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="benefit-item">
                        <i className="bi bi-shield-check benefit-icon"></i>
                        <strong>Protección de la garantía</strong>
                        <p>Más de 2 años</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="benefit-item">
                        <i className="bi bi-headset benefit-icon"></i>
                        <strong>Soporte 24/7</strong>
                        <p>Soporte dedicado</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Beneficios;