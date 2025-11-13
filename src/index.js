require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { processarMensagemFatura } = require('./handlers/messageHandler');
const { handleBotaoPago } = require('./handlers/interactionHandler');

// Validação de variáveis de ambiente
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ ERRO: DISCORD_TOKEN não encontrado no arquivo .env');
  process.exit(1);
}

if (!process.env.CANAL_ORIGEM || !process.env.CANAL_DESTINO) {
  console.error('❌ ERRO: CANAL_ORIGEM e CANAL_DESTINO devem ser definidos no arquivo .env');
  process.exit(1);
}

// Configuração do cliente Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// IDs dos canais
const CANAL_ORIGEM = process.env.CANAL_ORIGEM;
const CANAL_DESTINO = process.env.CANAL_DESTINO;
const CANAL_LOGS = process.env.CANAL_LOGS || null;

// Evento: Bot conectado
client.once('clientReady', () => {
  console.log('═══════════════════════════════════════');
  console.log('✅ Bot de Faturas HP iniciado com sucesso!');
  console.log(`🤖 Logado como: ${client.user.tag}`);
  console.log(`📋 Monitorando canal: ${CANAL_ORIGEM}`);
  console.log(`📤 Enviando para canal: ${CANAL_DESTINO}`);
  if (CANAL_LOGS) {
    console.log(`📝 Logs de pagamento: ${CANAL_LOGS}`);
  }
  console.log('═══════════════════════════════════════');
});

// Evento: Nova mensagem
client.on('messageCreate', async (message) => {
  try {
    await processarMensagemFatura(message, CANAL_ORIGEM, CANAL_DESTINO);
  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error);
  }
});

// Evento: Interação (botões)
client.on('interactionCreate', async (interaction) => {
  try {
    await handleBotaoPago(interaction, CANAL_LOGS);
  } catch (error) {
    console.error('❌ Erro ao processar interação:', error);
    
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '❌ Ocorreu um erro ao processar sua ação. Tente novamente.',
        ephemeral: true
      }).catch(() => {});
    }
  }
});

// Tratamento de erros
client.on('error', (error) => {
  console.error('❌ Erro do cliente Discord:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado:', error);
});

// Inicia o bot
client.login(process.env.DISCORD_TOKEN);

