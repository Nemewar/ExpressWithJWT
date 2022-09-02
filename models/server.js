import express from "express";
import cors from "cors";
import "dotenv/config";

import {routerUsuario} from "../routes/usuarios.js";
import {routerAuth} from "../routes/auth.js"
import { dbConnection } from "../database/configdb.js";
import { validarJSON } from "../middlewares/validarJson.js";

class Server {

    app;
    port;

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/usuarios";
        this.authPath = "/api/auth";

        this.conectarDb();

        this.middlewares();

        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){

        
        this.app.use(cors())

        
        this.app.use( express.json())

        //evitar que la aplicación se detenga al encontrar un json
        //malformado en el body al recibir una peticición post
        this.app.use( validarJSON)

        
        this.app.use(express.static("public"));
    }

    routes() {

        this.app.use(this.usersPath, routerUsuario );
        this.app.use(this.authPath, routerAuth)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }
}


export {
    Server
}