import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models/usuario.js";
import { generarJWT } from "../helpers/generarJWT.js";

const authGet = async (req = request, res = response) => {

}

//post operation
const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo: correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario/password no son válidos - correo"
            })
        }

        //si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario/password no son válidos - estado:false"
            })
        }

        //verificar la contraseña
        //compara el password que le mandamos con el password que hay en la bd
        //y retorna un booleano
        const validPasword = bcryptjs.compareSync(password, usuario.password);
        if (!validPasword) {
            return res.status(400).json({
                msg: "Usuario/password no son válidos - password"
            })
        }


        //generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login Ok",
            usuario,
            token
        })


    } catch (error) {
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }



}

const authPut = async (req = request, res = response) => {


}

const authDelete = async (req = request, res = response) => {


}

export {
    authGet,
    login,
    authPut,
    authDelete
}