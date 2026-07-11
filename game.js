const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player Car Settings
let car = { x: 180, y: 400, width: 40, height: 70, speed: 5 };

// Enemy Block Settings
let enemy = { x: Math.random() * 360, y: -50, width: 40, height: 40, speed: 4 };

let score = 0;
let gameOver = false;

// Keyboard Controls Listener
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Main Game Loop Function
function update() {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 110, 250);
        ctx.font = "20px Arial";
        ctx.fillText("Refresh page to restart", 110, 290);
        return;
    }

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move Car
    if (keys["ArrowLeft"] && car.x > 0) car.x -= car.speed;
    if (keys["ArrowRight"] && car.x < canvas.width - car.width) car.x += car.speed;

    // Move Enemy
    enemy.y += enemy.speed;
    if (enemy.y > canvas.height) {
        enemy.y = -50;
        enemy.x = Math.random() * (canvas.width - enemy.width);
        score += 1;
    }

    // Collision Detection (Takkar check karna)
    if (car.x < enemy.x + enemy.width && car.x + car.width > enemy.x &&
        car.y < enemy.y + enemy.height && car.y + car.height > enemy.y) {
        gameOver = true;
    }

    // Draw Player Car (Blue Box)
    ctx.fillStyle = "cyan";
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Draw Enemy Obstacle (Red Box)
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Draw Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(update);
}

// Start Game
update();
