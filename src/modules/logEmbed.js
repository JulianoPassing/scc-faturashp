const { EmbedBuilder } = require('discord.js');

/**
 * Módulo para criar logs de ações
 */

/**
 * Cria um embed de log para quando uma fatura é marcada como paga
 * @param {Object} fatura - Dados da fatura
 * @param {Object} usuario - Usuário que marcou como paga
 * @param {string} usuario.id - ID do usuário
 * @param {string} usuario.tag - Tag do usuário (ex: Usuario#1234)
 * @param {string} usuario.avatar - URL do avatar do usuário
 * @returns {EmbedBuilder} Embed de log
 */
function criarLogPagamento(fatura, usuario) {
  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('✅ Fatura Marcada como Paga')
    .setDescription('Uma fatura foi marcada como paga no sistema')
    .addFields(
      { 
        name: '👤 Cliente', 
        value: `\`${fatura.nome}\``, 
        inline: true 
      },
      { 
        name: '🆔 ID da Fatura', 
        value: `\`${fatura.id}\``, 
        inline: true 
      },
      { 
        name: '💵 Valor', 
        value: `\`${fatura.valor}\``, 
        inline: true 
      },
      {
        name: '✅ Marcado por',
        value: `<@${usuario.id}> (${usuario.tag})`,
        inline: false
      }
    )
    .setTimestamp()
    .setFooter({ 
      text: `Ação realizada por ${usuario.tag}`,
      iconURL: usuario.avatar
    });

  return embed;
}

module.exports = {
  criarLogPagamento
};

