let score = 0;
let timeLeft = 60;
let timerInterval;
let mosquitoInterval;
let gameOver = false;

const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('time-left');
const mosquitoArea = document.getElementById('mosquito-area');
const restartBtn = document.getElementById('restart-btn');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');

function startGame() {
    score = 0;
    timeLeft = 60;
    gameOver = false;
    scoreElement.textContent = score;
    timeLeftElement.textContent = timeLeft;
    gameOverElement.classList.add('hidden');
    restartBtn.style.display = 'none';
    mosquitoArea.innerHTML = ''; 
    
    
    timerInterval = setInterval(updateTimer, 1000);
    
    
    mosquitoInterval = setInterval(spawnMosquito, 1000);
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(mosquitoInterval);
        gameOver = true;
        gameOverElement.classList.remove('hidden');
        finalScoreElement.textContent = score;
        restartBtn.style.display = 'block';
    } else {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
    }
}

function spawnMosquito() {
    if (gameOver) return;

    const mosquito = document.createElement('div');
    mosquito.classList.add('mosquito');
    mosquito.style.top = `${Math.random() * (mosquitoArea.clientHeight - 30)}px`;
    mosquito.style.left = `${Math.random() * (mosquitoArea.clientWidth - 30)}px`;

    mosquitoArea.appendChild(mosquito);

    mosquito.addEventListener('click', () => {
        if (!gameOver) {
            score++;
            scoreElement.textContent = score;
            mosquito.remove();
        }
    });


    setTimeout(() => {
        if (mosquito.parentElement) mosquito.remove();
    }, 5000);
}

startGame();
