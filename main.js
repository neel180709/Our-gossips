// Floating Hearts Animation

function createHeart() {
const heart = document.createElement("div");
heart.innerHTML = "💖";
heart.style.position = "fixed";
heart.style.left = Math.random() * window.innerWidth + "px";
heart.style.top = "-20px";
heart.style.fontSize = "24px";
heart.style.animation = "fall 4s linear";
heart.style.zIndex = "9999";

document.body.appendChild(heart);  

setTimeout(() => {  
    heart.remove();  
}, 4000);

}

setInterval(createHeart, 800);
// Secret Surprise Popup (Only Once)

document.body.addEventListener("click", function showMessage() {
alert("💌 Secret Message: Mumma 🩷, you are the best mumma 💕 in the whole world 💌 I love you more than your bobo 😘");

document.body.removeEventListener("click", showMessage);

});


// ===============================
// 🎬 ADDED VIDEO RECALLING CODE
// ===============================

function openVideo(videoFile) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("popupVideo");

    video.src = videoFile;
    modal.style.display = "flex";
    video.play();

    video.onended = function() {
        closeVideo();
    };
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("popupVideo");

    video.pause();
    video.currentTime = 0;
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("videoModal");
    if(modal){
        modal.addEventListener("click", function(e) {
            if (e.target.id === "videoModal") {
                closeVideo();
            }
        });
    }
});
// ===============================
// 🥞 Pancake Catching Game (Improved Dragging & Bigger Basket)
// ===============================

function startPancakeGame() {
    const container = document.getElementById("gameContainer");
    const gameArea = document.getElementById("gameArea");
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("gameScore");
    const gameOverScreen = document.getElementById("gameOverScreen");
    const finalScoreText = document.getElementById("finalScore");

    container.style.display = "block";
    gameArea.innerHTML = "";
    gameOverScreen.style.display = "none";

    let score = 0;
    scoreDisplay.textContent = "Score: 0";

    // Make basket bigger ×4
    basket.style.fontSize = "200px"; // approx 4 times emoji
    basket.style.position = "absolute";
    basket.style.bottom = "20px";
    basket.style.left = window.innerWidth / 2 - 100 + "px"; // start at center
    basket.style.cursor = "grab";

    let basketPosX = basket.offsetLeft;
    let isDragging = false;
    let offsetX = 0;

    // Mouse drag
    basket.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - basket.offsetLeft;
        basket.style.cursor = "grabbing";
    };

    document.onmouseup = function() {
        isDragging = false;
        basket.style.cursor = "grab";
    };

    document.onmousemove = function(e) {
        if (isDragging) {
            basketPosX = e.clientX - offsetX;
            // Restrict basket within screen
            basketPosX = Math.max(0, Math.min(window.innerWidth - basket.offsetWidth, basketPosX));
            basket.style.left = basketPosX + "px";
        }
    };

    // Touch drag (mobile-friendly)
    basket.ontouchstart = function(e) {
        isDragging = true;
        offsetX = e.touches[0].clientX - basket.offsetLeft;
    };
    basket.ontouchend = function() {
        isDragging = false;
    };
    basket.ontouchmove = function(e) {
        if (isDragging) {
            basketPosX = e.touches[0].clientX - offsetX;
            basketPosX = Math.max(0, Math.min(window.innerWidth - basket.offsetWidth, basketPosX));
            basket.style.left = basketPosX + "px";
        }
    };

    // Create falling pancakes
    const pancakes = [];
    const fallInterval = setInterval(() => {
        const pancake = document.createElement("div");
        pancake.textContent = "🥞";
        pancake.style.position = "absolute";
        pancake.style.top = "0px";
        pancake.style.left = Math.random() * (window.innerWidth - 50) + "px";
        pancake.style.fontSize = "40px";
        gameArea.appendChild(pancake);
        pancakes.push(pancake);
    }, 800);

    // Move pancakes down
    const moveInterval = setInterval(() => {
        pancakes.forEach((pancake, index) => {
            const top = parseInt(pancake.style.top);
            pancake.style.top = top + 5 + "px";

            const pancakeLeft = pancake.offsetLeft;
            const pancakeRight = pancake.offsetLeft + pancake.offsetWidth;
            const basketLeft = basket.offsetLeft;
            const basketRight = basket.offsetLeft + basket.offsetWidth;

            if (
                top + pancake.offsetHeight >= basket.offsetTop &&
                pancakeLeft < basketRight &&
                pancakeRight > basketLeft
            ) {
                score++;
                scoreDisplay.textContent = "Score: " + score;
                pancake.remove();
                pancakes.splice(index, 1);
            }

            if (top > gameArea.offsetHeight) {
                pancake.remove();
                pancakes.splice(index, 1);
            }
        });
    }, 30);

    // End game after 1 min
    setTimeout(() => {
        clearInterval(fallInterval);
        clearInterval(moveInterval);
        gameOverScreen.style.display = "block";
        finalScoreText.textContent = "You pocketed " + score + " pancakes 🥞!";
    }, 60000);
}

function endGame() {
    document.getElementById("gameContainer").style.display = "none";
}
/* ============================= */
/* LOVE RUNNER GAME SCRIPT */
/* ============================= */

let runnerCanvas, runnerCtx;
let runnerPlayer, runnerObstacles;
let runnerScore = 0;
let runnerGameRunning = false;

function openLoveRunner() {
    document.getElementById("loveRunnerPopup").style.display = "flex";
    startLoveRunner();
}

function closeLoveRunner() {
    runnerGameRunning = false;
    document.getElementById("loveRunnerPopup").style.display = "none";
}

function startLoveRunner() {
    runnerCanvas = document.getElementById("loveRunnerCanvas");
    runnerCtx = runnerCanvas.getContext("2d");

    runnerCanvas.width = runnerCanvas.offsetWidth;
    runnerCanvas.height = 200;

    runnerPlayer = { x: 50, y: 150, width: 30, height: 30, dy: 0, jumping: false };
    runnerObstacles = [];
    runnerScore = 0;
    runnerGameRunning = true;

    spawnObstacle();
    requestAnimationFrame(updateLoveRunner);
}

function spawnObstacle() {
    if (!runnerGameRunning) return;
    runnerObstacles.push({ x: runnerCanvas.width, y: 160, width: 25, height: 25 });
    setTimeout(spawnObstacle, 1500);
}

function updateLoveRunner() {
    if (!runnerGameRunning) return;

    runnerCtx.clearRect(0, 0, runnerCanvas.width, runnerCanvas.height);

    // Draw Player
    runnerCtx.font = "30px Arial";
    runnerCtx.fillText("💕", runnerPlayer.x, runnerPlayer.y);

    // Gravity
    if (runnerPlayer.jumping) {
        runnerPlayer.dy += 0.5;
        runnerPlayer.y += runnerPlayer.dy;
        if (runnerPlayer.y >= 150) {
            runnerPlayer.y = 150;
            runnerPlayer.jumping = false;
        }
    }

    // Obstacles
    runnerCtx.font = "25px Arial";
    for (let i = 0; i < runnerObstacles.length; i++) {
        let obs = runnerObstacles[i];
        obs.x -= 4;
        runnerCtx.fillText("💔", obs.x, obs.y);

        // Collision
        if (
            obs.x < runnerPlayer.x + 20 &&
            obs.x + 20 > runnerPlayer.x &&
            runnerPlayer.y > 120
        ) {
            runnerGameRunning = false;
            alert("Game Over 💔 Final Score: " + runnerScore);
            return;
        }
    }

    runnerScore++;
    document.getElementById("runnerScore").innerText = "Score: " + runnerScore;

    requestAnimationFrame(updateLoveRunner);
}

// Jump control (Mobile + Desktop)
document.addEventListener("click", function () {
    if (runnerGameRunning && !runnerPlayer.jumping) {
        runnerPlayer.jumping = true;
        runnerPlayer.dy = -8;
    }
});
/* ============================= */
/* MEMORY MATCH LOVE GAME */
/* ============================= */

let memoryEmojis = ["🥞","💖","💌","🧁","💕","🌸"];
let memoryCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function openMemoryGame() {
    const popup = document.getElementById("memoryGamePopup");
    if (!popup) return;
    popup.style.display = "flex";
    startMemoryGame();
}

function closeMemoryGame() {
    document.getElementById("memoryGamePopup").style.display = "none";
}

function startMemoryGame() {
    const board = document.getElementById("memoryBoard");
    board.innerHTML = "";
    moves = 0;
    document.getElementById("memoryMoves").innerText = "Moves: 0";

    memoryCards = [...memoryEmojis, ...memoryEmojis]
        .sort(() => 0.5 - Math.random());

    memoryCards.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.emoji = emoji;
        card.innerText = "❓";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.innerText = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    document.getElementById("memoryMoves").innerText = "Moves: " + moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.innerText = "❓";
            secondCard.innerText = "❓";
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartMemoryGame() {
    startMemoryGame();
}
function openRetroEmulator() {
    document.getElementById("retroPopup").style.display = "flex";
}

function closeRetroEmulator() {
    document.getElementById("retroPopup").style.display = "none";
}
function openPixelGame() {
    document.getElementById("pixelPopup").style.display = "flex";
    startPixelGame();
}

function closePixelGame() {
    document.getElementById("pixelPopup").style.display = "none";
}

let pixelGameStarted = false;

function startPixelGame() {
    if (pixelGameStarted) return;
    pixelGameStarted = true;

    const canvas = document.getElementById("pixelCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let player = { x: 50, y: 200, width: 30, height: 30, dy: 0 };
    let gravity = 0.6;
    let jumping = false;

    window.addEventListener("keydown", function(e) {
        if (e.code === "Space" && !jumping) {
            player.dy = -12;
            jumping = true;
        }
    });

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player.dy += gravity;
        player.y += player.dy;

        if (player.y >= 200) {
            player.y = 200;
            player.dy = 0;
            jumping = false;
        }

        ctx.fillStyle = "pink";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        ctx.fillStyle = "red";
        ctx.fillText("Press SPACE to Jump ❤️", 200, 50);

        requestAnimationFrame(update);
    }

    update();
}
function openQuest() {
    document.getElementById("questPopup").style.display = "flex";
    startQuest();
}

function closeQuest() {
    document.getElementById("questPopup").style.display = "none";
}

let questStarted = false;

function startQuest() {
    if (questStarted) return;
    questStarted = true;

    const canvas = document.getElementById("questCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let player = { x: 50, y: 250, size: 25 };
    let hearts = [
        { x: 300, y: 250 },
        { x: 450, y: 250 }
    ];

    window.addEventListener("keydown", function(e) {
        if (e.code === "ArrowRight") player.x += 10;
        if (e.code === "ArrowLeft") player.x -= 10;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "green";
        ctx.fillRect(0, 275, canvas.width, 75);

        ctx.fillStyle = "purple";
        ctx.fillRect(player.x, player.y, player.size, player.size);

        ctx.fillStyle = "red";
        hearts.forEach(h => {
            ctx.fillRect(h.x, h.y, 20, 20);
        });

        ctx.fillStyle = "black";
        ctx.fillText("Collect the Love Hearts ❤️", 200, 40);

        requestAnimationFrame(draw);
    }

    draw();
}
