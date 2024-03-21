const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

// Creacion del modelo de usuario
const UserSchema = new mongoose.Schema({
    nombres:{
        type:String,
    },
    apellidos:{
        type:String,
    },
    telefono:{
        type:String,
        unique:true
    },
    correo:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    estatus:{
        type:Boolean,
        required:true
    }
    // fechaEliminacion:{
    //     type:Date,
    //     default:null
    // }
})


// UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });
// UserSchema.methods.comparePassword = async function (password) {
    // return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', UserSchema);
module.exports = { User };
