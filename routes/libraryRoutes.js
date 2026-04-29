const express = require('express');
const router = express.Router();
const controller = require('../controllers/libraryController');

// ===============================
// ROTAS DA BIBLIOTECA (SEM AUTH)
// ===============================

// POST /library/add
router.post('/add', controller.addItem);

// GET /library/user/:user_id
router.get('/user/:user_id', controller.getLibrary);

// POST /library/integration/payment-approved
router.post('/integration/payment-approved', controller.paymentApproved);

module.exports = router;