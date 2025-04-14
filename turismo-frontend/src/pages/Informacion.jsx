import Beneficios from "../components/Informacion/Beneficios"
import ContenidoInfo from "../components/Informacion/ContenidoInfo"

const Informacion = () => {
  return (
    <div>
      <div
        className="banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80)",
          height: "300px",
        }}
      >
        <div className="banner-content">
          <h1 className="display-4">Información</h1>
          <p className="lead">Conoce más sobre nuestro servicio turístico</p>
        </div>
      </div>

      <ContenidoInfo />
      <Beneficios />
    </div>
  )
}

export default Informacion
