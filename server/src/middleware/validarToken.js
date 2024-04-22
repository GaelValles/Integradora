const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require('../config/config.js');
const {User} = require("../model/users.js");

// Verifica el token manualmente para ver si es válido
const testToken = (token) => {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    console.log("Token decoded:", decoded);
  } catch (err) {
    console.error("Error verifying token:", err);
  }
};

// Middleware de autenticación
exports.authRequired = async (req, res, next) => {
    try {
      const { token } = req.cookies;
      
      if (!token) {
        console.log("Token no encontrado");
        return res.status(401).json({ message: "Acceso denegado, token no encontrado" });
      }
  
      const decoded = jwt.verify(token, TOKEN_SECRET);
      console.log("Token decodificado:", decoded);
  
      const userFound = await User.findById(decoded.id); // Verifica si el usuario existe
      
      if (!userFound) {
        console.log("Usuario no encontrado");
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      req.user = userFound; // Establece el usuario
      console.log("Usuario asignado:", userFound, token);
      
      next();
    } catch (error) {
      console.error("Error en autenticación:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
