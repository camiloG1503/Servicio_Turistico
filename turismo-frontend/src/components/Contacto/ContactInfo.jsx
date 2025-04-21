import React from 'react';
import ContactDetail from "./ContactDetail";

const ContactInfo = () => {
  return (
    <div className="contact-card">
      <h4 className="mb-4 fw-bold" style={{ color: '#2d3748' }}>
        <i className="bi bi-info-circle-fill me-2" style={{ color: '#4e66f8' }}></i>
        Información de Contacto
      </h4>
      
      <ContactDetail 
        icon="geo-alt-fill" 
        label="Dirección" 
        content="Cra 25, Calle 50, Cali, Colombia" 
      />
      
      <div className="contact-divider"></div>
      
      <ContactDetail 
        icon="telephone-fill" 
        label="Teléfono" 
        content="+57 (123) 456-7890\n+57 (123) 456-4342" 
      />
      
      <div className="contact-divider"></div>
      
      <ContactDetail 
        icon="clock-fill" 
        label="Horario" 
        content="Lunes–Viernes: 9:00 – 18:00\nSábado–Domingo: 9:00 – 20:00" 
      />
    </div>
  );
};

export default ContactInfo;