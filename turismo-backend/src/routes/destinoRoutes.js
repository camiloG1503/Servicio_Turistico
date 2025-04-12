import express from "express";

import {
    listarDestinos,
    obtenerDestino,
    crearDestino,
    editarDestino,
    borrarDestino,
} from "../controllers/destinoController.js";

const router = express.Router();

// Rutas para destinos
router.get("/", listarDestinos); // Obtener todos los destinos
router.get("/:id", obtenerDestino); // Obtener un destino por ID
router.post("/", crearDestino); // Crear un nuevo destino
router.put("/:id", editarDestino); // Editar un destino existente
router.delete("/:id", borrarDestino); // Borrar un destino

export default router;
