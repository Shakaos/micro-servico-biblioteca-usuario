// filepath: config/authMiddleware.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Middleware para validar o token JWT nas requisições
const authenticateToken = (req, res, next) => {
  // Pega o token do header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Acesso negado. Token não fornecido.' 
    });
  }

  // Decodifica o token sem verificar para detectar o algoritmo
  const decoded = jwt.decode(token, { complete: true });
  const algorithm = decoded?.header?.alg || 'HS256';

  // Converte a chave pública PEM de string multilinha para formato de linha única
  const publicKeyPEM = process.env.JWT_PUBLIC_KEY_PEM
    ? process.env.JWT_PUBLIC_KEY_PEM.replace(/\\n/g, '\n')
    : null;

  // Opções de verificação do token
  const verifyOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  };

  // Detecta o algoritmo e usa a chave correta
  if (algorithm === 'RS256' || algorithm === 'RS384' || algorithm === 'RS512') {
    // Usa chave pública para RS256
    if (!publicKeyPEM) {
      return res.status(500).json({ 
        error: 'Configuração erro: chave pública não configurada.' 
      });
    }
    verifyOptions.algorithms = ['RS256'];
    jwt.verify(token, publicKeyPEM, verifyOptions, (err, user) => {
      if (err) {
        return res.status(403).json({ 
          error: 'Token inválido ou expirado.',
          details: err.message 
        });
      }
      // Define req.auth com id do payload e o token
      req.auth = {
        id: user.sub || user.id,
        token
      };
      next();
    });
  } else if (algorithm === 'HS256' || algorithm === 'HS384' || algorithm === 'HS512') {
    // Usa JWT_SECRET para HS256
    verifyOptions.algorithms = ['HS256'];
    jwt.verify(token, process.env.JWT_SECRET, verifyOptions, (err, user) => {
      if (err) {
        return res.status(403).json({ 
          error: 'Token inválido ou expirado.',
          details: err.message 
        });
      }
      // Define req.auth com id do payload e o token
      req.auth = {
        id: user.sub || user.id,
        token
      };
      next();
    });
  } else {
    return res.status(400).json({ 
      error: 'Algoritmo não suportado: ' + algorithm 
    });
  }
};

module.exports = { authenticateToken };