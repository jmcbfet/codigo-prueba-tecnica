const router = require('express').Router();
const authController = require('../controller/authController');

router.post('/login', authController.Login);
router.post('/register', authController.RegistrarUsuario)

module.exports = router;