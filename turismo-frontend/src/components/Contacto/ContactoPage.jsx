"use client"

import { useState } from "react"
import { fetchData } from "../../api/api"

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetchData("/contacto", {
        method: "POST",
        body: JSON.stringify(formData),
      })

      setStatus({
        submitted: true,
        success: true,
        message: "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.",
      })

      // Reset form
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      })
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2 className="text-center mb-4">Contáctanos</h2>

          {status.submitted && (
            <div className={`alert ${status.success ? "alert-success" : "alert-danger"} mb-4`}>{status.message}</div>
          )}

          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="contacto-form">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="asunto" className="form-label">
                    Asunto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    name="mensaje"
                    rows="5"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Mensaje"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="mb-4">Información de Contacto</h3>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill fs-4 me-3 text-primary"></i>
                  <div>
                    <h5 className="mb-0">Dirección</h5>
                    <p className="mb-0">Calle Principal #123, Ciudad</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-telephone-fill fs-4 me-3 text-primary"></i>
                  <div>
                    <h5 className="mb-0">Teléfono</h5>
                    <p className="mb-0">+123 456 7890</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-fill fs-4 me-3 text-primary"></i>
                  <div>
                    <h5 className="mb-0">Email</h5>
                    <p className="mb-0">info@servicioturistico.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactoPage
