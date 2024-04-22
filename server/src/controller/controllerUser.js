const { User } = require('../model/users.js')
const { CreateAccessToken } = require("../libs/jwt.js");
const {TOKEN_SECRET}= require('../config/config.js')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// Registrar un nuevo usuario
exports.registrar = async (req, res) => {
    try {
        const { nombres, apellidos, telefono, correo, password } = req.body;

        const userFound = await User.findOne({ correo });
        const numberFound = await User.findOne({ telefono });

        if (userFound || numberFound) return res.status(400).json(["la cuenta ya esta en uso"]);
        // Crear el usuario 
        const usuario = new User({
            nombres,
            apellidos,
            telefono,
            correo,
            password,
            estatus: true
        });
        console.log(usuario);
        await usuario.save();
        const token = await CreateAccessToken({id:usuario._id});
        res.cookie('token',token);
        res.json({
          message:"usuario creado correctamente",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}


exports.Mostrarusuario = async (req, res) => {
    const users = await User.find()
    res.json(users)
}


exports.login = async (req, res) => {
  const { correo, password } = req.body;

  // Buscar usuario por correo electrónico
  const user = await User.findOne({ correo });

  console.log(correo)

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Crear el token JWT
  const token = jwt.sign({ id: user._id }, TOKEN_SECRET, { expiresIn: '1h' });

  // Configurar la cookie con el token
  res.cookie('token', token, {
    httpOnly: true, // Asegura que la cookie no se pueda acceder desde JavaScript
    secure: process.env.NODE_ENV === 'production', // Solo en producción
    sameSite: 'strict', // Asegura que solo se envíe dentro del mismo sitio
  });
  
  // Responder con el perfil del usuario y el token
  res.json({
    id: user._id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    correo: user.correo,
    telefono: user.telefono,
    token, // Devolver el token por si necesitas usarlo también
  });
};

  exports.logout= async(req,res)=>{
    res.cookie("token", "",{
      expires: new Date(0),
    });
    return res.sendStatus(200);
  }

  exports.perfil = async (req, res) => {
    try {
      // Verificar que el usuario esté autenticado
      if (!req.user || !req.user.id) {
        return res.status(400).json({ message: "Usuario no autenticado" });
      }
  
      const userFound = await User.findById(req.user.id);
  
      if (!userFound) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
  
      // Obtener el token de las cookies (o desde otro lugar)
      const { token } = req.cookies;
  
      // Respuesta JSON incluyendo detalles del usuario y el token
      return res.json({
        id: userFound._id,
        nombres: userFound.nombres,
        apellidos: userFound.apellidos,
        correo: userFound.correo,
        telefono: userFound.telefono,
        token: token, // Aquí incluyes el token en la respuesta
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  
  exports.verifyToken=async(req,res)=>{
    const {token} =req.cookies;
  
    if(!token) return res.send(false)
  
    jwt.verify(token, TOKEN_SECRET,async(error,user)=>{
      if(error) return res.status(401).json({message:"Sin autorización"})
  
      const userFound= await User.findById(user.id)
      if(!userFound)return res.status(401).json({message:"Sin autorización"})
  
      return res.json({
        id:userFound._id,
        nombres:userFound.nombres,
        apellidos:userFound.apellidos,
        telefono:userFound.telefono,
        correo:userFound.correo,
      })
    })
  }