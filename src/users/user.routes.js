import { Router } from "express";
import { check } from "express-validator";

// Middlewares y Ayudantes
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { correoExiste, nombreUsuarioExiste, validarContrasena } from "../helpers/user-validations.js";
// Controladores
import { usuarioPost, usuarioPut } from "./user.controller.js";


const router = Router();

router.put('/', validarJWT,
    [
        check("username", "Ingrese un nombre de usuario").not().isEmpty(),
        check("username").custom(nombreUsuarioExiste),
        check("password").custom(validarContrasena),
        check("firstname", "Ingrese su nombre").not().isEmpty(),
        check("lastname", "Ingrese su apellido").not().isEmpty(),
        validarCampos,
    ], usuarioPut);

router.post(
    "/",
    [
        check("username", "Ingrese un nombre de usuario").not().isEmpty(),
        check("username").custom(nombreUsuarioExiste),
        check("mail", "Este no es un correo electrónico válido").isEmail(),
        check("mail").custom(correoExiste),
        check("password").custom(validarContrasena),
        check("firstname", "Ingrese su nombre").not().isEmpty(),
        check("lastname", "Ingrese su apellido").not().isEmpty(),
        validarCampos,
    ], usuarioPost);

export default router;
