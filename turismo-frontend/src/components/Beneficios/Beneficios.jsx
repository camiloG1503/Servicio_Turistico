import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Beneficios.css";

const Beneficios = () => (
    <section className="benefits-section py-5">
        <div className="container">
            <div className="row g-4 justify-content-center">
                {beneficiosData.map(({ icon, title, desc }, idx) => (
                    <div key={idx} className="col-lg-4 col-md-6">
                        <div className="benefit-card h-100 p-4 text-center">
                            <div className="benefit-icon-wrapper mb-3">
                                <i className={`bi ${icon}`}></i>
                            </div>
                            <h3 className="h5 mb-3 fw-semibold">{title}</h3>
                            <p className="mb-0 text-muted">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const beneficiosData = [
    {
        icon: "bi-award",
        title: "Excelencia Garantizada",
        desc: "Destinos turísticos seleccionados por su calidad excepcional",
    },
    {
        icon: "bi-shield-lock",
        title: "Protección Integral",
        desc: "Garantía extendida de 3 años en todos nuestros servicios",
    },
    {
        icon: "bi-people",
        title: "Asesoramiento Personalizado",
        desc: "Expertos disponibles 24/7 para atender tus necesidades",
    },
];

export default Beneficios;
