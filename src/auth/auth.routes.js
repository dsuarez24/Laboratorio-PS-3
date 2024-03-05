import { Router } from "express";
import { check } from "express-validator";

import { inicioSesion } from "./auth.controller.js";
import { validateFields  } from "../middlewares/validar-campos.js";

const router = Router()

router.post(
    '/inicio-sesion',
    [
        check('identificador', 'Por favor, ingrese su nombre de usuario o correo electrónico.').not().isEmpty(),
        check('contraseña', 'La contraseña es obligatoria.').not().isEmpty(),
        validateFields ,
    ], inicioSesion)

export default router
