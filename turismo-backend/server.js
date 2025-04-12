import express from "express";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import destinoRoutes from "./src/routes/destinoRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/destinos", destinoRoutes);

// puerto y arranque
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

