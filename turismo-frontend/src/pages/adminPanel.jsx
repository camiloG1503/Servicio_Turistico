function AdminPanel() {
    return (
      <div>
        <h1>Panel de Administración</h1>
        <p>Aquí irán los CRUDs de:</p>
        <ul>
          <li>Usuarios registrados</li>
          <li>Pagos realizados</li>
          <li>Reservas</li>
          <li>Reseñas</li>
          <li>Paquetes turísticos</li>
          {/* puedes crear tabs o componentes para cada uno */}
        </ul>
      </div>
    );
  }
  
  export default AdminPanel;
  