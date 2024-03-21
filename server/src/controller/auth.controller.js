const { User } = require ("../model/users"); // Importa el modelo de usuario desde el directorio "../model/users"
const bcrypt = require ('bcrypt'); // Importa la librería bcrypt para el hashing de contraseñas
const { createAccessToken } = require ('../libs/jwt'); 
const { TOKEN_SECRET} = require('../config/config');
const login = require('../controller/login')
// Importa la función createAccessToken desde el directorio "../libs/jwt"

exports.registrar= async (req,res)=>{
   
    const { nombres, apellidos, telefono, correo, password} = req.body;
    try {
    const userFound = await User.findOne({correo});
    if (userFound) return res.status(400).json(["la cuenta ya esta en uso"])

    const passwordHash= await bcrypt.hash(password,10);
        // Crear el usuario 
    const user = new User({
        nombres,
        apellidos,
        telefono,
        correo,
        password:passwordHash,
        estatus:true
    });
    await user.save();
    const token = await createAccessToken({id:user._id});
    res.cookie('token',token);
    res.json({
      message:"usuario creado correctamente",
    })
} catch (error) {
  res.status(500).json({message:error.message})      
}

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

const token = await createAccessToken({ id: userFound._id });
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


exports.bajalogicaUser=async(req,res)=>{
try {
const usuario = await User.findByIdAndUpdate(req.params.idUser, {
  estatus: false,
  fechaEliminacion: new Date() 
}, { new: true });

res.status(200).json({ message: "Baja lógica de Usuario",usuario });
} catch (error) {
console.error(error);
res.status(500).json({ message: "Error al realizar la baja lógica del usuario " });
}
}