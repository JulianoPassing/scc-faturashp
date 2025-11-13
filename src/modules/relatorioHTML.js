const { converterValorParaNumero, formatarValorBRL } = require('../utils/valorUtils');

/**
 * Módulo para gerar relatórios em HTML
 */

/**
 * Gera um relatório HTML de faturas em aberto
 * @param {Array} faturasAbertas - Array com faturas em aberto
 * @param {Object} servidor - Informações do servidor
 * @returns {string} HTML formatado
 */
function gerarRelatorioFaturasAbertas(faturasAbertas, servidor) {
  const dataGeracao = new Date();
  const dataFormatada = dataGeracao.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calcula total
  const total = faturasAbertas.length;
  const valorTotal = faturasAbertas.reduce((acc, f) => {
    // Usa a função de conversão que entende "k"
    return acc + converterValorParaNumero(f.valor);
  }, 0);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Faturas em Aberto - HP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: #36393f;
            min-height: 100vh;
            padding: 0;
            margin: 0;
        }

        .container {
            max-width: 100%;
            margin: 0;
            background: #36393f;
            box-shadow: none;
        }

        .header {
            background: #202225;
            padding: 24px 32px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .logo {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #5865f2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
        }

        .header-content {
            flex: 1;
        }

        .header h1 {
            font-size: 20px;
            margin: 0 0 4px 0;
            font-weight: 600;
            color: #ffffff;
        }

        .header p {
            font-size: 14px;
            margin: 0;
            color: #b9bbbe;
        }

        .stats {
            display: flex;
            gap: 16px;
            padding: 16px 32px;
            background: #2f3136;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            flex-wrap: wrap;
        }

        .stat-card {
            background: #202225;
            padding: 16px 20px;
            border-radius: 4px;
            flex: 1;
            min-width: 200px;
            border: none;
        }

        .stat-card h3 {
            color: #72767d;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .stat-card p {
            color: #dcddde;
            font-size: 20px;
            font-weight: 600;
        }

        .content {
            padding: 16px 32px 32px;
        }

        .fatura-card {
            background: #2f3136;
            border-left: 4px solid #3ba55c;
            border-radius: 4px;
            padding: 16px;
            margin-bottom: 8px;
            transition: background 0.15s ease;
        }

        .fatura-card:hover {
            background: #32353b;
        }

        .fatura-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            flex-wrap: wrap;
            gap: 8px;
        }

        .fatura-title {
            color: #dcddde;
            font-size: 16px;
            font-weight: 500;
        }

        .fatura-badge {
            background: #3ba55c;
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .fatura-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .detail-item {
            background: #202225;
            padding: 12px;
            border-radius: 3px;
        }

        .detail-label {
            color: #72767d;
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .detail-value {
            color: #dcddde;
            font-size: 14px;
            font-weight: 500;
        }

        .footer {
            background: #2f3136;
            padding: 16px 32px;
            text-align: center;
            color: #72767d;
            font-size: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .empty-state {
            text-align: center;
            padding: 80px 32px;
            color: #72767d;
        }

        .empty-state h2 {
            font-size: 20px;
            margin-bottom: 8px;
            color: #dcddde;
            font-weight: 500;
        }

        .empty-state p {
            font-size: 14px;
            color: #b9bbbe;
        }

        .icon {
            font-size: 64px;
            margin-bottom: 16px;
            opacity: 0.3;
        }

        @media print {
            body {
                background: #36393f;
            }
            
            .fatura-card:hover {
                background: #2f3136;
            }
        }

        @media (max-width: 768px) {
            .header {
                padding: 16px;
            }

            .stats {
                padding: 16px;
                flex-direction: column;
            }

            .content {
                padding: 16px;
            }

            .fatura-details {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💰</div>
            <div class="header-content">
                <h1>Relatório de Faturas em Aberto</h1>
                <p>Sistema HP • Gerado em: ${dataFormatada}</p>
            </div>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3>📋 Faturas em Aberto</h3>
                <p>${total}</p>
            </div>
            <div class="stat-card">
                <h3>💵 Valor Total</h3>
                <p>${formatarValorBRL(valorTotal)}</p>
            </div>
            <div class="stat-card">
                <h3>🏢 Servidor</h3>
                <p>${servidor.nome || 'Discord'}</p>
            </div>
        </div>

        <div class="content">
            ${total === 0 ? `
            <div class="empty-state">
                <div class="icon">✅</div>
                <h2>Nenhuma Fatura em Aberto</h2>
                <p>Todas as faturas foram pagas! Parabéns!</p>
            </div>
            ` : faturasAbertas.map((fatura, index) => {
                const dataCriacao = fatura.dataCriacao ? new Date(fatura.dataCriacao).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }) : 'N/A';

                return `
            <div class="fatura-card">
                <div class="fatura-header">
                    <div class="fatura-title">📄 Fatura #${index + 1}</div>
                    <div class="fatura-badge">EM ABERTO</div>
                </div>
                <div class="fatura-details">
                    <div class="detail-item">
                        <div class="detail-label">👤 Cliente</div>
                        <div class="detail-value">${fatura.nome}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">🆔 ID</div>
                        <div class="detail-value">${fatura.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">💵 Valor</div>
                        <div class="detail-value">${fatura.valor}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">📅 Data de Criação</div>
                        <div class="detail-value">${dataCriacao}</div>
                    </div>
                </div>
            </div>
                `;
            }).join('')}
        </div>

        <div class="footer">
            <p>Sistema de Faturas HP • Gerado automaticamente © ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>`;

  return html;
}

module.exports = {
  gerarRelatorioFaturasAbertas
};

