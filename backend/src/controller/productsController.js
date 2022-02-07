const mysql = require('../database');

exports.ListarProductos = async (req, res) => {

    try {
        const products = await mysql.query('SELECT * FROM products')
        res.status(200).json({ products })
    } catch (error) {
        res.status(401).json({ error })
    }

}

exports.AgregarProducto = async (req, res) => {

    try {
        
        const { nombre, precio } = req.body

        await mysql.query("INSERT INTO products(name, price) VALUES (?,?)", [nombre, precio]);

        res.status(200).json({ msg: "producto agregado" })

    } catch (error) {
        res.status(401).json({ error })
    }

}

exports.EliminarProducto = async (req, res) => {

    try {
        
        const { id } = req.params;

        await mysql.query("DELETE FROM products WHERE id_product = ?", [id]);

        res.status(200).json({ msg: "producto eliminado" });

    } catch (error) {
        res.status(401).json({ error })
    }

}

exports.ModificarProducto = async (req, res) => {

    try {
        
        const { id } = req.params;

        const { nombre, precio } = req.body

        await mysql.query("UPDATE products SET name = ?, price = ? WHERE id_product = ?", [nombre, precio, id])

        res.status(200).json({ msg: "producto modificado" });

    } catch (error) {
        res.status(401).json({ error })
    }

}

exports.MostrarProducto = async (req, res) => {

    try {
        const { id } = req.params
        const product = await mysql.query('SELECT * FROM products WHERE id_product = ?', [id])
        res.status(200).json({ product });
    } catch (error) {
        res.status(401).json({ error });
    }

}