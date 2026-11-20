// Cursor sparkle — ★ stars, bright palette, snappy follow
(function(){
  var sparkles=50;
  var x=400, ox=400, y=300, oy=300;
  var shigh=600;
  var stars=[], starv=[], starx=[], stary=[];
  var tinys=[], tinyv=[], tinyx=[], tinyy=[];

  function createStar(){
    var d=document.createElement('div');
    d.style.cssText='position:fixed;pointer-events:none;line-height:1;visibility:hidden;z-index:999999;user-select:none;transition:none;';
    d.textContent='★';
    document.body.appendChild(d);
    return d;
  }
  function createTiny(){
    var d=document.createElement('div');
    d.style.cssText='position:fixed;pointer-events:none;line-height:1;visibility:hidden;z-index:999999;user-select:none;transition:none;';
    d.textContent='✦';
    document.body.appendChild(d);
    return d;
  }

  // Bright, saturated colors only
  var palette=[
    '#ff3399','#ff66cc','#ff99ff','#cc66ff','#9966ff',
    '#66ccff','#33ffcc','#ffff33','#ff6633','#ff99cc',
    '#00ffcc','#ff00ff','#ffcc00','#00ccff','#ff6699'
  ];
  function randColor(){ return palette[Math.floor(Math.random()*palette.length)]; }

  function init(){
    for(var i=0;i<sparkles;i++){
      stars[i]=createStar(); tinys[i]=createTiny();
      starv[i]=0; tinyv[i]=0;
      starx[i]=0; stary[i]=0;
      tinyx[i]=0; tinyy[i]=0;
    }
    set_height(); loop();
  }

  function loop(){
    // Lower threshold = picks up movement faster
    if(Math.abs(x-ox)>0.5||Math.abs(y-oy)>0.5){
      ox=x; oy=y;
      for(var i=0;i<sparkles;i++){
        if(!starv[i]){
          var sz=(7+Math.random()*6)+'px'; // 7–13px — smaller
          starx[i]=x; stary[i]=y;
          stars[i].style.fontSize=sz;
          stars[i].style.left=(x-6)+'px';
          stars[i].style.top=(y-6)+'px';
          stars[i].style.color=randColor();
          stars[i].style.opacity='1';
          stars[i].style.visibility='visible';
          starv[i]=40; // shorter life = snappier
          break;
        }
      }
    }
    for(var i=0;i<sparkles;i++){
      if(starv[i]) tickStar(i);
      if(tinyv[i]) tickTiny(i);
    }
    setTimeout(loop,20); // 20ms instead of 40ms = twice as fast
  }

  function tickStar(i){
    starv[i]--;
    stary[i]+=2+Math.random()*3; // falls faster
    starx[i]+=(i%5-2)*0.5;
    stars[i].style.opacity=(starv[i]/40).toFixed(2);
    if(stary[i]<shigh && starv[i]>0){
      stars[i].style.top=stary[i]+'px';
      stars[i].style.left=(starx[i]-6)+'px';
    } else {
      stars[i].style.visibility='hidden';
      tinyv[i]=20;
      tinyx[i]=starx[i]; tinyy[i]=stary[i];
      tinys[i].style.fontSize='5px';
      tinys[i].style.left=(tinyx[i]-3)+'px';
      tinys[i].style.top=tinyy[i]+'px';
      tinys[i].style.color=stars[i].style.color;
      tinys[i].style.opacity='1';
      tinys[i].style.visibility='visible';
      starv[i]=0;
    }
  }

  function tickTiny(i){
    tinyv[i]--;
    tinyy[i]+=2+Math.random()*2;
    tinyx[i]+=(i%5-2)*0.5;
    tinys[i].style.opacity=(tinyv[i]/20).toFixed(2);
    if(tinyy[i]<shigh && tinyv[i]>0){
      tinys[i].style.top=tinyy[i]+'px';
      tinys[i].style.left=(tinyx[i]-3)+'px';
    } else {
      tinys[i].style.visibility='hidden';
      tinyv[i]=0;
    }
  }

  document.addEventListener('mousemove',function(e){ x=e.clientX; y=e.clientY; });
  function set_height(){ shigh=window.innerHeight||600; }
  window.addEventListener('resize',set_height);

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else { init(); }
})();