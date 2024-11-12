// routes/loginRoutes.js
const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// Rota de login
router.post('/', loginController.login);

module.exports = router;
