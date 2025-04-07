import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './ContenidoInfo.css';

const ContenidoInfo = () => {
    return (
        <div className="informacion-container container my-5">
            <h2 className="text-center mb-5">Información</h2>

            <div className="info-section card shadow-sm p-4 mb-4">
                <h3>Sobre nosotros</h3>
                <p>
                    En <strong>Elite Tours</strong>, conectamos a viajeros con guías turísticos locales en las principales regiones de Colombia. Nuestro objetivo es ofrecer experiencias auténticas, seguras y enriquecedoras para quienes desean conocer la riqueza cultural, natural y gastronómica de nuestro país.
                </p>
                <p>
                    Contamos con alianzas con operadores locales certificados en ciudades como Cartagena, Medellín, Cali, San Andrés. Cada guía es evaluado constantemente para garantizar un servicio de calidad.
                </p>
                <p>
                    Somos una empresa 100% colombiana comprometida con el turismo sostenible, el desarrollo local y el respeto por las comunidades que nos reciben.
                </p>
            </div>

            <div className="info-section card shadow-sm p-4 mb-4">
                <h3>Opciones de pago</h3>
                <p>Para tu comodidad, ofrecemos múltiples opciones de pago:</p>
                <ul>
                    <li>Tarjetas de crédito y débito (Visa, Mastercard, American Express)</li>
                    <li>Transferencia bancaria (Bancolombia, Davivienda, Banco de Bogotá)</li>
                    <li>Pagos móviles: Nequi, Daviplata</li>
                    <li>Pagos en efectivo a través de Efecty o Baloto</li>
                </ul>
                <p>
                    Todos los pagos están protegidos bajo protocolos de seguridad y cifrado. Al completar tu reserva, recibirás un comprobante electrónico y una factura legal.
                </p>
            </div>

            <div className="info-section card shadow-sm p-4 mb-4">
                <h3>Reembolso</h3>
                <p>Sabemos que pueden surgir imprevistos, por eso contamos con una política de reembolsos clara:</p>
                <ul>
                    <li>Cancelaciones con más de 48 horas: reembolso del 100%</li>
                    <li>Cancelaciones entre 24 y 48 horas: reembolso del 50%</li>
                    <li>Menos de 24 horas: no se realiza reembolso (salvo casos excepcionales)</li>
                </ul>
                <p>
                    Para solicitar un reembolso, escribe a <strong>soporte@elitetours.com</strong> indicando tu número de reserva y motivo. El trámite toma de 3 a 5 días hábiles.
                </p>
            </div>

            <div className="info-section card shadow-sm p-4">
                <h3>Políticas de privacidad</h3>
                <p>
                    En <strong>Elite Tours</strong> protegemos tus datos personales. Usamos tu información solo para procesar reservas, contactarte y mejorar tu experiencia.
                </p>
                <p>
                    No compartimos datos con terceros sin tu consentimiento, salvo por obligación legal. Puedes solicitar la eliminación de tus datos cuando lo desees.
                </p>
                <p>
                    Cumplimos la Ley 1581 de 2012 sobre Protección de Datos Personales en Colombia.
                </p>
            </div>
        </div>
    );
};

export default ContenidoInfo;