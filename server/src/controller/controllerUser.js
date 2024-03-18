const {User} = require('../model/users.js')

// Registrar un nuevo usuario
exports.registrar= async (req,res)=>{
    try {
        const { nombres, apellidos,telefono, correo, password} = req.body;

        const userFound = await User.findOne({correo});
        const numberFound = await User.findOne({telefono});

        if (userFound || numberFound) return res.status(400).json(["la cuenta ya esta en uso"]);
        // Crear el usuario 
        const usuario = new User({
            nombres,
            apellidos,
            telefono,
            correo,
            password,
            estatus:true
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
