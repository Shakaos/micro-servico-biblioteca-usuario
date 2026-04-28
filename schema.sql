-- 🎮 SCHEMA DO BANCO DE DADOS - Biblioteca do Usuário GameVerse
-- Este arquivo cria minha "casa" no banco de dados!
-- Cada microsserviço tem seu próprio banco, lembra? Isso me deixa independente.

-- Criando meu banco de dados exclusivo
CREATE DATABASE IF NOT EXISTS gameverse_library;
USE gameverse_library;

-- Minha tabela principal: users_library
-- Aqui eu guardo TODOS os jogos e gift cards que os usuários compraram
CREATE TABLE users_library (
  id INT AUTO_INCREMENT PRIMARY KEY,           -- ID único para cada item na biblioteca
  user_id INT NOT NULL,                         -- ID do usuário dono do item
  type ENUM('game', 'gift_card') NOT NULL,      -- Tipo: jogo ou cartão presente
  item_id INT NOT NULL,                         -- ID do item no catálogo geral
  title VARCHAR(255) NOT NULL,                  -- Nome do jogo ou gift card
  platform VARCHAR(100),                        -- Plataforma (Steam, Epic, etc.)
  acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Quando ganhou isso na biblioteca

  -- Índices para buscas rápidas (como um catálogo organizado!)
  INDEX idx_user_id (user_id),      -- Para buscar biblioteca de um usuário
  INDEX idx_item_id (item_id),      -- Para verificar se já tem o item
  INDEX idx_type (type)             -- Para separar jogos de gift cards
);

-- 🎭 DADOS DE TESTE - Para desenvolvimento e testes
-- Estes são exemplos de bibliotecas que uso para testar se tudo funciona
INSERT INTO users_library (user_id, type, item_id, title, platform) VALUES
-- Biblioteca do usuário 1 (tem um jogo e um gift card)
(1, 'game', 1, 'The Witcher 3: Wild Hunt', 'Steam'),
(1, 'gift_card', 2, 'Steam Gift Card $50', 'Steam'),

-- Biblioteca do usuário 2 (tem dois jogos)
(2, 'game', 3, 'Cyberpunk 2077', 'Epic Games'),
(2, 'game', 4, 'FIFA 24', 'EA Play');

-- Agora meu banco está pronto! 🎉
-- Posso guardar jogos, gift cards, e mostrar para os usuários suas coleções!

-- Desenvolvido por: André de Oliveira Braga e Izadora Lima de Mendonça
-- Projeto GameVerse - Microsserviços - Centro Universitário Uninorte - Curso de Sistemas de Informação