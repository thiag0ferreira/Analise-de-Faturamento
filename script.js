async function analyzeFaturamento() {
    const response = await fetch('faturamento.json');
    const data = await response.json();

    let totalFaturamento = 0;
    let diasComFaturamento = 0;
    let menorValor = Infinity;
    let maiorValor = -Infinity;
    let diasAcimaMedia = 0;

    // Calcula o menor e maior valor de faturamento, e soma o faturamento total
    data.forEach(dia => {
        if (dia.valor > 0) { // Ignora dias sem faturamento
            totalFaturamento += dia.valor;
            diasComFaturamento++;

            if (dia.valor < menorValor) {
                menorValor = dia.valor;
            }

            if (dia.valor > maiorValor) {
                maiorValor = dia.valor;
            }
        }
    });

    // Calcula a média mensal
    const mediaMensal = totalFaturamento / diasComFaturamento;

    // Conta os dias com faturamento superior à média
    data.forEach(dia => {
        if (dia.valor > mediaMensal) {
            diasAcimaMedia++;
        }
    });

    // Exibe os resultados na página
    document.getElementById('menorValor').textContent = menorValor.toFixed(2);
    document.getElementById('maiorValor').textContent = maiorValor.toFixed(2);
    document.getElementById('diasAcimaMedia').textContent = diasAcimaMedia;
}
