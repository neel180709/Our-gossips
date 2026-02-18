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
