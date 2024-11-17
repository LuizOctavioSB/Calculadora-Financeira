document.addEventListener('DOMContentLoaded', function () {
    const tipoCapitalizacaoSelect = document.getElementById('tipoCapitalizacao');
    const variavelSelect = document.getElementById('variavel');
    const camposEntrada = document.getElementById('campos-entrada');
    const campos = camposEntrada.querySelectorAll('input');
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadoP = document.getElementById('resultado');

    // Objeto para armazenar as opções de variáveis para cada tipo de capitalização
    const opcoesVariaveis = {
        simples: [
            { value: 'efetiva', text: 'Taxa Efetiva' },
            { value: 'nominal', text: 'Taxa Nominal' }
        ],
        composta: [
            { value: 'nominal', text: 'Taxa Nominal' },
            { value: 'proporcional', text: 'Taxa Proporcional' },
            { value: 'equivalente-m-M', text: 'Taxa Equivalente (m para M)' },
            { value: 'equivalente-M-m', text: 'Taxa Equivalente (M para m)' }
        ]
    };

    // Atualiza o select de variáveis conforme o tipo de capitalização
    tipoCapitalizacaoSelect.addEventListener('change', function () {
        const tipo = tipoCapitalizacaoSelect.value;
        variavelSelect.innerHTML = '<option value="" disabled selected>Selecione uma variável</option>';
        if (opcoesVariaveis[tipo]) {
            opcoesVariaveis[tipo].forEach(opcao => {
                const optionElement = document.createElement('option');
                optionElement.value = opcao.value;
                optionElement.text = opcao.text;
                variavelSelect.add(optionElement);
            });
            variavelSelect.classList.remove('hide');
        }
        // Limpa campos e resultado
        limparCampos();
        resultadoP.innerText = '';
        calcularBtn.classList.add('hide');
    });

    // Atualiza os campos de entrada conforme a variável selecionada
    variavelSelect.addEventListener('change', function () {
        const variavel = variavelSelect.value;
        // Esconde todos os campos inicialmente
        campos.forEach(campo => {
            campo.classList.add('hide');
            campo.value = '';
            campo.placeholder = '';
        });
        calcularBtn.classList.remove('hide');
        resultadoP.innerText = '';

        // Define quais campos serão exibidos e seus placeholders
        switch (variavel) {
            // Capitalização Simples
            case 'efetiva':
                campos[0].classList.remove('hide');
                campos[1].classList.remove('hide');
                campos[0].placeholder = 'Taxa Nominal (ic)';
                campos[1].placeholder = 'Tempo (n)';
                break;
            case 'nominal':
                campos[0].classList.remove('hide');
                campos[1].classList.remove('hide');
                campos[0].placeholder = 'Taxa Efetiva (i)';
                campos[1].placeholder = 'Tempo (n)';
                break;
            // Capitalização Composta
            case 'proporcional':
            case 'nominal':
            case 'equivalente-m-M':
            case 'equivalente-M-m':
                campos[0].classList.remove('hide');
                campos[1].classList.remove('hide');
                campos[0].placeholder = 'Taxa (i)';
                campos[1].placeholder = 'Períodos (k)';
                break;
        }
    });

    // Função para limpar campos
    function limparCampos() {
        campos.forEach(campo => {
            campo.classList.add('hide');
            campo.value = '';
            campo.placeholder = '';
        });
        calcularBtn.classList.add('hide');
    }

    // Função para realizar o cálculo
    calcularBtn.addEventListener('click', function () {
        const tipoCapitalizacao = tipoCapitalizacaoSelect.value;
        const variavel = variavelSelect.value;
        const valor1 = parseFloat(campos[0].value);
        const valor2 = parseFloat(campos[1].value);

        let resultado = 0;

        // Validação básica
        if (isNaN(valor1) || isNaN(valor2)) {
            alert('Por favor, preencha todos os campos necessários.');
            return;
        }

        // Cálculos conforme o tipo de capitalização e variável
        if (tipoCapitalizacao === 'simples') {
            switch (variavel) {
                case 'efetiva':
                    resultado = (valor1 / 100) / (1 - (valor1 / 100) * valor2) * 100;
                    break;
                case 'nominal':
                    resultado = (valor1 / 100) / (1 + (valor1 / 100) * valor2) * 100;
                    break;
            }
        } else if (tipoCapitalizacao === 'composta') {
            switch (variavel) {
                case 'nominal':
                    resultado = (valor1 / 100) * valor2 * 100;
                    break;
                case 'proporcional':
                    resultado = (valor1 / 100) / valor2 * 100;
                    break;
                case 'equivalente-m-M':
                    resultado = (Math.pow(1 + (valor1 / 100), valor2) - 1) * 100;
                    break;
                case 'equivalente-M-m':
                    resultado = (Math.pow(1 + (valor1 / 100), 1 / valor2) - 1) * 100;
                    break;
            }
        }

        resultadoP.innerText = 'Taxa: ' + resultado.toFixed(2) + '%';
    });
});
