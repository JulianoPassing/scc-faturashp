const { parsearFatura, validarMensagemFatura } = require('../modules/faturaParser');
const { criarEmbedFatura, criarBotaoPago } = require('../modules/faturaEmbed');
const { salvarFatura } = require('../modules/faturaStorage');

/**
 * Handler para processar mensagens de faturas
 */

/**
 * Processa mensagens enviadas no canal de origem
 * @param {Message} message - Mensagem do Discord
 * @param {string} canalOrigemId - ID do canal de origem
 * @param {string} canalDestinoId - ID do canal de destino
 */
async function processarMensagemFatura(message, canalOrigemId, canalDestinoId) {
  // Ignora mensagens de bots
  if (message.author.bot) {
    return;
  }

  // Verifica se a mensagem é do canal correto
  if (message.channel.id !== canalOrigemId) {
    return;
  }

  const conteudo = message.content;

  // Valida se a mensagem contém dados de fatura
  if (!validarMensagemFatura(conteudo)) {
    return;
  }

  // Parseia os dados da fatura
  const fatura = parsearFatura(conteudo);

  if (!fatura) {
    console.log('⚠️ Mensagem com formato de fatura inválido');
    return;
  }

  console.log('📋 Nova fatura detectada:', fatura);

  // Busca o canal de destino
  const canalDestino = await message.client.channels.fetch(canalDestinoId);

  if (!canalDestino) {
    console.error('❌ Canal de destino não encontrado');
    return;
  }

  // Cria o embed e o botão
  const embed = criarEmbedFatura(fatura);
  const botao = criarBotaoPago(fatura.id);

  // Envia a mensagem formatada
  try {
    const mensagemEnviada = await canalDestino.send({
      embeds: [embed],
      components: [botao]
    });

    // Salva a fatura no armazenamento
    salvarFatura(fatura.id, fatura, mensagemEnviada.id);

    console.log(`✅ Fatura ${fatura.id} enviada com sucesso para o canal de destino`);

    // Reage à mensagem original com um check
    await message.react('✅');
  } catch (error) {
    console.error('❌ Erro ao enviar fatura:', error);
    await message.react('❌');
  }
}

module.exports = {
  processarMensagemFatura
};

