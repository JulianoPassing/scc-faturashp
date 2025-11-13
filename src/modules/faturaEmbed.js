const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

/**
 * Módulo para criar embeds e botões de faturas
 */

/**
 * Cria um embed formatado para uma fatura
 * @param {Object} fatura - Dados da fatura
 * @param {string} fatura.nome - Nome do cliente
 * @param {string} fatura.id - ID da fatura
 * @param {string} fatura.valor - Valor da fatura
 * @returns {EmbedBuilder} Embed formatado
 */
function criarEmbedFatura(fatura) {
  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('💰 Nova Fatura HP')
    .setDescription('Uma nova fatura foi registrada no sistema')
    .addFields(
      { 
        name: '👤 Nome', 
        value: `\`${fatura.nome}\``, 
        inline: true 
      },
      { 
        name: '🆔 ID', 
        value: `\`${fatura.id}\``, 
        inline: true 
      },
      { 
        name: '💵 Valor', 
        value: `\`${fatura.valor}\``, 
        inline: true 
      }
    )
    .setTimestamp()
    .setFooter({ text: 'Sistema de Faturas HP' });

  return embed;
}

/**
 * Cria o botão de "Pago" para a fatura
 * @param {string} faturaId - ID da fatura
 * @returns {ActionRowBuilder} Row com o botão
 */
function criarBotaoPago(faturaId) {
  const botao = new ButtonBuilder()
    .setCustomId(`pagar_${faturaId}`)
    .setLabel('✅ Pago')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder()
    .addComponents(botao);

  return row;
}

/**
 * Atualiza o embed para o status "pago"
 * @param {Object} fatura - Dados da fatura
 * @param {string} usuarioPagou - Nome do usuário que marcou como pago
 * @returns {EmbedBuilder} Embed atualizado
 */
function criarEmbedFaturaPaga(fatura, usuarioPagou) {
  const embed = new EmbedBuilder()
    .setColor('#808080')
    .setTitle('✅ Fatura HP - PAGA')
    .setDescription('Esta fatura foi marcada como paga')
    .addFields(
      { 
        name: '👤 Nome', 
        value: `\`${fatura.nome}\``, 
        inline: true 
      },
      { 
        name: '🆔 ID', 
        value: `\`${fatura.id}\``, 
        inline: true 
      },
      { 
        name: '💵 Valor', 
        value: `\`${fatura.valor}\``, 
        inline: true 
      },
      {
        name: '✅ Pago por',
        value: `${usuarioPagou}`,
        inline: false
      }
    )
    .setTimestamp()
    .setFooter({ text: 'Sistema de Faturas HP' });

  return embed;
}

module.exports = {
  criarEmbedFatura,
  criarBotaoPago,
  criarEmbedFaturaPaga
};

