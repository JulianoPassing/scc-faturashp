/**
 * Módulo para armazenar e gerenciar faturas em memória
 */

// Armazena as faturas em memória (em produção, considere usar um banco de dados)
const faturas = new Map();

/**
 * Salva uma fatura no armazenamento
 * @param {string} faturaId - ID da fatura
 * @param {Object} dados - Dados da fatura
 * @param {string} mensagemId - ID da mensagem enviada
 */
function salvarFatura(faturaId, dados, mensagemId) {
  faturas.set(faturaId, {
    ...dados,
    mensagemId,
    paga: false,
    dataCriacao: new Date()
  });
}

/**
 * Busca uma fatura pelo ID
 * @param {string} faturaId - ID da fatura
 * @returns {Object|undefined} Dados da fatura ou undefined
 */
function buscarFatura(faturaId) {
  return faturas.get(faturaId);
}

/**
 * Marca uma fatura como paga
 * @param {string} faturaId - ID da fatura
 * @param {string} usuarioPagou - Nome do usuário que pagou
 * @returns {boolean} True se foi marcada, false se não existe
 */
function marcarComoPaga(faturaId, usuarioPagou) {
  const fatura = faturas.get(faturaId);
  
  if (!fatura) {
    return false;
  }

  fatura.paga = true;
  fatura.usuarioPagou = usuarioPagou;
  fatura.dataPagamento = new Date();
  
  faturas.set(faturaId, fatura);
  return true;
}

/**
 * Verifica se uma fatura já foi paga
 * @param {string} faturaId - ID da fatura
 * @returns {boolean} True se já foi paga
 */
function estaoPaga(faturaId) {
  const fatura = faturas.get(faturaId);
  return fatura ? fatura.paga : false;
}

/**
 * Lista todas as faturas
 * @returns {Array} Array com todas as faturas
 */
function listarFaturas() {
  return Array.from(faturas.entries()).map(([id, dados]) => ({
    id,
    ...dados
  }));
}

/**
 * Remove uma fatura do armazenamento
 * @param {string} faturaId - ID da fatura
 * @returns {boolean} True se foi removida, false se não existe
 */
function removerFatura(faturaId) {
  return faturas.delete(faturaId);
}

module.exports = {
  salvarFatura,
  buscarFatura,
  marcarComoPaga,
  estaoPaga,
  listarFaturas,
  removerFatura
};

