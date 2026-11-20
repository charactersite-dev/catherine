/* ============================================================
   gallery.js — shared pixel shelves for the collection pages.
   Load after layout.js.

   Gallery.sections(containerId, [{label:'Beach', items:[...]}, ...], {max:200, min:50})
   Gallery.shelf(containerId, items, {max:200, min:30})

   An item is either {href, src, alt} or [href, src, alt].
   {break:true} starts a new row.
   Images are capped at `max` px by CSS (no layout jump) and
   tiny ones are scaled up to `min` px once they load.
   ============================================================ */
(function(){

  function norm(item){
    return Array.isArray(item) ? { href:item[0], src:item[1], alt:item[2] } : item;
  }

  function growTiny(img, min){
    var w = img.naturalWidth, h = img.naturalHeight;
    if(!w || !h || (w >= min && h >= min)) return;
    var sc = Math.max(min / w, min / h);
    img.style.width = Math.round(w * sc) + 'px';
    img.style.height = Math.round(h * sc) + 'px';
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
  }

  function shelf(target, items, opts){
    opts = opts || {};
    var c = typeof target === 'string' ? document.getElementById(target) : target;
    if(!c) return;
    c.classList.add('shelf');
    if(opts.max) c.style.setProperty('--max', opts.max + 'px');
    var row = document.createElement('div');
    row.className = 'row';
    c.appendChild(row);
    items.forEach(function(raw){
      var item = norm(raw);
      if(item.break){
        row = document.createElement('div');
        row.className = 'row';
        c.appendChild(row);
        return;
      }
      if(!item.src) return;
      var a = document.createElement(item.href ? 'a' : 'span');
      if(item.href){
        a.href = item.href;
        a.target = '_blank';
        a.rel = 'noopener';
      }
      var img = document.createElement('img');
      img.alt = item.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      // Hide anything that fails to load instead of showing a broken icon
      img.onerror = function(){ a.hidden = true; };
      if(opts.min){
        img.onload = function(){ growTiny(img, opts.min); };
      }
      img.src = item.src;
      a.appendChild(img);
      row.appendChild(a);
    });
  }

  function sections(target, list, opts){
    var c = typeof target === 'string' ? document.getElementById(target) : target;
    if(!c) return;
    list.forEach(function(s){
      var sec = document.createElement('section');
      sec.className = 'gallery-section';
      var title = document.createElement('div');
      title.className = 'section-title';
      title.setAttribute('aria-label', s.label);
      title.innerHTML = window.makeLetters(s.label);
      var body = document.createElement('div');
      sec.appendChild(title);
      sec.appendChild(body);
      c.appendChild(sec);
      shelf(body, s.items, opts);
    });
  }

  window.Gallery = { shelf: shelf, sections: sections };

})();
