import jwt from "jsonwebtoken";

export const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id_usuario,
      rol: usuario.rol,
      nombre: usuario.nombre,
      email: usuario.email,
    },
    process.env.JWT_SECRET || "secreto123",
    {
      expiresIn: "1d",
    }
  );
};
