const login = async (req, res) => {
    try {
      // Obtener los datos del usuario
      const { username, password } = req.body;
  
      // Verificar si el usuario existe
      const existing = await User.findOne({ username });
  
      if (!existing) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
  
      // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
      const passwordMatch = (password, existing.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
  
      }
  
      // Si el usuario y la contraseña son correctos, generar un token de autenticación
      const token = jwt.sign(
        { id: existing._id, username: existing.username },
        'utd123',
        { expiresIn: '1d' }
      );
      // Responder con el token
      res.status(200).json({ token, message: "Se ha iniciado sesion" });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  module.exports = login;