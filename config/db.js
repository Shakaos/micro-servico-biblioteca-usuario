const mysql = require('mysql2');

// Aqui está a configuração da nossa conexão com o banco de dados!
// Cada microsserviço tem seu próprio banco, lembra? Isso garante independência.
// Estou usando MySQL porque é confiável e funciona bem com Node.js.
const connection = mysql.createConnection({
  host: 'localhost',      // O banco roda na mesma máquina
  user: 'root',           // Usuário padrão do MySQL
  password: '',           // Sem senha para desenvolvimento local
  database: 'gameverse_library'  // Nosso banco exclusivo da biblioteca
});

// Esta função tenta conectar ao banco quando o serviço inicia.
// Se der erro, a gente sabe que tem problema na configuração do MySQL.
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
  console.log('Banco conectado!');
});

// Exportamos a conexão para usar em outros arquivos, principalmente no model.
module.exports = connection;
