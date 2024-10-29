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

    // -------------------- Chamando a função para cada select -------------------- //
    exibirSecao("tipoCalculo");      // Para a aba de Juros
    exibirSecao("tipoCalculoTaxa");  // Para a aba de Taxa

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

        const iMensal = iAnual / 12;
        const vf = vp * Math.pow((1 + iMensal), nMeses);
        document.getElementById("resultadoJurosCompostos").textContent = `Valor Futuro (VF): ${vf.toFixed(2)}`;
    }

    addClickListener("calcularJurosCompostosBtn", calcularJurosCompostos);

    // -------------------- Cálculo de Juros Simples -------------------- //
    function calcularJuros() {
        const vp = parseFloat(document.getElementById("vpJuros").value);
        const iAnual = parseFloat(document.getElementById("iJuros").value) / 100;
        const nMeses = parseFloat(document.getElementById("nJuros").value);

        if (isNaN(vp) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoJuros").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = iAnual / 12;
        const juros = vp * iMensal * nMeses;
        document.getElementById("resultadoJuros").textContent = `Juros: ${juros.toFixed(2)}`;
    }

    addClickListener("calcularJurosBtn", calcularJuros);

    // -------------------- Valor Futuro -------------------- //
    function calcularValorFuturo() {
        const vp = parseFloat(document.getElementById("vpValorFuturo").value);
        const iAnual = parseFloat(document.getElementById("iValorFuturo").value) / 100;
        const nMeses = parseFloat(document.getElementById("nValorFuturo").value);

        if (isNaN(vp) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoValorFuturo").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = iAnual / 12;
        const vf = vp * (1 + iMensal * nMeses);
        document.getElementById("resultadoValorFuturo").textContent = `Valor Futuro: ${vf.toFixed(2)}`;
    }

    addClickListener("calcularValorFuturoBtn", calcularValorFuturo);

    // -------------------- Valor Presente -------------------- //
    function calcularValorPresente() {
        const vf = parseFloat(document.getElementById("vfValorPresente").value);
        const iAnual = parseFloat(document.getElementById("iValorPresente").value) / 100;
        const nMeses = parseFloat(document.getElementById("nValorPresente").value);

        if (isNaN(vf) || isNaN(iAnual) || isNaN(nMeses)) {
            document.getElementById("resultadoValorPresente").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = iAnual / 12;
        const vp = vf / (1 + iMensal * nMeses);
        document.getElementById("resultadoValorPresente").textContent = `Valor Presente: ${vp.toFixed(2)}`;
    }

    addClickListener("calcularValorPresenteBtn", calcularValorPresente);

    // -------------------- Cálculo da Taxa -------------------- //
    function calcularTaxa() {
        const vp = parseFloat(document.getElementById("vpTaxa").value);
        const vf = parseFloat(document.getElementById("vfTaxa").value);
        const nMeses = parseFloat(document.getElementById("nTaxa").value);

        if (isNaN(vp) || isNaN(vf) || isNaN(nMeses)) {
            document.getElementById("resultadoTaxa").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = (vf - vp) / (vp * nMeses);
        const iAnual = iMensal * 12 * 100; // Converte para percentual
        document.getElementById("resultadoTaxa").textContent = `Taxa Anual: ${iAnual.toFixed(2)}%`;
    }

    addClickListener("calcularTaxaBtn", calcularTaxa);

    // -------------------- Cálculo do Tempo -------------------- //
    function calcularTempo() {
        const vp = parseFloat(document.getElementById("vpTempo").value);
        const vf = parseFloat(document.getElementById("vfTempo").value);
        const iAnual = parseFloat(document.getElementById("iTempo").value) / 100;

        if (isNaN(vp) || isNaN(vf) || isNaN(iAnual)) {
            document.getElementById("resultadoTempo").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iMensal = iAnual / 12;
        const nMeses = (vf - vp) / (vp * iMensal);
        document.getElementById("resultadoTempo").textContent = `Tempo: ${nMeses.toFixed(2)} meses`;
    }

    addClickListener("calcularTempoBtn", calcularTempo);

    // -------------------- Funções de cálculo de Taxas -------------------- //

    // -------------------- Taxa Efetiva -------------------- //
    function calcularTaxaEfetiva() {
        const icAnual = parseFloat(document.getElementById("icEfetiva").value) / 100;
        const nAnos = parseFloat(document.getElementById("nEfetiva").value);

        if (isNaN(icAnual) || isNaN(nAnos)) {
            document.getElementById("resultadoEfetiva").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iEfetiva = Math.pow(1 + icAnual / nAnos, nAnos) - 1;
        document.getElementById("resultadoEfetiva").textContent = `Taxa Efetiva Anual: ${(iEfetiva * 100).toFixed(4)}%`;
    }

    addClickListener("calcularEfetivaBtn", calcularTaxaEfetiva);

    // -------------------- Taxa Comercial -------------------- //
    function calcularTaxaComercial() {
        const iEfetivaAnual = parseFloat(document.getElementById("iComercial").value) / 100;
        const nAnos = parseFloat(document.getElementById("nComercial").value);

        if (isNaN(iEfetivaAnual) || isNaN(nAnos)) {
            document.getElementById("resultadoComercial").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const icAnual = nAnos * (Math.pow(1 + iEfetivaAnual, 1 / nAnos) - 1);
        document.getElementById("resultadoComercial").textContent = `Taxa Comercial Anual: ${(icAnual * 100).toFixed(4)}%`;
    }

    addClickListener("calcularComercialBtn", calcularTaxaComercial);

    // -------------------- Conversão de Taxas Equivalentes -------------------- //
    function calcularTaxaEquivalente() {
        const iAnual = parseFloat(document.getElementById("iTaxaAnual").value) / 100;
        const iMensal = parseFloat(document.getElementById("iTaxaMensal").value) / 100;
        const iDiaria = parseFloat(document.getElementById("iTaxaDiaria").value) / 100;

        let resultado = '';

        if (!isNaN(iAnual)) {
            const iMensalEquiv = Math.pow(1 + iAnual, 1 / 12) - 1;
            const iDiariaEquiv = Math.pow(1 + iAnual, 1 / 360) - 1;
            resultado += `Taxa Mensal Equivalente: ${(iMensalEquiv * 100).toFixed(4)}%<br>`;
            resultado += `Taxa Diária Equivalente: ${(iDiariaEquiv * 100).toFixed(5)}%`;
        } else if (!isNaN(iMensal)) {
            const iAnualEquiv = Math.pow(1 + iMensal, 12) - 1;
            const iDiariaEquiv = Math.pow(1 + iMensal, 1 / 30) - 1;
            resultado += `Taxa Anual Equivalente: ${(iAnualEquiv * 100).toFixed(4)}%<br>`;
            resultado += `Taxa Diária Equivalente: ${(iDiariaEquiv * 100).toFixed(5)}%`;
        } else if (!isNaN(iDiaria)) {
            const iAnualEquiv = Math.pow(1 + iDiaria, 360) - 1;
            const iMensalEquiv = Math.pow(1 + iDiaria, 30) - 1;
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
        const iNominal = parseFloat(document.getElementById("iNominalEfetiva").value) / 100; // Taxa nominal anual em decimal
        const k = parseFloat(document.getElementById("kEfetiva").value); // Número de capitalizações por ano

        if (isNaN(iNominal) || isNaN(k) || k <= 0) {
            document.getElementById("resultadoEfetivaNominal").textContent = 'Preencha todos os campos corretamente.';
            return;
        }

        const iEfetiva = Math.pow(1 + iNominal / k, k) - 1; // Fórmula de conversão
        document.getElementById("resultadoEfetivaNominal").textContent = `Taxa Efetiva Anual: ${(iEfetiva * 100).toFixed(4)}%`;
    }

    addClickListener("calcularEfetivaNominalBtn", calcularTaxaEfetivaNominal);

})();
