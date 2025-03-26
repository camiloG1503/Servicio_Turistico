require("dotenv").config();
const express = require("express");
const cors = require("cors");


const destinosRoutes = require("./routes/destinos");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/destinos", destinosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
