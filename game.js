const symbols = ['★', '★', '⚡', '⚡', '❤', '❤', '✦', '✦', '⬤', '⬤', '◈', '◈', '⚜', '⚜', '☀', '☀'];
let shuffledSymbols = [];
let selectedCards = [];
let matchedCards = [];
let moves = 0;
let points = 0;
const maxMoves = 20; // Limit of moves

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    shuffledSymbols = shuffle([...symbols]);
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    matchedCards = [];
    selectedCards = [];
    moves = 0;
    points = 0;
    updateStats();

    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.textContent = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !matchedCards.includes(this.dataset.index)) {
        this.classList.remove("hidden");
        this.classList.add("revealed");
        selectedCards.push(this);
    }

    if (selectedCards.length === 2) {
        moves++;
        setTimeout(checkMatch, 500);
    }

    updateStats();
}

function checkMatch() {
    if (selectedCards[0].dataset.symbol === selectedCards[1].dataset.symbol) {
        matchedCards.push(selectedCards[0].dataset.index, selectedCards[1].dataset.index);
        points += 10;
    } else {
        selectedCards.forEach(card => {
            card.classList.add("hidden");
            card.classList.remove("revealed");
        });
    }
    selectedCards = [];

    if (matchedCards.length === symbols.length) {
        setTimeout(() => alert(" Congratulations! You won! "), 300);
    } else if (moves >= maxMoves) {
        setTimeout(() => alert(" Game Over! You've used all your moves."), 300);
        disableGame();
    }

    updateStats();
}

function updateStats() {
    document.getElementById("moves").textContent = moves;
    document.getElementById("points").textContent = points;
}

function disableGame() {
    document.querySelectorAll(".card").forEach(card => {
        card.removeEventListener("click", flipCard);
    });
}

window.onload = startGame;
