const { AttachmentBuilder } = require('discord.js');
const { obterEstatisticas } = require('../modules/faturaStorage');
const { gerarRelatorioFaturasAbertas } = require('../modules/relatorioHTML');

/**
 * Handler para processar comandos do bot
 */

/**
 * Processa comandos enviados pelos usuários
 * @param {Message} message - Mensagem do Discord
 */
async function processarComando(message) {
  // Ignora mensagens de bots
  if (message.author.bot) {
    return;
  }

  // Verifica se a mensagem começa com !
  if (!message.content.startsWith('!')) {
    return;
  }

  const args = message.content.slice(1).trim().split(/ +/);
  const comando = args[0].toLowerCase();

  // Comando: !relatorio-faturas
  if (comando === 'relatorio-faturas' || comando === 'relatorio') {
    await handleRelatorioFaturas(message);
  }
}

/**
 * Gera e envia relatório de faturas em aberto
 * @param {Message} message - Mensagem do Discord
 */
async function handleRelatorioFaturas(message) {
  try {
    // Envia mensagem de processamento
    const msgProcessando = await message.reply('⏳ Gerando relatório de faturas em aberto...');

    // Obtém estatísticas
    const stats = obterEstatisticas();
    const faturasAbertas = stats.faturasAbertas;

    // Obtém informações do servidor
    const servidor = {
      nome: message.guild ? message.guild.name : 'Discord',
      id: message.guild ? message.guild.id : 'N/A'
    };

    // Gera o HTML
    const html = gerarRelatorioFaturasAbertas(faturasAbertas, servidor);

    // Cria o arquivo
    const dataAtual = new Date().toISOString().split('T')[0];
    const nomeArquivo = `relatorio-faturas-${dataAtual}.html`;
    const buffer = Buffer.from(html, 'utf-8');
    const attachment = new AttachmentBuilder(buffer, { name: nomeArquivo });

    // Envia o relatório
    await message.reply({
      content: `📊 **Relatório de Faturas em Aberto**\n\n` +
               `📋 Total de faturas: **${stats.abertas}**\n` +
               `✅ Faturas pagas: **${stats.pagas}**\n` +
               `📊 Total geral: **${stats.total}**\n\n` +
               `📎 Arquivo HTML gerado com sucesso!`,
      files: [attachment]
    });

    // Deleta mensagem de processamento
    await msgProcessando.delete().catch(() => {});

    console.log(`📊 Relatório gerado por ${message.author.tag}`);
  } catch (error) {
    console.error('❌ Erro ao gerar relatório:', error);
    await message.reply('❌ Ocorreu um erro ao gerar o relatório. Tente novamente.').catch(() => {});
  }
}

module.exports = {
  processarComando
};

