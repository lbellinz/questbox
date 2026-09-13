/* QuestBox — application logic */
(function(){
  "use strict";

  /* ===================== FONTS ===================== */
  var FONTS = window.__FONTS__ || {};
  var FONT_NAMES = Object.keys(FONTS);
  function weightFor(family, wantBold){ var w=FONTS[family]||{}; if(wantBold && w["700"]) return 700; return w["700"]&&!w["400"]?700:400; }

  /* ===================== I18N ===================== */
  var I18N = {
    en:{
      phase:"· Retro RPG textbox & GIF maker", tag_gif:"GIF in browser", coffee:"Buy me a coffee", oss:"Free & open source · fonts SIL OFL · gifenc MIT",
      font_loading:"loading fonts…", font_ready:"fonts ready ✓", font_fallback:"system font (fallback)",
      g_preset:"Style preset",
      g_boxes:"Dialog boxes", b_addbox:"+ Add box",
      t_up:"Move up", t_down:"Move down", t_dup:"Duplicate", t_del:"Delete", noname:"(no name)", empty:"(empty)",
      g_editbox:"Edit selected box",
      l_name:"Character name", ph_name:"(empty = no name)",
      l_text:"Text (line break = new line)",
      hint_color:"To color a word: select it in the field above, then click a color. Click ✕ to remove color.",
      l_menu:"Final menu (selection arrow ▶)", l_menuopts:"Options (one per line)", l_menusel:"Selected option",
      g_bg:"Background / Photo", l_bgmode:"Background", opt_color:"Solid color", opt_image:"Photo (overlay)",
      l_bgimg:"Your image (stays in your browser — never uploaded)", b_bgremove:"Remove image",
      l_outw:"Output width — px", l_boxpos:"Box position", pos_bottom:"Bottom", pos_center:"Center", pos_top:"Top",
      hint_photo:"The textbox is composited over your photo on export. Note: GIF is limited to 256 colors, so a photo looks best via PNG export.",
      g_timing:"Timing",
      l_speed:"Typing speed — ms per character", l_punct:"Pause after punctuation (. ! ?) — ms",
      l_start:"Pause before each box (empty) — ms", l_read:"Reading pause after text — ms",
      l_between:"Pause between boxes — ms", l_menudur:"Final menu duration — ms",
      l_arrow:'Blinking "continue" arrow ▼',
      g_style:"Box style", l_font:"Font", l_width:"Box width — px", l_boxheight:"Box height — px", l_fontsize:"Font size — px", l_radius:"Corner radius — px", l_border:"Border width — px",
      g_colors:"Colors", c_backdrop:"Background", c_box:"Box", c_border:"Border", c_text:"Text", c_name:"Name", c_arrow:"Cont. arrow", c_select:"Menu arrow",
      l_frame:"Frame", b_play:"▶ Play", b_pause:"⏸ Pause",
      b_gif:"⬇ Export GIF", b_gif_busy:"Rendering…", b_png:"⬇ Export PNG (frame)",
      b_mp4:"⬇ Export MP4", b_vid_busy:"Encoding…", l_vidsize:"Video:", asp_native:"Native",
      r_gif_ok:"GIF generated ✓", r_png_ok:"PNG generated ✓", r_mp4_ok:"MP4 generated ✓", r_webm_ok:"WebM generated ✓ (this browser can't make MP4)", r_vid_hint:"{w}×{h} · {s}s · loops automatically in Stories.", r_err:"Export error",
      r_gif_hint:'If the download does not start, right-click the image → "Save image". {n} frames · {kb} KB',
      r_png_hint:"Current frame (full color). {w}×{h} px.",
      foot:'Presets, multiple free fonts and photo overlay — all rendered by the <b>same engine</b> for preview and GIF. '
          +'Your photo stays in your browser and is never uploaded. '
          +'Fonts <b>JetBrains&nbsp;Mono</b>, <b>VT323</b>, <b>Pixelify&nbsp;Sans</b> (SIL OFL) · encoder <b>gifenc</b> (MIT).'
    },
    it:{
      phase:"· Generatore di textbox e GIF stile RPG", tag_gif:"GIF nel browser", coffee:"Offrimi un caffè", oss:"Libero e open source · font SIL OFL · gifenc MIT",
      font_loading:"carico font…", font_ready:"font pronti ✓", font_fallback:"font di sistema (fallback)",
      g_preset:"Preset di stile",
      g_boxes:"Box di dialogo", b_addbox:"+ Aggiungi box",
      t_up:"Sposta su", t_down:"Sposta giù", t_dup:"Duplica", t_del:"Elimina", noname:"(senza nome)", empty:"(vuoto)",
      g_editbox:"Modifica box selezionato",
      l_name:"Nome personaggio", ph_name:"(vuoto = nessun nome)",
      l_text:"Testo (a capo = nuova riga)",
      hint_color:"Per colorare una parola: selezionala nel campo qui sopra, poi clicca un colore. Clicca ✕ per rimuovere il colore.",
      l_menu:"Menù finale (freccia di selezione ▶)", l_menuopts:"Opzioni (una per riga)", l_menusel:"Opzione selezionata",
      g_bg:"Sfondo / Foto", l_bgmode:"Tipo sfondo", opt_color:"Colore pieno", opt_image:"Foto (overlay)",
      l_bgimg:"La tua immagine (resta nel browser — mai caricata)", b_bgremove:"Rimuovi immagine",
      l_outw:"Larghezza output — px", l_boxpos:"Posizione box", pos_bottom:"Basso", pos_center:"Centro", pos_top:"Alto",
      hint_photo:"La textbox viene composta sopra la tua foto in fase di export. Nota: la GIF è limitata a 256 colori, quindi con una foto il risultato migliore è via export PNG.",
      g_timing:"Tempistiche",
      l_speed:"Velocità battitura — ms per carattere", l_punct:"Pausa dopo punteggiatura (. ! ?) — ms",
      l_start:"Pausa prima di ogni box (vuoto) — ms", l_read:"Pausa di lettura dopo il testo — ms",
      l_between:"Pausa tra un box e l'altro — ms", l_menudur:"Durata schermata menù — ms",
      l_arrow:'Freccia "continua" ▼ lampeggiante',
      g_style:"Stile box", l_font:"Font", l_width:"Larghezza box — px", l_boxheight:"Altezza box — px", l_fontsize:"Dimensione font — px", l_radius:"Raggio angoli — px", l_border:"Spessore bordo — px",
      g_colors:"Colori", c_backdrop:"Sfondo", c_box:"Box", c_border:"Bordo", c_text:"Testo", c_name:"Nome", c_arrow:"Freccia cont.", c_select:"Freccia menù",
      l_frame:"Frame", b_play:"▶ Play", b_pause:"⏸ Pausa",
      b_gif:"⬇ Esporta GIF", b_gif_busy:"Genero…", b_png:"⬇ Esporta PNG (frame)",
      b_mp4:"⬇ Esporta MP4", b_vid_busy:"Codifico…", l_vidsize:"Video:", asp_native:"Nativo",
      r_gif_ok:"GIF generata ✓", r_png_ok:"PNG generato ✓", r_mp4_ok:"MP4 generato ✓", r_webm_ok:"WebM generato ✓ (questo browser non genera MP4)", r_vid_hint:"{w}×{h} · {s}s · va in loop nelle Stories.", r_err:"Errore export",
      r_gif_hint:'Se il download non parte, clic destro sull\'immagine → "Salva immagine". {n} frame · {kb} KB',
      r_png_hint:"Frame corrente (colore pieno). {w}×{h} px.",
      foot:'Preset, più font liberi e overlay su foto — tutto reso dallo <b>stesso motore</b> per anteprima e GIF. '
          +'La tua foto resta nel browser e non viene mai caricata. '
          +'Font <b>JetBrains&nbsp;Mono</b>, <b>VT323</b>, <b>Pixelify&nbsp;Sans</b> (SIL OFL) · encoder <b>gifenc</b> (MIT).'
    }
  };
  var lang="en", fontStatusKey="font_loading";
  function t(key,vars){ var s=(I18N[lang]&&I18N[lang][key])||I18N.en[key]||key; if(vars) for(var k in vars) s=s.replace('{'+k+'}',vars[k]); return s; }
  function applyI18n(){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){ var k=el.getAttribute('data-i18n'); if(el.getAttribute('data-i18n-html')) el.innerHTML=t(k); else el.textContent=t(k); });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){ el.placeholder=t(el.getAttribute('data-i18n-ph')); });
    document.getElementById('lang-en').classList.toggle('active',lang==='en');
    document.getElementById('lang-it').classList.toggle('active',lang==='it');
    document.getElementById('fontstatus').textContent=t(fontStatusKey);
    updatePlayBtn(); renderBoxList(); loadBoxEditor(); renderPresets();
  }

  /* ===================== PRESETS (generic names, free fonts) ===================== */
  var PRESETS = [
    { id:"retro_rpg",  name:"Retro RPG",     desc:"navy & gold",     style:{fontFamily:"JetBrains Mono",cornerRadius:14,borderWidth:3}, colors:{backdrop:"#14151a",boxBg:"#0b0e18",borderColor:"#e08a2b",nameColor:"#e8a33d",textColor:"#ffffff",arrowColor:"#e8a33d",selectColor:"#e5533b"} },
    { id:"underground",name:"Underground",   desc:"black & white",   style:{fontFamily:"JetBrains Mono",cornerRadius:6,borderWidth:4},  colors:{backdrop:"#000000",boxBg:"#000000",borderColor:"#ffffff",nameColor:"#f2c14e",textColor:"#ffffff",arrowColor:"#ffffff",selectColor:"#ff5a3c"} },
    { id:"crystal",    name:"Crystal Quest", desc:"deep blue JRPG",  style:{fontFamily:"JetBrains Mono",cornerRadius:10,borderWidth:3}, colors:{backdrop:"#05060f",boxBg:"#122a63",borderColor:"#8fc0ff",nameColor:"#ffe873",textColor:"#ffffff",arrowColor:"#bcd8ff",selectColor:"#ffd34d"} },
    { id:"classic16",  name:"16-bit Classic",desc:"NES white/blue",  style:{fontFamily:"Pixelify Sans",cornerRadius:4,borderWidth:4},   colors:{backdrop:"#2c60d6",boxBg:"#f8f8f8",borderColor:"#101820",nameColor:"#c0392b",textColor:"#181818",arrowColor:"#101820",selectColor:"#c0392b"} },
    { id:"parchment",  name:"Parchment",     desc:"aged paper",      style:{fontFamily:"JetBrains Mono",cornerRadius:8,borderWidth:4},  colors:{backdrop:"#b89b6e",boxBg:"#efe2c0",borderColor:"#6e4a26",nameColor:"#8a2b1a",textColor:"#33241a",arrowColor:"#6e4a26",selectColor:"#8a2b1a"} },
    { id:"terminal",   name:"Terminal",      desc:"green phosphor",  style:{fontFamily:"VT323",cornerRadius:4,borderWidth:2},           colors:{backdrop:"#020a02",boxBg:"#031403",borderColor:"#37e63a",nameColor:"#b6ffb6",textColor:"#5ef06a",arrowColor:"#5ef06a",selectColor:"#5ef06a"} },
    { id:"bubble",     name:"Bubble",        desc:"soft speech box", style:{fontFamily:"JetBrains Mono",cornerRadius:26,borderWidth:3}, colors:{backdrop:"#eef3d6",boxBg:"#ffffff",borderColor:"#7ec850",nameColor:"#e0563f",textColor:"#333333",arrowColor:"#4aa0e0",selectColor:"#4aa0e0"} },
    { id:"shadow",     name:"Shadow",        desc:"crimson accent",  style:{fontFamily:"JetBrains Mono",cornerRadius:8,borderWidth:3},  colors:{backdrop:"#0a0a0d",boxBg:"#16121a",borderColor:"#d23a2a",nameColor:"#ffb03b",textColor:"#ffffff",arrowColor:"#ffb03b",selectColor:"#ffd34d"} },
    { id:"emerald",    name:"Emerald",       desc:"green & gold",    style:{fontFamily:"JetBrains Mono",cornerRadius:12,borderWidth:3}, colors:{backdrop:"#07130c",boxBg:"#0f3320",borderColor:"#d4b24a",nameColor:"#ffd873",textColor:"#f3ecd2",arrowColor:"#ffd873",selectColor:"#e5533b"} },
    { id:"frost",      name:"Frost",         desc:"icy blue",        style:{fontFamily:"JetBrains Mono",cornerRadius:14,borderWidth:3}, colors:{backdrop:"#081722",boxBg:"#0d2a3d",borderColor:"#bfeaff",nameColor:"#8fe1ff",textColor:"#eaf7ff",arrowColor:"#bfeaff",selectColor:"#5fd6ff"} }
  ];
  var activePreset = "retro_rpg";

  /* ===================== PROJECT STATE ===================== */
  var project = {
    boxes: [
      { name:"Sir Fungus", text:"Take one of my mushrooms.\nIt may restore your HP.", spans:[{start:15,end:24,color:"#e8a33d"}], menu:null },
      { name:"Sir Fungus", text:"They grow near the old ruins to the north.", spans:[], menu:null },
      { name:"Player 1", text:"Take a mushroom?", spans:[], menu:{ options:["Yes","No"], selected:0 } }
    ],
    timing:{ msPerChar:45, punctPause:300, startPause:200, readPause:1400, betweenPause:250, menuDuration:2600 },
    style:{ fontFamily:"JetBrains Mono", boxWidth:520, boxHeight:175, fontSize:22, lineSpacing:1.4, cornerRadius:14, borderWidth:3, margin:14, innerPad:18 },
    colors:{ backdrop:"#14151a", boxBg:"#0b0e18", borderColor:"#e08a2b", nameColor:"#e8a33d", textColor:"#ffffff", arrowColor:"#e8a33d", selectColor:"#e5533b" },
    bg:{ mode:"color", img:null, outputWidth:640, anchor:"bottom" },
    video:{ aspect:"native", fps:30 },
    showArrow:true
  };
  var sel=0;
  var PALETTE=['#e8a33d','#e5533b','#5fd66f','#6ea8ff','#c98bff','#ffe873','#ff8fce','#ffffff'];

  /* ===================== UTILS ===================== */
  function snap(ms){ return Math.max(20,Math.round(ms/10)*10); }
  function hexToRgb(hex){ var c=hex.replace('#',''); if(c.length===3) c=c.split('').map(function(x){return x+x;}).join(''); var n=parseInt(c,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  function lighten(hex,amt){ var r=hexToRgb(hex); return 'rgb('+Math.min(255,r[0]+amt)+','+Math.min(255,r[1]+amt)+','+Math.min(255,r[2]+amt)+')'; }
  function roundRect(ctx,x,y,w,h,r){ r=Math.max(0,Math.min(r,w/2,h/2)); ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
  function fontString(px,family,weight){ return (weight||400)+' '+px+'px "'+family+'", monospace'; }
  function isSentenceEnd(ch){ return ch==='.'||ch==='!'||ch==='?'; }
  function isClausePause(ch){ return ch===','||ch===';'||ch===':'; }
  function offToCell(str,off){ return Array.from(str.slice(0,off)).length; }

  /* ===================== SPANS ===================== */
  function applyColorRange(spans,start,end,color){ var out=[]; for(var i=0;i<spans.length;i++){ var sp=spans[i]; if(sp.end<=start||sp.start>=end){ out.push(sp); continue; } if(sp.start<start) out.push({start:sp.start,end:start,color:sp.color}); if(sp.end>end) out.push({start:end,end:sp.end,color:sp.color}); } if(color) out.push({start:start,end:end,color:color}); out.sort(function(a,b){return a.start-b.start;}); return out; }
  function reconcileSpans(spans,oldText,newText){ if(oldText===newText) return spans; var A=Array.from(oldText),B=Array.from(newText),p=0,mn=Math.min(A.length,B.length); while(p<mn&&A[p]===B[p])p++; var s=0; while(s<(mn-p)&&A[A.length-1-s]===B[B.length-1-s])s++; var oe=A.length-s,ne=B.length-s,dl=ne-oe; function mS(x){return x<=p?x:(x>=oe?x+dl:p);} function mE(x){return x<=p?x:(x>=oe?x+dl:ne);} var out=[]; for(var i=0;i<spans.length;i++){ var st=mS(spans[i].start),en=mE(spans[i].end); st=Math.max(0,Math.min(st,B.length)); en=Math.max(0,Math.min(en,B.length)); if(en>st) out.push({start:st,end:en,color:spans[i].color}); } return out; }

  /* ===================== TEXT MODEL + WRAP ===================== */
  var mcanvas=document.createElement('canvas'), mctx=mcanvas.getContext('2d');
  function buildRichChars(b,def){ var cells=Array.from(b.text).map(function(ch){return {ch:ch,color:def};}); if(b.spans) for(var i=0;i<b.spans.length;i++){ var sp=b.spans[i]; for(var j=sp.start;j<sp.end&&j<cells.length;j++) cells[j].color=sp.color; } return cells; }
  function wrapChars(ctx,chars,maxWidth){ var lines=[],line=[],i=0; function measure(a){var s='';for(var k=0;k<a.length;k++)s+=a[k].ch;return ctx.measureText(s).width;}
    while(i<chars.length){ if(chars[i].ch==='\n'){ lines.push(line); line=[]; i++; continue; } var word=[]; while(i<chars.length&&chars[i].ch!=='\n'&&chars[i].ch!==' '){ word.push(chars[i]); i++; } var sp=[]; while(i<chars.length&&chars[i].ch===' '){ sp.push(chars[i]); i++; } if(line.length&&measure(line.concat(word))>maxWidth){ lines.push(line); line=word.concat(sp); } else line=line.concat(word).concat(sp); }
    lines.push(line); for(var L=0;L<lines.length;L++){ var acc=''; for(var c=0;c<lines[L].length;c++){ lines[L][c].x=ctx.measureText(acc).width; acc+=lines[L][c].ch; } } return lines; }

  /* ===================== GLOBAL LAYOUT ===================== */
  function computeGlobalLayout(){
    var st=project.style, cl=project.colors, bg=project.bg;
    var bodyWeight=weightFor(st.fontFamily,true);
    mctx.font=fontString(st.fontSize,st.fontFamily,bodyWeight); mctx.textBaseline='top';
    var lineHeight=Math.round(st.fontSize*st.lineSpacing);
    var nameSize=Math.max(10,Math.round(st.fontSize*0.62));
    // box width depends on mode
    var boxW = (bg.mode==='image') ? Math.min(st.boxWidth, bg.outputWidth-2*st.margin) : st.boxWidth;
    boxW=Math.max(120,boxW);
    var innerW=boxW-2*st.innerPad;
    var boxesL=[], maxContentH=0;
    for(var bi=0;bi<project.boxes.length;bi++){ var b=project.boxes[bi];
      var hasName=b.name.trim().length>0;
      var nameRowH=hasName?(nameSize+Math.round(st.fontSize*0.5)):0;
      var chars=buildRichChars(b,cl.textColor); var lines=wrapChars(mctx,chars,Math.max(20,innerW));
      var flat=[]; for(var li=0;li<lines.length;li++) for(var ci=0;ci<lines[li].length;ci++) flat.push(lines[li][ci]);
      var hasMenu=!!(b.menu&&b.menu.options&&b.menu.options.length);
      var menuGap=hasMenu?Math.round(st.fontSize*0.55):0, menuRows=hasMenu?b.menu.options.length:0;
      var contentH=nameRowH+Math.max(1,lines.length)*lineHeight+(hasMenu?(menuGap+menuRows*lineHeight):0);
      boxesL.push({hasName:hasName,nameRowH:nameRowH,lines:lines,flat:flat,total:flat.length,hasMenu:hasMenu,menuGap:menuGap,menuRows:menuRows});
      if(contentH>maxContentH) maxContentH=contentH;
    }
    var boxH=st.boxHeight; // fixed height — independent of font size / content (font has its own control)
    var canvasW,canvasH,boxX,boxTop;
    if(bg.mode==='image'){
      canvasW=bg.outputWidth;
      if(bg.img) canvasH=Math.max(boxH+2*st.margin, Math.round(canvasW*bg.img.height/bg.img.width));
      else canvasH=Math.max(boxH+2*st.margin, Math.round(canvasW*9/16));
      boxX=Math.round((canvasW-boxW)/2);
      if(bg.anchor==='top') boxTop=st.margin;
      else if(bg.anchor==='center') boxTop=Math.round((canvasH-boxH)/2);
      else boxTop=canvasH-st.margin-boxH;
      boxTop=Math.max(st.margin, Math.min(boxTop, canvasH-st.margin-boxH));
    } else {
      canvasW=boxW+2*st.margin; canvasH=boxH+2*st.margin; boxX=st.margin; boxTop=st.margin;
    }
    return { canvasW:canvasW, canvasH:canvasH, boxH:boxH, boxX:boxX, boxW:boxW, boxTop:boxTop, lineHeight:lineHeight, nameSize:nameSize, bodyWeight:bodyWeight, boxes:boxesL };
  }

  /* ===================== RENDER ===================== */
  function drawDown(ctx,x,y,w,color){ ctx.fillStyle=color; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+w,y); ctx.lineTo(x+w/2,y+w*0.7); ctx.closePath(); ctx.fill(); }
  function drawRight(ctx,x,y,h,color){ ctx.fillStyle=color; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+h); ctx.lineTo(x+h*0.72,y+h/2); ctx.closePath(); ctx.fill(); }
  function drawBackdrop(ctx,GL){
    var bg=project.bg;
    if(bg.mode==='image'&&bg.img){ ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high'; var img=bg.img; var s=Math.max(GL.canvasW/img.width,GL.canvasH/img.height); var dw=img.width*s,dh=img.height*s; ctx.drawImage(img,(GL.canvasW-dw)/2,(GL.canvasH-dh)/2,dw,dh); }
    else { ctx.fillStyle=project.colors.backdrop; ctx.fillRect(0,0,GL.canvasW,GL.canvasH); }
  }
  function drawBox(ctx,GL,idx,visible,opts){
    opts=opts||{}; var st=project.style, cl=project.colors, B=GL.boxes[idx], b=project.boxes[idx];
    if(opts.skipBackdrop){ ctx.clearRect(0,0,GL.canvasW,GL.canvasH); } else { drawBackdrop(ctx,GL); }
    ctx.imageSmoothingEnabled=false;
    roundRect(ctx,GL.boxX,GL.boxTop,GL.boxW,GL.boxH,st.cornerRadius); ctx.fillStyle=cl.boxBg; ctx.fill();
    if(st.borderWidth>0){
      ctx.lineWidth=2; ctx.strokeStyle=lighten(cl.boxBg,30);
      roundRect(ctx,GL.boxX+st.borderWidth,GL.boxTop+st.borderWidth,GL.boxW-2*st.borderWidth,GL.boxH-2*st.borderWidth,Math.max(0,st.cornerRadius-st.borderWidth)); ctx.stroke();
      ctx.lineWidth=st.borderWidth; ctx.strokeStyle=cl.borderColor;
      roundRect(ctx,GL.boxX+st.borderWidth/2,GL.boxTop+st.borderWidth/2,GL.boxW-st.borderWidth,GL.boxH-st.borderWidth,st.cornerRadius); ctx.stroke();
    }
    var textLeft=GL.boxX+st.innerPad;
    if(B.hasName){ ctx.font=fontString(GL.nameSize,st.fontFamily,GL.bodyWeight); ctx.textBaseline='top'; ctx.fillStyle=cl.nameColor; ctx.fillText(b.name,textLeft,GL.boxTop+st.innerPad); }
    var textTop=GL.boxTop+st.innerPad+B.nameRowH;
    ctx.font=fontString(st.fontSize,st.fontFamily,GL.bodyWeight); ctx.textBaseline='top';
    var remaining=visible;
    for(var k=0;k<B.lines.length;k++){ var ly=textTop+k*GL.lineHeight, ln=B.lines[k]; for(var c=0;c<ln.length;c++){ if(remaining<=0) break; ctx.fillStyle=ln[c].color; ctx.fillText(ln[c].ch,textLeft+ln[c].x,ly); remaining--; } if(remaining<=0) break; }
    if(opts.menuShow&&B.hasMenu){ var menuTop=textTop+B.lines.length*GL.lineHeight+B.menuGap; var aw=Math.round(st.fontSize*0.6);
      for(var m=0;m<b.menu.options.length;m++){ var oy=menuTop+m*GL.lineHeight;
        if(m===b.menu.selected&&opts.arrowOn) drawRight(ctx,textLeft,oy+Math.round(st.fontSize*0.12),Math.round(st.fontSize*0.72),cl.selectColor);
        ctx.font=fontString(st.fontSize,st.fontFamily,GL.bodyWeight); ctx.textBaseline='top'; ctx.fillStyle=cl.textColor; ctx.fillText(b.menu.options[m],textLeft+aw+8,oy);
      } }
    if(opts.contArrow){ var w2=Math.max(8,Math.round(st.fontSize*0.5)); drawDown(ctx,GL.boxX+GL.boxW-st.innerPad-w2,GL.boxTop+GL.boxH-st.innerPad-Math.round(w2*0.7),w2,cl.arrowColor); }
  }

  /* ===================== TIMELINE ===================== */
  function blinkPhase(tl,base,duration,flag){ var half=350,tt=0,on=true; while(tt<duration){ var dur=Math.min(half,duration-tt); var fr={i:base.i,v:base.v,d:snap(dur)}; if(base.menuShow) fr.menuShow=true; fr[flag]=on; tl.push(fr); on=!on; tt+=half; } }
  function buildSequence(GL){ var T=project.timing,tl=[],n=project.boxes.length;
    for(var i=0;i<n;i++){ var B=GL.boxes[i],isLast=(i===n-1);
      if(T.startPause>0) tl.push({i:i,v:0,d:snap(T.startPause)});
      if(B.total===0) tl.push({i:i,v:0,d:snap(200)});
      else for(var k=1;k<=B.total;k++){ var ch=B.flat[k-1].ch,extra=0; if(isSentenceEnd(ch))extra=T.punctPause; else if(isClausePause(ch))extra=Math.round(T.punctPause*0.5); tl.push({i:i,v:k,d:snap(T.msPerChar+extra)}); }
      if(B.hasMenu){ if(T.menuDuration>0) blinkPhase(tl,{i:i,v:B.total,menuShow:true},T.menuDuration,'arrowOn'); else tl.push({i:i,v:B.total,menuShow:true,arrowOn:true,d:snap(400)}); }
      else { if(project.showArrow&&T.readPause>0) blinkPhase(tl,{i:i,v:B.total},T.readPause,'contArrow'); else if(T.readPause>0) tl.push({i:i,v:B.total,d:snap(T.readPause)}); else tl.push({i:i,v:B.total,d:snap(150)}); if(!isLast&&T.betweenPause>0) tl.push({i:i,v:B.total,d:snap(T.betweenPause)}); }
    } return tl; }
  function frameOpts(f){ return {menuShow:!!f.menuShow,arrowOn:!!f.arrowOn,contArrow:!!f.contArrow}; }

  /* ===================== PREVIEW ===================== */
  var pcanvas=document.getElementById('preview'), pctx=pcanvas.getContext('2d');
  var GL=null,timeline=null,pvIdx=0,pvTimer=null,paused=false;
  var scrubEl=document.getElementById('scrub'), scrubVal=document.getElementById('scrub-val');
  function resizePreview(){ pcanvas.width=GL.canvasW; pcanvas.height=GL.canvasH; var maxw=Math.min(GL.canvasW*2,720); var scale=maxw/GL.canvasW; if(GL.canvasW>=560) scale=Math.min(scale,1.3); pcanvas.style.width=Math.round(GL.canvasW*scale)+'px'; pcanvas.classList.toggle('smooth', project.bg.mode==='image'); }
  function drawIdx(idx){ var f=timeline[idx]; if(!f) return; drawBox(pctx,GL,f.i,f.v,frameOpts(f)); scrubEl.value=idx; scrubVal.textContent=(idx+1)+' / '+timeline.length; }
  function rebuild(){ GL=computeGlobalLayout(); timeline=buildSequence(GL); resizePreview(); scrubEl.max=Math.max(0,timeline.length-1); if(paused){ if(pvIdx>=timeline.length) pvIdx=timeline.length-1; drawIdx(pvIdx); } else restartPreview(); }
  function restartPreview(){ clearTimeout(pvTimer); pvIdx=0; stepPreview(); }
  function stepPreview(){ if(!timeline||!timeline.length||paused) return; drawIdx(pvIdx); var f=timeline[pvIdx]; pvTimer=setTimeout(function(){ pvIdx=(pvIdx+1)%timeline.length; stepPreview(); },f.d); }
  function updatePlayBtn(){ var el=document.getElementById('btn-play'); if(el) el.textContent=paused?t('b_play'):t('b_pause'); }
  function setPaused(p){ paused=p; if(paused) clearTimeout(pvTimer); else stepPreview(); updatePlayBtn(); }

  /* ===================== EXPORT ===================== */
  var ecanvas=document.createElement('canvas'), ectx=ecanvas.getContext('2d',{willReadFrequently:true});
  var progressEl=document.getElementById('progress'), progressBar=progressEl.querySelector('i');
  var resultEl=document.getElementById('result'),resultImg=document.getElementById('result-img'),resultTitle=document.getElementById('result-title'),resultHint=document.getElementById('result-hint');
  function setProgress(p){ progressEl.classList.toggle('on',p>=0&&p<1); progressBar.style.width=Math.round(Math.max(0,Math.min(1,p))*100)+'%'; }
  function triggerDownload(blob,fn){ var url=URL.createObjectURL(blob); var a=document.createElement('a'); a.href=url; a.download=fn; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){URL.revokeObjectURL(url);},4000); return url; }
  /* ---- VIDEO EXPORT (MP4 via WebCodecs, WebM fallback) ---- */
  var VSS=2; // supersample factor for the composited box layer (crisper text when scaled up)
  function videoDims(GL){ var a=project.video.aspect;
    if(a==='9:16') return {w:1080,h:1920}; if(a==='1:1') return {w:1080,h:1080};
    if(a==='4:5') return {w:1080,h:1350}; if(a==='16:9') return {w:1920,h:1080};
    return {w:GL.canvasW,h:GL.canvasH}; }
  function makeFrameAt(tl,total){ var cum=[],acc=0; for(var i=0;i<tl.length;i++){ cum.push(acc); acc+=tl[i].d; }
    return function(ms){ ms=((ms%total)+total)%total; var lo=0,hi=tl.length-1,ans=0; while(lo<=hi){ var mid=(lo+hi)>>1; if(cum[mid]<=ms){ ans=mid; lo=mid+1; } else hi=mid-1; } return ans; }; }
  function composeVideoFrame(tctx,W,H,GL,f,vbox,vbctx){
    if(project.video.aspect==='native'){ drawBox(tctx,GL,f.i,f.v,frameOpts(f)); return; }
    // background fills the whole frame (no crop / no bars)
    tctx.imageSmoothingEnabled=true; tctx.imageSmoothingQuality='high';
    if(project.bg.mode==='image'&&project.bg.img){ var img=project.bg.img; var s=Math.max(W/img.width,H/img.height); var dw=img.width*s,dh=img.height*s; tctx.drawImage(img,(W-dw)/2,(H-dh)/2,dw,dh); }
    else { tctx.fillStyle=project.colors.backdrop; tctx.fillRect(0,0,W,H); }
    // box drawn on its own transparent (supersampled) layer, then placed
    var o=frameOpts(f); o.skipBackdrop=true; drawBox(vbctx,GL,f.i,f.v,o);
    var margin=Math.round(W*0.055), destW=W-2*margin, scale=destW/GL.boxW, destH=GL.boxH*scale, destX=margin;
    var anchor=project.bg.anchor||'bottom', vmargin=Math.round(H*0.06), destY;
    if(anchor==='top') destY=vmargin; else if(anchor==='center') destY=Math.round((H-destH)/2); else destY=H-vmargin-destH;
    destY=Math.max(vmargin, Math.min(destY, H-vmargin-destH));
    tctx.imageSmoothingEnabled=true;
    tctx.drawImage(vbox, GL.boxX*VSS,GL.boxTop*VSS,GL.boxW*VSS,GL.boxH*VSS, destX,destY,destW,destH);
  }
  async function pickAvc(W,H,fps){ if(!('VideoEncoder' in window)||!VideoEncoder.isConfigSupported) return null;
    var cands=['avc1.640028','avc1.4d0028','avc1.42e01f','avc1.42001f'];
    for(var i=0;i<cands.length;i++){ try{ var s=await VideoEncoder.isConfigSupported({codec:cands[i],width:W,height:H,bitrate:6e6,framerate:fps}); if(s&&s.supported) return cands[i]; }catch(e){} }
    return null; }
  async function exportVideo(){
    var btn=document.getElementById('btn-mp4'); btn.disabled=true; btn.textContent=t('b_vid_busy');
    try{
      var L=computeGlobalLayout(), tl=buildSequence(L); if(!tl.length) return;
      var d=videoDims(L), W=d.w-(d.w%2), H=d.h-(d.h%2), fps=project.video.fps||30;
      var total=0; for(var i=0;i<tl.length;i++) total+=tl[i].d;
      var frameAt=makeFrameAt(tl,total), nFrames=Math.max(1,Math.round(total/1000*fps));
      var tcanvas=document.createElement('canvas'); tcanvas.width=W; tcanvas.height=H; var tctx=tcanvas.getContext('2d');
      var vbox=null,vbctx=null; if(project.video.aspect!=='native'){ vbox=document.createElement('canvas'); vbox.width=L.canvasW*VSS; vbox.height=L.canvasH*VSS; vbctx=vbox.getContext('2d'); vbctx.setTransform(VSS,0,0,VSS,0,0); }
      var codec=await pickAvc(W,H,fps);
      if(!codec){ await exportWebM(L,tl,W,H,fps,total,frameAt,tcanvas,tctx,vbox,vbctx); return; }
      var muxer=new Mp4Muxer.Muxer({ target:new Mp4Muxer.ArrayBufferTarget(), video:{codec:'avc',width:W,height:H}, fastStart:'in-memory' });
      var encoder=new VideoEncoder({ output:function(chunk,meta){ muxer.addVideoChunk(chunk,meta); }, error:function(e){ console.error(e); } });
      encoder.configure({ codec:codec, width:W, height:H, bitrate:6e6, framerate:fps });
      var dtUs=1e6/fps;
      for(var n=0;n<nFrames;n++){ var f=tl[frameAt(n*1000/fps)];
        composeVideoFrame(tctx,W,H,L,f,vbox,vbctx);
        var vf=new VideoFrame(tcanvas,{timestamp:Math.round(n*dtUs),duration:Math.round(dtUs)});
        encoder.encode(vf,{keyFrame:(n%(fps*2)===0)}); vf.close();
        while(encoder.encodeQueueSize>10){ await new Promise(function(r){ setTimeout(r,4); }); }
        if(n%3===0){ setProgress(n/nFrames); await new Promise(function(r){ setTimeout(r,0); }); }
      }
      await encoder.flush(); muxer.finalize();
      var blob=new Blob([muxer.target.buffer],{type:'video/mp4'});
      var url=triggerDownload(blob,'questbox.mp4');
      showVideoResult(t('r_mp4_ok'),url,t('r_vid_hint',{w:W,h:H,s:(total/1000).toFixed(1)}));
    }catch(err){ showError(err); }
    finally{ setProgress(1); setTimeout(function(){ setProgress(-1); },400); btn.disabled=false; btn.textContent=t('b_mp4'); }
  }
  async function exportWebM(L,tl,W,H,fps,total,frameAt,tcanvas,tctx,vbox,vbctx){
    var mimes=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'], mime=null;
    for(var i=0;i<mimes.length;i++){ if(window.MediaRecorder&&MediaRecorder.isTypeSupported(mimes[i])){ mime=mimes[i]; break; } }
    if(!mime) throw new Error('Video export is not supported by this browser.');
    var stream=tcanvas.captureStream(0), track=stream.getVideoTracks()[0];
    var rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:6e6}), chunks=[];
    rec.ondataavailable=function(e){ if(e.data&&e.data.size) chunks.push(e.data); };
    var done=new Promise(function(res){ rec.onstop=res; });
    rec.start();
    for(var j=0;j<tl.length;j++){ var f=tl[j]; composeVideoFrame(tctx,W,H,L,f,vbox,vbctx); if(track.requestFrame) track.requestFrame(); setProgress(j/tl.length); await new Promise(function(r){ setTimeout(r,Math.max(20,f.d)); }); }
    rec.stop(); await done;
    var blob=new Blob(chunks,{type:'video/webm'}); var url=triggerDownload(blob,'questbox.webm');
    showVideoResult(t('r_webm_ok'),url,t('r_vid_hint',{w:W,h:H,s:(total/1000).toFixed(1)}));
  }
  function showVideoResult(title,url,hint){ var v=document.getElementById('result-video'); resultImg.hidden=true; resultImg.removeAttribute('src'); v.hidden=false; v.src=url; resultTitle.textContent=title; resultHint.textContent=hint||''; resultEl.classList.add('on'); }

  function showResult(title,url,hint){ var v=document.getElementById('result-video'); if(v){ v.hidden=true; v.removeAttribute('src'); } resultImg.hidden=false; resultImg.src=url; resultTitle.textContent=title; resultHint.textContent=hint||''; resultEl.classList.add('on'); }
  function showError(err){ resultTitle.textContent=t('r_err'); resultHint.textContent=(err&&err.message)?err.message:String(err); resultImg.removeAttribute('src'); resultEl.classList.add('on'); console.error(err); }
  function buildGlobalPalette(L,w,h){ var bufs=[],tot=0; for(var i=0;i<L.boxes.length;i++){ drawBox(ectx,L,i,L.boxes[i].total,{menuShow:true,arrowOn:true,contArrow:true}); var d=ectx.getImageData(0,0,w,h).data; var u=new Uint8Array(d.length); u.set(d); bufs.push(u); tot+=u.length; } var big=new Uint8Array(tot),off=0; for(var j=0;j<bufs.length;j++){ big.set(bufs[j],off); off+=bufs[j].length; } return gifenc.quantize(big,255,{format:'rgb444'}); } /* 255: leave index 255 for transparency */
  async function exportGif(){ var btn=document.getElementById('btn-gif'); btn.disabled=true; btn.textContent=t('b_gif_busy');
    try{ var L=computeGlobalLayout(),tl=buildSequence(L),w=L.canvasW,h=L.canvasH; ecanvas.width=w; ecanvas.height=h;
      var palette=buildGlobalPalette(L,w,h); var gif=gifenc.GIFEncoder();
      var TRANS=255, prev=null, npx=w*h;
      // Delta encoding: only the first frame carries the (global) color table and is fully opaque;
      // every later frame references that global table and marks unchanged pixels transparent,
      // so long runs of the transparent index compress away (huge win with a static photo bg).
      for(var i=0;i<tl.length;i++){ var f=tl[i]; drawBox(ectx,L,f.i,f.v,frameOpts(f));
        var data=ectx.getImageData(0,0,w,h).data; var index=gifenc.applyPalette(data,palette,'rgb444');
        var opts={delay:f.d, dispose:1};
        if(i===0){ opts.palette=palette; }
        else { for(var q=0,o=0;q<npx;q++,o+=4){ if(data[o]===prev[o]&&data[o+1]===prev[o+1]&&data[o+2]===prev[o+2]) index[q]=TRANS; } opts.transparent=true; opts.transparentIndex=TRANS; }
        gif.writeFrame(index,w,h,opts);
        if(!prev) prev=new Uint8Array(data.length); prev.set(data);
        if(i%4===0){ setProgress(i/tl.length); await new Promise(function(r){setTimeout(r,0);}); } }
      gif.finish(); var blob=new Blob([gif.bytes()],{type:'image/gif'}); var url=triggerDownload(blob,'rpg-textbox.gif'); showResult(t('r_gif_ok'),url,t('r_gif_hint',{n:tl.length,kb:Math.round(blob.size/1024)}));
    }catch(err){ showError(err); } finally{ setProgress(1); setTimeout(function(){setProgress(-1);},400); btn.disabled=false; btn.textContent=t('b_gif'); } }
  function exportPng(){ var L=computeGlobalLayout(),tl=buildSequence(L),w=L.canvasW,h=L.canvasH; ecanvas.width=w; ecanvas.height=h; var idx=Math.min(pvIdx,tl.length-1); var f=tl[idx]||{i:0,v:0}; drawBox(ectx,L,f.i,f.v,frameOpts(f)); ecanvas.toBlob(function(blob){ var url=triggerDownload(blob,'rpg-textbox.png'); showResult(t('r_png_ok'),url,t('r_png_hint',{w:w,h:h})); },'image/png'); }

  /* ===================== PRESETS UI ===================== */
  function renderPresets(){ var g=document.getElementById('presetgrid'); g.innerHTML='';
    PRESETS.forEach(function(p){ var b=document.createElement('button'); b.className='presetbtn'+(p.id===activePreset?' active':''); b.innerHTML='<span>'+p.name+'</span><small>'+p.desc+' · '+p.style.fontFamily+'</small>'; b.addEventListener('click',function(){ applyPreset(p.id); }); g.appendChild(b); }); }
  function applyPreset(id){ var p=null; for(var i=0;i<PRESETS.length;i++) if(PRESETS[i].id===id) p=PRESETS[i]; if(!p) return; activePreset=id;
    for(var k in p.style) project.style[k]=p.style[k]; for(var c in p.colors) project.colors[c]=p.colors[c];
    syncStyleControls(); syncColorControls(); renderPresets(); rebuild(); }

  /* ===================== BOX LIST + EDITOR ===================== */
  var boxlistEl=document.getElementById('boxlist');
  function snippet(b){ var s=(b.text||'').replace(/\n/g,' ').trim(); return s.length?s:t('empty'); }
  function renderBoxList(){ boxlistEl.innerHTML=''; project.boxes.forEach(function(b,i){ var row=document.createElement('div'); row.className='boxrow'+(i===sel?' active':'');
    var idx=document.createElement('span'); idx.className='idx'; idx.textContent=(i+1);
    var lbl=document.createElement('div'); lbl.className='lbl'; var nm=document.createElement('b'); nm.textContent=(b.name.trim()||t('noname'))+(b.menu&&b.menu.options.length?'  ▶':''); var sn=document.createElement('small'); sn.textContent=snippet(b); lbl.appendChild(nm); lbl.appendChild(sn);
    row.appendChild(idx); row.appendChild(lbl);
    row.appendChild(mini('▲',t('t_up'),i===0,function(e){e.stopPropagation();moveBox(i,-1);}));
    row.appendChild(mini('▼',t('t_down'),i===project.boxes.length-1,function(e){e.stopPropagation();moveBox(i,1);}));
    row.appendChild(mini('⧉',t('t_dup'),false,function(e){e.stopPropagation();dupBox(i);}));
    row.appendChild(mini('✕',t('t_del'),project.boxes.length<=1,function(e){e.stopPropagation();delBox(i);}));
    row.addEventListener('click',function(){ sel=i; renderBoxList(); loadBoxEditor(); });
    boxlistEl.appendChild(row); }); }
  function mini(txt,title,dis,cb){ var b=document.createElement('button'); b.className='mini'; b.textContent=txt; b.title=title; b.disabled=dis; b.addEventListener('click',cb); return b; }
  function moveBox(i,dir){ var j=i+dir; if(j<0||j>=project.boxes.length) return; var t2=project.boxes[i]; project.boxes[i]=project.boxes[j]; project.boxes[j]=t2; sel=j; renderBoxList(); loadBoxEditor(); rebuild(); }
  function dupBox(i){ var copy=JSON.parse(JSON.stringify(project.boxes[i])); project.boxes.splice(i+1,0,copy); sel=i+1; renderBoxList(); loadBoxEditor(); rebuild(); }
  function delBox(i){ if(project.boxes.length<=1) return; project.boxes.splice(i,1); if(sel>=project.boxes.length) sel=project.boxes.length-1; renderBoxList(); loadBoxEditor(); rebuild(); }
  function addBox(){ project.boxes.push({name:"",text:"New line of dialogue.",spans:[],menu:null}); sel=project.boxes.length-1; renderBoxList(); loadBoxEditor(); rebuild(); }

  var nameEl=document.getElementById('c-name'), textEl=document.getElementById('c-text');
  var menuOnEl=document.getElementById('c-menu-on'), menuFields=document.getElementById('menu-fields'), menuOptsEl=document.getElementById('c-menu-opts'), menuSelEl=document.getElementById('c-menu-sel');
  var editingPrevText='';
  function curBox(){ return project.boxes[sel]; }
  function loadBoxEditor(){ var b=curBox(); if(!b) return; nameEl.value=b.name; textEl.value=b.text; editingPrevText=b.text; var hasMenu=!!(b.menu&&b.menu.options); menuOnEl.checked=hasMenu; menuFields.hidden=!hasMenu; if(hasMenu){ menuOptsEl.value=b.menu.options.join('\n'); rebuildMenuSelect(); } }
  function rebuildMenuSelect(){ var b=curBox(); menuSelEl.innerHTML=''; if(!(b.menu&&b.menu.options)) return; b.menu.options.forEach(function(o,i){ var op=document.createElement('option'); op.value=i; op.textContent=(i+1)+'. '+(o||'—'); menuSelEl.appendChild(op); }); menuSelEl.value=Math.min(b.menu.selected,b.menu.options.length-1); }
  function renderSwatches(){ var wrap=document.getElementById('swatches'); wrap.innerHTML='';
    PALETTE.forEach(function(col){ var s=document.createElement('button'); s.className='swatch'; s.style.background=col; s.title=col; s.addEventListener('click',function(){ applyWordColor(col); }); wrap.appendChild(s); });
    var custom=document.createElement('input'); custom.type='color'; custom.value='#e8a33d'; custom.style.width='26px'; custom.style.height='22px'; custom.addEventListener('input',function(){ applyWordColor(custom.value); }); wrap.appendChild(custom);
    var clr=document.createElement('button'); clr.className='swatch'; clr.style.background='#2a2f40'; clr.style.color='#fff'; clr.style.fontSize='12px'; clr.textContent='✕'; clr.addEventListener('click',function(){ applyWordColor(null); }); wrap.appendChild(clr); }
  function applyWordColor(color){ var b=curBox(); var s=textEl.selectionStart,e=textEl.selectionEnd; if(s===e){ textEl.focus(); return; } var cs=offToCell(b.text,s),ce=offToCell(b.text,e); b.spans=applyColorRange(b.spans||[],cs,ce,color); rebuild(); textEl.focus(); textEl.setSelectionRange(s,e); }

  /* ===================== CONTROL SYNC ===================== */
  function setRange(id,val,out,unit){ var el=document.getElementById(id),o=document.getElementById(out); if(el) el.value=val; if(o) o.textContent=val+(unit||''); }
  function syncStyleControls(){
    var st=project.style;
    setRange('c-width',st.boxWidth,'v-width',' px'); setRange('c-boxheight',st.boxHeight,'v-boxheight',' px'); setRange('c-fontsize',st.fontSize,'v-fontsize',' px');
    setRange('c-radius',st.cornerRadius,'v-radius',' px'); setRange('c-border',st.borderWidth,'v-border',' px');
    var ff=document.getElementById('c-fontfamily'); if(ff) ff.value=st.fontFamily;
  }
  function syncColorControls(){ var cl=project.colors; var map={backdrop:'c-col-backdrop',boxBg:'c-col-boxBg',borderColor:'c-col-borderColor',textColor:'c-col-textColor',nameColor:'c-col-nameColor',arrowColor:'c-col-arrowColor',selectColor:'c-col-selectColor'}; for(var k in map){ var el=document.getElementById(map[k]); if(el) el.value=cl[k]; } }
  function markCustomPreset(){ activePreset=null; renderPresets(); }

  /* ===================== BINDINGS ===================== */
  function bindRange(id,obj,key,out,unit,onPreset){ var el=document.getElementById(id),o=document.getElementById(out); el.value=obj[key]; o.textContent=obj[key]+(unit||''); el.addEventListener('input',function(){ obj[key]=parseFloat(el.value); o.textContent=obj[key]+(unit||''); if(onPreset) markCustomPreset(); rebuild(); }); }
  function bindColor(id,key){ var el=document.getElementById(id); el.value=project.colors[key]; el.addEventListener('input',function(){ project.colors[key]=el.value; markCustomPreset(); rebuild(); }); }

  function initUI(){
    renderPresets(); renderSwatches();
    // font family select
    var ff=document.getElementById('c-fontfamily'); FONT_NAMES.forEach(function(n){ var o=document.createElement('option'); o.value=n; o.textContent=n; ff.appendChild(o); }); ff.value=project.style.fontFamily;
    ff.addEventListener('change',function(){ project.style.fontFamily=ff.value; markCustomPreset(); rebuild(); });

    document.getElementById('btn-addbox').addEventListener('click',addBox);
    nameEl.addEventListener('input',function(){ curBox().name=nameEl.value; renderBoxList(); rebuild(); });
    textEl.addEventListener('input',function(){ var b=curBox(); b.spans=reconcileSpans(b.spans||[],editingPrevText,textEl.value); b.text=textEl.value; editingPrevText=textEl.value; renderBoxList(); rebuild(); });
    menuOnEl.addEventListener('change',function(){ var b=curBox(); if(menuOnEl.checked){ if(!b.menu) b.menu={options:["Yes","No"],selected:0}; menuFields.hidden=false; menuOptsEl.value=b.menu.options.join('\n'); rebuildMenuSelect(); } else { b.menu=null; menuFields.hidden=true; } renderBoxList(); rebuild(); });
    menuOptsEl.addEventListener('input',function(){ var b=curBox(); if(!b.menu) return; b.menu.options=menuOptsEl.value.split('\n'); if(b.menu.selected>=b.menu.options.length) b.menu.selected=Math.max(0,b.menu.options.length-1); rebuildMenuSelect(); rebuild(); });
    menuSelEl.addEventListener('change',function(){ var b=curBox(); if(b.menu){ b.menu.selected=parseInt(menuSelEl.value,10)||0; rebuild(); } });

    // background / photo
    var bgmode=document.getElementById('c-bgmode'), bgfields=document.getElementById('bg-image-fields');
    bgmode.value=project.bg.mode; bgfields.hidden=(project.bg.mode!=='image');
    bgmode.addEventListener('change',function(){ project.bg.mode=bgmode.value; bgfields.hidden=(bgmode.value!=='image'); rebuild(); });
    document.getElementById('c-bgimg').addEventListener('change',function(e){ var file=e.target.files&&e.target.files[0]; if(!file) return; var fr=new FileReader(); fr.onload=function(){ var img=new Image(); img.onload=function(){ project.bg.img=img; project.bg.mode='image'; bgmode.value='image'; bgfields.hidden=false; rebuild(); }; img.src=fr.result; }; fr.readAsDataURL(file); });
    document.getElementById('btn-bgremove').addEventListener('click',function(){ project.bg.img=null; document.getElementById('c-bgimg').value=''; rebuild(); });
    bindRange('c-outw',project.bg,'outputWidth','v-outw',' px');
    var boxpos=document.getElementById('c-boxpos'); boxpos.value=project.bg.anchor; boxpos.addEventListener('change',function(){ project.bg.anchor=boxpos.value; rebuild(); });

    bindRange('c-speed',project.timing,'msPerChar','v-speed',' ms');
    bindRange('c-punct',project.timing,'punctPause','v-punct',' ms');
    bindRange('c-start',project.timing,'startPause','v-start',' ms');
    bindRange('c-read',project.timing,'readPause','v-read',' ms');
    bindRange('c-between',project.timing,'betweenPause','v-between',' ms');
    bindRange('c-menudur',project.timing,'menuDuration','v-menudur',' ms');
    var arrowEl=document.getElementById('c-arrow'); arrowEl.checked=project.showArrow; arrowEl.addEventListener('change',function(){ project.showArrow=arrowEl.checked; rebuild(); });

    bindRange('c-width',project.style,'boxWidth','v-width',' px',true);
    bindRange('c-boxheight',project.style,'boxHeight','v-boxheight',' px',true);
    bindRange('c-fontsize',project.style,'fontSize','v-fontsize',' px',true);
    bindRange('c-radius',project.style,'cornerRadius','v-radius',' px',true);
    bindRange('c-border',project.style,'borderWidth','v-border',' px',true);

    bindColor('c-col-backdrop','backdrop'); bindColor('c-col-boxBg','boxBg'); bindColor('c-col-borderColor','borderColor'); bindColor('c-col-textColor','textColor'); bindColor('c-col-nameColor','nameColor'); bindColor('c-col-arrowColor','arrowColor'); bindColor('c-col-selectColor','selectColor');

    document.getElementById('btn-play').addEventListener('click',function(){ setPaused(!paused); });
    document.getElementById('btn-gif').addEventListener('click',exportGif);
    document.getElementById('btn-png').addEventListener('click',exportPng);
    document.getElementById('btn-mp4').addEventListener('click',exportVideo);
    var vasp=document.getElementById('c-vidaspect'); vasp.value=project.video.aspect; vasp.addEventListener('change',function(){ project.video.aspect=vasp.value; });
    scrubEl.addEventListener('input',function(){ setPaused(true); pvIdx=parseInt(scrubEl.value,10)||0; drawIdx(pvIdx); });
    document.getElementById('lang-en').addEventListener('click',function(){ lang='en'; applyI18n(); });
    document.getElementById('lang-it').addEventListener('click',function(){ lang='it'; applyI18n(); });
    window.addEventListener('resize',function(){ if(GL) resizePreview(); });
  }

  /* ===================== FONTS + BOOT ===================== */
  function b64ToBuf(b64){ var bin=atob(b64),n=bin.length,buf=new Uint8Array(n); for(var i=0;i<n;i++) buf[i]=bin.charCodeAt(i); return buf.buffer; }
  async function loadFonts(){ var tasks=[];
    for(var fam in FONTS){ for(var w in FONTS[fam]){ (function(fam,w){ try{ var ff=new FontFace(fam,b64ToBuf(FONTS[fam][w]),{weight:String(w)}); tasks.push(ff.load().then(function(f){ document.fonts.add(f); })); }catch(e){ console.warn('font',fam,w,e); } })(fam,w); } }
    try{ await Promise.all(tasks); fontStatusKey='font_ready'; }catch(e){ fontStatusKey='font_fallback'; console.warn(e); }
    document.getElementById('fontstatus').textContent=t(fontStatusKey);
  }
  (async function(){ initUI(); renderBoxList(); loadBoxEditor(); applyI18n(); await loadFonts(); rebuild(); })();
})();
