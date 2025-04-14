import { Link } from "react-router-dom"

const HomeBanner = () => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)",
      }}
    >
      <div className="banner-content">
        <h1 className="display-4">Descubre Nuevos Destinos</h1>
        <p className="lead">Explora los mejores lugares turísticos con nuestros guías expertos</p>
        <Link to="/destinos" className="btn btn-primary btn-lg mt-3">
          Ver Destinos
        </Link>
      </div>
    </div>
  )
}

export default HomeBanner
