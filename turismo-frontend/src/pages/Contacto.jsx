import ContactoPage from "../components/Contacto/ContactoPage"

const Contacto = () => {
  return (
    <div>
      <div
        className="banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80)",
          height: "300px",
        }}
      >
        <div className="banner-content">
          <h1 className="display-4">Contacto</h1>
          <p className="lead">Estamos aquí para ayudarte</p>
        </div>
      </div>

      <ContactoPage />
    </div>
  )
}

export default Contacto
