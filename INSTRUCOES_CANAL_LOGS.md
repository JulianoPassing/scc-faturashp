# 📝 Instruções: Configurar Canal de Logs

Para ativar o sistema de logs de pagamentos, você precisa adicionar uma variável no arquivo `.env`.

## 🔧 Configuração

Abra o arquivo `.env` na raiz do projeto e adicione a seguinte linha:

```env
CANAL_LOGS=1438520411943080016
```

## 📋 Arquivo .env completo

Seu arquivo `.env` deve ficar assim:

```env
# Token do bot Discord
DISCORD_TOKEN=seu_token_aqui

# IDs dos canais
CANAL_ORIGEM=1435656885607993394
CANAL_DESTINO=1438517282669334568
SERVIDOR_ID=1152027035284295740

# Canal de logs (opcional)
CANAL_LOGS=1438520411943080016
```

## ✅ Aplicar as mudanças

Após adicionar a variável, reinicie o bot:

```bash
npm run pm2:restart
```

## 📊 O que faz?

Quando alguém clicar no botão "✅ Pago", o bot enviará automaticamente um embed de log no canal configurado com:

- 👤 Nome do cliente
- 🆔 ID da fatura
- 💵 Valor
- ✅ Quem marcou como pago (com avatar e tag)
- ⏰ Timestamp da ação

## ⚠️ Observação

O canal de logs é **opcional**. Se não for configurado, o bot continuará funcionando normalmente, apenas não enviará os logs.

