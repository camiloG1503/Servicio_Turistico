import express from "express";
import { 
  getDestinos, 
  getDestinoById,
  createDestino, 
  updateDestino, 
  deleteDestino 
} from "../controllers/destinoController.js";

const router = express.Router();

router.get("/", getDestinos);
router.get("/:id", getDestinoById);
router.post("/", createDestino);
router.put("/:id", updateDestino);
router.delete("/:id", deleteDestino);

export default router;