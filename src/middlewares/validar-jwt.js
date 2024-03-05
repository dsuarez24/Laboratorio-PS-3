import jwt from 'jsonwebtoken'
import Usuario from '../users/user.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay un token en la solicitud",
        });
    }

    try {
        // Verificación del token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        // Verificar que el usuario exista
        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }
        // Verificar si el uid está habilitado
        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Token inválido - usuario con estado:false'
            })
        }

        req.user = usuario;

        next();
    } catch (e) {
        res.status(401).json({
            msg: "Token inválido",
        });
    }
}
