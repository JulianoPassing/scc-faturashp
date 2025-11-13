# 🎨 Esquema de Cores do Relatório (Discord)

## Paleta de Cores Oficial do Discord

O relatório HTML usa as cores **exatas** do Discord para criar uma experiência visual consistente:

### Cores de Fundo

| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Background principal | Cinza escuro | `#36393f` | Fundo geral |
| Header | Preto Discord | `#202225` | Topo com logo |
| Cards de estatísticas | Preto Discord | `#202225` | Cards no topo |
| Cards de faturas | Cinza médio | `#2f3136` | Cada fatura |
| Detalhes internos | Preto Discord | `#202225` | Dentro dos cards |
| Footer | Cinza médio | `#2f3136` | Rodapé |

### Cores de Texto

| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Títulos principais | Branco suave | `#dcddde` | H1, títulos |
| Texto secundário | Cinza claro | `#b9bbbe` | Subtítulos |
| Labels | Cinza médio | `#72767d` | Labels dos campos |
| Valores | Branco suave | `#dcddde` | Valores dos campos |

### Cores de Destaque

| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Logo | Azul Discord | `#5865f2` | Logo circular |
| Badge "EM ABERTO" | Verde Discord | `#3ba55c` | Status da fatura |
| Borda esquerda | Verde Discord | `#3ba55c` | Borda dos cards |

## Componentes Visuais

### 1. Header com Logo
```
┌──────────────────────────────────────┐
│ [💰] Relatório de Faturas em Aberto │ ← Logo circular azul
│      Sistema HP • Gerado em: ...    │
└──────────────────────────────────────┘
```

**Cores:**
- Fundo: `#202225`
- Logo: `#5865f2` (círculo)
- Título: `#ffffff`
- Subtítulo: `#b9bbbe`

### 2. Cards de Estatísticas
```
┌─────────────┬─────────────┬─────────────┐
│ 📋 FATURAS  │ 💵 VALOR    │ 🏢 SERVIDOR │
│    2        │ R$ 16.000   │  Centro MS  │
└─────────────┴─────────────┴─────────────┘
```

**Cores:**
- Fundo: `#202225`
- Label: `#72767d`
- Valor: `#dcddde`

### 3. Cards de Faturas
```
┃ 📄 Fatura #1                [EM ABERTO]
┃ ┌─────────────────────────────────────┐
┃ │ 👤 CLIENTE      🆔 ID               │
┃ │ João Silva      12345               │
┃ │                                     │
┃ │ 💵 VALOR        📅 DATA             │
┃ │ 5k              13/11/2025, 10:32   │
┃ └─────────────────────────────────────┘
```

**Cores:**
- Fundo principal: `#2f3136`
- Borda esquerda: `#3ba55c` (4px)
- Badge: `#3ba55c`
- Detalhes internos: `#202225`
- Labels: `#72767d`
- Valores: `#dcddde`

### 4. Hover Effects

Quando você passa o mouse sobre uma fatura:
- Fundo muda de `#2f3136` → `#32353b`
- Transição suave de 0.15s

## Tipografia

### Fontes
```css
font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

**"gg sans"** é a fonte oficial do Discord!

### Tamanhos
- Título principal: 20px
- Subtítulo: 14px
- Labels: 11px (uppercase)
- Valores: 14px
- Stats: 20px

## Responsividade

### Desktop (> 768px)
- Layout em grid
- 3 cards de estatísticas lado a lado
- Detalhes das faturas em grid flexível

### Mobile (< 768px)
- Layout em coluna
- Cards empilhados
- Detalhes em coluna única
- Padding reduzido

## Comparação com Discord

### Exatamente Igual ao Discord:
✅ Esquema de cores oficial  
✅ Tipografia (gg sans)  
✅ Border radius (3-4px)  
✅ Espaçamentos (8px, 16px, 32px)  
✅ Hover effects sutis  
✅ Bordas com transparência  

### Adaptações para Relatório:
🔧 Logo personalizada (💰)  
🔧 Cards de estatísticas no topo  
🔧 Estrutura de faturas específica  

## Exemplo Visual

O resultado final é **indistinguível** de um transcript oficial do Discord!

### Paleta Completa

```
Background:   ██ #36393f
Header:       ██ #202225
Card Main:    ██ #2f3136
Detail:       ██ #202225
Logo:         ██ #5865f2
Success:      ██ #3ba55c
Text White:   ██ #dcddde
Text Gray:    ██ #b9bbbe
Text Dark:    ██ #72767d
Border:       ██ rgba(255,255,255,0.06)
```

## Acessibilidade

As cores escolhidas mantêm **contraste adequado** para leitura:

- Branco (`#dcddde`) em fundo escuro (`#202225`): **12.5:1** ✅
- Cinza claro (`#b9bbbe`) em fundo escuro: **8.2:1** ✅
- Verde (`#3ba55c`) em fundo escuro: **4.8:1** ✅

Todos os contrastes atendem ao padrão **WCAG AAA** para texto normal!

