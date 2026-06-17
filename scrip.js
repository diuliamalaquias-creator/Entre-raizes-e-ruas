// Referências dos elementos da tela
const btnIniciar = document.getElementById('btn-iniciar');
const barraContainer = document.getElementById('barra-container');
const barra = document.getElementById('barra');
const caminhao = document.getElementById('caminhao');
const planta = document.getElementById('campo-ilustracao');
const modal = document.getElementById('modal-pergunta');
const feedbackContainer = document.getElementById('feedback');
const textoFeedback = document.getElementById('texto-feedback');
const botoesOpcoes = document.querySelectorAll('.btn-opcao');

// Tempo total da viagem do caminhão (em segundos)
const tempoTotal = 8; 

// 1. FUNÇÃO: INICIAR CICLO
function iniciarCiclo() {
    btnIniciar.disabled = true;
    barraContainer.style.display = 'block';
    planta.classList.add('animar-planta'); // Faz a plantinha pulsar

    contadorRegressivo();
}

// 2. FUNÇÃO: CONTADOR E MOVIMENTO
function contadorRegressivo() {
    let tempoDecorrido = 0;
    const larguraTela = window.innerWidth;

    const intervalo = setInterval(() => {
        tempoDecorrido += 0.05;
        let progresso = (tempoDecorrido / tempoTotal) * 100;

        // Atualiza a barra verde
        barra.style.width = `${progresso}%`;

        // Move o caminhão horizontalmente pela tela
        let posicaoX = (larguraTela * (progresso / 100)) - 60;
        caminhao.style.transform = `translateX(${posicaoX}px)`;

        // Chegou ao fim do tempo
        if (tempoDecorrido >= tempoTotal) {
            clearInterval(intervalo);
            mostrarPergunta();
        }
    }, 50); // Executa suavemente a cada 50ms
}

// 3. FUNÇÃO: MOSTRAR PERGUNTA
function mostrarPergunta() {
    planta.classList.remove('animar-planta');
    modal.classList.add('mostrar'); // Exibe o pop-up
}

// 4. FUNÇÃO: VERIFICAR RESPOSTA
function verificarResposta(alternativa) {
    // Desativa opções para evitar múltiplos cliques
    botoesOpcoes.forEach(btn => btn.disabled = true);
    feedbackContainer.classList.remove('escondido');

    if (alternativa === 'A') {
        textoFeedback.innerText = "Muito bem! Você entendeu o ciclo do alimento 🌱";
        textoFeedback.className = "sucesso";
    } else {
        textoFeedback.innerText = "Revise o papel da agricultura familiar na alimentação 🏙️";
        textoFeedback.className = "erro";
    }
}

// 5. FUNÇÃO: REINICIAR TUDO
function reiniciarCiclo() {
    modal.classList.remove('mostrar');
    barraContainer.style.display = 'none';
    barra.style.width = '0%';
    caminhao.style.transform = 'translateX(-100px)';
    
    feedbackContainer.classList.add('escondido');
    botoesOpcoes.forEach(btn => {
        btn.disabled = false;
    });
    
    btnIniciar.disabled = false;
}
