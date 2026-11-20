(function(){

  // ── Header (site title + subtitle) ──
  var header = document.getElementById('layout-header');
  if(header){
    header.innerHTML = `
      <div class="top-header">
        <a href="index.html" style="text-decoration:none;display:block;">
          <svg width="100%" viewBox="0 0 860 110" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stop-color="#ff8fd4"/>
                <stop offset="20%"  stop-color="#c97fff"/>
                <stop offset="40%"  stop-color="#82cfff"/>
                <stop offset="60%"  stop-color="#caffbf"/>
                <stop offset="80%"  stop-color="#ffb3e8"/>
                <stop offset="100%" stop-color="#ffd97a"/>
              </linearGradient>
            </defs>
            <text x="432" y="62" text-anchor="middle" font-family="'Press Start 2P', cursive" font-size="32" fill="white" opacity="0.9" letter-spacing="1">CallMeCatherine</text>
            <text x="430" y="60" text-anchor="middle" font-family="'Press Start 2P', cursive" font-size="32" fill="url(#titleGrad)" letter-spacing="1">CallMeCatherine</text>
            <text x="430" y="90" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="12" fill="#ffffff" letter-spacing="3" font-weight="700" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.7)) drop-shadow(0 0 8px rgba(80,0,120,0.6));">MY LITTLE CORNER OF THE WEB</text>
          </svg>
        </a>
      </div>`;
  }

  // ── Sidebar ──
  var sidebar = document.getElementById('layout-sidebar');
  if(sidebar){
    sidebar.innerHTML = `
      <aside class="sidebar">

        <div class="sidebar-card">
          <h3>Explore</h3>
          <img src="assets/artworkneocDIVcrop.gif" alt="">
          <ul>
            <li><a href="blinkies.html">Blinkies</a></li>
            <li><a href="dividers.html">Dividers</a></li>
            <li><a href="trinkets.html">Trinkets</a></li>
            <li><a href="kao.html">Kao Ani</a></li>
            <li><a href="dollhouse.html">Dolls</a></li>
            <li><a href="aquarium.html">Pixel Aquarium</a></li>
            <li><a href="greenhouse.html">Pixel Garden</a></li>
            <li><a href="people.html">Pixel People</a></li>
            <li><a href="space.html">Pixel Space</a></li>
            <li><a href="cliques.html">Cliques & Clubs</a></li>
          </ul>
        </div>

        <div class="sidebar-card">
          <h3>Clubs</h3>
          <img src="assets/artworkneocDIVcrop.gif" alt="">
          <div class="sidebar-links">
            <a href="https://scentedclub.neocities.org/"><img src="assets/scented-img.png" alt="" class="club-button"> Cotton Candy</a>
            <a href="https://callmecatherine.neocities.org/journal/journal">Sisterhood of the Traveling Journal</a>
          </div>
        </div>

        <div class="sidebar-card">
          <h3>My Other Links</h3>
          <img src="assets/artworkneocDIVcrop.gif" alt="">
          <div class="sidebar-links">
            <a href="https://penningmermaid.neocities.org/">My OCs</a>
            <a href="#">External 2</a>
          </div>
        </div>

      </aside>`;
  }

  // ── Footer ──
  var footer = document.getElementById('layout-footer');
  if(footer){
    footer.innerHTML = `
      <footer>
        <a href="https://callmecatherine.neocities.org/">
          <img src="assets/backtohome.gif" alt="Back to Home" style="image-rendering:pixelated;">
        </a>
      </footer>`;
  }

})();

// ── Back to top button (fixed, bottom-right, always visible) ──
(function(){
  var btn = document.createElement('a');
  btn.href = '#';
  btn.title = 'Back to top';
  btn.innerHTML = '↑';
  btn.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'z-index:9999',
    'width:40px',
    'height:40px',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'background:rgba(255,255,255,0.7)',
    'backdrop-filter:blur(8px)',
    '-webkit-backdrop-filter:blur(8px)',
    'border:1px solid rgba(255,255,255,0.8)',
    'border-radius:50%',
    'text-decoration:none',
    'color:#7030a0',
    'font-size:18px',
    'font-weight:bold',
    'box-shadow:0 2px 10px rgba(120,60,180,0.2)',
    'transition:background 0.2s,transform 0.2s'
  ].join(';');
  btn.onmouseover = function(){ this.style.background='rgba(255,255,255,0.95)'; this.style.transform='translateY(-3px)'; };
  btn.onmouseout  = function(){ this.style.background='rgba(255,255,255,0.7)';  this.style.transform='translateY(0)'; };
  btn.addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(btn);
})();