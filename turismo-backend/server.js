import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import destinoRoutes from "./src/routes/destinoRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";  // <- Asegúrate de importarlo
import reservasRoutes from "./src/routes/reservasRoutes.js";  // <- Asegúrate de importarlo

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
app.use("/api/usuarios", usuariosRoutes);  // <- Asegúrate de usarlo
app.use("/api/reservas", reservasRoutes);  // <- Asegúrate de usarlo

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
