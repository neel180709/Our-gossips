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
