// Exibir a seção correspondente ao tipo de cálculo selecionado
document.getElementById("tipoCalculo").addEventListener("change", function() {
    const sections = document.querySelectorAll('.calc-section');
    sections.forEach(section => section.classList.add('hide'));

    const selectedValue = this.value;
    if (selectedValue) {
        document.getElementById(`div${selectedValue}`).classList.remove('hide');
    }
});

// Adicionando eventos de clique aos botões
document.getElementById("calcularJurosBtn").addEventListener("click", calcularJuros);
document.getElementById("calcularValorFuturoBtn").addEventListener("click", calcularValorFuturo);
document.getElementById("calcularValorPresenteBtn").addEventListener("click", calcularValorPresente);
document.getElementById("calcularTaxaBtn").addEventListener("click", calcularTaxa);
document.getElementById("calcularTempoBtn").addEventListener("click", calcularTempo);

// Funções de cálculo
function calcularJuros() {
    const vp = parseFloat(document.getElementById("vpJuros").value);
    const i = parseFloat(document.getElementById("iJuros").value);
    const n = parseFloat(document.getElementById("nJuros").value);
    const juros = vp * i * n / 100;
    document.getElementById("resultadoJuros").textContent = `Juros: ${juros.toFixed(2)}`;
}

function calcularValorFuturo() {
    const vp = parseFloat(document.getElementById("vpValorFuturo").value);
    const i = parseFloat(document.getElementById("iValorFuturo").value);
    const n = parseFloat(document.getElementById("nValorFuturo").value);
    const vf = vp * (1 + (i * n) / 100);
    document.getElementById("resultadoValorFuturo").textContent = `Valor Futuro: ${vf.toFixed(2)}`;
}

function calcularValorPresente() {
    const vf = parseFloat(document.getElementById("vfValorPresente").value);
    const i = parseFloat(document.getElementById("iValorPresente").value);
    const n = parseFloat(document.getElementById("nValorPresente").value);
    const vp = vf / (1 + (i * n) / 100);
    document.getElementById("resultadoValorPresente").textContent = `Valor Presente: ${vp.toFixed(2)}`;
}

function calcularTaxa() {
    const vp = parseFloat(document.getElementById("vpTaxa").value);
    const vf = parseFloat(document.getElementById("vfTaxa").value);
    const n = parseFloat(document.getElementById("nTaxa").value);
    const i = ((vf - vp) / (vp * n)) * 100;
    document.getElementById("resultadoTaxa").textContent = `Taxa: ${i.toFixed(2)}%`;
}

function calcularTempo() {
    const vp = parseFloat(document.getElementById("vpTempo").value);
    const vf = parseFloat(document.getElementById("vfTempo").value);
    const i = parseFloat(document.getElementById("iTempo").value);
    const n = (vf - vp) / (vp * (i / 100));
    document.getElementById("resultadoTempo").textContent = `Tempo: ${n.toFixed(2)}`;
}
