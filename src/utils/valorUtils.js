/**
 * Utilitários para trabalhar com valores monetários
 */

/**
 * Converte valores com "k" para números
 * Exemplos: "1k" -> 1000, "2.5k" -> 2500, "10k" -> 10000
 * @param {string} valor - Valor a ser convertido
 * @returns {number} Valor numérico
 */
function converterValorParaNumero(valor) {
  if (!valor) return 0;

  // Remove espaços
  let valorLimpo = valor.toString().trim().toLowerCase();

  // Verifica se tem "k"
  if (valorLimpo.includes('k')) {
    // Remove "k" e outros caracteres não numéricos exceto ponto e vírgula
    valorLimpo = valorLimpo.replace(/k/gi, '').replace(/[^\d.,]/g, '');
    
    // Substitui vírgula por ponto
    valorLimpo = valorLimpo.replace(',', '.');
    
    // Converte e multiplica por 1000
    const numero = parseFloat(valorLimpo);
    return isNaN(numero) ? 0 : numero * 1000;
  }

  // Se não tem "k", tenta converter normalmente
  // Remove tudo exceto dígitos, vírgula e ponto
  valorLimpo = valorLimpo.replace(/[^\d.,]/g, '');
  
  // Substitui vírgula por ponto
  valorLimpo = valorLimpo.replace(',', '.');
  
  const numero = parseFloat(valorLimpo);
  return isNaN(numero) ? 0 : numero;
}

/**
 * Formata valor numérico para exibição em Real brasileiro
 * @param {number} valor - Valor numérico
 * @returns {string} Valor formatado (ex: "R$ 1.000,00")
 */
function formatarValorBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Converte e formata valor com "k" para exibição
 * @param {string} valorOriginal - Valor original (pode ter "k")
 * @returns {Object} { valorOriginal, valorNumerico, valorFormatado }
 */
function processarValor(valorOriginal) {
  const valorNumerico = converterValorParaNumero(valorOriginal);
  const valorFormatado = formatarValorBRL(valorNumerico);
  
  return {
    valorOriginal,
    valorNumerico,
    valorFormatado
  };
}

module.exports = {
  converterValorParaNumero,
  formatarValorBRL,
  processarValor
};

