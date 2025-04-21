import React from 'react';
import Input from "./Input";
import Textarea from "./Textarea";

const ContactForm = () => {
  return (
    <form className="contact-form">
      <Input 
        type="text" 
        placeholder="Nombre completo" 
        required 
        icon="person-fill"
      />
      <Input 
        type="email" 
        placeholder="Correo Electrónico" 
        required 
        icon="envelope-fill"
      />
      <Textarea 
        placeholder="Tu mensaje aquí..." 
        required 
        rows={5} 
      />
      <div className="d-grid">
        <button type="submit" className="btn btn-primary mt-3">
          <i className="bi bi-send-fill me-2"></i>
          Enviar Mensaje
        </button>
      </div>
    </form>
  );
};

export default ContactForm;