
const particles = document.querySelector(".particles");
const scene = document.querySelector(".love-scene");
const heart = document.querySelector(".neon-heart");
const loveName = document.querySelector(".love-name");
const blueTrigger = document.querySelector(".blue-trigger");
const loveMessage = document.querySelector(".love-message");
const closeMessage = document.querySelector(".message-close");
const sparkleCharacters = ["✦", "·", "✧", "♡"];
let nameHideTimer;
let nameResetTimer;

function createSparkle() {
    const sparkle = document.createElement("span");
    const duration = 5 + Math.random() * 5;
    const colors = ["#ff51cf", "#4bd5ff", "#fff4ff"];

    sparkle.className = "sparkle";
    sparkle.textContent = sparkleCharacters[Math.floor(Math.random() * sparkleCharacters.length)];
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.setProperty("--sparkle-color", colors[Math.floor(Math.random() * colors.length)]);
    sparkle.style.setProperty("--sparkle-size", `${10 + Math.random() * 16}px`);
    sparkle.style.setProperty("--sparkle-duration", `${duration}s`);
    sparkle.style.setProperty("--sparkle-drift", `${Math.random() * 100 - 50}px`);
    particles.appendChild(sparkle);

    window.setTimeout(() => sparkle.remove(), duration * 1000);
}

createSparkle();
window.setInterval(createSparkle, 450);

blueTrigger.addEventListener("click", () => {
    loveMessage.showModal();
});

closeMessage.addEventListener("click", () => {
    loveMessage.close();
});

heart.addEventListener("click", () => {
    window.clearTimeout(nameHideTimer);
    window.clearTimeout(nameResetTimer);
    loveName.setAttribute("aria-hidden", "false");
    loveName.classList.remove("is-hiding");
    loveName.classList.remove("is-visible");
    void loveName.offsetWidth;
    loveName.classList.add("is-visible");
    createRisingHearts();

    nameHideTimer = window.setTimeout(() => {
        loveName.classList.remove("is-visible");
        loveName.classList.add("is-hiding");
        nameResetTimer = window.setTimeout(() => {
            loveName.classList.remove("is-hiding");
            loveName.setAttribute("aria-hidden", "true");
        }, 400);
    }, 2200);
});

function createRisingHearts() {
    const heartBox = heart.getBoundingClientRect();
    const sceneBox = scene.getBoundingClientRect();
    const colors = ["#ff51cf", "#ff8be0", "#4bd5ff", "#fff4ff"];

    for (let index = 0; index < 7; index++) {
        const floatingHeart = document.createElement("span");
        const duration = 1.5 + Math.random() * 0.8;

        floatingHeart.className = "rising-heart";
        floatingHeart.setAttribute("aria-hidden", "true");
        floatingHeart.textContent = index % 3 === 0 ? "💖" : "♥";
        floatingHeart.style.left = `${heartBox.left - sceneBox.left + heartBox.width / 2 + (Math.random() * 70 - 35)}px`;
        floatingHeart.style.top = `${heartBox.top - sceneBox.top + heartBox.height / 2}px`;
        floatingHeart.style.setProperty("--heart-color", colors[index % colors.length]);
        floatingHeart.style.setProperty("--heart-drift", `${Math.random() * 100 - 50}px`);
        floatingHeart.style.setProperty("--heart-duration", `${duration}s`);
        floatingHeart.style.animationDelay = `${index * 70}ms`;
        particles.appendChild(floatingHeart);

        window.setTimeout(() => floatingHeart.remove(), duration * 1000 + index * 70);
    }
}

scene.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".neon-heart")) {
        return;
    }

    const burst = document.createElement("span");
    const burstCharacters = ["♥", "✦", "✧", "♡", "♥", "✦", "·", "♡"];
    const colors = ["#ff51cf", "#4bd5ff", "#fff4ff"];

    burst.className = "tap-burst";
    burst.setAttribute("aria-hidden", "true");
    burst.style.left = `${event.clientX}px`;
    burst.style.top = `${event.clientY}px`;

    burstCharacters.forEach((character, index) => {
        const bit = document.createElement("span");
        const angle = (Math.PI * 2 * index) / burstCharacters.length;
        const distance = 48 + Math.random() * 48;

        bit.className = "tap-bit";
        bit.textContent = character;
        bit.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
        bit.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
        bit.style.setProperty("--sparkle-color", colors[index % colors.length]);
        burst.appendChild(bit);
    });

    const ring = document.createElement("span");
    ring.className = "tap-ring";
    burst.appendChild(ring);
    particles.appendChild(burst);
    window.setTimeout(() => burst.remove(), 850);

    heart.classList.remove("is-popping");
    void heart.getBoundingClientRect();
    heart.classList.add("is-popping");
    window.setTimeout(() => heart.classList.remove("is-popping"), 480);
});
