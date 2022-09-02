


import mongoose from "mongoose";


const {Schema,model} = mongoose;


const  UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "la contraseña es obligatoria"]
    },
    img: {
        type : String,
    },
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }

});

//sobreescribiendo el res.json() para notener que enviar la contraseña
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export const Usuario = model("Usuario",UsuarioSchema);
