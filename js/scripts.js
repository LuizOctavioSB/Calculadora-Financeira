// -------------------- Exibir a seção correspondente ao tipo de cálculo selecionado -------------------- //
function exibirSeccao(tipoCalculoId) {
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

//  -------------------- Chamando a função para cada select -------------------- //
exibirSeccao("tipoCalculo");      // Para a aba de Juros
exibirSeccao("tipoCalculoTaxa");  // Para a aba de Taxa

// -------------------- Adicionando eventos de clique aos botões -------------------- //
function addClickListener(buttonId, handler) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener("click", handler);
    }
}

// -------------------- Calculo de Juros -------------------- //
addClickListener("calcularJurosBtn", calcularJuros);
addClickListener("calcularValorFuturoBtn", calcularValorFuturo);
addClickListener("calcularValorPresenteBtn", calcularValorPresente);
addClickListener("calcularTaxaBtn", calcularTaxa);
addClickListener("calcularTempoBtn", calcularTempo);

// -------------------- Calculo de taxa -------------------- //
addClickListener("calcularEfetivaBtn", calcularTaxaEfetiva);
addClickListener("calcularComercialBtn", calcularTaxaComercial);

// -------------------- Funções de cálculo de Juros -------------------- //
function calcularJuros() {
    const vp = parseFloat(document.getElementById("vpJuros").value);
    const i = parseFloat(document.getElementById("iJuros").value);
    const n = parseFloat(document.getElementById("nJuros").value);

    if (isNaN(vp) || isNaN(i) || isNaN(n)) {
        document.getElementById("resultadoJuros").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    const juros = vp * i * n / 100;
    document.getElementById("resultadoJuros").textContent = `Juros: ${juros.toFixed(2)}`;
}

// -------------------- Valor Futuro -------------------- //
function calcularValorFuturo() {
    const vp = parseFloat(document.getElementById("vpValorFuturo").value);
    const i = parseFloat(document.getElementById("iValorFuturo").value);
    const n = parseFloat(document.getElementById("nValorFuturo").value);

    if (isNaN(vp) || isNaN(i) || isNaN(n)) {
        document.getElementById("resultadoValorFuturo").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    const vf = vp * (1 + (i * n) / 100);
    document.getElementById("resultadoValorFuturo").textContent = `Valor Futuro: ${vf.toFixed(2)}`;
}

// -------------------- Valor Presente -------------------- //
function calcularValorPresente() {
    const vf = parseFloat(document.getElementById("vfValorPresente").value);
    const i = parseFloat(document.getElementById("iValorPresente").value);
    const n = parseFloat(document.getElementById("nValorPresente").value);

    if (isNaN(vf) || isNaN(i) || isNaN(n)) {
        document.getElementById("resultadoValorPresente").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    const vp = vf / (1 + (i * n) / 100);
    document.getElementById("resultadoValorPresente").textContent = `Valor Presente: ${vp.toFixed(2)}`;
}

// -------------------- Taxa -------------------- //
function calcularTaxa() {
    const vp = parseFloat(document.getElementById("vpTaxa").value);
    const vf = parseFloat(document.getElementById("vfTaxa").value);
    const n = parseFloat(document.getElementById("nTaxa").value);

    if (isNaN(vp) || isNaN(vf) || isNaN(n)) {
        document.getElementById("resultadoTaxa").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    const i = ((vf - vp) / (vp * n)) * 100;
    document.getElementById("resultadoTaxa").textContent = `Taxa: ${i.toFixed(2)}%`;
}

// -------------------- Tempo -------------------- //
function calcularTempo() {
    const vp = parseFloat(document.getElementById("vpTempo").value);
    const vf = parseFloat(document.getElementById("vfTempo").value);
    const i = parseFloat(document.getElementById("iTempo").value);

    if (isNaN(vp) || isNaN(vf) || isNaN(i)) {
        document.getElementById("resultadoTempo").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    const n = (vf - vp) / (vp * (i / 100));
    document.getElementById("resultadoTempo").textContent = `Tempo: ${n.toFixed(2)}`;
}

// -------------------- Funções de cálculo de Taxas -------------------- //
// -------------------- Taxa Efetiva -------------------- //
function calcularTaxaEfetiva() {
    const ic = parseFloat(document.getElementById("icEfetiva").value);
    const n = parseFloat(document.getElementById("nEfetiva").value);

    if (isNaN(ic) || isNaN(n)) {
        document.getElementById("resultadoEfetiva").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    // Convert ic from percentage to decimal
    const icDecimal = ic / 100;
    const iDecimal = icDecimal / (1 - icDecimal * n);
    const i = iDecimal * 100; // Convert back to percentage
    document.getElementById("resultadoEfetiva").textContent = `Taxa Efetiva (i): ${i.toFixed(4)}%`;
}



// -------------------- Taxa Comercial -------------------- //
function calcularTaxaComercial() {
    const i = parseFloat(document.getElementById("iComercial").value);
    const n = parseFloat(document.getElementById("nComercial").value);

    if (isNaN(i) || isNaN(n)) {
        document.getElementById("resultadoComercial").textContent = 'Preencha todos os campos corretamente.';
        return;
    }

    // Convert i from percentage to decimal
    const iDecimal = i / 100;
    const icDecimal = iDecimal * (1 - iDecimal * n);
    const ic = icDecimal * 100; // Convert back to percentage
    document.getElementById("resultadoComercial").textContent = `Taxa Comercial (ic): ${ic.toFixed(4)}%`;
}