// Partículas de negação (X) mais fluida para tablets
function negationParticles() {
  const quantidade = 24; // Menos partículas para mais fluidez
  for (let i = 0; i < quantidade; i++) {
    const neg = document.createElement('div');
    neg.className = 'negation';
    neg.textContent = '✗';
    neg.style.left = (Math.random() * 90) + 'vw';
    neg.style.fontSize = (32 + Math.random() * 32) + 'px';
    neg.style.opacity = 0.7 + Math.random() * 0.3;
    neg.style.animationDuration = (2.2 + Math.random() * 1.2) + 's'; // Mais lento
    document.body.appendChild(neg);
    setTimeout(() => neg.remove(), 3500);
  }
}
// Áudios locais de comemoração e falha
const audioConfetti = new Audio('audio/confetti.mp3'); // Som de confete (local)
const audioFail = new Audio('audio/fail.mp3'); // Som de erro/falha (local)

// Máscara para campo de nome (apenas letras, espaços e acentos)
const inputNome = document.getElementById('nome');
if (inputNome) {
  inputNome.addEventListener('input', function(e) {
    // Permite letras, espaços e acentos comuns
    let val = this.value;
    val = val.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    this.value = val;
  });
}
  // Troca cor de fundo do body conforme o resultado
  document.body.classList.remove('bg-erro', 'bg-edifica', 'bg-verdeacqua', 'bg-ambos');

// Máscara para campo de telefone/WhatsApp
const inputContato = document.getElementById('contato');
if (inputContato) {
  let lastValue = '';
  inputContato.addEventListener('input', function(e) {
    // Corrige bug de digitação invertida em tablets Samsung/Android
    let cursor = this.selectionStart;
    let val = this.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    let formatted = '';
    if (val.length > 0 && val.length <= 2) {
      formatted = '(' + val;
    } else if (val.length > 2 && val.length <= 6) {
      formatted = '(' + val.slice(0,2) + ') ' + val.slice(2);
    } else if (val.length > 6 && val.length <= 10) {
      formatted = '(' + val.slice(0,2) + ') ' + val.slice(2,6) + '-' + val.slice(6);
    } else if (val.length > 10) {
      formatted = '(' + val.slice(0,2) + ') ' + val.slice(2,7) + '-' + val.slice(7);
    }
    // Só atualiza se mudou (evita bug de digitação invertida)
    if (this.value !== formatted) {
      this.value = formatted;
      // Mantém o cursor no final (melhor para tablets)
      this.setSelectionRange(this.value.length, this.value.length);
    }
    lastValue = this.value;
  });
}
// Máscara para campo de número de apartamentos
const inputApartamentos = document.getElementById('apartamentos');
if (inputApartamentos) {
  inputApartamentos.addEventListener('input', function(e) {
    let val = this.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4); // Limita a 4 dígitos
    this.value = val;
  });
}
// Novo fluxo de telas e perguntas
const telaSaudacao = document.getElementById('tela-saudacao');
const quizForm = document.getElementById('quiz-form');
const stepNome = document.getElementById('step-nome');
const stepContato = document.getElementById('step-contato');
const stepBlocos = document.getElementById('step-blocos');
const stepApartamentos = document.getElementById('step-apartamentos');
const stepAdmin = document.getElementById('step-admin');
const stepFinal = document.getElementById('step-final');
const resultadoDiv = document.getElementById('resultado');

let respostas = {
  nome: '',
  contato: '',
  blocos: '',
  apartamentos: '',
  admin: ''
};

document.getElementById('btn-iniciar').onclick = function() {
  telaSaudacao.style.display = 'none';
  quizForm.style.display = 'flex';
  stepNome.style.display = 'flex';
};

document.getElementById('btn-nome').onclick = function() {
  const nome = document.getElementById('nome').value.trim();
  if (!nome) {
    alert('Por favor, preencha seu nome completo.');
    return;
  }
  respostas.nome = nome;
  stepNome.style.display = 'none';
  stepContato.style.display = 'flex';
};

document.getElementById('btn-contato').onclick = function() {
  const contato = document.getElementById('contato').value.trim();
  // Validação simples para telefone brasileiro (11 dígitos)
  const telefoneLimpo = contato.replace(/\D/g, '');
  if (!/^\d{11}$/.test(telefoneLimpo)) {
    alert('Por favor, informe um número de WhatsApp válido no formato (99) 99999-9999.');
    return;
  }
  respostas.contato = contato;
  stepContato.style.display = 'none';
  stepBlocos.style.display = 'flex';
};

document.querySelectorAll('.btn-bloco').forEach(btn => {
  btn.onclick = function() {
    respostas.blocos = this.getAttribute('data-bloco');
    stepBlocos.style.display = 'none';
    stepApartamentos.style.display = 'flex';
  };
});

document.getElementById('btn-apartamentos').onclick = function() {
  const apartamentos = document.getElementById('apartamentos').value;
  if (!apartamentos || parseInt(apartamentos) < 1) {
    alert('Por favor, informe o número de apartamentos corretamente.');
    return;
  }
  respostas.apartamentos = apartamentos;
  stepApartamentos.style.display = 'none';
  stepAdmin.style.display = 'flex';
};

document.querySelectorAll('.btn-admin').forEach(btn => {
  btn.onclick = function() {
    respostas.admin = this.getAttribute('data-admin');
    stepAdmin.style.display = 'none';
    mostrarResultado();
  };
});

function enviarParaPlanilha(tipo) {
  fetch('https://script.google.com/macros/s/AKfycbwQGezTDjkGf_skA3oyoKO6XpPb5LA5-YPHe-svXHZefjinmrZgjlvHv7aOtfSv7Gob/exec', {
    method: 'POST',
    body: JSON.stringify({
      nome: respostas.nome,
      contato: respostas.contato,
      blocos: respostas.blocos,
      apartamentos: respostas.apartamentos,
      admin: respostas.admin,
      tipo: tipo // 'VerdeAcqua', 'Edifica', 'Ambos', 'Nenhum'
    }),
    headers: { 'Content-Type': 'text/plain' }
  });
}

function confettiParticlesEdifica() {
  const colors = ['#222', '#ff9800', '#fff', '#ffb74d'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    confetti.style.left = left + 'vw';
    confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    confetti.style.opacity = 0.7 + Math.random() * 0.3;
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.style.setProperty('--confetti-x', (left + (Math.random() * 40 - 20)) + 'vw');
    confetti.style.setProperty('--confetti-rotate', (Math.random() * 720 - 360) + 'deg');
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3200);
  }
}
function confettiParticlesVerde() {
  const colors = ['#1EA9C5', '#1CB7AA', '#1EC99C', '#e0f7fa', '#fff'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    confetti.style.left = left + 'vw';
    confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    confetti.style.opacity = 0.7 + Math.random() * 0.3;
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.style.setProperty('--confetti-x', (left + (Math.random() * 40 - 20)) + 'vw');
    confetti.style.setProperty('--confetti-rotate', (Math.random() * 720 - 360) + 'deg');
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3200);
  }
}
function confettiParticlesAmbos() {
  // Metade verde, metade laranja/preto
  for (let i = 0; i < 80; i++) {
    let colors;
    if (i % 2 === 0) {
      colors = ['#1EA9C5', '#1CB7AA', '#1EC99C', '#e0f7fa', '#fff'];
    } else {
      colors = ['#222', '#ff9800', '#fff', '#ffb74d'];
    }
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    confetti.style.left = left + 'vw';
    confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    confetti.style.opacity = 0.7 + Math.random() * 0.3;
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.style.setProperty('--confetti-x', (left + (Math.random() * 40 - 20)) + 'vw');
    confetti.style.setProperty('--confetti-rotate', (Math.random() * 720 - 360) + 'deg');
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3200);
  }
}

function mostrarResultado() {
  let resultado = '';
  let classe = '';
  const blocos = parseInt(respostas.blocos);
  const apartamentos = parseInt(respostas.apartamentos);
  const admin = respostas.admin;

  let tipoPlanilha = '';
  let logo = '';
  let logoAlt = '';
  const logoDiv = document.getElementById('logo-resultado');
  if (logoDiv) logoDiv.style.display = 'none';

  // Limpa classes de cor
  if (logoDiv) logoDiv.className = 'logo-resultado';

  if (isNaN(apartamentos) || apartamentos < 1) {
    resultado = 'Por favor, informe o número de apartamentos corretamente.';
    classe = 'erro';
    tipoPlanilha = 'Nenhum';
    logo = '';
    document.body.classList.add('bg-erro');
  } else if (apartamentos < 26) {
    resultado = 'Infelizmente não foi dessa vez. Tente na próxima.';
    classe = 'erro';
    tipoPlanilha = 'Nenhum';
    logo = '';
    document.body.classList.add('bg-erro');
  } else if (blocos >= 3 && admin === 'sim') {
    resultado = 'Parabéns! Você deve torcer para cair no prêmio da <span style="font-weight:bold;">Edifica</span>!';
    classe = 'sucesso';
    tipoPlanilha = 'Edifica';
    logo = 'logos/edifica-logo.jpg';
    logoAlt = 'Edifica';
    if (logoDiv) logoDiv.classList.add('edifica');
    document.body.classList.add('bg-edifica');
  } else if (blocos >= 3 && admin === 'nao') {
    resultado = 'Infelizmente não foi dessa vez. Tente na próxima.';
    classe = 'erro';
    tipoPlanilha = 'Nenhum';
    logo = '';
    document.body.classList.add('bg-erro');
  } else if ((blocos === 1 || blocos === 2) && admin === 'sim') {
    // Sorteio 50/50 entre Edifica e Verde Acqua
    tipoPlanilha = 'Ambos'; // Sempre envia "Ambos" para a planilha
    const sorteio = Math.random() < 0.5 ? 'Edifica' : 'VerdeAcqua';
    if (sorteio === 'Edifica') {
      resultado = 'Parabéns! Você deve torcer para cair no prêmio da <span style="font-weight:bold;">Edifica</span>!';
      classe = 'sucesso';
      logo = 'logos/edifica-logo.jpg';
      logoAlt = 'Edifica';
      if (logoDiv) logoDiv.classList.add('edifica');
      document.body.classList.add('bg-edifica');
    } else {
      resultado = 'Parabéns! Você deve torcer para cair no prêmio da <span style="font-weight:bold;">Verde Acqua</span>!';
      classe = 'sucesso';
      logo = 'logos/verde-acqua-logo.png';
      logoAlt = 'Verde Acqua';
      if (logoDiv) logoDiv.classList.add('verdeacqua');
      document.body.classList.add('bg-verdeacqua');
    }
  } else if ((blocos === 1 || blocos === 2) && admin === 'nao') {
    resultado = 'Parabéns! Você deve torcer para cair no prêmio da <span style="font-weight:bold;">Verde Acqua</span>!';
    classe = 'sucesso';
    tipoPlanilha = 'VerdeAcqua';
    logo = 'logos/verde-acqua-logo.png';
    logoAlt = 'Verde Acqua';
    if (logoDiv) logoDiv.classList.add('verdeacqua');
    document.body.classList.add('bg-verdeacqua');
  } else {
    resultado = 'Preencha todas as informações corretamente.';
    classe = 'erro';
    tipoPlanilha = 'Nenhum';
    logo = '';
    document.body.classList.add('bg-erro');
  }

  resultadoDiv.innerHTML = resultado;
  resultadoDiv.className = 'resultado ' + classe;
  stepFinal.style.display = 'flex';
  // Toca som de acordo com o resultado
  if (classe === 'sucesso') {
    try { audioConfetti.currentTime = 0; audioConfetti.play(); } catch(e){}
  } else if (classe === 'erro') {
    try { audioFail.currentTime = 0; audioFail.play(); } catch(e){}
  }

  // Exibe logo animada
  if (logoDiv && classe === 'sucesso' && logo) {
    let imgStyle = '';
    if (logoAlt === 'Edifica') {
      imgStyle = 'style="box-shadow: 0 0 24px 0 #ff9800; border-radius: 8px;"';
    }
    logoDiv.innerHTML = `<img src="${logo}" alt="${logoAlt}" ${imgStyle}>`;
    logoDiv.style.display = 'flex';
  } else if (logoDiv) {
    logoDiv.innerHTML = '';
    logoDiv.style.display = 'none';
  }

  // Envia para planilha
  enviarParaPlanilha(tipoPlanilha);

  // Partículas
  setTimeout(() => {
    if (classe === 'sucesso' && ((blocos === 1 || blocos === 2) && admin === 'sim')) {
      // Sorteio: confete conforme o sorteado
      if (logoAlt === 'Edifica') {
        confettiParticlesEdifica();
      } else {
        confettiParticlesVerde();
      }
    } else if (classe === 'sucesso' && tipoPlanilha === 'Edifica') {
      confettiParticlesEdifica();
    } else if (classe === 'sucesso' && tipoPlanilha === 'VerdeAcqua') {
      confettiParticlesVerde();
    } else if (classe === 'erro' && typeof negationParticles === 'function') {
      negationParticles();
    }
  }, 300);
}
