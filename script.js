// Selecionando todos os elementos que possuem o atributo 'data-cell' e armazenando-os em uma lista.
const cellElements = document.querySelectorAll('[data-cell]');
// Selecionando o elemento que possui o atributo 'data-board'.
const board = document.querySelector('[data-board]');
// Selecionando o elemento que possui o atributo 'data-winning-message'.
const winningMessage = document.querySelector('[data-winning-message]');
// Selecionando o elemento que possui o atributo 'winning-message-text'.
const winningMessageText = document.querySelector('[winning-message-text]');
// Selecionando o elemento que possui o atributo 'data-button'.
const buttonRestart = document.querySelector('[data-button]');

// Variável que armazena se é a vez do círculo ou do 'X'.
let isCircleTurn;

// Matriz que define as combinações vencedoras no jogo da velha.
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; 

// Função que inicializa o jogo.
const startGame = () => {
    // Remove as classes 'circle' e 'x' de todas as células e configura o evento de clique para cada célula.
    for (const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { 
            once: true // Só permite um único clique em cada célula durante o jogo.
        });
    }

    // Define que é a vez do 'X' começar o jogo.
    isCircleTurn = false;

    // Configura a classe de hover no tabuleiro para indicar a vez do jogador atual.
    setBoardHoverClass(); 

    // Esconde a mensagem de vitória/empate.
    winningMessage.style.display = 'none';
}

// Função que encerra o jogo, exibindo a mensagem de vitória ou empate.
const endGame = (isDraw) => {
    if (isDraw) {
        // Se houve empate, define o texto da mensagem de vitória como 'Empate'.
        winningMessageText.innerText = 'Empate';
    } else {
        // Caso contrário, define o texto da mensagem de vitória com o jogador atual (círculo ou 'X') vencedor.
        winningMessageText.innerText = isCircleTurn ? 'Círculo Venceu!' : 'X Venceu!';
    }

    // Exibe a mensagem de vitória/empate.
    winningMessage.style.display = 'flex';
}

// Função que verifica se o jogador atual(currentPlayer) venceu o jogo.
const checkForWin = (currentPlayer) => {
     return winningCombinations.some((Combinations) => {
        return Combinations.every((index => {
            return cellElements[index].classList.contains(currentPlayer);
        }))
     });
}

// Função que verifica se houve empate.
const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

// Função que coloca a marca (círculo ou 'X') em uma célula.
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

// Função que configura a classe de hover no tabuleiro de acordo com o jogador atual.
const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

// Função que troca o turno entre o jogador atual e o próximo.
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}

// Função que é executada quando uma célula é clicada.
const handleClick = (e) => {

    // Colocar a marca (X ou Circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    // Chama a função para colocar a marca na célula.
    placeMark(cell, classToAdd);

    // Verificar por vitória ou empate
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    // Se houver vitória, chama endGame com parâmetro false (não é empate).
    if (isWin) {
        endGame(false);
    } else if (isDraw){
        // Se houver empate, chama endGame com parâmetro true (é empate).
        endGame(true);
    } else {
        // Se não houve vitória nem empate, troca o turno para o próximo jogador.
        swapTurns();
    }

}

// Inicia o jogo chamando a função startGame.
startGame();

// Configura o evento de clique no botão de reiniciar o jogo.
buttonRestart.addEventListener('click', startGame);

