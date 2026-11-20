/* ============================================================
   layout.js — shared header, sidebar, footer, back-to-top,
   bouncing rainbow titles and the stars + clouds sky.
   Load on every page:  <script src="layout.js"></script>
   ============================================================ */
(function(){

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Header (site title + subtitle) ──
  var header = document.getElementById('layout-header');
  if(header){
    header.innerHTML = `
      <div class="top-header">
        <a href="index.html" class="top-header-link" aria-label="CallMeCatherine home">
          <svg width="100%" viewBox="0 0 860 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

        <nav class="sidebar-card" aria-label="Explore">
          <h3>Explore</h3>
          <img src="assets/artworkneocDIVcrop.gif" alt="">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="blinkies.html">Blinkies</a></li>
            <li><a href="dividers.html">Dividers</a></li>
            <li><a href="trinkets.html">Trinkets</a></li>
            <li><a href="kao.html">Kao Ani</a></li>
            <li><a href="dollhouse.html">Dolls</a></li>
            <li><a href="aquarium.html">Pixel Aquarium</a></li>
            <li><a href="greenhouse.html">Pixel Garden</a></li>
            <li><a href="people.html">Pixel People</a></li>
            <li><a href="space.html">Pixel Space</a></li>
            <li><a href="cliques.html">Cliques &amp; Clubs</a></li>
          </ul>
        </nav>

        <div class="sidebar-card">
          <h3>Clubs</h3>
          <img src="assets/artworkneocDIVcrop.gif" alt="">
          <div class="sidebar-links">
            <a href="https://scentedclub.neocities.org/"><img src="assets/scented-img.png" alt="" class="club-button"> Cotton Candy</a>
            <a href="journal/journal.html">Sisterhood of the Traveling Journal</a>
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

    // Mark the page you're on (works with and without ".html" in the URL)
    var here = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
    sidebar.querySelectorAll('nav a').forEach(function(a){
      if(a.getAttribute('href').replace(/\.html$/, '') === here){
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // ── Footer ──
  var footer = document.getElementById('layout-footer');
  if(footer){
    footer.innerHTML = `
      <footer>
        <a href="index.html">
          <img src="assets/backtohome.gif" alt="Back to Home">
        </a>
      </footer>`;
  }

  // ── Bouncing rainbow titles: <div class="section-title" data-letters="Beach"></div> ──
  window.makeLetters = function(label){
    var n = 0;
    return label.split('').map(function(c){
      if(c === ' ') return '<span class="gap"></span>';
      return '<span class="letter" style="--i:' + (n++) + '">' + c + '</span>';
    }).join('');
  };
  document.querySelectorAll('[data-letters]').forEach(function(el){
    el.innerHTML = makeLetters(el.getAttribute('data-letters'));
    el.setAttribute('aria-label', el.getAttribute('data-letters'));
  });

  // ── Stars + clouds sky (pages with <div id="stars"> / <div id="clouds">) ──
  var S = document.getElementById('stars'), C = document.getElementById('clouds');
  if(S && !S.childElementCount){
    for(var i = 0; i < 28; i++){
      var s = document.createElement('div');
      var sz = (1.5 + Math.random() * 2.5).toFixed(1);
      s.className = 'sky-star';
      s.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 45).toFixed(1) + '%;--lo:' + (0.2 + Math.random() * 0.35).toFixed(2) + ';animation-duration:' + (2 + Math.random() * 3).toFixed(1) + 's;animation-delay:' + (-Math.random() * 4).toFixed(1) + 's;';
      S.appendChild(s);
    }
  }
  if(C && !C.childElementCount){
    [{sz:220,bot:0,dur:38,dl:0,op:.85},{sz:170,bot:0,dur:28,dl:-10,op:.75},{sz:270,bot:0,dur:46,dl:-22,op:.80},
     {sz:140,bot:18,dur:24,dl:-6,op:.68},{sz:200,bot:8,dur:40,dl:-30,op:.72},{sz:160,bot:12,dur:32,dl:-16,op:.70}]
    .forEach(function(c, i){
      var w = document.createElement('div'), sz = c.sz;
      w.className = 'sky-cloud';
      w.style.cssText = 'bottom:' + c.bot + 'px;--start:' + (220 + i * 200) + 'px;animation-duration:' + c.dur + 's;animation-delay:' + c.dl + 's;opacity:' + c.op + ';';
      w.innerHTML = '<div class="puff" style="width:' + sz + 'px;height:' + Math.round(sz * .36) + 'px;">'
        + '<i style="width:' + Math.round(sz * .46) + 'px;height:' + Math.round(sz * .46) + 'px;top:-' + Math.round(sz * .23) + 'px;left:' + Math.round(sz * .12) + 'px;"></i>'
        + '<i style="width:' + Math.round(sz * .36) + 'px;height:' + Math.round(sz * .36) + 'px;top:-' + Math.round(sz * .18) + 'px;left:' + Math.round(sz * .45) + 'px;"></i>'
        + '</div>';
      C.appendChild(w);
    });
  }

  // ── Hide any picture that fails to load (no broken-image icons) ──
  function hideBroken(img){
    var link = img.parentElement && img.parentElement.tagName === 'A' ? img.parentElement : null;
    (link && link.children.length === 1 ? link : img).hidden = true;
  }
  document.addEventListener('error', function(e){
    var img = e.target;
    if(img && img.tagName === 'IMG' && img.closest('.main-content')) hideBroken(img);
  }, true);
  // ...including ones that already failed before this script ran
  document.querySelectorAll('.main-content img').forEach(function(img){
    if(img.complete && img.getAttribute('src') && img.naturalWidth === 0) hideBroken(img);
  });

  // ── Back to top (fixed, bottom-right, shows after scrolling) ──
  var btn = document.createElement('a');
  btn.href = '#';
  btn.className = 'to-top';
  btn.title = 'Back to top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  btn.addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  document.body.appendChild(btn);
  var onScroll = function(){ btn.classList.toggle('is-visible', window.scrollY > 400); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

})();
