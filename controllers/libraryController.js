const model = require('../models/libraryModel');

// ===============================
// ADICIONAR ITEM NA BIBLIOTECA
// ===============================
exports.addItem = (req, res) => {
  const { user_id, type, item_id, title } = req.body;

  // Validação
  if (!user_id || !type || !item_id || !title) {
    return res.json({
      success: false,
      message: 'Dados obrigatórios faltando: user_id, type, item_id, title'
    });
  }

  if (!['game', 'gift_card'].includes(type)) {
    return res.json({
      success: false,
      message: 'Tipo inválido. Use "game" ou "gift_card"'
    });
  }

  // Inserir no banco
  model.addItem({ user_id, type, item_id, title }, (err) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
        message: 'Erro ao adicionar item à biblioteca'
      });
    }

    res.json({
      success: true,
      message: 'Item adicionado à biblioteca com sucesso!'
    });
  });
};

// ===============================
// BUSCAR BIBLIOTECA DO USUÁRIO
// ===============================
exports.getLibrary = (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id || isNaN(user_id)) {
    return res.json({
      success: false,
      message: 'ID do usuário inválido'
    });
  }

  model.getUserLibrary(user_id, (err, results) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
        message: 'Erro ao buscar biblioteca'
      });
    }

    res.json({
      success: true,
      data: results,
      message: `Encontrados ${results.length} itens na biblioteca`
    });
  });
};

// ===============================
// INTEGRAÇÃO - PAGAMENTO APROVADO
// ===============================
exports.paymentApproved = (req, res) => {
  const { user_id, type, item_id, title } = req.body;

  if (!user_id || !type || !item_id || !title) {
    return res.json({
      success: false,
      message: 'Dados de pagamento incompletos'
    });
  }

  model.checkItem(user_id, item_id, (err, results) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
        message: 'Erro ao verificar item existente'
      });
    }

    if (results.length > 0) {
      return res.json({
        success: false,
        message: 'Usuário já possui este item em sua biblioteca'
      });
    }

    model.addItem({ user_id, type, item_id, title }, (err) => {
      if (err) {
        return res.json({
          success: false,
          error: err,
          message: 'Erro ao adicionar item após pagamento'
        });
      }

      res.json({
        success: true,
        message: 'Pagamento aprovado! Item adicionado à biblioteca.'
      });
    });
  });
};