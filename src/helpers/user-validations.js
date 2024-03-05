import Usuario from '../users/user.model.js';
import zxcvbn from 'zxcvbn';

const emailExists = async (correo = '') => {
    try {
        const correoExiste = await Usuario.findOne({ correo });
        if (correoExiste) {
            throw new Error(`El correo "${correo}" ya está registrado. Elija otro.`);
        }
    } catch (error) {
        throw error;
    }
}

const userNameExists = async (nombreUsuario = '') => {
    try {
        const nombreUsuarioExiste = await Usuario.findOne({ nombreUsuario });
        if (nombreUsuarioExiste) {
            throw new Error(`El nombre de usuario ${nombreUsuario} no está disponible`);
        }
    } catch (error) {
        throw error;
    }
}

const validatePassword = async (contrasena = '') => {
    const resultado = zxcvbn(contrasena);

    if (resultado.score < 2) {
        throw new Error(`La contraseña no es lo suficientemente segura.`);
    }
    if (contrasena.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }
};

const existUserById = async (id = '') => {
    try {
        const existeUsuarioPorId = await Usuario.findById(id);
        if (!existeUsuarioPorId) {
            throw new Error(`El usuario con el ID ${id} no existe`);
        }
    } catch (error) {
        throw error;
    }
};

export { emailExists, userNameExists, validatePassword, existUserById };
