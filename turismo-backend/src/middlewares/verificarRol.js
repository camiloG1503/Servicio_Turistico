export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
      const { usuario } = req;
  
      if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({ mensaje: "No tienes permiso para esta acción" });
      }
  
      next();
    };
  };
  