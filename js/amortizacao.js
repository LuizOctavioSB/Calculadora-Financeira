document.addEventListener('DOMContentLoaded', function () {
    const selectVariavel = document.getElementById('variavel');
    const campos = document.querySelectorAll('#valor1, #valor2, #valor3, #valor4');
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadoP = document.getElementById('resultado');

    // Atualiza os campos de entrada conforme a variável selecionada
    selectVariavel.addEventListener('change', function () {
        const variavelSelecionada = selectVariavel.value;

        // Esconde todos os campos e limpa os valores
        campos.forEach(campo => {
            campo.classList.add('hide');
            campo.value = '';
            campo.placeholder = '';
        });
        calcularBtn.classList.remove('hide');
        resultadoP.innerText = '';

        // Exibe os campos necessários e define os placeholders
        switch (variavelSelecionada) {
            case 'amortizacao':
                campos[0].classList.remove('hide');
                campos[0].placeholder = 'Valor Presente (VP)';
                campos[1].classList.remove('hide');
                campos[1].placeholder = 'Tempo (n)';
                break;
            case 'juros':
                campos[0].classList.remove('hide');
                campos[0].placeholder = 'Valor Presente (VP)';
                campos[1].classList.remove('hide');
                campos[1].placeholder = 'Taxa de Juros (i)';
                campos[2].classList.remove('hide');
                campos[2].placeholder = 'Tempo (n)';
                campos[3].classList.remove('hide');
                campos[3].placeholder = 'Período Atual (t)';
                break;
            case 'saldo_devedor':
                campos[0].classList.remove('hide');
                campos[0].placeholder = 'Valor Presente (VP)';
                campos[1].classList.remove('hide');
                campos[1].placeholder = 'Tempo (n)';
                campos[2].classList.remove('hide');
                campos[2].placeholder = 'Período Atual (t)';
                break;
            case 'pmt':
                campos[0].classList.remove('hide');
                campos[0].placeholder = 'Valor Presente (VP)';
                campos[1].classList.remove('hide');
                campos[1].placeholder = 'Taxa de Juros (i)';
                campos[2].classList.remove('hide');
                campos[2].placeholder = 'Tempo (n)';
                campos[3].classList.remove('hide');
                campos[3].placeholder = 'Período Atual (t)';
                break;
        }
    });

    // Função para realizar o cálculo
    calcularBtn.addEventListener('click', function () {
        const variavelSelecionada = selectVariavel.value;
        const valor1 = parseFloat(document.getElementById('valor1').value);
        const valor2 = parseFloat(document.getElementById('valor2').value);
        const valor3 = parseFloat(document.getElementById('valor3').value);
        const valor4 = parseFloat(document.getElementById('valor4').value);

        let resultado;

        // Realiza o cálculo conforme a variável selecionada
        switch (variavelSelecionada) {
            case 'amortizacao':
                if (isNaN(valor1) || isNaN(valor2)) {
                    alert('Por favor, preencha todos os campos necessários.');
                    return;
                }
                resultado = valor1 / valor2; // Amortização = VP / n
                break;
            case 'juros':
                if (isNaN(valor1) || isNaN(valor2) || isNaN(valor3) || isNaN(valor4) || valor4 < 1 || valor4 > valor3) {
                    alert('Preencha todos os campos corretamente e certifique-se de que o período atual (t) esteja no intervalo válido.');
                    return;
                }
                const amortizacao = valor1 / valor3;
                resultado = amortizacao * (valor3 - valor4 + 1) * (valor2 / 100); // Juros = amortização * (n - t + 1) * i
                break;
            case 'saldo_devedor':
                if (isNaN(valor1) || isNaN(valor2) || isNaN(valor3)) {
                    alert('Por favor, preencha todos os campos necessários.');
                    return;
                }
                const amortizacaoSD = valor1 / valor2;
                resultado = valor1 - (amortizacaoSD * valor3); // Saldo Devedor = VP - (amortização * t)
                break;
            case 'pmt':
                if (isNaN(valor1) || isNaN(valor2) || isNaN(valor3) || isNaN(valor4) || valor4 < 1 || valor4 > valor3) {
                    alert('Preencha todos os campos corretamente e certifique-se de que o período atual (t) esteja no intervalo válido.');
                    return;
                }
                const amortizacaoPMT = valor1 / valor3;
                resultado = amortizacaoPMT * (1 + (valor3 - valor4 + 1) * (valor2 / 100)); // PMT = amortização * (1 + (n - t + 1) * i)
                break;
            default:
                alert('Selecione uma variável para calcular.');
                return;
        }

        // Exibe o resultado
        resultadoP.innerText = `Resultado: ${resultado.toFixed(2)}`;
    });
});
