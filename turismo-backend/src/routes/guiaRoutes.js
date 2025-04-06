import express from "express";
import {
  getGuias,
  getGuiaById,
  createGuia,
  updateGuia,
  deleteGuia
} from "../controllers/guiaController.js";

const router = express.Router();

router.get("/", getGuias);
router.get("/:id", getGuiaById);
router.post("/", createGuia);
router.put("/:id", updateGuia);
router.delete("/:id", deleteGuia);

export default router;