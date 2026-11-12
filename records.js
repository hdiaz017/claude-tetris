'use strict';

// ---- Records locales (localStorage) ----
const Records = (() => {
  const KEY = 'tetris.records';
  const MAX_TOP = 5;

  function empty() { return { top: [], bestCombo: 0, maxLines: 0 }; }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (!raw || typeof raw !== 'object') return empty();
      const top = Array.isArray(raw.top) ? raw.top
        .filter(e => e && Number.isFinite(e.score))
        .map(e => ({
          name: String(e.name || 'Anónimo').slice(0, 12),
          score: e.score, lines: e.lines | 0, level: e.level | 0,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_TOP) : [];
      return { top, bestCombo: raw.bestCombo | 0, maxLines: raw.maxLines | 0 };
    } catch (e) {
      return empty();
    }
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignorar */ }
  }

  function insertIndex(top, score) {
    const i = top.findIndex(e => score > e.score);
    return i === -1 ? top.length : i;
  }

  // Posicion (0-based) que ocuparia el puntaje en el top, o -1 si no entra.
  function rankFor(score) {
    if (score <= 0) return -1;
    const i = insertIndex(load().top, score);
    return i < MAX_TOP ? i : -1;
  }

  // Inserta una entrada; devuelve su indice en el top (o -1).
  function addEntry(entry) {
    const data = load();
    const i = insertIndex(data.top, entry.score);
    if (i >= MAX_TOP) return -1;
    data.top.splice(i, 0, entry);
    data.top = data.top.slice(0, MAX_TOP);
    save(data);
    return i;
  }

  // Actualiza mejor combo y maximo de lineas al terminar una partida.
  function recordGame(combo, lines) {
    const data = load();
    data.bestCombo = Math.max(data.bestCombo, combo);
    data.maxLines = Math.max(data.maxLines, lines);
    save(data);
  }

  function reset() { save(empty()); }

  function el(tag, text, cls) {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }

  // Dibuja la tabla en `container` (solo textContent). highlight = indice a resaltar.
  function render(container, highlight) {
    const data = load();
    container.textContent = '';
    container.appendChild(el('p', 'TOP 5', 'rec-title'));
    const table = el('table', undefined, 'rec-table');
    const head = el('tr');
    ['#', 'NOMBRE', 'PUNTOS', 'LÍNEAS', 'NIV'].forEach(h => head.appendChild(el('th', h)));
    table.appendChild(head);
    for (let i = 0; i < MAX_TOP; i++) {
      const e = data.top[i];
      const tr = el('tr', undefined, i === highlight ? 'rec-new' : '');
      tr.appendChild(el('td', String(i + 1)));
      if (e) {
        tr.appendChild(el('td', e.name));
        tr.appendChild(el('td', e.score.toLocaleString()));
        tr.appendChild(el('td', String(e.lines)));
        tr.appendChild(el('td', String(e.level)));
      } else {
        for (let k = 0; k < 4; k++) tr.appendChild(el('td', '-'));
      }
      table.appendChild(tr);
    }
    container.appendChild(table);
    container.appendChild(el('p',
      `Mejor combo: ${data.bestCombo}  ·  Máx. líneas: ${data.maxLines}`, 'rec-stats'));
  }

  return { load, rankFor, addEntry, recordGame, reset, render };
})();
