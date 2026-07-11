const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player Car Settings
let car = { x: 180, y: 400, width: 45, height: 75, speed: 6 };

// Enemy Obstacle Settings (🚨 Red Danger Box)
let enemy = { x: Math.random() * 340, y: -50, width: 45, height: 45, speed: 4 };

let score = 0;
let gameOver = false;

// Keyboard Controls (PC)
let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// --- MOBILE TOUCH CONTROLS ---
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let moveLeft = false;
let moveRight = false;

leftBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveLeft = true; });
leftBtn.addEventListener("touchend", () => moveLeft = false);
leftBtn.addEventListener("mousedown", () => moveLeft = true);
leftBtn.addEventListener("mouseup", () => moveLeft = false);

rightBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveRight = true; });
rightBtn.addEventListener("touchend", () => moveRight = false);
rightBtn.addEventListener("mousedown", () => moveRight = false);
rightBtn.addEventListener("mouseup", () => moveRight = false);

// Main Game Loop Function
function update() {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "bold 30px Arial";
        ctx.fillText("GAME OVER", 110, 230);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 160, 270);
        ctx.font = "16px Arial";
        ctx.fillText("Tap screen to restart", 130, 310);
        return;
    }

    // --- 1. DRAW ROAD BACKGROUND ---
    ctx.fillStyle = "#2c3e50"; // Asphalt Road Color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Left & Right Road Borders
    ctx.fillStyle = "#f1c40f"; // Yellow Side Lines
    ctx.fillRect(10, 0, 5, canvas.height);
    ctx.fillRect(canvas.width - 15, 0, 5, canvas.height);

    // Center White Dividers
    ctx.fillStyle = "white";
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.fillRect(195, i, 10, 20);
    }

    // --- 2. LOGIC & MOVEMENTS ---
    if ((keys["ArrowLeft"] || moveLeft) && car.x > 15) car.x -= car.speed;
    if ((keys["ArrowRight"] || moveRight) && car.x < canvas.width - car.width - 15) car.x += car.speed;

    // Move Enemy & Increase Speed on higher score
    enemy.y += enemy.speed + (score * 0.2); 
    if (enemy.y > canvas.height) {
        enemy.y = -50;
        enemy.x = 20 + Math.random() * (canvas.width - enemy.width - 40);
        score += 1;
    }

    // Collision Detection
    if (car.x < enemy.x + enemy.width && car.x + car.width > enemy.x &&
        car.y < enemy.y + enemy.height && car.y + car.height > enemy.y) {
        gameOver = true;
    }

    // --- 3. DRAW SHAPES (Bina Kisi Internet Link Ke) ---
    
    // Draw Enemy Obstacle (🔴 Red Box with Inner Design)
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeRect(enemy.x + 5, enemy.y + 5, enemy.width - 10, enemy.height - 10);

    // Draw Player Car (🚙 Neon Blue Racing Car Design)
    ctx.fillStyle = "#00f3ff"; // Main Body
    ctx.fillRect(car.x, car.y, car.width, car.height);
    
    // Car Wheels (Black Small Rectangles)
    ctx.fillStyle = "black";
    ctx.fillRect(car.x - 4, car.y + 10, 4, 15); // Top Left Wheel
    ctx.fillRect(car.x + car.width, car.y + 10, 4, 15); // Top Right Wheel
    ctx.fillRect(car.x - 4, car.y + 50, 4, 15); // Bottom Left Wheel
    ctx.fillRect(car.x + car.width, car.y + 50, 4, 15); // Bottom Right Wheel
    
    // Car Windshield (Glass Effect)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(car.x + 5, car.y + 25, car.width - 10, 12);

    // --- 4. DRAW SCORE ---
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Score: " + score, 25, 35);

    requestAnimationFrame(update);
}

// Restart Game on Canvas Click/Touch
canvas.addEventListener("click", () => {
    if (gameOver) {
        car.x = 180;
        enemy.y = -50;
        enemy.x = Math.random() * 340;
        score = 0;
        gameOver = false;
        update();
    }
});

// Start the game loop instantly
update();
