# 💾 Instruções: Persistência de Dados

## 📊 Como funciona

O bot salva automaticamente todas as faturas em um arquivo JSON localizado em `data/faturas.json`. Isso garante que os dados não sejam perdidos quando o bot for reiniciado.

## ✅ Funcionalidades

### Salvamento Automático
- ✅ Quando uma nova fatura é registrada
- ✅ Quando uma fatura é marcada como paga
- ✅ Quando uma fatura é removida

### Carregamento Automático
- ✅ Ao iniciar o bot, todos os dados são restaurados automaticamente
- ✅ Exibe estatísticas no console (total, abertas, pagas)

## 📁 Estrutura do Arquivo JSON

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
    },
    {
      "id": "67890",
      "nome": "Maria Santos",
      "valor": "R$ 2.350,00",
      "mensagemId": "9876543210987654321",
      "paga": true,
      "usuarioPagou": "<@123456789>",
      "dataPagamento": "2025-11-13T11:45:00.000Z",
      "dataCriacao": "2025-11-13T10:00:00.000Z"
    }
  ],
  "ultimaAtualizacao": "2025-11-13T11:45:00.000Z"
}
```

## 🔍 Campos Explicados

### Fatura em Aberto
- `id`: ID único da fatura
- `nome`: Nome do cliente
- `valor`: Valor da fatura
- `mensagemId`: ID da mensagem no Discord
- `paga`: false (não paga)
- `dataCriacao`: Data/hora de criação

### Fatura Paga
- Todos os campos acima, mais:
- `paga`: true (paga)
- `usuarioPagou`: Mention do usuário que marcou como paga
- `dataPagamento`: Data/hora do pagamento

## 💡 Dicas de Uso

### Fazer Backup
```bash
# Copiar arquivo de dados
cp data/faturas.json data/faturas_backup_$(date +%Y%m%d).json

# No Windows PowerShell
Copy-Item data\faturas.json -Destination "data\faturas_backup_$(Get-Date -Format 'yyyyMMdd').json"
```

### Restaurar Backup
```bash
# Restaurar de um backup específico
cp data/faturas_backup_20251113.json data/faturas.json

# No Windows PowerShell
Copy-Item data\faturas_backup_20251113.json -Destination data\faturas.json
```

### Limpar Dados (Começar do Zero)
```bash
# Remover arquivo de dados
rm data/faturas.json

# No Windows PowerShell
Remove-Item data\faturas.json
```

Após remover, o bot criará um novo arquivo vazio na próxima execução.

## 📊 Logs no Console

Ao iniciar o bot, você verá:

```
═══════════════════════════════════════
🔄 Carregando dados...
✅ Dados carregados com sucesso!
   📊 Total: 15 faturas
   📋 Em aberto: 8
   ✅ Pagas: 7
═══════════════════════════════════════
```

Quando uma fatura é salva ou atualizada:

```
💾 Dados salvos: 16 faturas
```

## ⚠️ Importante

- O arquivo `data/faturas.json` está no `.gitignore` e **não será versionado** no Git
- Faça backups regulares do arquivo de dados
- O diretório `data/` é criado automaticamente se não existir
- Se o arquivo JSON estiver corrompido, o bot iniciará com dados vazios

## 🔧 Resolução de Problemas

### "Erro ao carregar dados"
- Verifique se o arquivo JSON está bem formatado
- Tente validar o JSON em https://jsonlint.com/
- Se necessário, delete o arquivo e deixe o bot criar um novo

### "Erro ao salvar dados"
- Verifique se o bot tem permissão de escrita no diretório `data/`
- Verifique se há espaço em disco disponível

### Dados não estão sendo salvos
- Verifique os logs do bot para erros
- Confirme que o diretório `data/` existe e tem permissões corretas

