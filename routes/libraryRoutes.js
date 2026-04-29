const express = require('express');
const router = express.Router();
const controller = require('../controllers/libraryController');
const { authenticateToken } = require('../config/authMiddleware');

// ===============================
// ROTAS DA BIBLIOTECA (COM AUTH)
// ===============================

// POST /library/add - Adicionar item à biblioteca
router.post('/add', authenticateToken, controller.addItem);

// GET /library/user/:user_id - Buscar biblioteca do usuário
router.get('/user/:user_id', authenticateToken, controller.getLibrary);

// POST /library/integration/payment-approved - Integração com pagamento
router.post('/integration/payment-approved', authenticateToken, controller.paymentApproved);

module.exports = router;