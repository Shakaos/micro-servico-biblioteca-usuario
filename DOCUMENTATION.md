# Documentação de API - Biblioteca do Usuário (GameVerse)

> **Versão**: 1.0.0  
> **Data**: 28/04/2026  
> **Serviço**: Biblioteca do Usuário (Library Service)

---

## Base URLs

### Ambiente de Desenvolvimento
```
http://localhost:3005
```

### Ambiente de Produção
```
https://api.gameverse.com.br/library
```

---

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|------------|
| POST | `/library/add` | Adiciona item à biblioteca |
| GET | `/library/user/:user_id` | Lista itens do usuário |
| POST | `/library/integration/payment-approved` | Confirmação de pagamento |

---

## 1. Adicionar Item à Biblioteca

### POST `/library/add`

Adiciona um item manualmente à biblioteca do usuário.

**URL Completa (Produção)**:
```
POST https://api.gameverse.com.br/library/add
```

**Request Body**:
```json
{
  "user_id": 1,
  "type": "game",
  "item_id": 123,
  "title": "The Witcher 3",
  "platform": "Steam"
}
```

**Parâmetros**:
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| user_id | integer | ✅ | ID do usuário |
| type | string | ✅ | "game" ou "gift_card" |
| item_id | integer | ✅ | ID do item na loja |
| title | string | ✅ | Título do jogo/cartão |
| platform | string | ❌ | Plataforma (Steam, Epic, etc) |

**Response Sucesso (200)**:
```json
{
  "success": true,
  "message": "Item adicionado à biblioteca com sucesso",
  "data": {
    "id": 1,
    "user_id": 1,
    "type": "game",
    "item_id": 123,
    "title": "The Witcher 3",
    "platform": "Steam",
    "acquired_at": "2026-04-28T10:00:00.000Z"
  }
}
```

**Response Erro (400/500)**:
```json
{
  "success": false,
  "message": "Erro ao adicionar item",
  "error": "Mensagem de erro"
}
```

---

## 2. Listar Biblioteca do Usuário

### GET `/library/user/:user_id`

Retorna todos os itens da biblioteca de um usuário específico.

**URL Completa (Produção)**:
```
GET https://api.gameverse.com.br/library/user/1
```

**Parâmetros na URL**:
| Campo | Tipo | Descrição |
|-------|------|-----------|
| user_id | integer | ID do usuário (path param) |

**Response Sucesso (200)**:
```json
{
  "success": true,
  "message": "Biblioteca carregada com sucesso",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "type": "game",
      "item_id": 123,
      "title": "The Witcher 3: Wild Hunt",
      "platform": "Steam",
      "acquired_at": "2026-04-28T10:00:00.000Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "type": "gift_card",
      "item_id": 456,
      "title": "Steam Gift Card $50",
      "platform": "Steam",
      "acquired_at": "2026-04-27T15:30:00.000Z"
    }
  ]
}
```

**Response Erro (404)**:
```json
{
  "success": false,
  "message": "Usuário não encontrado",
  "error": "Nenhum item na biblioteca"
}
```

---

## 3. Confirmação de Pagamento (Integração)

### POST `/library/integration/payment-approved`

Endpoint para integração com o serviço de pagamentos. Recebe confirmação de pagamento aprovado e adiciona o item automaticamente à biblioteca.

**URL Completa (Produção)**:
```
POST https://api.gameverse.com.br/library/integration/payment-approved
```

**Request Body**:
```json
{
  "user_id": 1,
  "type": "game",
  "item_id": 789,
  "title": "Cyberpunk 2077",
  "platform": "GOG"
}
```

**Fluxo de Integração**:
1. Serviço de pagamentos envia dados após aprovação
2. Biblioteca verifica se item já existe
3. Se não existir, adiciona ao banco
4. Retorna confirmação de sucesso ou erro

**Response Sucesso (200)**:
```json
{
  "success": true,
  "message": "Pagamento confirmado e item adicionado à biblioteca",
  "data": {
    "user_id": 1,
    "item_id": 789,
    "title": "Cyberpunk 2077"
  }
}
```

**Response Item Duplicado (200)**:
```json
{
  "success": true,
  "message": "Item já está na biblioteca do usuário",
  "data": {
    "user_id": 1,
    "item_id": 789,
    "title": "Cyberpunk 2077"
  }
}
```

---

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 400 | Erro na requisição (dados inválidos) |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## Padrão de Respostas

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

## Headers Obrigatórios

Para todas as requisições, incluir:

```
Content-Type: application/json
Authorization: Bearer <token_jwt>
```

---

## Exemplos de Uso

### cURL - Adicionar Item

```bash
curl -X POST https://api.gameverse.com.br/library/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "user_id": 1,
    "type": "game",
    "item_id": 123,
    "title": "The Witcher 3",
    "platform": "Steam"
  }'
```

### cURL - Listar Biblioteca

```bash
curl -X GET https://api.gameverse.com.br/library/user/1 \
  -H "Authorization: Bearer <token>"
```

### JavaScript (Fetch)

```javascript
// Adicionar item
fetch('https://api.gameverse.com.br/library/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>'
  },
  body: JSON.stringify({
    user_id: 1,
    type: 'game',
    item_id: 123,
    title: 'The Witcher 3',
    platform: 'Steam'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## Contato

Desenvolvido por: André de Oliveira Braga e Izadora Lima de Mendonça  
Projeto GameVerse - Microsserviços  
Centro Universitário Uninorte - Curso de Sistemas de Informação