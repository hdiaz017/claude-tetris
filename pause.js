'use strict';

// Menu de pausa: Reanudar, Reiniciar, Ver controles, Nivel inicial.
// Se carga antes de game.js; usa globals de game.js (init, togglePause) solo en tiempo de ejecucion.

let startLevel = 1;

const pauseMenu = document.getElementById('pause-menu');
const pmResumeBtn = document.getElementById('pm-resume');
const pmRestartBtn = document.getElementById('pm-restart');
const pmControlsBtn = document.getElementById('pm-controls-btn');
const pmControlsList = document.getElementById('pm-controls');
const pmLevelSelect = document.getElementById('pm-level');

for (let i = 1; i <= 15; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = i;
  pmLevelSelect.appendChild(opt);
}
pmLevelSelect.value = startLevel;

function showPauseMenu() {
  pmControlsList.classList.add('hidden');
  pmControlsBtn.setAttribute('aria-expanded', 'false');
  pauseMenu.classList.remove('hidden');
  pmResumeBtn.focus();
}

function hidePauseMenu() {
  pauseMenu.classList.add('hidden');
  if (document.activeElement && document.activeElement !== document.body) {
    document.activeElement.blur();
  }
}

pmResumeBtn.addEventListener('click', () => togglePause());
pmRestartBtn.addEventListener('click', () => init());
pmControlsBtn.addEventListener('click', () => {
  const hidden = pmControlsList.classList.toggle('hidden');
  pmControlsBtn.setAttribute('aria-expanded', String(!hidden));
});
pmLevelSelect.addEventListener('change', () => {
  startLevel = parseInt(pmLevelSelect.value, 10) || 1;
});
