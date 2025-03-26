const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los destinos
router.get("/", (req, res) => {
  db.query("select * from destinos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
