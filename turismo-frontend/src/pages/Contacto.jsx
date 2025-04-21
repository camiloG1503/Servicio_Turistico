import React from 'react';
import ContactInfo from "../components/Contacto/ContactInfo";
import ContactForm from "../components/Contacto/ContactForm";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import "../components/Contacto/Contacto.css";

const Contacto = () => {
  return (
    <SectionWrapper className="contact-section">
      <PageHeader
        iconClass="bi-chat-square-text-fill"
        title="Contáctanos"
        subtitle="¿Tienes preguntas o necesitas ayuda? Estamos aquí para asistirte. Completa el formulario o contáctanos directamente."
      />
      <div className="container">
        <div className="row justify-content-center g-5">
          <div className="col-lg-5">
            <ContactInfo />
          </div>
          <div className="col-lg-6">
            <div className="contact-card">
              <h4 className="mb-4 fw-bold" style={{ color: '#2d3748' }}>
                <i className="bi bi-envelope-paper-fill me-2" style={{ color: '#4e66f8' }}></i>
                Envíanos un Mensaje
              </h4>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contacto;