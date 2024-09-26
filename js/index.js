const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function startGame() {
  
  // Load road image
  const roadImg = new Image();
  roadImg.src = 'images/road.png'; // Make sure this image path is correct
  
  // Load car image
  const carImg = new Image();
  carImg.src = 'images/car.png'; // Make sure this image path is correct
  
  const car = {
    x: 225,
    y: 600,
    width: 50,
    height: 100
  };
  
  const obstacles = [];
  let obstacleInterval = 2000; // Interval in milliseconds
  let score = 0;
  
  function drawRoad() {
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  }
  
  function drawCar() {
    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
  }
  
  function createObstacle() {
    const minWidth = 50;
    const maxWidth = 150;
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    const x = Math.floor(Math.random() * (canvas.width - width));
    obstacles.push({ x: x, y: 0, width: width, height: 20 });
  }

  function moveObstacles() {
    obstacles.forEach(obstacle => {
      obstacle.y += 5; // Move the obstacle down
    });
  }

  function drawObstacles() {
    obstacles.forEach(obstacle => {
      ctx.fillStyle = 'red';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  }

  function updateScore() {
    score += 1;
    ctx.clearRect(400, 20, 150, 40); // Clear previous score area
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 400, 50);
  }

  function checkCollision() {
    obstacles.forEach(obstacle => {
      if (
        car.x < obstacle.x + obstacle.width &&
        car.x + car.width > obstacle.x &&
        car.y < obstacle.y + obstacle.height &&
        car.y + car.height > obstacle.y
      ) {
        alert(`Game Over! Your score: ${score}`);
        window.location.reload(); // Reload to restart the game
      }
    });
  }

  function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawCar();
    moveObstacles();
    drawObstacles();
    updateScore();
    checkCollision();
    requestAnimationFrame(updateGame);
  }

  // Start game function
  function start() {
    roadImg.onload = () => {
      carImg.onload = () => {
        updateGame(); // Start the game loop when images are fully loaded
      };
    };

    // Create obstacles at intervals
    setInterval(() => {
      createObstacle();
    }, obstacleInterval);

    // Move car left and right
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && car.x > 0) {
        car.x -= 10; // Move left
      }
      if (event.key === 'ArrowRight' && car.x < canvas.width - car.width) {
        car.x += 10; // Move right
      }
    });
  }

  // Call start to initialize the game
  start();
}

window.addEventListener('load', () => {
  const startBtn = document.querySelector('#start-button');
  startBtn.addEventListener('click', () => {
    startGame();
  });
});
