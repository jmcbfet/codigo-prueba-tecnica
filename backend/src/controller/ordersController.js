const mysql = require('../database');
const Stripe = require('stripe');

exports.AgregarOrder = async (req, res) => {

    try {
        const {
            id_user,
            id_product,
            status,
            quantity,
            total
        } = req.body

        await mysql.query(`INSERT INTO orders (id_user, id_product, status, quantity, total) VALUES (?,?,?,?,?)`,
            [id_user, id_product, status, quantity, total]);

        res.status(200).json({ msg: "order agregada" });

    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.ListarOrders = async (req, res) => {

    try {

        const { id_user } = req.params;
        const orders = await mysql.query(`
            SELECT o.id_order, p.name, o.status, o.quantity, o.total
            FROM users u, products p, orders o
            WHERE o.id_user = u.id_user AND
            o.id_product = p.id_product AND
            u.id_user = ?
        `, [id_user]);

        console.log(id_user);

        res.status(200).json({ orders });

    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.MostrarOrder = async (req,res) => {

    try {
        const { id } = req.params;
        const order = await mysql.query(`
            SELECT o.id_order, p.name, o.status, o.quantity, o.total
            FROM users u, products p, orders o
            WHERE o.id_user = u.id_user AND
            o.id_product = p.id_product AND
            o.id_order = ?
        `, [id])

        res.status(200).json({ order })
    } catch (error) {
        res.status(401).json({ error });
    }

}

exports.Checkout = async (req,res) => {

    try {

        let status;

        const stripe = new Stripe("sk_test_51KPBGZC2h6wBxe0q8CDmtmGM8XkD61jN7xPkZkDf39gOJ2ko4SdL6BQo5xtEI96j6w3IDMMWBUuLJf5BSAMKjuvk00aYsbk4xs")

        const { id, amount, id_order, producto } = req.body;

        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            payment_method: id,
            confirm: true,
            description: producto
        });

        if (payment.status === "succeeded") {
            status = "PAYED";
            await mysql.query('UPDATE orders SET status = ? WHERE id_order = ?', [status, id_order]);
            res.status(200).json({ msg: "la orden ha sido pagada satisfactoriamente" });
        } else {
            status = "REJECTED";
            await mysql.query('UPDATE orders SET status = ? WHERE id_order = ?', [status, id_order]);
            res.status(200).json({ msg: "la orden ha sido rechazada" });
        }

    } catch (error) {
        res.status(401).json({ error });
        console.log(error)
    }

}