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

