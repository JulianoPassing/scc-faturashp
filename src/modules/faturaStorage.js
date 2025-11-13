const fs = require('fs');
const path = require('path');

/**
 * Módulo para armazenar e gerenciar faturas com persistência em JSON
 */

// Armazena as faturas em memória
const faturas = new Map();

// Caminho do arquivo JSON
const DATA_DIR = path.join(__dirname, '../../data');
const ARQUIVO_FATURAS = path.join(DATA_DIR, 'faturas.json');

/**
 * Garante que o diretório de dados existe
 */
function garantirDiretorio() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('📁 Diretório de dados criado:', DATA_DIR);
  }
}

/**
 * Salva as faturas no arquivo JSON
 */
function persistirDados() {
  try {
    garantirDiretorio();
    
    const dados = {
      faturas: Array.from(faturas.entries()).map(([id, fatura]) => ({
        id,
        ...fatura
      })),
      ultimaAtualizacao: new Date().toISOString()
    };

    fs.writeFileSync(ARQUIVO_FATURAS, JSON.stringify(dados, null, 2), 'utf8');
    console.log(`💾 Dados salvos: ${faturas.size} faturas`);
  } catch (error) {
    console.error('❌ Erro ao salvar dados:', error);
  }
}

/**
 * Carrega as faturas do arquivo JSON
 */
function carregarDados() {
  try {
    garantirDiretorio();

    if (!fs.existsSync(ARQUIVO_FATURAS)) {
      console.log('📋 Nenhum arquivo de dados encontrado. Iniciando com dados vazios.');
      return;
    }

    const conteudo = fs.readFileSync(ARQUIVO_FATURAS, 'utf8');
    const dados = JSON.parse(conteudo);

    if (dados.faturas && Array.isArray(dados.faturas)) {
      faturas.clear();
      
      dados.faturas.forEach(fatura => {
        const { id, ...dadosFatura } = fatura;
        faturas.set(id, dadosFatura);
      });

      const abertas = dados.faturas.filter(f => !f.paga).length;
      const pagas = dados.faturas.filter(f => f.paga).length;

      console.log('✅ Dados carregados com sucesso!');
      console.log(`   📊 Total: ${faturas.size} faturas`);
      console.log(`   📋 Em aberto: ${abertas}`);
      console.log(`   ✅ Pagas: ${pagas}`);
    }
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
  }
}

/**
 * Salva uma fatura no armazenamento
 * @param {string} faturaId - ID da fatura
 * @param {Object} dados - Dados da fatura
 * @param {string} mensagemId - ID da mensagem enviada
 */
function salvarFatura(faturaId, dados, mensagemId) {
  faturas.set(faturaId, {
    ...dados,
    id: faturaId, // Garante que o ID está no objeto
    mensagemId,
    paga: false,
    dataCriacao: new Date().toISOString()
  });
  persistirDados();
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
  fatura.dataPagamento = new Date().toISOString();
  
  faturas.set(faturaId, fatura);
  persistirDados();
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
  const resultado = faturas.delete(faturaId);
  if (resultado) {
    persistirDados();
  }
  return resultado;
}

/**
 * Obtém estatísticas das faturas
 * @returns {Object} Objeto com estatísticas
 */
function obterEstatisticas() {
  const todasFaturas = Array.from(faturas.values());
  const abertas = todasFaturas.filter(f => !f.paga);
  const pagas = todasFaturas.filter(f => f.paga);

  return {
    total: faturas.size,
    abertas: abertas.length,
    pagas: pagas.length,
    faturasAbertas: abertas,
    faturasPagas: pagas
  };
}

module.exports = {
  carregarDados,
  salvarFatura,
  buscarFatura,
  marcarComoPaga,
  estaoPaga,
  listarFaturas,
  removerFatura,
  obterEstatisticas
};

