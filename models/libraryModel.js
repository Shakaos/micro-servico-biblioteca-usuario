const db = require('../config/db');

// Este arquivo é o nosso "guarda-roupa" - aqui guardamos todas as funções
// que interagem diretamente com o banco de dados da biblioteca.
// Seguimos o padrão MVC: Model lida com dados, Controller com lógica, View com apresentação.

// Função para adicionar um item (jogo ou gift card) à biblioteca do usuário.
// É chamada quando um pagamento é aprovado ou quando queremos adicionar manualmente.
exports.addItem = (data, callback) => {
  // SQL preparado para evitar injeção de código malicioso
  // Campos: user_id (quem comprou), type (jogo ou gift card), item_id (ID do item),
  // title (nome do jogo/gift), platform (onde roda ou vale)
  const sql = `INSERT INTO users_library (user_id, type, item_id, title, platform)
               VALUES (?, ?, ?, ?, ?)`;

  // Executa a query com os dados sanitizados
  db.query(sql, [data.user_id, data.type, data.item_id, data.title, data.platform], callback);
};

// Função que busca TODOS os itens da biblioteca de um usuário específico.
// É usada quando o usuário quer ver sua coleção completa.
exports.getUserLibrary = (user_id, callback) => {
  // Query simples mas eficiente - busca tudo do usuário
  db.query('SELECT * FROM users_library WHERE user_id = ?', [user_id], callback);
};

// Função importante para evitar duplicatas!
// Antes de adicionar um item, verificamos se o usuário já não o tem.
// Isso evita que alguém compre o mesmo jogo duas vezes por acidente.
exports.checkItem = (user_id, item_id, callback) => {
  // Busca se existe algum registro com esse usuário e item
  db.query('SELECT * FROM users_library WHERE user_id = ? AND item_id = ?', [user_id, item_id], callback);
};
