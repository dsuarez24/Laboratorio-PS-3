import { Router } from "express";
import { check } from "express-validator";

// middlewares & helpers
import { validateFields, validateAuthorToPost } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost } from "../helpers/posts-validations.js";

// controlador
import { createPosts, updatePosts, deletePost, feedPost, postDetails } from "./posts.controller.js";


const router = Router();

router.get('/', feedPost);

router.get('/:postId',
    [
        check("postId", "The id is not a valid MongoDB format").isMongoId(),
        check("postId").custom(existingPost),
        validateFields,
    ], postDetails);

router.post('/',
    validarJWT,
    [
        check("title", "Obligatory field").not().isEmpty(),
        check("category"),
        check("text"),
        validateFields,
    ], createPosts);

router.put('/:id', validarJWT,
    [
        check("id", "The id is not a valid MongoDB format").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthorToPost,
    ], updatePosts);


router.delete('/:id', validarJWT,
    [
        check("id", "The id is not a valid MongoDB format").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthorToPost,
    ], deletePost);

export default router;