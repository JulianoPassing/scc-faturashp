/**
 * Módulo para parsear mensagens de faturas
 */

/**
 * Extrai informações de fatura de uma mensagem
 * @param {string} mensagem - Conteúdo da mensagem
 * @returns {Object|null} Objeto com dados da fatura ou null se inválido
 */
function parsearFatura(mensagem) {
  const linhas = mensagem.split('\n').map(linha => linha.trim());
  
  const fatura = {
    nome: null,
    id: null,
    valor: null
  };

  for (const linha of linhas) {
    // Parsear Nome
    const matchNome = linha.match(/^Nome:\s*(.+)$/i);
    if (matchNome) {
      fatura.nome = matchNome[1].trim();
      continue;
    }

    // Parsear ID
    const matchId = linha.match(/^ID:\s*(.+)$/i);
    if (matchId) {
      fatura.id = matchId[1].trim();
      continue;
    }

    // Parsear Valor
    const matchValor = linha.match(/^Valor:\s*(.+)$/i);
    if (matchValor) {
      fatura.valor = matchValor[1].trim();
      continue;
    }
  }

  // Validar se todos os campos foram preenchidos
  if (fatura.nome && fatura.id && fatura.valor) {
    return fatura;
  }

  return null;
}

/**
 * Valida se uma mensagem contém dados de fatura
 * @param {string} mensagem - Conteúdo da mensagem
 * @returns {boolean} True se a mensagem contém dados válidos de fatura
 */
function validarMensagemFatura(mensagem) {
  const temNome = /Nome:/i.test(mensagem);
  const temId = /ID:/i.test(mensagem);
  const temValor = /Valor:/i.test(mensagem);
  
  return temNome && temId && temValor;
}

module.exports = {
  parsearFatura,
  validarMensagemFatura
};

