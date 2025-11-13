# 💵 Exemplos de Valores com "k"

## O que é o formato "k"?

O sistema entende valores com "k" (kilo = mil) para facilitar a digitação de valores grandes.

## Conversões

| Valor digitado | Valor real | Formatado |
|----------------|------------|-----------|
| 1k | R$ 1.000,00 | Mil reais |
| 2k | R$ 2.000,00 | Dois mil reais |
| 2.5k | R$ 2.500,00 | Dois mil e quinhentos |
| 3.5k | R$ 3.500,00 | Três mil e quinhentos |
| 5k | R$ 5.000,00 | Cinco mil reais |
| 10k | R$ 10.000,00 | Dez mil reais |
| 15.5k | R$ 15.500,00 | Quinze mil e quinhentos |
| 20k | R$ 20.000,00 | Vinte mil reais |
| 100k | R$ 100.000,00 | Cem mil reais |

## Exemplos de Uso

### Exemplo 1: Valor simples
```
Nome: João Silva
ID: 001
Valor: 1k
```
**Resultado:** Fatura de R$ 1.000,00

### Exemplo 2: Valor decimal
```
Nome: Maria Santos
ID: 002
Valor: 2.5k
```
**Resultado:** Fatura de R$ 2.500,00

### Exemplo 3: Valor grande
```
Nome: Pedro Costa
ID: 003
Valor: 15k
```
**Resultado:** Fatura de R$ 15.000,00

### Exemplo 4: Com vírgula
```
Nome: Ana Lima
ID: 004
Valor: 3,5k
```
**Resultado:** Fatura de R$ 3.500,00

### Exemplo 5: Ainda funciona com formato completo
```
Nome: Carlos Souza
ID: 005
Valor: R$ 1.500,00
```
**Resultado:** Fatura de R$ 1.500,00

## Formatos Aceitos

✅ **Aceitos:**
- `1k`
- `2.5k`
- `10k`
- `3,5k` (vírgula como decimal)
- `R$ 5k`
- `5K` (maiúsculo também funciona)
- `R$ 1.500,00` (formato tradicional)
- `1500` (apenas números)

❌ **Não aceitos:**
- `1.5.k` (múltiplos pontos)
- `abc` (letras sem números)
- `` (vazio)

## No Relatório

Quando você gerar um relatório com `!relatorio-faturas`, o sistema:

1. **Soma corretamente:** Se você tem 3 faturas de `1k`, `2k` e `5k`, o total será `R$ 8.000,00`
2. **Mostra valores originais:** Cada fatura mostra o valor como foi digitado
3. **Calcula total:** O card "Valor Total" mostra a soma correta de todas as faturas

## Dicas

💡 **Use "k" para valores redondos:**
- `1k` é mais rápido que digitar `R$ 1.000,00`
- `10k` é mais fácil que `R$ 10.000,00`

💡 **Use formato completo para valores específicos:**
- `R$ 1.234,56` quando o valor não é redondo

💡 **Consistência:**
- Você pode misturar formatos! Use o que for mais conveniente para cada fatura

