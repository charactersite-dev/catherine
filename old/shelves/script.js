// stars (home only)
const starsEl = document.getElementById('stars');
if (starsEl) {
  for (let i = 0; i < 140; i++) {
    const div = document.createElement('div');
    div.className = 'star';
    div.style.left = Math.random()*100 + '%';
    div.style.top  = Math.random()*100 + '%';
    starsEl.appendChild(div);
  }
}

// NAV SPARKLES (THIS WAS LOST)
const SPARKS = ['✦','✧','⋆','·','*','✺'];
const COLORS = ['#c9e8f4','#dceeff','#b8d8f0','#e0f0ff'];

document.querySelectorAll('.nav-list li a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    for (let i = 0; i < 5; i++) {
      const sp = document.createElement('span');
      sp.className = 'nav-sparkle';
      sp.textContent = SPARKS[Math.floor(Math.random()*SPARKS.length)];

      sp.style.setProperty('--dx', ((Math.random()-0.5)*28)+'px');
      sp.style.setProperty('--dy', ((Math.random()-0.5)*20)+'px');

      sp.style.left = (20 + Math.random()*60) + '%';
      sp.style.top  = (10 + Math.random()*80) + '%';

      link.appendChild(sp);
      sp.addEventListener('animationend', () => sp.remove());
    }
  });
});