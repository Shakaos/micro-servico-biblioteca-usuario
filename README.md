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
- PostgreSQL (Supabase)
- JWT (RS256)

## Deploy no Render

### 1. Configurar Supabase
1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá em **Settings → Database** e copie as informações de conexão
3. No **SQL Editor**, execute o conteúdo do arquivo `schema.sql`

### 2. Deploy no Render
1. Acesse [render.com](https://render.com) e faça login com GitHub
2. Clique em **"New +"** → **"Web Service"**
3. Selecione o repositório `micro-servico-biblioteca-usuario`
4. Configure:

| Campo | Valor |
|-------|-------|
| Name | library-service |
| Build Command | `npm install` |
| Start Command | `node app.js` |

5. Em **Environment Variables**, adicione:

| Variável | Valor |
|----------|-------|
| `DB_HOST` | (do Supabase: Settings → Database) |
| `DB_USER` | postgres |
| `DB_PASSWORD` | (sua senha do Supabase) |
| `DB_NAME` | postgres |
| `DB_PORT` | 5432 |
| `JWT_ISSUER` | https://sistema-distribuido-trabalho-faculd.vercel.app |
| `JWT_AUDIENCE` | internal-apis |
| `JWT_PUBLIC_KEY_PEM` | (chave pública do PDF) |

6. Clique em **"Create Web Service"**

### URL do serviço
Após o deploy, você terá uma URL como: `https://library-service-xxxx.onrender.com`

## Endpoints da API

**Lembre-se: Todas as rotas requerem token JWT no header `Authorization: Bearer <token>`**

### GET /library/user/:id
Busca a biblioteca de um usuário.

### POST /library/add
Adiciona um item à biblioteca.

### POST /library/integration/payment-approved
Integração com pagamento (adiciona item após aprovação).
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
