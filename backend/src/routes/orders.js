const router = require('express').Router();
const ordersController = require('../controller/ordersController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/agregar', verifyToken, ordersController.AgregarOrder);

router.get('/listar/:id_user', verifyToken, ordersController.ListarOrders);
router.get('/detail/:id', verifyToken, ordersController.MostrarOrder);

router.post('/checkout', verifyToken, ordersController.Checkout)

module.exports = router;