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
    // Tenta extrair número do valor (remove R$, pontos e vírgulas)
    const valorNumerico = f.valor.replace(/[^\d,]/g, '').replace(',', '.');
    return acc + (parseFloat(valorNumerico) || 0);
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #2f3136;
            border-radius: 8px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(90deg, #5865f2 0%, #4752c4 100%);
            padding: 30px;
            color: white;
            text-align: center;
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .header p {
            font-size: 16px;
            opacity: 0.9;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #36393f;
        }

        .stat-card {
            background: #40444b;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #5865f2;
        }

        .stat-card h3 {
            color: #b9bbbe;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .stat-card p {
            color: white;
            font-size: 24px;
            font-weight: 700;
        }

        .content {
            padding: 30px;
        }

        .fatura-card {
            background: #40444b;
            border-left: 4px solid #3ba55d;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .fatura-card:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .fatura-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .fatura-title {
            color: white;
            font-size: 20px;
            font-weight: 600;
        }

        .fatura-badge {
            background: #3ba55d;
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
        }

        .fatura-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .detail-item {
            background: #2f3136;
            padding: 12px;
            border-radius: 4px;
        }

        .detail-label {
            color: #b9bbbe;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 4px;
            text-transform: uppercase;
        }

        .detail-value {
            color: white;
            font-size: 16px;
            font-weight: 600;
        }

        .footer {
            background: #36393f;
            padding: 20px 30px;
            text-align: center;
            color: #b9bbbe;
            font-size: 14px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 30px;
            color: #b9bbbe;
        }

        .empty-state h2 {
            font-size: 24px;
            margin-bottom: 10px;
            color: white;
        }

        .empty-state p {
            font-size: 16px;
        }

        .icon {
            font-size: 48px;
            margin-bottom: 20px;
        }

        @media print {
            body {
                background: white;
            }
            
            .container {
                box-shadow: none;
            }
            
            .fatura-card:hover {
                transform: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Relatório de Faturas em Aberto</h1>
            <p>Sistema de Gerenciamento de Faturas HP</p>
            <p>📅 Gerado em: ${dataFormatada}</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3>📋 Total de Faturas</h3>
                <p>${total}</p>
            </div>
            <div class="stat-card">
                <h3>💵 Valor Total</h3>
                <p>R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div class="stat-card">
                <h3>🏢 Servidor</h3>
                <p>${servidor.nome || 'N/A'}</p>
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
            <p>🤖 Sistema de Faturas HP | Gerado automaticamente</p>
            <p>© ${new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>
    </div>
</body>
</html>`;

  return html;
}

module.exports = {
  gerarRelatorioFaturasAbertas
};

