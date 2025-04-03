import express from "express";

import {
  getDestinos,
  getDestinoById,
  createDestino,
  updateDestino,
  deleteDestino,
} from "../controllers/destinoController.js";

const router = express.Router();

router.get("/", getDestinos);

router.get("/:id", getDestinoById);

router.get("/:id", getDestinoById); // Nueva ruta para obtener un destino por ID
router.post("/", createDestino);
router.put("/:id", updateDestino);
router.delete("/:id", deleteDestino);

export default router;