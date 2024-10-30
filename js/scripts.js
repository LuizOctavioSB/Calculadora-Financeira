(function() {
    'use strict';

    // -------------------- Exibir a seção correspondente ao tipo de cálculo selecionado -------------------- //
    function exibirSecao(tipoCalculoId) {
        const selectElement = document.getElementById(tipoCalculoId);
        if (selectElement) {
            selectElement.addEventListener("change", function() {
                const sections = document.querySelectorAll('.calc-section');
                sections.forEach(section => section.classList.add('hide'));

                const selectedValue = this.value;
                if (selectedValue) {
                    const divToShow = document.getElementById('div' + selectedValue);
                    if (divToShow) {
                        divToShow.classList.remove('hide');
                    }
                }
            });
        }
    }

    // -------------------- Inicializar a exibição das seções de cálculo -------------------- //
    exibirSecao("tipoCalculo");

    // -------------------- Adicionando eventos de clique aos botões -------------------- //
    function addClickListener(buttonId, handler) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", handler);
        }
    }

    // -------------------- Cálculo de Juros Compostos -------------------- //
    function calcularJurosCompostos() {
        const vp = parseFloat(document.getElementById("vpJurosCompostos").value);
        const iAnual = parseFloat(document.getElementById("iJurosCompostos").value) / 100;
        const nMeses = parseFloat(document.getElementById("nJurosCompostos").value);

        if (isNaN(vp) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoJurosCompostos").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = Math.pow(1 + iAnual, 1) - 1;
        const vf = vp * Math.pow((1 + iMensal), nMeses);
        document.getElementById("resultadoJurosCompostos").textContent = `Valor Futuro (VF): ${vf.toFixed(2)}`;
    }

    addClickListener("calcularJurosCompostosBtn", calcularJurosCompostos);

    // -------------------- Cálculo da Taxa Composta -------------------- //
    function calcularTaxaComposta() {
        const vp = parseFloat(document.getElementById("vpTaxaComposta").value);
        const vf = parseFloat(document.getElementById("vfTaxaComposta").value);
        const nMeses = parseFloat(document.getElementById("nTaxaComposta").value);

        if (isNaN(vp) || isNaN(vf) || isNaN(nMeses) || vp <= 0 || vf <= 0 || nMeses <= 0) {
            document.getElementById("resultadoTaxaComposta").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = Math.pow(vf / vp, 1 / nMeses) - 1;
        const iAnual = Math.pow(1 + iMensal, 12) - 1;
        document.getElementById("resultadoTaxaComposta").innerHTML = `
            Taxa Mensal: ${(iMensal * 100).toFixed(4)}%<br>
            Taxa Anual: ${(iAnual * 100).toFixed(4)}%
        `;
    }

    addClickListener("calcularTaxaCompostaBtn", calcularTaxaComposta);

    // -------------------- Cálculo do Tempo Composto -------------------- //
    function calcularTempoComposto() {
        const vp = parseFloat(document.getElementById("vpTempoComposta").value);
        const vf = parseFloat(document.getElementById("vfTempoComposta").value);
        const iAnual = parseFloat(document.getElementById("iTempoComposta").value) / 100;

        if (isNaN(vp) || isNaN(vf) || isNaN(iAnual) || vp <= 0 || vf <= 0 || iAnual <= 0) {
            document.getElementById("resultadoTempoComposta").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = Math.pow(1 + iAnual, 1) - 1;
        const nMeses = Math.log(vf / vp) / Math.log(1 + iMensal);
        document.getElementById("resultadoTempoComposta").textContent = `Tempo: ${nMeses.toFixed(2)} meses`;
    }

    addClickListener("calcularTempoCompostaBtn", calcularTempoComposto);

    // -------------------- Valor Presente Composto -------------------- //
    function calcularValorPresenteComposto() {
        const vf = parseFloat(document.getElementById("vfValorPresenteComposta").value);
        const iAnual = parseFloat(document.getElementById("iValorPresenteComposta").value) / 100;
        const nMeses = parseFloat(document.getElementById("nValorPresenteComposta").value);

        if (isNaN(vf) || isNaN(iAnual) || isNaN(nMeses) || vf <= 0 || iAnual <= 0 || nMeses <= 0) {
            document.getElementById("resultadoValorPresenteComposta").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = Math.pow(1 + iAnual, 1) - 1;
        const vp = vf / Math.pow(1 + iMensal, nMeses);
        document.getElementById("resultadoValorPresenteComposta").textContent = `Valor Presente: ${vp.toFixed(2)}`;
    }

    addClickListener("calcularValorPresenteCompostaBtn", calcularValorPresenteComposto);

    // -------------------- Cálculo de Juros Simples -------------------- //
    function calcularJuros() {
        const vp = parseFloat(document.getElementById("vpJuros").value);
        const iAnual = parseFloat(document.getElementById("iJuros").value) / 100;
        const nMeses = parseFloat(document.getElementById("nJuros").value);

        if (isNaN(vp) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoJuros").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const juros = vp * iAnual * (nMeses / 12);
        document.getElementById("resultadoJuros").textContent = `Juros: ${juros.toFixed(2)}`;
    }

    addClickListener("calcularJurosBtn", calcularJuros);

    // -------------------- Valor Futuro Simples -------------------- //
    function calcularValorFuturo() {
        const vp = parseFloat(document.getElementById("vpValorFuturo").value);
        const iAnual = parseFloat(document.getElementById("iValorFuturo").value) / 100;
        const nMeses = parseFloat(document.getElementById("nValorFuturo").value);

        if (isNaN(vp) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoValorFuturo").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const vf = vp * (1 + iAnual * (nMeses / 12));
        document.getElementById("resultadoValorFuturo").textContent = `Valor Futuro: ${vf.toFixed(2)}`;
    }

    addClickListener("calcularValorFuturoBtn", calcularValorFuturo);

    // -------------------- Valor Presente Simples -------------------- //
    function calcularValorPresente() {
        const vf = parseFloat(document.getElementById("vfValorPresente").value);
        const iAnual = parseFloat(document.getElementById("iValorPresente").value) / 100;
        const nMeses = parseFloat(document.getElementById("nValorPresente").value);

        if (isNaN(vf) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoValorPresente").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const vp = vf / (1 + iAnual * (nMeses / 12));
        document.getElementById("resultadoValorPresente").textContent = `Valor Presente: ${vp.toFixed(2)}`;
    }

    addClickListener("calcularValorPresenteBtn", calcularValorPresente);

    // -------------------- Cálculo da Taxa Simples -------------------- //
    function calcularTaxa() {
        const vp = parseFloat(document.getElementById("vpTaxa").value);
        const vf = parseFloat(document.getElementById("vfTaxa").value);
        const nMeses = parseFloat(document.getElementById("nTaxa").value);

        if (isNaN(vp) || isNaN(vf) || isNaN(nMeses)) {
            document.getElementById("resultadoTaxa").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iAnual = ((vf - vp) / (vp * (nMeses / 12))) * 100;
        document.getElementById("resultadoTaxa").textContent = `Taxa Anual: ${iAnual.toFixed(2)}%`;
    }

    addClickListener("calcularTaxaBtn", calcularTaxa);

    // -------------------- Cálculo do Tempo Simples -------------------- //
    function calcularTempo() {
        const vp = parseFloat(document.getElementById("vpTempo").value);
        const vf = parseFloat(document.getElementById("vfTempo").value);
        const iAnual = parseFloat(document.getElementById("iTempo").value) / 100;

        if (isNaN(vp) || isNaN(vf) || isNaN(iAnual)) {
            document.getElementById("resultadoTempo").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const nMeses = ((vf - vp) / (vp * iAnual)) * 12;
        document.getElementById("resultadoTempo").textContent = `Tempo: ${nMeses.toFixed(2)} meses`;
    }

    addClickListener("calcularTempoBtn", calcularTempo);

    // -------------------- Cálculo da Taxa Efetiva -------------------- //
    function calcularTaxaEfetiva() {
        const iNominal = parseFloat(document.getElementById("icEfetiva").value) / 100;
        const k = parseFloat(document.getElementById("nEfetiva").value);

        if (isNaN(iNominal) || isNaN(k) || k <= 0) {
            document.getElementById("resultadoEfetiva").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iEfetiva = Math.pow(1 + iNominal / k, k) - 1;
        document.getElementById("resultadoEfetiva").textContent = `Taxa Efetiva Anual: ${(iEfetiva * 100).toFixed(4)}%`;
    }

    addClickListener("calcularEfetivaBtn", calcularTaxaEfetiva);

    // -------------------- Conversão de Taxas Equivalentes -------------------- //
    function calcularTaxaEquivalente() {
        const iAnual = parseFloat(document.getElementById("iTaxaAnual").value) / 100;
        const iMensal = parseFloat(document.getElementById("iTaxaMensal").value) / 100;
        const iDiaria = parseFloat(document.getElementById("iTaxaDiaria").value) / 100;

        let resultado = '';
        const diasNoAno = 365;
        const diasNoMes = diasNoAno / 12; // Aproximadamente 30.4167

        if (!isNaN(iAnual)) {
            const iMensalEquiv = Math.pow(1 + iAnual, 1 / 12) - 1;
            const iDiariaEquiv = Math.pow(1 + iAnual, 1 / diasNoAno) - 1;
            resultado += `Taxa Mensal Equivalente: ${(iMensalEquiv * 100).toFixed(4)}%<br>`;
            resultado += `Taxa Diária Equivalente: ${(iDiariaEquiv * 100).toFixed(5)}%`;
        } else if (!isNaN(iMensal)) {
            const iAnualEquiv = Math.pow(1 + iMensal, 12) - 1;
            const iDiariaEquiv = Math.pow(1 + iMensal, 1 / diasNoMes) - 1;
            resultado += `Taxa Anual Equivalente: ${(iAnualEquiv * 100).toFixed(4)}%<br>`;
            resultado += `Taxa Diária Equivalente: ${(iDiariaEquiv * 100).toFixed(5)}%`;
        } else if (!isNaN(iDiaria)) {
            const iAnualEquiv = Math.pow(1 + iDiaria, diasNoAno) - 1;
            const iMensalEquiv = Math.pow(1 + iDiaria, diasNoMes) - 1;
            resultado += `Taxa Anual Equivalente: ${(iAnualEquiv * 100).toFixed(4)}%<br>`;
            resultado += `Taxa Mensal Equivalente: ${(iMensalEquiv * 100).toFixed(4)}%`;
        } else {
            resultado = 'Preencha pelo menos um campo.';
        }

        document.getElementById("resultadoTaxaEquivalente").innerHTML = resultado;
    }

    addClickListener("calcularTaxaEquivalenteBtn", calcularTaxaEquivalente);

    // -------------------- Conversão de Taxa Nominal para Taxa Efetiva -------------------- //
    function calcularTaxaEfetivaNominal() {
        const iNominal = parseFloat(document.getElementById("iNominalEfetiva").value) / 100;
        const k = parseFloat(document.getElementById("kEfetiva").value);

        if (isNaN(iNominal) || isNaN(k) || k <= 0) {
            document.getElementById("resultadoEfetivaNominal").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iEfetiva = Math.pow(1 + iNominal / k, k) - 1;
        document.getElementById("resultadoEfetivaNominal").textContent = `Taxa Efetiva Anual: ${(iEfetiva * 100).toFixed(4)}%`;
    }

    addClickListener("calcularEfetivaNominalBtn", calcularTaxaEfetivaNominal);

})();
