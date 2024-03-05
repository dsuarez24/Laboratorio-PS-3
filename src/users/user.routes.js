import { Router } from "express";
import { check } from "express-validator";

// middlewares & helpers
import { validateFields } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { emailExists, userNameExists, validatePassword } from "../helpers/user-validations.js";
// Controladores
import { userPost, userPut } from "./user.controller.js";


const router = Router();

router.put('/', validarJWT,
    [
        check("username", "ingrese su usuario").not().isEmpty(),
        check("username").custom(userNameExists),
        check("password").custom(validatePassword),
        check("firstname", "introduzca su nombre").not().isEmpty(),
        check("lastname", "intoduzca su apellido").not().isEmpty(),
        validateFields,
    ], userPut);

router.post(
    "/",
    [
        check("username", "ingrese su usuario").not().isEmpty(),
        check("username").custom(userNameExists),
        check("mail", "Este no es un correo electrónico válido").isEmail(),
        check("mail").custom(emailExists),
        check("password").custom(validatePassword),
        check("firstname", "introduzca su nombre").not().isEmpty(),
        check("lastname", "intoduzca su apellido").not().isEmpty(),
        validateFields,
    ], userPost);

export default router;

emailExists