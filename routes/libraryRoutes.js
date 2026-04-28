const express = require('express');
const router = express.Router();
const controller = require('../controllers/libraryController');
const { authenticateToken } = require('../config/authMiddleware');

// Este arquivo define as "portas de entrada" da nossa API!
// Cada rota é como uma porta específica do prédio - cada uma leva a um lugar diferente.
// Seguimos convenções REST: POST para criar, GET para buscar.

// Rota para adicionar um item manualmente à biblioteca
// Método: POST /library/add
// Uso: Para correções ou imports especiais (não para compras normais)
router.post('/add', authenticateToken, controller.addItem);

// Rota para buscar toda a biblioteca de um usuário
// Método: GET /library/user/:user_id
// Exemplo: GET /library/user/123 retorna todos os jogos e gift cards do usuário 123
router.get('/user/:user_id', authenticateToken, controller.getLibrary);

// Rota CRUCIAL para integração com o serviço de pagamentos!
// Método: POST /library/integration/payment-approved
// Esta rota é chamada AUTOMATICAMENTE quando um pagamento é aprovado.
// É o elo entre "comprou" e "recebeu na biblioteca".
router.post('/integration/payment-approved', controller.paymentApproved);

// Exportamos o router para que o app.js possa usar essas rotas
module.exports = router;
