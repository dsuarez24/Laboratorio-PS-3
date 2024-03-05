import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from './user.model.js';

const userPost = async (req, res) => {

    const { username, correo, contraseña, nombre, apellido } = req.body;
    const usuario = new Usuario({ username, correo, contraseña, nombre, apellido });

    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

  
    await usuario.save();
    console.log('Tu usuario se ha registrado correctamente');

    const datosUsuario = {
        username: usuario.username,
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido
    };

    res.status(201).json({
        datosUsuario
    });


}

const userPut = async (req, res) => {
    try {
        const idUsuario = req.user._id;
        const { _id, contraseña: nuevaContraseña, ...usuarioActualizar } = req.body;
        if (nuevaContraseña) {
            const salt = bcryptjs.genSaltSync();
            usuarioActualizar.contraseña = bcryptjs.hashSync(nuevaContraseña, salt);
        }

        await Usuario.findByIdAndUpdate(idUsuario, usuarioActualizar);

        const usuario = await Usuario.findOne({ _id: idUsuario });

        const datosUsuario = {
            username: usuario.username,
            contraseña: usuario.contraseña,
            nombre: usuario.nombre,
            apellido: usuario.apellido
        };

        res.status(200).json({
            msg: 'Actualización exitosa',
            usuario: datosUsuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error' });
    }
};

export { userPost, userPut };
