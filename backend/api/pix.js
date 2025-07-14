const qrcode = require('qrcode');
const pix = require('pix-api');

async function gerarQRCode(valor) {
  const payload = pix.gerarPayload({
    chave: 'seu_pix@email.com',
    valor: valor,
    nome: 'SagaCraft',
    cidade: 'São Paulo'
  });
  
  const qr = await qrcode.toDataURL(payload);
  return qr;
}