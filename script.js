const bird = document.getElementById('bird');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

let birdTop = 250;
let gravity = 0.5;
let velocity = 0;
let isGameOver = true;
let pipes = [];
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

// Show Start Message
let startMessage = document.createElement('div');
startMessage.innerText = "Click or Press SPACE to Start!";
startMessage.style.position = 'absolute';
startMessage.style.top = '50%';
startMessage.style.left = '50%';
startMessage.style.transform = 'translate(-50%, -50%)';
startMessage.style.fontSize = '24px';
startMessage.style.color = 'white';
game.appendChild(startMessage);

function gameLoop() {
  if (isGameOver) return;

  velocity += gravity;
  birdTop += velocity;
  bird.style.top = birdTop + 'px';

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;
    pipes[i].top.style.left = pipes[i].x + 'px';
    pipes[i].bottom.style.left = pipes[i].x + 'px';

    if (
      pipes[i].x < 90 && pipes[i].x > 10 &&
      (birdTop < pipes[i].gapTop || birdTop > pipes[i].gapTop + 150)
    ) {
      endGame();
    }

    if (pipes[i].x === 50) {
      score++;
      updateScore();
    }
  }

  if (pipes.length && pipes[0].x < -60) {
    pipes[0].top.remove();
    pipes[0].bottom.remove();
    pipes.shift();
  }

  if (birdTop > game.clientHeight - bird.offsetHeight || birdTop < 0) {
    endGame();
  }

  requestAnimationFrame(gameLoop);
}

function updateScore() {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
  }
  scoreDisplay.innerText = `Score: ${score} | Best: ${bestScore}`;
}

function endGame() {
  isGameOver = true;
  startMessage.style.display = 'block';
}

function jump() {
  if (!isGameOver) {
    velocity = -8;
  }
}

function createPipe() {
  if (isGameOver) return;

  let gapTop = Math.random() * 200 + 50;
  let gapHeight = 150;

  let topPipe = document.createElement('div');
  topPipe.className = 'pipe';
  topPipe.style.height = gapTop + 'px';
  topPipe.style.left = '400px';
  game.appendChild(topPipe);

  let bottomPipe = document.createElement('div');
  bottomPipe.className = 'pipe';
  bottomPipe.style.height = (game.clientHeight - gapTop - gapHeight) + 'px';
  bottomPipe.style.top = (gapTop + gapHeight) + 'px';
  bottomPipe.style.left = '400px';
  game.appendChild(bottomPipe);

  pipes.push({ top: topPipe, bottom: bottomPipe, x: 400, gapTop: gapTop });
}

function startGame() {
  if (!isGameOver) return;

  birdTop = 250;
  velocity = 0;
  score = 0;
  pipes.forEach(pipe => {
    pipe.top.remove();
    pipe.bottom.remove();
  });
  pipes = [];
  updateScore();
  startMessage.style.display = 'none';
  isGameOver = false;
  gameLoop();
}

// Controls
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    if (isGameOver) {
      startGame();
    } else {
      jump();
    }
  }
});

document.addEventListener('mousedown', function () {
  if (isGameOver) {
    startGame();
  } else {
    jump();
  }
});

// Pipe creation interval
setInterval(createPipe, 2000);
