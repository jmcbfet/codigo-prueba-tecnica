const mysql = require('../database');

exports.ListarUsuarios = async (req, res) => {

    try {
        const users = await mysql.query(`
            SELECT u.id_user, u.id_rol, u.name, u.email, u.phone, u.password, r.descripcion
            FROM roles r, users u
            WHERE r.id_rol = u.id_rol
        `)
        res.status(200).json({ users })
    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.AgregarUsuario = async (req, res) => {

    try {
        const {
            nombre,
            correo,
            telefono,
            password,
            id_rol
        } = req.body

        await mysql.query("INSERT INTO users(name, email, phone, password, id_rol) VALUES (?,?,?,?,?)", [nombre, correo, telefono, password, id_rol]);

        res.status(200).json({ msg: "usuario agregado" })

    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.EliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        await mysql.query("DELETE FROM users WHERE id_user = ?", [id]);

        res.status(200).json({ msg: "El usuario ha sido eliminado" });

    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.ModificarUsuario = async (req, res) => {

    try {
        const { id } = req.params;

        const {
            nombre,
            correo,
            telefono,
            password,
            id_rol
        } = req.body;

        await mysql.query("UPDATE users SET name = ?, email = ?, phone = ?, password = ?, id_rol = ? WHERE id_user = ?", [nombre,correo,telefono,password,id_rol,id]);

        res.status(200).json({ msg: "El usuario ha sido modificado" });

    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.ObtenerRoles = async (req, res) => {

    try {
        const roles = await mysql.query("SELECT * FROM roles");
        res.status(200).json({ roles });
    } catch (error) {
        res.status(401).json({ error });
    }

}