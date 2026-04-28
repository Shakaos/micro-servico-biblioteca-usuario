# Biblioteca do Usuário - GameVerse

Este é o microsserviço da Biblioteca do Usuário para o projeto GameVerse.
Eu sou responsável por guardar jogos e gift cards que os usuários compraram.
Aqui eu mantenho a coleção digital de cada usuário organizada e acessível.

## Minha responsabilidade

- Guardar jogos comprados pelo usuário
- Guardar gift cards adquiridos
- Manter o histórico de aquisições
- Expor a biblioteca digital para outros serviços

## Tecnologias usadas

- Node.js
- Express.js
- MySQL
- CORS

## Estrutura de dados

Tabela: `users_library`

```sql
CREATE TABLE users_library (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('game', 'gift_card') NOT NULL,
  item_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(100),
  acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Endpoints da API

### POST /library/add
Adiciona um item manualmente à biblioteca do usuário.

Exemplo de request:
```json
{
  "user_id": 1,
  "type": "game",
  "item_id": 123,
  "title": "The Witcher 3",
  "platform": "Steam"
}
```

### GET /library/user/:user_id
Retorna todos os itens da biblioteca de um usuário.

### POST /library/integration/payment-approved
Recebe confirmação de pagamento aprovado e adiciona o item à biblioteca.

## Fluxo de integração

1. Recebo dados do serviço de pagamentos
2. Verifico se o item já está na biblioteca
3. Se não estiver, adiciono ao banco
4. Retorno confirmação de sucesso ou erro

## Dados de teste

Usuário 1:
- Jogo: "The Witcher 3: Wild Hunt" (Steam)
- Gift Card: "Steam Gift Card $50"

Usuário 2:
- Jogo: "Cyberpunk 2077" (Epic Games)
- Jogo: "FIFA 24" (EA Play)

## Como executar

1. Instalar dependências:
```bash
npm install
```
2. Criar o banco de dados `gameverse_library` e executar `schema.sql`
3. Iniciar o serviço:
```bash
npm start
```

O serviço estará disponível em `http://localhost:3005`

## Padrão de respostas

Todas as respostas seguem este formato:
```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "error": any
}
```

---

Desenvolvido por:
- André de Oliveira Braga
- Izadora Lima de Mendonça

Centro Universitário Uninorte - Curso de Sistemas de Informação
