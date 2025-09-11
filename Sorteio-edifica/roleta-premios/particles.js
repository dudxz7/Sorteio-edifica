// Confetti animation (sucesso)
function confettiParticles() {
  const colors = ['#1EA9C5', '#1CB7AA', '#1EC99C', '#147F60', '#12697D', '#fff'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    confetti.style.left = left + 'vw';
    confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    confetti.style.opacity = 0.7 + Math.random() * 0.3;
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    // Adiciona mais aleatoriedade ao movimento
    confetti.style.setProperty('--confetti-x', (left + (Math.random() * 40 - 20)) + 'vw');
    confetti.style.setProperty('--confetti-rotate', (Math.random() * 720 - 360) + 'deg');
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3200);
  }
}
// Negation particles (erro)
function negationParticles() {
  for (let i = 0; i < 40; i++) {
    const neg = document.createElement('div');
    neg.className = 'negation';
    neg.innerText = '✖';
    const left = Math.random() * 100;
    neg.style.left = left + 'vw';
    neg.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
    neg.style.opacity = 0.7 + Math.random() * 0.3;
    neg.style.fontSize = (22 + Math.random()*18) + 'px';
    // Mais aleatoriedade
    neg.style.setProperty('--neg-x', (left + (Math.random() * 60 - 30)) + 'vw');
    neg.style.setProperty('--neg-rotate', (Math.random() * 540 - 270) + 'deg');
    document.body.appendChild(neg);
    setTimeout(() => neg.remove(), 2600);
  }
}
