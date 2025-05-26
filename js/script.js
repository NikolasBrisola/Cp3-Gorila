let vidaGorila = 100;
let humanos = new Array(100).fill(true);
let ataquesRealizados = 0;
let defendendo = false;

const somAtaque = new Audio("assets/ataque.mp3");

const vidaEl = document.getElementById("vida-gorila");
const humanosEl = document.getElementById("humanos-restantes");
const ataquesEl = document.getElementById("ataques-gorila");
const logEl = document.getElementById("log");
const imgGorila = document.getElementById("img-gorila");
const imgHumanos = document.getElementById("img-humanos");

function atualizarHUD() {
  vidaEl.textContent = vidaGorila;
  humanosEl.textContent = humanos.filter(h => h).length;
  ataquesEl.textContent = ataquesRealizados;
}

function registrarLog(msg) {
  logEl.innerHTML += `<p>${msg}</p>`;
  logEl.scrollTop = logEl.scrollHeight;
}

function fimDeJogo(mensagem) {
  registrarLog(`🏁 ${mensagem}`);
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function atacar() {
  if (humanos.every(h => !h)) {
    fimDeJogo("Todos os humanos foram derrotados!");
    return;
  }

  ataquesRealizados++;
  somAtaque.play();
  imgGorila.classList.add("ataque");
  setTimeout(() => imgGorila.classList.remove("ataque"), 300);

  let mortos = 0;
  for (let i = 0; i < humanos.length; i++) {
    if (humanos[i]) {
      if (Math.random() < 0.3) {
        humanos[i] = false;
        mortos++;
      }
    }
  }

  registrarLog(`💥 O gorila atacou! ${mortos} humanos foram derrotados.`);
  animarHumanos();
  atualizarHUD();

  if (humanos.every(h => !h)) {
    fimDeJogo("Vitória do gorila!");
  } else {
    setTimeout(acaoHumanos, 1000);
  }
}

function defender() {
  defendendo = true;
  registrarLog("🛡️ O gorila se defendeu e tomará menos dano no próximo ataque.");
  setTimeout(acaoHumanos, 1000);
}

function curar() {
  let cura = Math.floor(Math.random() * 15) + 5;
  vidaGorila = Math.min(vidaGorila + cura, 100);
  registrarLog(`💚 O gorila se curou em ${cura} pontos de vida.`);
  atualizarHUD();
  setTimeout(acaoHumanos, 1000);
}

function acaoHumanos() {
  let atacantes = humanos.filter(h => h).length;
  let danoTotal = 0;

  for (let i = 0; i < atacantes; i++) {
    if (Math.random() < 0.1) {
      danoTotal += Math.floor(Math.random() * 3) + 1;
    }
  }

  if (defendendo) {
    danoTotal = Math.floor(danoTotal / 2);
    defendendo = false;
  }

  vidaGorila -= danoTotal;
  registrarLog(`👥 Os humanos atacaram e causaram ${danoTotal} de dano.`);

  if (vidaGorila <= 0) {
    vidaGorila = 0;
    atualizarHUD();
    fimDeJogo("O gorila foi derrotado!");
  } else {
    atualizarHUD();
  }
}

function animarHumanos() {
  imgHumanos.classList.add("shake");
  setTimeout(() => imgHumanos.classList.remove("shake"), 400);
}

// Inicializar HUD
atualizarHUD();
