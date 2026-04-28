require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/libraryRoutes');
const { authenticateToken } = require('./config/authMiddleware');

// Este é o coração do nosso microsserviço da Biblioteca do Usuário!
// Aqui eu configuro o servidor Express que vai gerenciar todas as rotas da nossa API.
// É como o porteiro do prédio - recebe as requisições e direciona para os andares certos.
const app = express();

// CORS é fundamental para permitir que outros microsserviços (como o frontend ou Laravel central)
// façam requisições para nossa API sem problemas de segurança do navegador.
app.use(cors());

// Este middleware transforma o corpo das requisições JSON em objetos JavaScript
// que podemos usar facilmente nos nossos controllers.
app.use(express.json());

// Todas as rotas da biblioteca ficam sob o prefixo '/library'
// Isso organiza nossa API e deixa claro que tudo aqui é sobre a biblioteca do usuário.
app.use('/library', routes);

// O serviço roda na porta 3005 - escolhi uma porta alta para não conflitar
// com outros serviços que podem estar rodando na máquina.
app.listen(3005, () => {
  console.log('Library Service rodando na porta 3005');
});

// Desenvolvido por: André de Oliveira Braga e Izadora Lima de Mendonça
// Projeto GameVerse - Microsserviços - Centro Universitário Uninorte - Curso de Sistemas de Informação
