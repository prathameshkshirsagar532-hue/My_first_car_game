const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// --- IMAGES LOADING WITH FIX ---
let imagesLoaded = 0;
const totalImages = 2;

function checkImagesLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        // Jab dono images load ho jayengi, tabhi game shuru hoga
        update(); 
    }
}

const carImage = new Image();
carImage.src = "https://imgur.com"; 
carImage.onload = checkImagesLoad; // Load check function trigger kiya

const enemyImage = new Image();
enemyImage.src = "https://imgur.com"; 
enemyImage.onload = checkImagesLoad; // Load check function trigger kiya

// Player Car Settings
let car = { x: 180, y: 400, width: 50, height: 80, speed: 5 };

// Enemy Block Settings
let enemy = { x: Math.random() * 350, y: -50, width: 50, height: 50, speed: 4 };

let score = 0;
let gameOver = false;

// Keyboard Controls Listener (PC)
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
rightBtn.addEventListener("mousedown", () => moveRight = true);
rightBtn.addEventListener("mouseup", () => moveRight = false);

// Main Game Loop Function
function update() {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 110, 250);
        ctx.font = "20px Arial";
        ctx.fillText("Tap screen to restart", 110, 290);
        return;
    }

    // --- DRAW ROAD BACKGROUND ---
    ctx.fillStyle = "#333333"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Road Lines
    ctx.fillStyle = "white";
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.fillRect(195, i, 10, 20);
    }

    // Move Car (PC or Mobile)
    if ((keys["ArrowLeft"] || moveLeft) && car.x > 0) car.x -= car.speed;
    if ((keys["ArrowRight"] || moveRight) && car.x < canvas.width - car.width) car.x += car.speed;

    // Move Enemy
    enemy.y += enemy.speed;
    if (enemy.y > canvas.height) {
        enemy.y = -50;
        enemy.x = Math.random() * (canvas.width - enemy.width);
        score += 1;
    }

    // Collision Detection
    if (car.x < enemy.x + enemy.width && car.x + car.width > enemy.x &&
        car.y < enemy.y + enemy.height && car.y + car.height > enemy.y) {
        gameOver = true;
    }

    // --- DRAW IMAGES ---
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
    ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);

    // Draw Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(update);
}

// Restart Game
canvas.addEventListener("click", () => {
    if (gameOver) {
        car.x = 180;
        enemy.y = -50;
        enemy.x = Math.random() * 350;
        score = 0;
        gameOver = false;
        update();
    }
});
