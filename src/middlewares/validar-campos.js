import { validationResult } from "express-validator";
import Publicaciones from "../posts/posts.model.js";
import Comentarios from "../comments/comments.model.js";

const validarCampos = (req, res, next) => {
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json(errores);
        }
    } catch (error) {
        throw error
    }

    next();
}

const validarAutorDePublicacion = async (req, res, next) => {
    const idPublicacion = req.params.id;
    const idUsuario = req.user.id;

    try {
        const publicacion = await Publicaciones.findById(idPublicacion);

        if (publicacion.author_id.toString() !== idUsuario) {
            return res.status(403).json({ error: 'No eres el autor de esta publicación' });
        }

        req.publicacion = publicacion;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};

const validarAutorDeComentario = async (req, res, next) => {
    const idComentario = req.params.commentId;
    const idUsuario = req.user.id;

    try {
        const comentarios = await Comentarios.findById(idComentario);

        if (comentarios.author_id.toString() !== idUsuario) {
            return res.status(403).json({ error: 'No eres el autor de este comentario' });
        }
        req.comentario = comentarios;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};


export { validarCampos, validarAutorDePublicacion, validarAutorDeComentario }
