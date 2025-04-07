import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ContactoPage.css";

const ContactoPage = () => {
    return (
        <section className="contact-section container">
            <h2 className="contact-title mb-3">Contáctanos</h2>
            <p className="contact-subtitle mb-5">
                Para más información sobre nuestros sitios y servicios, no dude en contactarnos por correo electrónico.
                Nuestro personal estará encantado de ayudarle. ¡No lo dude!
            </p>

            <div className="row justify-content-center">
                <div className="col-md-5 mb-4">
                    <div className="contact-info">
                        <p><i className="bi bi-geo-alt-fill me-2"></i><strong>Dirección:</strong><br />Cra 25, Calle 50, Cali, Colombia</p>
                        <p><i className="bi bi-telephone-fill me-2"></i><strong>Teléfono:</strong><br />+57 (123) 456-7890<br />+57 (123) 456-4342</p>
                        <p><i className="bi bi-clock-fill me-2"></i><strong>Horario:</strong><br />Lunes–Viernes: 9:00 – 18:00<br />Sábado–Domingo: 9:00 – 20:00</p>
                    </div>
                </div>

                <div className="col-md-6">
                    <form className="contact-form">
                        <input type="text" placeholder="Nombre completo" required className="form-control" />
                        <input type="email" placeholder="Correo Electrónico" required className="form-control" />
                        <textarea placeholder="Mensaje" required className="form-control" rows="4"></textarea>
                        <button type="submit" className="btn btn-custom mt-2">Enviar</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactoPage;