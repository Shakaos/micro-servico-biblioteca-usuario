# Checklist - Microsserviço Biblioteca de Usuário

## ✅ Implementação do Token JWT

- [x] Arquivo `.env` criado com configurações JWT
- [x] `JWT_SECRET` configurado
- [x] `JWT_EXPIRES_IN` configurado (24h)
- [x] `JWT_ISSUER` configurado
- [x] `JWT_AUDIENCE` configurado
- [x] `JWT_PUBLIC_KEY_PEM` configurado (chave pública RSA)

## ✅ Middleware de Autenticação

- [x] Arquivo `config/authMiddleware.js` criado
- [x] Validação de token no header Authorization
- [x] Verificação de issuer
- [x] Verificação de audience
- [x] Algoritmo RS256 configurado
- [x] Fallback para HS256 (JWT_SECRET)

## ✅ Rotas Protegidas

- [x] `POST /library/add` - requer token JWT
- [x] `GET /library/user/:user_id` - requer token JWT
- [x] `POST /library/integration/payment-approved` - pública (integração)

## ✅ Segurança no Controller

- [x] `addItem` usa user_id do token (não do body)
- [x] `getLibrary` usa user_id do token (não dos params)

## ✅ Dependências

- [x] `jsonwebtoken` instalado
- [x] `dotenv` instalado
- [x] `package.json` atualizado

## ✅ Arquivos do Projeto

- [x] `app.js` - carrega dotenv
- [x] `routes/libraryRoutes.js` - rotas com middleware
- [x] `controllers/libraryController.js` - lógica com token
- [x] `config/authMiddleware.js` - validação JWT
- [x] `.env` - configurações

---

## 🚀 Como Testar

### 1. Iniciar o servidor
```bash
npm start
```

### 2. Testar sem token (deve retornar 401)
```bash
GET http://localhost:3005/library/user/1
```

### 3. Testar com token válido (deve retornar 200)
```bash
GET http://localhost:3005/library/user/1
Authorization: Bearer <seu_token_jwt>
```

### 4. Testar com token inválido (deve retornar 403)
```bash
GET http://localhost:3005/library/user/1
Authorization: Bearer token_invalido
```

---

## 📝 Observações

- A rota `/integration/payment-approved` é pública pois é chamada por outros microsserviços
- O user_id é extraído do token JWT para garantir segurança
- A chave pública PEM está configurada para RS256