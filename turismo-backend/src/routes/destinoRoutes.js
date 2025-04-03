import express from "express";
<<<<<<< HEAD
import { 
  getDestinos, 
  getDestinoById,
  createDestino, 
  updateDestino, 
  deleteDestino 
=======
import {
  getDestinos,
  getDestinoById,
  createDestino,
  updateDestino,
  deleteDestino,
>>>>>>> d1be8c15362090f40ef7a9b44f2c6fbd7f52ca88
} from "../controllers/destinoController.js";

const router = express.Router();

router.get("/", getDestinos);
<<<<<<< HEAD
router.get("/:id", getDestinoById);
=======
router.get("/:id", getDestinoById); // Nueva ruta para obtener un destino por ID
>>>>>>> d1be8c15362090f40ef7a9b44f2c6fbd7f52ca88
router.post("/", createDestino);
router.put("/:id", updateDestino);
router.delete("/:id", deleteDestino);

export default router;