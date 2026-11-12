'use strict';

// ---- Skins: apariencia completa (colores, fondo, dibujo de bloques) ----
// boardBg/gridColor en null => usa las variables CSS del tema claro/oscuro.
const SKIN_STORAGE_KEY = 'tetris.skin';

function skinRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

const SKINS = {
  retro: {
    name: 'Retro',
    colors: [null, '#4dd0e1', '#ffd54f', '#ba68c8', '#81c784', '#e57373', '#7986cb', '#ffb74d', '#9e9e9e'],
    boardBg: null,
    gridColor: null,
    drawBlock(ctx, x, y, color, size) {
      ctx.fillStyle = color;
      ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(x * size + 1, y * size + 1, size - 2, 4);
    },
  },
  neon: {
    name: 'Neon',
    colors: [null, '#00f5ff', '#fff700', '#d400ff', '#39ff14', '#ff073a', '#4d6bff', '#ff9500', '#c0c0c0'],
    boardBg: '#000000',
    gridColor: '#1a1a24',
    drawBlock(ctx, x, y, color, size) {
      const baseAlpha = ctx.globalAlpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x * size + 3, y * size + 3, size - 6, size - 6);
      ctx.fillStyle = color;
      ctx.globalAlpha = baseAlpha * 0.35;
      ctx.fillRect(x * size + 3, y * size + 3, size - 6, size - 6);
      ctx.globalAlpha = baseAlpha;
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    },
  },
  pastel: {
    name: 'Pastel',
    colors: [null, '#a8e6ef', '#fff1b0', '#d9b8f0', '#b8e8c0', '#f5b5b5', '#b5bdf0', '#fcd2a0', '#cfcfd4'],
    boardBg: '#fdf6f9',
    gridColor: '#f0e2ea',
    drawBlock(ctx, x, y, color, size) {
      const px = x * size + 2, py = y * size + 2, s = size - 4;
      ctx.fillStyle = color;
      skinRoundRect(ctx, px, py, s, s, size * 0.28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 2;
      skinRoundRect(ctx, px + 2, py + 2, s - 4, s - 4, size * 0.2);
      ctx.stroke();
    },
  },
  pixel: {
    name: 'Pixel art',
    colors: [null, '#29adff', '#ffec27', '#7e2553', '#00e436', '#ff004d', '#5f57ff', '#ffa300', '#83769c'],
    boardBg: '#1d2b53',
    gridColor: '#2a3a6e',
    drawBlock(ctx, x, y, color, size) {
      const px = x * size, py = y * size, u = Math.max(2, Math.floor(size / 6));
      ctx.fillStyle = color;
      ctx.fillRect(px, py, size, size);
      // textura: pixeles claros/oscuros en patron de tablero
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            ctx.fillRect(px + i * u, py + j * u, u, u);
          } else if ((i * 3 + j) % 5 === 0) {
            ctx.fillStyle = 'rgba(0,0,0,0.18)';
            ctx.fillRect(px + i * u, py + j * u, u, u);
          }
        }
      }
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(px, py, size, 2);
      ctx.fillRect(px, py + size - 2, size, 2);
      ctx.fillRect(px, py, 2, size);
      ctx.fillRect(px + size - 2, py, 2, size);
    },
  },
};

let activeSkinKey = 'retro';
let activeSkin = SKINS.retro;

function loadSkinPref() {
  try {
    const k = localStorage.getItem(SKIN_STORAGE_KEY);
    if (k && SKINS[k]) return k;
  } catch (e) { /* ignore */ }
  return 'retro';
}

function applySkinStyle() {
  const bg = activeSkin.boardBg || '';
  for (const id of ['board', 'next-canvas']) {
    const el = document.getElementById(id);
    if (el) el.style.background = bg;
  }
}
