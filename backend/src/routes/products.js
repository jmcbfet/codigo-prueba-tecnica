const router = require('express').Router();
const productsController = require('../controller/productsController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/listar', verifyToken, productsController.ListarProductos);
router.post('/agregar', verifyToken, productsController.AgregarProducto);
router.delete('/eliminar/:id', verifyToken, productsController.EliminarProducto);
router.put('/modificar/:id', verifyToken, productsController.ModificarProducto);

router.get('/:id', verifyToken, productsController.MostrarProducto);

module.exports = router;