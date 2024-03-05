import { Router } from "express";
import { check } from "express-validator";

// Middlewares y Ayudantes
import { validarCampos, validarAutorDePublicacion } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { publicacionExistente } from "../helpers/posts-validations.js";

// Controlador
import { crearPublicacion, actualizarPublicacion, eliminarPublicacion, publicacionesFeed, detallesPublicacion } from "./posts.controller.js";


const router = Router();

router.get('/', publicacionesFeed);

router.get('/:postId',
    [
        check("postId", "El ID no tiene un formato válido de MongoDB").isMongoId(),
        check("postId").custom(publicacionExistente),
        validarCampos,
    ], detallesPublicacion);

router.post('/',
    validarJWT,
    [
        check("title", "Campo obligatorio").not().isEmpty(),
        check("category"),
        check("text"),
        validarCampos,
    ], crearPublicacion);

router.put('/:id', validarJWT,
    [
        check("id", "El ID no tiene un formato válido de MongoDB").isMongoId(),
        check("id").custom(publicacionExistente),
        validarCampos,
        validarAutorDePublicacion,
    ], actualizarPublicacion);


router.delete('/:id', validarJWT,
    [
        check("id", "El ID no tiene un formato válido de MongoDB").isMongoId(),
        check("id").custom(publicacionExistente),
        validarCampos,
        validarAutorDePublicacion,
    ], eliminarPublicacion);

export default router;
