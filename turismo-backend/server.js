import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import destinoRoutes from "./src/routes/destinoRoutes.js";  //Importamos las rutas

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/destinos", destinoRoutes);  //Usamos las rutas de destinos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
