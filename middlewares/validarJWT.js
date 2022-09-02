import jwt from "jsonwebtoken";
import {request,response} from "express";
import {Usuario} from "../models/usuario.js"

const validarJWT = async ( req = request,res=response, next) =>{

    
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try{
        
        const payload = jwt.verify(token,process.env.secretOrPrivateKey);
        const usuarioAutenticado = await Usuario.findById(payload.uid);

        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: "Token no válido - usuario no existe en BD"
            })
        }

        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: "Token no válido -- usuario con estado false"
            })
        }

        req.usuarioAutenticado = usuarioAutenticado;
        

    }catch(error){
        console.log(error);
        return res.status(401).json({
            msg: "Token no válido"
        })
    }

    next();
}

export{
    validarJWT
}