// Définition des constantes
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;
const SNAKE_COLOR = 'green';
const FOOD_COLOR = 'ed';

// Définition des variables
let canvas;
let ctx;
let snake = [];
let food;
let direction = 'right';
let score = 0;
let gameOver = false;

// Fonction pour initialiser le jeu
function initGame() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  snake = [{ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }];
  generateFood();
}

// Fonction pour générer la nourriture
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE,
    y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE
  };
}

// Fonction pour dessiner le serpent et la nourriture
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = SNAKE_COLOR;
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, GRID_SIZE, GRID_SIZE);
  }
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
  ctx.font = '24px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
}

// Fonction pour mettre à jour le jeu
function update() {
  // Mise à jour de la direction du serpent
  switch (direction) {
    case 'right':
      snake.push({ x: snake[snake.length - 1].x + GRID_SIZE, y: snake[snake.length - 1].y });
      break;
    case 'left':
      snake.push({ x: snake[snake.length - 1].x - GRID_SIZE, y: snake[snake.length - 1].y });
      break;
    case 'up':
      snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - GRID_SIZE });
      break;
    case 'down':
      snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + GRID_SIZE });
      break;
  }
  // Vérification de la collision avec la nourriture
  if (snake[snake.length - 1].x === food.x && snake[snake.length - 1].y === food.y) {
    score++;
    generateFood();
  } else {
    snake.shift();
  }
  // Vérification de la collision avec le bord du canvas
  if (snake[snake.length - 1].x < 0 || snake[snake.length - 1].x >= CANVAS_WIDTH || snake[snake.length - 1].y < 0 || snake[snake.length - 1].y >= CANVAS_HEIGHT) {
    gameOver = true;
  }
}

// Fonction pour gérer les événements clavier
function handleKey(event) {
  switch (event.key) {
    case 'ArrowRight':
      direction = 'right';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
  }
}

// Écouteur d'événement pour les touches du clavier
document.addEventListener('keydown', handleKey);

// Fonction pour démarrer le jeu
function startGame() {
    if (!gameOver) {
      setInterval(() => {
        update();
        draw();
      }, 100);
    }
  }
  
  // Fonction pour arrêter le jeu
  function stopGame() {
    gameOver = true;
  }
  
  // Fonction pour réinitialiser le jeu
  function resetGame() {
    gameOver = false;
    score = 0;
    initGame();
  }
  
  // Initialisation du jeu
  initGame();