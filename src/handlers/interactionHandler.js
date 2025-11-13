const { criarEmbedFaturaPaga } = require('../modules/faturaEmbed');
const { buscarFatura, marcarComoPaga, estaoPaga } = require('../modules/faturaStorage');

/**
 * Handler para interações de botões
 */

/**
 * Processa o clique no botão "Pago"
 * @param {Interaction} interaction - Interação do Discord
 */
async function handleBotaoPago(interaction) {
  // Verifica se é uma interação de botão
  if (!interaction.isButton()) {
    return;
  }

  // Verifica se é o botão de pagar
  if (!interaction.customId.startsWith('pagar_')) {
    return;
  }

  // Extrai o ID da fatura
  const faturaId = interaction.customId.replace('pagar_', '');

  // Busca a fatura
  const fatura = buscarFatura(faturaId);

  if (!fatura) {
    await interaction.reply({
      content: '❌ Fatura não encontrada no sistema.',
      ephemeral: true
    });
    return;
  }

  // Verifica se já foi paga
  if (estaoPaga(faturaId)) {
    await interaction.reply({
      content: '⚠️ Esta fatura já foi marcada como paga.',
      ephemeral: true
    });
    return;
  }

  // Marca como paga
  const usuarioPagou = `<@${interaction.user.id}>`;
  marcarComoPaga(faturaId, usuarioPagou);

  // Atualiza a mensagem
  const embedPaga = criarEmbedFaturaPaga(fatura, usuarioPagou);

  await interaction.update({
    embeds: [embedPaga],
    components: [] // Remove os botões
  });

  console.log(`✅ Fatura ${faturaId} marcada como paga por ${interaction.user.tag}`);
}

module.exports = {
  handleBotaoPago
};

