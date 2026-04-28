const model = require('../models/libraryModel');

// Este é o "cérebro" do nosso microsserviço!
// O controller recebe as requisições HTTP, valida os dados,
// chama as funções do model e retorna respostas apropriadas.
// É como o gerente que coordena tudo.

// Função para adicionar um item manualmente à biblioteca.
// Pode ser usado para correções ou imports especiais.
exports.addItem = (req, res) => {
  // Usa o user_id do token JWT para segurança (req.auth)
  const user_id = req.auth?.id;
  
  // Validação básica dos dados obrigatórios
  const { type, item_id, title } = req.body;

  if (!user_id || !type || !item_id || !title) {
    return res.json({
      success: false,
      message: 'Dados obrigatórios faltando: user_id, type, item_id, title'
    });
  }

  // Só aceitamos tipos válidos para manter consistência
  if (!['game', 'gift_card'].includes(type)) {
    return res.json({
      success: false,
      message: 'Tipo inválido. Use "game" ou "gift_card"'
    });
  }

  // Chama o model para adicionar o item
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

// Função que retorna toda a biblioteca de um usuário.
// É chamada quando o usuário abre sua página de biblioteca.
exports.getLibrary = (req, res) => {
  // Usa o user_id do token JWT para segurança (req.auth)
  const user_id = req.auth?.id;

  // Validação do ID do usuário
  if (!user_id || isNaN(user_id)) {
    return res.json({
      success: false,
      message: 'ID do usuário inválido'
    });
  }

  // Busca todos os itens do usuário
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

// Esta é a função mais importante para integração!
// É chamada AUTOMATICAMENTE pelo serviço de pagamentos quando uma compra é aprovada.
// Garante que o usuário receba seu jogo/gift card na biblioteca.
exports.paymentApproved = (req, res) => {
  const data = req.body;

  // Validações rigorosas pois isso vem de outro serviço
  const { user_id, type, item_id, title } = data;

  if (!user_id || !type || !item_id || !title) {
    return res.json({
      success: false,
      message: 'Dados de pagamento incompletos'
    });
  }

  // Primeiro verifica se o usuário já tem esse item (evita duplicatas)
  model.checkItem(user_id, item_id, (err, results) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
        message: 'Erro ao verificar item existente'
      });
    }

    // Se já tem, informa que não precisa adicionar novamente
    if (results.length > 0) {
      return res.json({
        success: false,
        message: 'Usuário já possui este item em sua biblioteca'
      });
    }

    // Se não tem, adiciona o item
    model.addItem(data, (err) => {
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
