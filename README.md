# 💰 Bot de Faturas HP - Discord

Bot Discord automatizado para organizar e gerenciar faturas do HP. Monitora mensagens enviadas em um canal específico, extrai informações de faturas e envia mensagens formatadas com botão de pagamento.

## 📋 Funcionalidades

- ✅ **Monitoramento Automático**: Detecta mensagens de faturas em formato específico
- 📊 **Formatação Visual**: Cria embeds bonitos e organizados com as informações
- 🔘 **Botão de Pagamento**: Permite marcar faturas como pagas com um clique
- 💾 **Armazenamento**: Mantém histórico de faturas em memória
- ✨ **Reações Automáticas**: Confirma o processamento com emojis

## 🚀 Instalação

### 1. Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Uma aplicação Discord Bot (veja instruções abaixo)

### 2. Criar o Bot no Discord

1. Acesse https://discord.com/developers/applications
2. Clique em "New Application"
3. Dê um nome ao seu bot e confirme
4. Vá em "Bot" no menu lateral
5. Clique em "Add Bot"
6. Em "TOKEN", clique em "Copy" para copiar o token
7. Em "Privileged Gateway Intents", ative:
   - ✅ MESSAGE CONTENT INTENT
   - ✅ SERVER MEMBERS INTENT (opcional)

### 3. Convidar o Bot para o Servidor

1. Ainda no Developer Portal, vá em "OAuth2" > "URL Generator"
2. Selecione os scopes:
   - ✅ `bot`
3. Selecione as permissões:
   - ✅ `Send Messages`
   - ✅ `Read Messages/View Channels`
   - ✅ `Add Reactions`
   - ✅ `Use Slash Commands`
4. Copie a URL gerada e cole no navegador
5. Selecione seu servidor e autorize

### 4. Configurar o Projeto

```bash
# Instale as dependências
npm install

# Crie o arquivo .env baseado no exemplo
cp .env.example .env
```

### 5. Configurar Variáveis de Ambiente

Edite o arquivo `.env` e preencha com suas informações:

```env
# Token do bot (copiado no passo 2.6)
DISCORD_TOKEN=seu_token_aqui

# ID do canal onde as faturas são enviadas
CANAL_ORIGEM=1435656885607993394

# ID do canal onde as faturas formatadas serão postadas
CANAL_DESTINO=1438517282669334568

# ID do servidor (opcional, para referência)
SERVIDOR_ID=1152027035284295740
```

**Como obter IDs de canais:**
1. Ative o Modo Desenvolvedor no Discord (Configurações > Avançado > Modo Desenvolvedor)
2. Clique com botão direito no canal e selecione "Copiar ID"

## 📖 Uso

### Iniciar o Bot

```bash
# Modo normal
npm start

# Modo desenvolvimento (reinicia automaticamente)
npm run dev
```

### Formato da Mensagem de Fatura

Para que o bot processe uma fatura, envie uma mensagem no canal de origem com o seguinte formato:

```
Nome: João Silva
ID: 12345
Valor: R$ 1.500,00
```

**Regras:**
- Cada informação deve estar em uma linha separada
- Use o formato `Campo: Valor`
- Os campos obrigatórios são: Nome, ID e Valor
- O formato não é case-sensitive (Nome, nome, NOME funcionam)

### Exemplo de Uso

1. Um usuário envia no canal de origem:
```
Nome: Maria Santos
ID: 67890
Valor: R$ 2.350,00
```

2. O bot processa e envia no canal de destino uma mensagem formatada com:
   - 💰 Embed colorido com todas as informações
   - 🔘 Botão "✅ Pago" 
   - ⏰ Timestamp da criação

3. Quando alguém clica em "Pago":
   - O embed muda de cor (verde → cinza)
   - O botão é removido
   - Aparece quem marcou como pago
   - A ação é registrada no console

## 🗂️ Estrutura do Projeto

```
scc-faturashp/
├── src/
│   ├── index.js                    # Arquivo principal do bot
│   ├── handlers/
│   │   ├── messageHandler.js      # Processa mensagens de faturas
│   │   └── interactionHandler.js  # Processa cliques em botões
│   └── modules/
│       ├── faturaParser.js        # Extrai dados das mensagens
│       ├── faturaEmbed.js         # Cria embeds e botões
│       └── faturaStorage.js       # Armazena faturas em memória
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## ⚙️ Módulos

### faturaParser.js
Responsável por extrair informações de faturas das mensagens de texto.

### faturaEmbed.js
Cria os embeds visuais e botões interativos para as faturas.

### faturaStorage.js
Gerencia o armazenamento de faturas em memória (pode ser expandido para usar banco de dados).

### messageHandler.js
Processa mensagens recebidas e coordena o envio das faturas formatadas.

### interactionHandler.js
Gerencia interações de botões (cliques no botão "Pago").

## 🔧 Melhorias Futuras

- 💾 Implementar persistência em banco de dados (MongoDB, PostgreSQL)
- 📊 Adicionar comando para listar faturas pendentes
- 📈 Relatórios de faturas pagas/pendentes
- 🔔 Notificações de faturas vencidas
- 🔐 Sistema de permissões (quem pode marcar como pago)
- 📝 Logs detalhados em arquivo
- 🌐 Dashboard web para visualização

## ⚠️ Observações Importantes

- **Armazenamento em Memória**: As faturas são armazenadas em memória. Se o bot reiniciar, os dados serão perdidos. Para produção, considere usar um banco de dados.
- **Token do Bot**: Nunca compartilhe o token do seu bot. Mantenha o arquivo `.env` seguro e fora do controle de versão.
- **Permissões**: Certifique-se de que o bot tem as permissões necessárias nos canais configurados.

## 🐛 Troubleshooting

### Bot não inicia
- Verifique se o arquivo `.env` está configurado corretamente
- Confirme se o token do bot está válido
- Verifique se as dependências foram instaladas (`npm install`)

### Bot não responde a mensagens
- Verifique se o "MESSAGE CONTENT INTENT" está ativado no Developer Portal
- Confirme se os IDs dos canais estão corretos no `.env`
- Verifique se o bot tem permissões de leitura no canal de origem

### Botão não funciona
- Confirme se o bot tem permissão de enviar mensagens no canal de destino
- Verifique os logs do console para erros

## 📝 Licença

MIT

## 💬 Suporte

Para dúvidas ou problemas, verifique:
- Os logs no console do bot
- As configurações de permissões no Discord
- As variáveis de ambiente no arquivo `.env`

