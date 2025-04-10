import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import destinoRoutes from "./src/routes/destinoRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";  
import reservasRoutes from "./src/routes/reservasRoutes.js";
import resenaRoutes from "./src/routes/resenaRoutes.js";
import guiaRoutes from "./src/routes/guiaRoutes.js";
import pagoRoutes from "./src/routes/pagoRoutes.js";
import paqueteRoutes from "./src/routes/paqueteRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
db.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

app.use("/api/destinos", destinoRoutes);
app.use("/api/usuarios", usuariosRoutes);  
app.use("/api/reservas", reservasRoutes);
app.use("/api/resenas", resenaRoutes);
app.use("/api/guias", guiaRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/paquetes", paqueteRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
