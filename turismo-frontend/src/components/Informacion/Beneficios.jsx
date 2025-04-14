const Beneficios = () => {
  const beneficios = [
    {
      icon: "bi-globe",
      titulo: "Destinos Exclusivos",
      descripcion: "Accede a los mejores destinos turísticos seleccionados por expertos.",
    },
    {
      icon: "bi-people-fill",
      titulo: "Guías Profesionales",
      descripcion: "Nuestros guías son expertos con años de experiencia en el sector.",
    },
    {
      icon: "bi-shield-check",
      titulo: "Seguridad Garantizada",
      descripcion: "Tu seguridad es nuestra prioridad en todos nuestros tours.",
    },
    {
      icon: "bi-cash-coin",
      titulo: "Precios Competitivos",
      descripcion: "Ofrecemos la mejor relación calidad-precio del mercado.",
    },
    {
      icon: "bi-calendar-check",
      titulo: "Flexibilidad",
      descripcion: "Adaptamos nuestros tours a tus necesidades y preferencias.",
    },
    {
      icon: "bi-heart-fill",
      titulo: "Experiencias Únicas",
      descripcion: "Creamos recuerdos inolvidables en cada viaje que realizas.",
    },
  ]

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Nuestros Beneficios</h2>
        <div className="row">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 border-0 text-center">
                <div className="card-body">
                  <i className={`bi ${beneficio.icon} beneficios-icon mb-3`}></i>
                  <h5 className="card-title">{beneficio.titulo}</h5>
                  <p className="card-text">{beneficio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Beneficios
