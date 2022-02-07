const jwt = require('jsonwebtoken');
const mysql = require('../database');

exports.Login = async (req, res) => {

    try {
        const {
            correo,
            password,
        } = req.body

        const user = await mysql.query(`
            SELECT * FROM users WHERE 
            email = ? AND
            password = ?`,
            [correo, password]
        );

        if (user.length === 1) {
            const token = jwt.sign(req.body, "secret", { expiresIn: "60m" });
            res.status(200).json({ token, user });
        } else {
            res.status(401).json({ msg: "No existe el usuario" });
        }

    } catch (error) {
        res.status(401).json({ error })
    }

}

exports.RegistrarUsuario = async (req, res) => {

    try {

       const {
            nombre,
            correo,
            telefono,
            password,
        } = req.body

        await mysql.query('INSERT INTO users(name, email, phone, password, id_rol) VALUES (?,?,?,?,?)',
        [nombre, correo, telefono, password, 2])

        res.status(200).json({ msg: "El usuario ha sido registrado" });

    } catch (error) {
        res.status(401).json({ error })
    }

}