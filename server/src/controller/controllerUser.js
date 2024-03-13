const {User} = require('../model/users.js')

// Registrar un nuevo usuario
exports.registrar= async (req,res)=>{
    try {
        const { nombres, apPaterno, apMaterno, correo, password} = req.body;
        // Crear el usuario 
        const usuario = new User({
            nombres,
            apPaterno,
            apMaterno,
            correo,
            password,
        });
        console.log(usuario);
        await usuario.save();
        res.status(201).json({ message: 'usuario creado correctamente', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}


exports.Mostrarusuario= async(req,res)=>{
    const users= await User.find()
    res.json(users)
}
