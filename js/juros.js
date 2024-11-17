document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o menu de tipos de cálculo
    const tipoCalculoSelect = document.getElementById('tipoCalculo');
    const sections = document.querySelectorAll('.calc-section');

    // Alterna entre as seções conforme o tipo de cálculo selecionado
    tipoCalculoSelect.addEventListener('change', function () {
        const selectedValue = tipoCalculoSelect.value;

        // Esconde todas as seções
        sections.forEach(section => section.classList.add('hide'));

        // Mostra a seção correspondente
        const selectedSection = document.getElementById(`div${selectedValue}`);
        if (selectedSection) {
            selectedSection.classList.remove('hide');
        }
    });

    // Funções de cálculo específicas para cada tipo
    document.getElementById('calcularJurosBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpJuros').value);
        const i = parseFloat(document.getElementById('iJuros').value);
        const n = parseFloat(document.getElementById('nJuros').value);

        if (isNaN(vp) || isNaN(i) || isNaN(n)) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const juros = vp * (i / 100) * n;
        document.getElementById('resultadoJuros').innerText = `Juros: ${juros.toFixed(2)}`;
    });

    document.getElementById('calcularValorFuturoBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpValorFuturo').value);
        const i = parseFloat(document.getElementById('iValorFuturo').value);
        const n = parseFloat(document.getElementById('nValorFuturo').value);

        if (isNaN(vp) || isNaN(i) || isNaN(n)) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const vf = vp * (1 + (i / 100) * n);
        document.getElementById('resultadoValorFuturo').innerText = `Valor Futuro: ${vf.toFixed(2)}`;
    });

    document.getElementById('calcularValorPresenteBtn').addEventListener('click', function () {
        const vf = parseFloat(document.getElementById('vfValorPresente').value);
        const i = parseFloat(document.getElementById('iValorPresente').value);
        const n = parseFloat(document.getElementById('nValorPresente').value);

        if (isNaN(vf) || isNaN(i) || isNaN(n)) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const vp = vf / (1 + (i / 100) * n);
        document.getElementById('resultadoValorPresente').innerText = `Valor Presente: ${vp.toFixed(2)}`;
    });

    document.getElementById('calcularTaxaBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpTaxa').value);
        const vf = parseFloat(document.getElementById('vfTaxa').value);
        const n = parseFloat(document.getElementById('nTaxa').value);

        if (isNaN(vp) || isNaN(vf) || isNaN(n)) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const i = ((vf - vp) / (vp * n)) * 100;
        document.getElementById('resultadoTaxa').innerText = `Taxa: ${i.toFixed(2)}%`;
    });

    document.getElementById('calcularTempoBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpTempo').value);
        const vf = parseFloat(document.getElementById('vfTempo').value);
        const i = parseFloat(document.getElementById('iTempo').value);

        if (isNaN(vp) || isNaN(vf) || isNaN(i) || i === 0) {
            alert('Preencha todos os campos corretamente e certifique-se de que a taxa de juros não seja zero.');
            return;
        }

        const n = (vf - vp) / (vp * (i / 100));
        document.getElementById('resultadoTempo').innerText = `Tempo: ${n.toFixed(2)} meses`;
    });

    document.getElementById('calcularJurosCompostosBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpJurosCompostos').value);
        const i = parseFloat(document.getElementById('iJurosCompostos').value);
        const n = parseFloat(document.getElementById('nJurosCompostos').value);

        if (isNaN(vp) || isNaN(i) || isNaN(n)) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const vf = vp * Math.pow(1 + (i / 100), n);
        document.getElementById('resultadoJurosCompostos').innerText = `Valor Futuro: ${vf.toFixed(2)}`;
    });

    // Funções de cálculo para Taxa Composta, Tempo Composto e Valor Presente Composto
    document.getElementById('calcularTaxaCompostaBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpTaxaComposta').value);
        const vf = parseFloat(document.getElementById('vfTaxaComposta').value);
        const n = parseFloat(document.getElementById('nTaxaComposta').value);

        if (isNaN(vp) || isNaN(vf) || isNaN(n) || n <= 0) {
            alert('Por favor, insira valores válidos para Capital, Valor Futuro e Tempo.');
            return;
        }

        const taxa = Math.pow(vf / vp, 1 / n) - 1;
        document.getElementById('resultadoTaxaComposta').innerText = `Taxa Composta: ${(taxa * 100).toFixed(2)}%`;
    });

    document.getElementById('calcularTempoCompostaBtn').addEventListener('click', function () {
        const vp = parseFloat(document.getElementById('vpTempoComposta').value);
        const vf = parseFloat(document.getElementById('vfTempoComposta').value);
        const i = parseFloat(document.getElementById('iTempoComposta').value);

        if (isNaN(vp) || isNaN(vf) || isNaN(i) || i <= 0) {
            alert('Por favor, insira valores válidos para Capital, Valor Futuro e Taxa de Juros.');
            return;
        }

        const tempo = Math.log(vf / vp) / Math.log(1 + i / 100);
        document.getElementById('resultadoTempoComposta').innerText = `Tempo Composto: ${tempo.toFixed(2)} períodos`;
    });

    document.getElementById('calcularValorPresenteCompostaBtn').addEventListener('click', function () {
        const vf = parseFloat(document.getElementById('vfValorPresenteComposta').value);
        const i = parseFloat(document.getElementById('iValorPresenteComposta').value);
        const n = parseFloat(document.getElementById('nValorPresenteComposta').value);

        if (isNaN(vf) || isNaN(i) || isNaN(n)) {
            alert('Por favor, insira valores válidos para Valor Futuro, Taxa de Juros e Tempo.');
            return;
        }

        const vp = vf / Math.pow(1 + i / 100, n);
        document.getElementById('resultadoValorPresenteComposta').innerText = `Valor Presente Composto: ${vp.toFixed(2)}`;
    });
});
