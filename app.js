const DOWNLOAD_LINKS = {
  'beamng-drive':    'https://store.steampowered.com/app/284160/BeamNGdrive/',
  'gta5':            'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/',
  'minecraft':       'https://www.minecraft.net/es-es/download',
  'cyberpunk2077':   'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
  'csgo':            'https://store.steampowered.com/app/730/CounterStrike_2/',
  'elden-ring':      'https://store.steampowered.com/app/1245620/ELDEN_RING/',
  'the-witcher-3':   'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/',
  'red-dead-redemption-2': 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
  'valheim':         'https://store.steampowered.com/app/892970/Valheim/',
  'palworld':        'https://store.steampowered.com/app/1623730/Palworld/',
  'stardew-valley':  'https://store.steampowered.com/app/413150/Stardew_Valley/',
  'hades':           'https://store.steampowered.com/app/1145360/Hades/',
  'among-us':        'https://store.steampowered.com/app/945360/Among_Us/',
  'hollow-knight':   'https://store.steampowered.com/app/367520/Hollow_Knight/',
  'clash-royale':    'https://play.google.com/store/apps/details?id=com.supercell.clashroyale',
  'pubg-mobile':     'https://play.google.com/store/apps/details?id=com.tencent.ig',
  'genshin-impact':  'https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact',
  'free-fire':       'https://play.google.com/store/apps/details?id=com.dts.freefireth',
  'mobile-legends':  'https://play.google.com/store/apps/details?id=com.mobile.legends',
  'pokemon-go':      'https://play.google.com/store/apps/details?id=com.nianticlabs.pokemongo',
  'candy-crush':     'https://play.google.com/store/apps/details?id=com.king.candycrushsaga',
  'roblox-mobile':   'https://play.google.com/store/apps/details?id=com.roblox.client',
  'god-of-war-ragnarok':    'https://www.playstation.com/es-es/games/god-of-war-ragnarok/',
  'the-last-of-us-2':       'https://www.playstation.com/es-es/games/the-last-of-us-part-ii-remastered/',
  'zelda-totk':             'https://www.nintendo.com/es-es/Juegos/Juegos-para-Nintendo-Switch/The-Legend-of-Zelda-Tears-of-the-Kingdom-2184606.html',
  'spider-man-2':           'https://www.playstation.com/es-es/games/marvels-spider-man-2/',
  'halo-infinite':          'https://www.xbox.com/es-ES/games/store/halo-infinite/9NP5X51FDBMD',
  'mario-kart-8':           'https://www.nintendo.com/es-es/Juegos/Juegos-para-Nintendo-Switch/Mario-Kart-8-Deluxe-1173186.html',
  'fortnite-console':       'https://www.fortnite.com/download',
  'spotify-mobile':  'https://play.google.com/store/apps/details?id=com.spotify.music',
  'whatsapp':        'https://play.google.com/store/apps/details?id=com.whatsapp',
  'tiktok-mobile':   'https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically',
  'youtube-mobile':  'https://play.google.com/store/apps/details?id=com.google.android.youtube',
  'capcut':          'https://play.google.com/store/apps/details?id=com.lemon.lvoverseas',
  'steam':           'https://store.steampowered.com/about/',
  'discord':         'https://discord.com/download',
  'obs-studio':      'https://obsproject.com/download',
  'vlc-media':       'https://www.videolan.org/vlc/',
  'vs-code':         'https://code.visualstudio.com/Download',
  'epic-games':      'https://www.epicgames.com/store/es-ES/download',
};

/* ── THEME ──────────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('gv-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');
}
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('gv-theme', document.body.classList.contains('light') ? 'light' : 'dark');
}
document.addEventListener('DOMContentLoaded', initTheme);

/* ── TOAST ──────────────────────────────────────────────── */
function showToast(msg, icon = '✅') {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 300);
  }, 2800);
}

/* ── WISHLIST ────────────────────────────────────────────── */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('gv-wishlist') || '[]'); } catch { return []; }
}
function toggleWishlist(id, name) {
  const wl = getWishlist();
  const idx = wl.indexOf(id);
  if (idx === -1) { wl.push(id); showToast(`${name} agregado a tu lista`, '❤️'); }
  else { wl.splice(idx, 1); showToast(`${name} eliminado de tu lista`, '🗑️'); }
  localStorage.setItem('gv-wishlist', JSON.stringify(wl));
}
function isWishlisted(id) { return getWishlist().includes(id); }

/* ── MODAL ──────────────────────────────────────────────── */
function openModal(game) {
  const ov = document.getElementById('gameModal');
  if (!ov) return;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderModal(game);
}
function closeModal() {
  const ov = document.getElementById('gameModal');
  if (!ov) return;
  ov.classList.remove('open');
  document.body.style.overflow = '';
}

function renderModal(g) {
  const ov = document.getElementById('gameModal');
  const screenshots = (g.screenshots || [g.thumb]).slice(0, 6);
  const dlLink = DOWNLOAD_LINKS[g.id] || '#';
  ov.innerHTML = `
  <div class="modal">
    <div class="modal-header">
      <img src="${g.headerImg || g.thumb}" alt="${g.name}" onerror="this.src='${g.thumb}'">
      <div class="modal-header-overlay"></div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-cats">
        ${g.categories.map(c => `<span class="modal-cat">${c}</span>`).join('')}
      </div>
      <div class="modal-title">${g.name}</div>
      <div class="modal-build">Build ${g.build} &nbsp;·&nbsp; ${g.platform} &nbsp;·&nbsp; ${g.date}</div>
      <p class="modal-desc">${g.description}</p>
      <div class="modal-tabs">
        <div class="modal-tab active" onclick="switchTab(this,'tab-info')">Información</div>
        <div class="modal-tab" onclick="switchTab(this,'tab-req')">Requisitos</div>
        <div class="modal-tab" onclick="switchTab(this,'tab-stats')">Estadísticas</div>
        <div class="modal-tab" onclick="switchTab(this,'tab-screens')">Capturas</div>
      </div>
      <div id="tab-info" class="modal-tab-content active">
        <div class="req-box" style="margin-bottom:14px">
          <div class="req-box-title">📋 Detalles</div>
          ${[
            ['Desarrollador', g.developer],
            ['Editor', g.publisher],
            ['Motor', g.engine || '—'],
            ['Versión', g.version || '1.0'],
            ['Idiomas', g.languages || 'Español, Inglés'],
            ['Online', g.online || 'Sí'],
            ['Tamaño', g.size],
          ].map(([k,v]) => `<div class="req-row"><span class="req-key">${k}</span><span class="req-val">${v}</span></div>`).join('')}
        </div>
      </div>
      <div id="tab-req" class="modal-tab-content">
        <div class="req-grid">
          <div class="req-box"><div class="req-box-title">⚙️ Mínimos</div>${renderReqs(g.reqMin)}</div>
          <div class="req-box"><div class="req-box-title">🚀 Recomendados</div>${renderReqs(g.reqRec)}</div>
        </div>
      </div>
      <div id="tab-stats" class="modal-tab-content">
        <div class="stats-grid">
          <div class="stat-box"><div class="stat-box-num">${g.stats.downloads}</div><div class="stat-box-label">Descargas</div></div>
          <div class="stat-box"><div class="stat-box-num">${g.stats.rating}</div><div class="stat-box-label">Calificación</div></div>
          <div class="stat-box"><div class="stat-box-num">${g.stats.reviews}</div><div class="stat-box-label">Reseñas</div></div>
          <div class="stat-box"><div class="stat-box-num">${g.stats.players}</div><div class="stat-box-label">Jugadores activos</div></div>
          <div class="stat-box"><div class="stat-box-num">${g.stats.peakPlayers}</div><div class="stat-box-label">Pico jugadores</div></div>
          <div class="stat-box"><div class="stat-box-num">${g.stats.avgHours}</div><div class="stat-box-label">Horas promedio</div></div>
        </div>
      </div>
      <div id="tab-screens" class="modal-tab-content">
        <div class="screenshots-grid">
          ${screenshots.map(s => `<img src="${s}" alt="Screenshot" onerror="this.style.display='none'">`).join('')}
        </div>
      </div>
    </div>
    <div class="modal-dl-bar">
      <div class="dl-size">📦 ${g.size}</div>
      <a href="${dlLink}" target="_blank" rel="noopener noreferrer" class="btn-dl-main" onclick="showToast('Redirigiendo al sitio oficial…','🚀')">
        ⬇ Descargar ${g.name}
      </a>
      <button class="btn-wishlist-modal" onclick="toggleWishlist('${g.id}','${g.name}')">
        ${isWishlisted(g.id) ? '❤️' : '🤍'} Lista de deseos
      </button>
    </div>
  </div>`;
}

function renderReqs(r) {
  if (!r) return '<div style="color:var(--text3);font-size:13px">No disponible</div>';
  return Object.entries(r).map(([k,v]) =>
    `<div class="req-row"><span class="req-key">${k}</span><span class="req-val">${v}</span></div>`
  ).join('');
}

function switchTab(el, id) {
  el.closest('.modal-body').querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  el.closest('.modal-body').querySelectorAll('.modal-tab-content').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(id).classList.add('active');
}

function startDownload(id, name) {
  const link = DOWNLOAD_LINKS[id];
  if (link) {
    showToast(`Abriendo sitio oficial de ${name}…`, '🚀');
    setTimeout(() => window.open(link, '_blank', 'noopener'), 400);
  } else {
    showToast(`Buscando enlace para ${name}…`, '🔍');
  }
}

function openSearch() {
  const ov = document.getElementById('searchOverlay');
  if (!ov) return;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('searchBigInput')?.focus(), 50);
}
function closeSearch() {
  const ov = document.getElementById('searchOverlay');
  if (!ov) return;
  ov.classList.remove('open');
  document.body.style.overflow = '';
  const inp = document.getElementById('searchBigInput');
  if (inp) inp.value = '';
  const box = document.getElementById('searchResultsBox');
  if (box) box.innerHTML = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSearch(); closeModal(); closeMobileMenu(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

function handleSearch(query, allGames) {
  const box = document.getElementById('searchResultsBox');
  if (!box) return;
  if (!query.trim()) { box.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const results = allGames.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.categories.some(c => c.toLowerCase().includes(q)) ||
    (g.developer || '').toLowerCase().includes(q) ||
    (g.platform || '').toLowerCase().includes(q)
  ).slice(0, 20);

  if (!results.length) {
    box.innerHTML = `<div style="padding:32px;text-align:center;color:var(--text3)">Sin resultados para "<strong style="color:var(--text)">${query}</strong>"</div>`;
    return;
  }

  const gameResults = results.filter(r => !r.isMod && !r.isMap);
  const modResults  = results.filter(r => r.isMod);
  const mapResults  = results.filter(r => r.isMap);

  let html = '';
  const renderGroup = (label, arr, type, cls) => {
    if (!arr.length) return '';
    return `<div class="search-section-title">${label}</div>` +
      arr.map(g => `
        <div class="search-result-item" onclick="closeSearch();openModal(${JSON.stringify(g).replace(/"/g,'&quot;')})">
          <img class="sri-thumb" src="${g.thumb}" alt="${g.name}" onerror="this.style.opacity=0">
          <div class="sri-info">
            <div class="sri-name">${g.name}</div>
            <div class="sri-meta">${g.platform} · ${g.date}</div>
          </div>
          <span class="sri-type ${cls}">${type}</span>
        </div>`).join('');
  };
  html += renderGroup('🎮 Juegos', gameResults, 'JUEGO', 'type-game');
  html += renderGroup('🔧 Mods', modResults, 'MOD', 'type-mod');
  html += renderGroup('🗺️ Mapas', mapResults, 'MAPA', 'type-map');
  box.innerHTML = html;
}

function openMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  if (menu) menu.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  if (menu) menu.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCard(g, delay = 0) {
  const wl = isWishlisted(g.id);
  const dlLink = DOWNLOAD_LINKS[g.id] || '#';
  return `
  <div class="game-card" style="animation-delay:${delay}ms" onclick="openModal(${JSON.stringify(g).replace(/"/g,'&quot;')})">
    <div class="card-thumb">
      <img src="${g.thumb}" alt="${g.name}" loading="lazy"
        onerror="this.src='https://placehold.co/400x225/0f1220/3d8ef0?text=${encodeURIComponent(g.name)}'">
      <div class="card-badge">
        ${g.isNew  ? '<span class="badge badge-new">Nuevo</span>' : ''}
        ${g.isHot  ? '<span class="badge badge-hot">🔥 Hot</span>' : ''}
        ${g.isFree ? '<span class="badge badge-free">Gratis</span>' : ''}
      </div>
      <div class="card-overlay"></div>
      <div class="card-platform">${g.platformIcon || '🖥️'} ${g.platform}</div>
    </div>
    <div class="card-body">
      <div class="card-cats">${g.categories.slice(0,3).map(c=>`<span class="cat-tag">${c}</span>`).join('')}</div>
      <div class="card-title">${g.name}</div>
      <div class="card-build">Build ${g.build}</div>
      <div class="card-meta">
        <div class="card-date">📅 ${g.date}</div>
        <div class="card-rating">⭐ ${g.stats.rating}</div>
      </div>
    </div>
    <div class="card-footer">
      <a href="${dlLink}" target="_blank" rel="noopener noreferrer"
         class="btn-download"
         onclick="event.stopPropagation(); showToast('Abriendo sitio oficial…','🚀')">
        ⬇ Descargar
      </a>
      <button class="btn-wishlist"
        onclick="event.stopPropagation(); toggleWishlist('${g.id}','${g.name}'); this.textContent=isWishlisted('${g.id}')?'❤️':'🤍'">
        ${wl ? '❤️' : '🤍'}
      </button>
    </div>
  </div>`;
}

function filterGames(games, category, search) {
  return games.filter(g => {
    const matchCat = !category || category === 'all' || g.categories.includes(category);
    const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
}
function sortGames(games, method) {
  const copy = [...games];
  if (method === 'name')   return copy.sort((a,b) => a.name.localeCompare(b.name));
  if (method === 'rating') return copy.sort((a,b) => parseFloat(b.stats.rating) - parseFloat(a.stats.rating));
  if (method === 'date')   return copy.sort((a,b) => new Date(b.date) - new Date(a.date));
  if (method === 'dl')     return copy.sort((a,b) => {
    const n = s => parseFloat((s||'0').replace(/[^0-9.]/g,''));
    return n(b.stats.downloads) - n(a.stats.downloads);
  });
  return copy;
}

function navHTML(active) {
  const links = [
    { href:'index.html',                  label:'Inicio',                  icon:'🏠' },
    { href:'juegospc.html',               label:'Juegos PC',               icon:'🖥️' },
    { href:'juegoscelulares.html',        label:'Juegos Celulares',        icon:'📱' },
    { href:'juegosconsolas.html',         label:'Juegos Consolas',         icon:'🎮' },
    { href:'aplicacionesmoviles.html',    label:'Apps Móviles',            icon:'📲' },
    { href:'aplicacionesescritorio.html', label:'Apps Escritorio',         icon:'💻' },
  ];

  const desktopLinks = links.map(l => `
    <a href="${l.href}" class="nav-link${active===l.href?' active':''}">
      <span class="ni">${l.icon}</span>${l.label}
    </a>`).join('');

  const mobileLinks = links.map(l => `
    <a href="${l.href}" class="mob-link${active===l.href?' active':''}" onclick="closeMobileMenu()">
      <span class="mob-link-icon">${l.icon}</span>
      <span>${l.label}</span>
    </a>`).join('');

  return `
  <!-- Desktop Navbar -->
  <nav class="navbar">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">🎮</div>
      <span class="nav-logo-text">Game<span>Vault</span></span>
    </a>
    <div class="nav-links desktop-only">${desktopLinks}</div>
    <div class="nav-right">
      <div class="search-wrap" onclick="openSearch()">
        <input class="search-input" placeholder="Buscar… (Ctrl+K)" readonly style="cursor:pointer">
        <span class="search-icon">🔍</span>
      </div>
      <button class="theme-toggle" onclick="toggleTheme()" title="Cambiar tema">
        <span class="theme-toggle-icon moon">☀️</span>
        <span class="theme-toggle-icon sun">🌙</span>
      </button>
      <!-- Hamburger button — visible only on mobile/tablet -->
      <button class="hamburger" onclick="openMobileMenu()" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile overlay -->
  <div id="menuOverlay" class="menu-overlay" onclick="closeMobileMenu()"></div>

  <!-- Mobile drawer -->
  <div id="mobileMenu" class="mobile-menu">
    <div class="mob-header">
      <div class="nav-logo" style="border:none;padding:0">
        <div class="nav-logo-mark">🎮</div>
        <span class="nav-logo-text">Game<span>Vault</span></span>
      </div>
      <button class="mob-close" onclick="closeMobileMenu()">✕</button>
    </div>
    <div class="mob-links">${mobileLinks}</div>
    <div class="mob-footer">
      <button class="mob-theme-btn" onclick="toggleTheme()">🌙 Cambiar Tema</button>
      <button class="mob-search-btn" onclick="closeMobileMenu(); openSearch()">🔍 Buscar</button>
    </div>
  </div>`;
}
