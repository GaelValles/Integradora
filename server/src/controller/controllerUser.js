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
    try {
      // Encuentra la información del usuario por su correo
      const userFound = await User.findOne({ correo });
      if (!userFound) return res.status(400).json({ message: "Credenciales invalidas" });
      // Compara las contraseñas
      const passwordMatch = await bcrypt.compare(password, userFound.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Credenciales invalidas' });
      }
  
      const token = await CreateAccessToken({ id: userFound._id });
      res.cookie('token', token);
      res.json({
        id:userFound._id,
        nombres:userFound.nombres,
        apellidos:userFound.apellidos,
        telefono:userFound.telefono,
        correo:userFound.correo,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error)
    }
  }

  exports.logout= async(req,res)=>{
    res.cookie("token", "",{
      expires: new Date(0),
    });
    return res.sendStatus(200);
  }


  exports.perfil=async(req,res)=>{
    const userFound = await User.findById(req.user.id)
  
    if(!userFound) return res.status(400).json({message:"Credenciales invalidas"});
  
    return res.json({
      id:userFound._id,
      nombres:userFound.nombres,
      apellidos:userFound.apellidos,
      telefono:userFound.telefono,
      correo:userFound.correo,
    })
  }
  
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