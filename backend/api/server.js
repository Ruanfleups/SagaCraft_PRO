require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');

const app = express();
app.use(express.json());

// Conexão MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS,
  database: process.env.DB_NAME || 'sagacraft'
});

// Rotas de Autenticação
app.post('/login', async (req, res) => {
  const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email]);
  if (users.length === 0) return res.status(401).send('Credenciais inválidas');
  
  const valid = await bcrypt.compare(req.body.senha, users[0].senha_hash);
  if (!valid) return res.status(401).send('Credenciais inválidas');
  
  const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ token });
});

// Rotas PIX
app.post('/gerar-pix', async (req, res) => {
  const txid = require('crypto').randomBytes(16).toString('hex');
  const qr = await qrcode.toDataURL(`pix://${process.env.PIX_KEY}?txid=${txid}&valor=${req.body.valor}`);
  
  await pool.query(
    'INSERT INTO pagamentos (usuario_id, txid, valor, qrcode) VALUES (?, ?, ?, ?)',
    [req.user.id, txid, req.body.valor, qr]
  );
  
  res.json({ qrcode: qr, txid });
});

app.listen(3000, () => console.log('API rodando na porta 3000'));