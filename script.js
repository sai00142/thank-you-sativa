const beginButton = document.querySelector("#begin");
const findings = document.querySelector("#findings");
const findingCards = [...document.querySelectorAll(".finding-card")];
const unlockNote = document.querySelector("#unlock-note");
const letter = document.querySelector("#letter");
const conclusionButton = document.querySelector("#conclusion-button");
const conclusion = document.querySelector("#conclusion");
const confettiLayer = document.querySelector("#confetti");

function revealFindings() {
  findings.classList.add("is-visible");
  findings.setAttribute("aria-hidden", "false");
  beginButton.setAttribute("aria-expanded", "true");
  window.setTimeout(() => findings.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
}

function openFinding(card) {
  card.classList.add("is-open");
  card.setAttribute("aria-expanded", "true");
  const allOpen = findingCards.every((item) => item.classList.contains("is-open"));
  if (!allOpen || letter.classList.contains("is-visible")) return;
  unlockNote.textContent = "Findings complete — opening the note...";
  unlockNote.classList.add("ready");
  window.setTimeout(() => {
    letter.classList.add("is-visible");
    letter.setAttribute("aria-hidden", "false");
    letter.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 650);
}

function releasePixels() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#ee765f", "#ffd45e", "#4e9b77", "#ffffff", "#5da9ca", "#f3a4aa"];
  for (let index = 0; index < 80; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 260}px`);
    piece.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.animationDuration = `${3 + Math.random() * 2}s`;
    confettiLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function revealConclusion() {
  if (conclusion.classList.contains("is-visible")) return;
  conclusion.classList.add("is-visible");
  conclusion.setAttribute("aria-hidden", "false");
  conclusionButton.setAttribute("aria-expanded", "true");
  releasePixels();
  window.setTimeout(() => conclusion.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
}

beginButton.addEventListener("click", revealFindings);
findingCards.forEach((card) => card.addEventListener("click", () => openFinding(card)));
conclusionButton.addEventListener("click", revealConclusion);
