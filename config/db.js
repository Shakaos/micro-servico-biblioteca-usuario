const { Pool } = require('pg');

// Aqui configuramos a conexão com o PostgreSQL (Supabase)
// Usamos variáveis de ambiente para funcionar tanto local quanto no Render
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste de conexão (equivalente ao seu antigo connect)
pool.connect()
  .then(() => console.log('Banco conectado (PostgreSQL)!'))
  .catch(err => console.error('Erro ao conectar:', err));

module.exports = pool;