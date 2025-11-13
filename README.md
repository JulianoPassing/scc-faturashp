# 💰 Bot de Faturas HP - Discord

Bot Discord automatizado para organizar e gerenciar faturas do HP. Monitora mensagens enviadas em um canal específico, extrai informações de faturas e envia mensagens formatadas com botão de pagamento.

## 📋 Funcionalidades

- ✅ **Monitoramento Automático**: Detecta mensagens de faturas em formato específico
- 📊 **Formatação Visual**: Cria embeds bonitos e organizados com as informações
- 🔘 **Botão de Pagamento**: Permite marcar faturas como pagas com um clique
- 💾 **Persistência em JSON**: Salva faturas automaticamente em arquivo JSON (faturas abertas e pagas)
- ✨ **Reações Automáticas**: Confirma o processamento com emojis
- 📝 **Sistema de Logs**: Registra quem marcou cada fatura como paga (canal configurável)
- 📊 **Relatórios em HTML**: Comando para gerar relatório visual de faturas em aberto

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

# Canal de logs de pagamento (opcional)
CANAL_LOGS=1438520411943080016
```

**Como obter IDs de canais:**
1. Ative o Modo Desenvolvedor no Discord (Configurações > Avançado > Modo Desenvolvedor)
2. Clique com botão direito no canal e selecione "Copiar ID"

## 📖 Uso

### Iniciar o Bot

**Modo Normal:**
```bash
npm start
```

**Modo Desenvolvimento (reinicia automaticamente):**
```bash
npm run dev
```

**Com PM2 (Produção - recomendado):**
```bash
# Instalar dependências (incluindo PM2)
npm install

# Iniciar o bot
npm run pm2:start

# Ver logs em tempo real
npm run pm2:logs

# Ver status
npm run pm2:status

# Reiniciar o bot
npm run pm2:restart

# Parar o bot
npm run pm2:stop

# Remover do PM2
npm run pm2:delete
```

O PM2 mantém o bot rodando mesmo após reiniciar o servidor e reinicia automaticamente se o bot crashar.

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
   - Um log detalhado é enviado no canal de logs configurado

4. Para gerar relatório de faturas em aberto:
   - Digite `!relatorio-faturas` em qualquer canal
   - O bot gera um arquivo HTML visual e bonito
   - Baixe e abra no navegador para visualizar

## 🤖 Comandos Disponíveis

### !relatorio-faturas
Gera um relatório visual em HTML de todas as faturas em aberto.

**Uso:**
```
!relatorio-faturas
```

**Também aceita:**
```
!relatorio
```

**O que o relatório contém:**
- 📊 Estatísticas gerais (total, valor total)
- 📋 Lista completa de faturas em aberto
- 👤 Nome do cliente
- 🆔 ID da fatura
- 💵 Valor
- 📅 Data de criação
- 🎨 Design visual bonito estilo Discord

O arquivo HTML gerado pode ser:
- ✅ Aberto em qualquer navegador
- ✅ Compartilhado com a equipe
- ✅ Impresso para relatórios físicos
- ✅ Arquivado para histórico

## 🗂️ Estrutura do Projeto

```
scc-faturashp/
├── src/
│   ├── index.js                    # Arquivo principal do bot
│   ├── handlers/
│   │   ├── messageHandler.js      # Processa mensagens de faturas
│   │   ├── interactionHandler.js  # Processa cliques em botões
│   │   └── commandHandler.js      # Processa comandos (!relatorio-faturas)
│   └── modules/
│       ├── faturaParser.js        # Extrai dados das mensagens
│       ├── faturaEmbed.js         # Cria embeds e botões
│       ├── faturaStorage.js       # Armazena faturas com persistência JSON
│       ├── logEmbed.js            # Cria embeds de log
│       └── relatorioHTML.js       # Gera relatórios HTML
├── data/
│   ├── .gitkeep                   # Mantém o diretório no Git
│   ├── faturas.json               # Dados das faturas (criado automaticamente)
│   └── faturas.example.json       # Exemplo de estrutura de dados
├── examples/
│   └── exemplo-relatorio.md       # Exemplo de uso do comando de relatório
├── package.json
├── ecosystem.config.js             # Configuração PM2
├── .env.example
├── .gitignore
├── INSTRUCOES_PERSISTENCIA.md     # Guia de persistência e backup
└── README.md
```

## ⚙️ Módulos

### faturaParser.js
Responsável por extrair informações de faturas das mensagens de texto.

### faturaEmbed.js
Cria os embeds visuais e botões interativos para as faturas.

### faturaStorage.js
Gerencia o armazenamento de faturas com persistência em arquivo JSON. Salva automaticamente todas as mudanças e carrega os dados ao reiniciar o bot.

### messageHandler.js
Processa mensagens recebidas e coordena o envio das faturas formatadas.

### interactionHandler.js
Gerencia interações de botões (cliques no botão "Pago").

### logEmbed.js
Cria embeds de log para registrar ações de pagamento.

### relatorioHTML.js
Gera relatórios visuais em HTML de faturas em aberto.

### commandHandler.js
Processa comandos do bot (como !relatorio-faturas).

## 📊 PM2 - Gerenciamento de Processos

O bot está configurado para rodar com PM2 usando o nome **`scc-faturas-hp`**.

### Configurações do PM2 (ecosystem.config.js):
- **Nome do processo**: `scc-faturas-hp`
- **Reinício automático**: Ativado
- **Limite de memória**: 1GB
- **Logs**: Salvos em `./logs/`
  - `err.log` - Erros
  - `out.log` - Saída padrão
  - `combined.log` - Combinado

### Comandos úteis do PM2:
```bash
# Ver lista de todos os processos
pm2 list

# Monitorar recursos em tempo real
pm2 monit

# Salvar configuração atual (iniciar automaticamente no boot)
pm2 save
pm2 startup

# Limpar logs antigos
pm2 flush scc-faturas-hp
```

## 🔧 Melhorias Futuras

- 💾 Migração para banco de dados (MongoDB, PostgreSQL) para alta escala
- 📊 Comandos para listar faturas pendentes
- 📈 Relatórios automáticos de faturas pagas/pendentes
- 🔔 Notificações de faturas vencidas
- 🔐 Sistema de permissões (quem pode marcar como pago)
- 🌐 Dashboard web para visualização
- 📤 Exportar relatórios em Excel/PDF

## 💾 Persistência de Dados

O bot salva automaticamente todas as faturas (abertas e pagas) no arquivo `data/faturas.json`:

- ✅ **Salvamento Automático**: Toda vez que uma fatura é criada ou marcada como paga
- ✅ **Carregamento Automático**: Ao iniciar o bot, todos os dados são restaurados
- ✅ **Backup Manual**: Você pode fazer backup copiando o arquivo `data/faturas.json`
- ✅ **Formato Legível**: Arquivo JSON formatado e fácil de ler

### Estrutura dos Dados

```json
{
  "faturas": [
    {
      "id": "12345",
      "nome": "João Silva",
      "valor": "R$ 1.500,00",
      "mensagemId": "1234567890123456789",
      "paga": false,
      "dataCriacao": "2025-11-13T10:30:00.000Z"
    }
  ],
  "ultimaAtualizacao": "2025-11-13T11:45:00.000Z"
}
```

## ⚠️ Observações Importantes

- **Persistência em JSON**: As faturas são salvas automaticamente em `data/faturas.json`. Faça backups regulares deste arquivo.
- **Token do Bot**: Nunca compartilhe o token do seu bot. Mantenha o arquivo `.env` seguro e fora do controle de versão.
- **Permissões**: Certifique-se de que o bot tem as permissões necessárias nos canais configurados.
- **Diretório de Dados**: O diretório `data/` é criado automaticamente e está no `.gitignore` para não versionar dados sensíveis.

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

