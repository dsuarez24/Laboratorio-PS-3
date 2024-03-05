import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const inicioSesion = async (req, res) => {
    const { identificador, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({
            $or: [
                { mail: identificador },
                { username: identificador }
            ]
        });

        if (!usuario) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, el correo electrónico o el nombre de usuario no existen en la base de datos",
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos",
            });
        }

        // Verificar la contraseña
        const contraseñaValida = bcryptjs.compareSync(contraseña, usuario.password);

        if (!contraseñaValida) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta",
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        const datosUsuario = {
            username: usuario.username,
            correo: usuario.mail,
        };

        res.status(200).json({
            msg: '¡Inicio de sesión exitoso!',
            usuario: datosUsuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contacte al administrador",
        });
    }
}
