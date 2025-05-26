import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // 👈 lee desde el .env

// Crear un pool de conexiones en lugar de una única conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Pool de conexiones MySQL creado exitosamente");
export default pool;
