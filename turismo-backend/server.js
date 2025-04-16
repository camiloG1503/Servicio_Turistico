import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import destinoRoutes from "./src/routes/destinoRoutes.js";
import reservaRoutes from "./src/routes/reservaRoutes.js";
import guiaRoutes from "./src/routes/guiaRoutes.js";
import resenaRoutes from "./src/routes/resenaRoutes.js";
import pagoRoutes from "./src/routes/pagoRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes); // yes
app.use("/api/destinos", destinoRoutes); // yes
app.use("/api/reservas", reservaRoutes); // yes
app.use("/api/guias", guiaRoutes); // yes
app.use("/api/resenas", resenaRoutes); 
app.use("/api/pagos", pagoRoutes);
app.use("/api/admin", adminRoutes); // yes

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
