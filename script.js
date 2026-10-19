const body = document.body;
const openButton = document.querySelector("#open-note");
const letter = document.querySelector("#letter");
const lessonButtons = [...document.querySelectorAll(".lesson")];
const finalButton = document.querySelector("#final-message");
const surprise = document.querySelector("#surprise");
const confettiLayer = document.querySelector("#confetti");

function showLetter() {
  body.classList.add("note-open");
  openButton.setAttribute("aria-expanded", "true");

  window.setTimeout(() => {
    letter.classList.add("is-visible");
    letter.setAttribute("aria-hidden", "false");
    letter.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

function toggleLesson(button) {
  const isOpen = button.classList.toggle("is-open");
  button.setAttribute("aria-expanded", String(isOpen));
}

function releaseConfetti() {
  const colors = ["#e67455", "#e1a444", "#f2d5cb", "#ffffff", "#9f6aa0"];
  const count = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 72;

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 280}px`);
    piece.style.setProperty("--spin", `${Math.random() * 980 - 490}deg`);
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    piece.style.animationDuration = `${3 + Math.random() * 2}s`;
    confettiLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function showFinalMessage() {
  const isVisible = surprise.classList.contains("is-visible");
  if (isVisible) return;

  surprise.classList.add("is-visible");
  surprise.setAttribute("aria-hidden", "false");
  finalButton.setAttribute("aria-expanded", "true");
  releaseConfetti();

  window.setTimeout(() => {
    surprise.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 180);
}

openButton.addEventListener("click", showLetter);
lessonButtons.forEach((button) => button.addEventListener("click", () => toggleLesson(button)));
finalButton.addEventListener("click", showFinalMessage);
