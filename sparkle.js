// Cursor sparkle — ★ stars, bright palette, snappy follow
// Runs only while sparkles are on screen, and only for mouse users
// who haven't asked their system for reduced motion.
(function(){
  if(!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var sparkles=50, STEP=20; // one animation step every 20ms
  var x=400, ox=400, y=300, oy=300;
  var shigh=600;
  var stars=[], starv=[], starx=[], stary=[];
  var tinys=[], tinyv=[], tinyx=[], tinyy=[];
  var running=false, last=0, acc=0;

  // Bright, saturated colors only
  var palette=[
    '#ff3399','#ff66cc','#ff99ff','#cc66ff','#9966ff',
    '#66ccff','#33ffcc','#ffff33','#ff6633','#ff99cc',
    '#00ffcc','#ff00ff','#ffcc00','#00ccff','#ff6699'
  ];
  function randColor(){ return palette[Math.floor(Math.random()*palette.length)]; }

  function make(ch){
    var d=document.createElement('div');
    d.className='sparkle-bit';
    d.setAttribute('aria-hidden','true');
    d.textContent=ch;
    document.body.appendChild(d);
    return d;
  }
  function place(el,px,py){ el.style.transform='translate('+px+'px,'+py+'px)'; }

  function init(){
    for(var i=0;i<sparkles;i++){
      stars[i]=make('★'); tinys[i]=make('✦');
      starv[i]=0; tinyv[i]=0;
      starx[i]=0; stary[i]=0;
      tinyx[i]=0; tinyy[i]=0;
    }
    set_height();
    document.addEventListener('mousemove',function(e){ x=e.clientX; y=e.clientY; wake(); },{passive:true});
    window.addEventListener('resize',set_height);
  }

  function wake(){
    if(running) return;
    running=true; last=performance.now(); acc=0;
    requestAnimationFrame(frame);
  }

  function frame(now){
    acc+=Math.min(now-last,100); last=now;
    var busy=true;
    while(acc>=STEP){ busy=step(); acc-=STEP; }
    if(busy) requestAnimationFrame(frame); else running=false;
  }

  // Returns true while anything is still moving
  function step(){
    var active=false;
    if(Math.abs(x-ox)>0.5||Math.abs(y-oy)>0.5){
      ox=x; oy=y; active=true;
      for(var i=0;i<sparkles;i++){
        if(!starv[i]){
          starx[i]=x; stary[i]=y;
          stars[i].style.fontSize=(7+Math.random()*6)+'px'; // 7–13px
          stars[i].style.color=randColor();
          stars[i].style.opacity='1';
          stars[i].style.visibility='visible';
          place(stars[i],x-6,y-6);
          starv[i]=40;
          break;
        }
      }
    }
    for(var j=0;j<sparkles;j++){
      if(starv[j]){ tickStar(j); active=true; }
      if(tinyv[j]){ tickTiny(j); active=true; }
    }
    return active;
  }

  function tickStar(i){
    starv[i]--;
    stary[i]+=2+Math.random()*3;
    starx[i]+=(i%5-2)*0.5;
    stars[i].style.opacity=(starv[i]/40).toFixed(2);
    if(stary[i]<shigh && starv[i]>0){
      place(stars[i],starx[i]-6,stary[i]);
    } else {
      stars[i].style.visibility='hidden';
      tinyv[i]=20;
      tinyx[i]=starx[i]; tinyy[i]=stary[i];
      tinys[i].style.fontSize='5px';
      tinys[i].style.color=stars[i].style.color;
      tinys[i].style.opacity='1';
      tinys[i].style.visibility='visible';
      place(tinys[i],tinyx[i]-3,tinyy[i]);
      starv[i]=0;
    }
  }

  function tickTiny(i){
    tinyv[i]--;
    tinyy[i]+=2+Math.random()*2;
    tinyx[i]+=(i%5-2)*0.5;
    tinys[i].style.opacity=(tinyv[i]/20).toFixed(2);
    if(tinyy[i]<shigh && tinyv[i]>0){
      place(tinys[i],tinyx[i]-3,tinyy[i]);
    } else {
      tinys[i].style.visibility='hidden';
      tinyv[i]=0;
    }
  }

  function set_height(){ shigh=window.innerHeight||600; }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else { init(); }
})();
