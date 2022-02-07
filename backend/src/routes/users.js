const router = require('express').Router();
const usersController = require('../controller/usersController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/listar', usersController.ListarUsuarios);
router.post('/agregar', verifyToken, usersController.AgregarUsuario);
router.delete('/eliminar/:id', usersController.EliminarUsuario);
router.put('/modificar/:id', verifyToken, usersController.ModificarUsuario);

router.get('/roles', verifyToken, usersController.ObtenerRoles);

module.exports = router;