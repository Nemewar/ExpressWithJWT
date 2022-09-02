import { Router } from "express";
import { body,param } from "express-validator";

import { login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const routerAuth = Router();


routerAuth.post("/login",[
    body("correo","El correo es obligatorio").not().isEmpty(),
    body("correo","No tiene la sintaxis de un correo").isEmail(),
    body("password","La contraseña es obligatoria").not().isEmpty(),
    validarCampos
],login)



export{
    routerAuth
}