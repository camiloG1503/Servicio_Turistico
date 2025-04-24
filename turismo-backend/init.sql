USE turismo;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'turista', 'guia') NOT NULL
);

CREATE TABLE destinos (
    id_destino INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL
);

CREATE TABLE guias (
    id_guia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE,
    experiencia TEXT NOT NULL,
    idiomas VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    calificacion_promedio DECIMAL(3,2) DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_destino INT,
    fecha_reserva DATE NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') NOT NULL DEFAULT 'pendiente',
    cantidad_personas INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_destino) REFERENCES destinos(id_destino) ON DELETE CASCADE
);

CREATE TABLE resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_destino INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_destino) REFERENCES destinos(id_destino) ON DELETE CASCADE
);

CREATE TABLE paquetes (
    id_paquete INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    id_destino INT,
    FOREIGN KEY (id_destino) REFERENCES destinos(id_destino) ON DELETE CASCADE
);

CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('tarjeta', 'nequi', 'bancolombia') NOT NULL,
    estado_pago ENUM('pendiente', 'pagado', 'rechazado') NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) ON DELETE CASCADE
);


