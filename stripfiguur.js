/* Frikandellenstad – inwonersatelier.
   Alle afbeeldingen worden lokaal in de browser getekend. Geen upload, tracking of opslag. */
(function () {
  'use strict';

  const form = document.getElementById('passport-form');
  if (!form) return;
  const byId = id => document.getElementById(id);
  const nameEl = byId('resident-name');
  const sauceEl = byId('resident-sauce');
  const wijkEl = byId('resident-wijk');
  const lookEl = byId('resident-look');
  const extraEl = byId('resident-extra');
  const mottoEl = byId('resident-motto');
  const avatarEl = byId('passport-avatar-art');
  const namePreview = byId('passport-name');
  const saucePreview = byId('passport-sauce');
  const wijkPreview = byId('passport-wijk');
  const mottoPreview = byId('passport-motto');
  const codePreview = byId('passport-code');
  const hint = byId('passport-hint');
  const passportButton = byId('passport-download');
  const avatarButton = byId('avatar-download');
  const districts = {
    binnenstad: 'Speciaal Centrum', stiphout: 'Snackhout',
    warande: 'Sauswarande', noord: 'Uitjes-Noord',
    dierdonk: 'Dierdonk Deluxe', rijpelberg: 'Rijpel-Rol',
    oost: 'Curry-Oost', west: 'Mayo-West',
    hout: 'Houtse Haps', brandevoort: 'Brandeworst',
    industrie: 'Frituurboulevard', brouwhuis: 'Broodje Brouwhuis',
    bzob: 'BZOB-Snack'
  };
  let ready = null;

  function xml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }
  function hash(s) {
    let n = 2166136261;
    for (let i = 0; i < s.length; i++) {
      n ^= s.charCodeAt(i);
      n = Math.imul(n, 16777619);
    }
    return n >>> 0;
  }
  function details() {
    const name = nameEl.value.trim().replace(/\s+/g, ' ').slice(0, 30);
    const wijk = Object.prototype.hasOwnProperty.call(districts, wijkEl.value) ? wijkEl.value : 'binnenstad';
    const look = ['klassiek', 'feest', 'chic', 'sport'].includes(lookEl.value) ? lookEl.value : 'klassiek';
    const extra = ['verrassing', 'bril', 'snor', 'strik', 'geen'].includes(extraEl.value) ? extraEl.value : 'verrassing';
    const motto = mottoEl.value.trim().replace(/\s+/g, ' ').slice(0, 44);
    const p = { name, wijk, look, extra, motto, sauce: sauceEl.value };
    p.seed = hash([p.name.toLowerCase(), p.wijk, p.look, p.extra].join('|'));
    p.code = 'FKS-' + p.seed.toString(36).toUpperCase().padStart(7, '0').slice(0, 7);
    return p;
  }

  function avatarSvg(p) {
    const colors = [
      {bg:'#ffe69b',main:'#b86c42',rim:'#8e4d2e',top:'#e85d46',suit:'#f7e4ba'},
      {bg:'#c7e9d2',main:'#a75d35',rim:'#804225',top:'#4b9b80',suit:'#ffdd83'},
      {bg:'#d5e5fb',main:'#bd794f',rim:'#8d563a',top:'#4f87c0',suit:'#ffe7a1'},
      {bg:'#ffd6ce',main:'#b9714b',rim:'#8e4e32',top:'#d45c8c',suit:'#e8ecbc'}
    ];
    const c = colors[p.seed % colors.length];
    const extra = p.extra === 'verrassing'
      ? ['bril', 'snor', 'strik', 'geen'][(p.seed >>> 3) % 4] : p.extra;
    let hat = '';
    if (p.look === 'feest') {
      hat = '<path d="M134 90 L164 10 L207 91Z" fill="'+c.top+'" stroke="#33271f" stroke-width="7" stroke-linejoin="round"/>'
        + '<path d="M146 61 L192 61" stroke="#ffe78b" stroke-width="10"/><circle cx="164" cy="11" r="12" fill="#ffdc4f" stroke="#33271f" stroke-width="5"/>';
    } else if (p.look === 'chic') {
      hat = '<rect x="137" y="11" width="77" height="85" rx="10" fill="#343435" stroke="#2a2520" stroke-width="7"/>'
        + '<path d="M111 91Q174 78 239 91" fill="none" stroke="#292828" stroke-width="19" stroke-linecap="round"/>'
        + '<rect x="141" y="63" width="69" height="15" fill="#e5b443"/>';
    } else if (p.look === 'sport') {
      hat = '<path d="M105 106Q118 31 176 35Q236 36 237 105Z" fill="'+c.top+'" stroke="#33271f" stroke-width="8"/>'
        + '<path d="M170 100Q234 88 275 105Q250 129 198 120" fill="'+c.top+'" stroke="#33271f" stroke-width="8"/>';
    } else {
      hat = '<path d="M151 78Q130 39 147 26Q156 51 176 50Q170 22 194 19Q187 57 213 73" fill="'+c.top+'" stroke="#33271f" stroke-width="7" stroke-linejoin="round"/>';
    }

    let costume = '';
    if (p.look === 'chic') {
      costume = '<path d="M112 234L159 278L174 251L189 278L237 233L233 302Q175 327 118 302Z" fill="#fff4d7" stroke="#33271f" stroke-width="5"/>'
        + '<path d="M171 242L188 247L187 271L176 297L164 270Z" fill="'+c.top+'" stroke="#33271f" stroke-width="4"/>';
    } else if (p.look === 'sport') {
      costume = '<path d="M115 230Q173 265 235 226L231 288Q177 317 120 290Z" fill="'+c.suit+'" stroke="#33271f" stroke-width="5"/>'
        + '<path d="M118 246L236 279" stroke="'+c.top+'" stroke-width="18"/><circle cx="176" cy="276" r="14" fill="#fff7e9" stroke="#33271f" stroke-width="4"/>';
    } else if (p.look === 'feest') {
      costume = '<path d="M127 264L225 264L224 295Q176 323 128 295Z" fill="'+c.suit+'" stroke="#33271f" stroke-width="5"/>'
        + '<circle cx="148" cy="278" r="7" fill="'+c.top+'"/><circle cx="205" cy="283" r="6" fill="#5e9dcc"/>';
    } else {
      costume = '<path d="M132 258Q177 277 222 258L218 294Q176 314 136 294Z" fill="'+c.suit+'" stroke="#33271f" stroke-width="5"/>'
        + '<circle cx="177" cy="278" r="10" fill="'+c.top+'" stroke="#33271f" stroke-width="3"/>';
    }

    let accessory = '';
    if (extra === 'bril') {
      accessory = '<g fill="none" stroke="#2c2725" stroke-width="7"><circle cx="146" cy="174" r="27"/><circle cx="205" cy="174" r="27"/><path d="M174 174L177 174M120 168L103 164M232 168L246 164"/></g>';
    } else if (extra === 'snor') {
      accessory = '<path d="M176 213Q154 185 136 210Q148 239 176 218Q202 241 216 209Q198 185 176 213Z" fill="#efe6d3" stroke="#392820" stroke-width="5"/>';
    } else if (extra === 'strik') {
      accessory = '<path d="M176 249L143 229Q130 254 145 271L176 253L207 271Q223 249 208 229Z" fill="'+c.top+'" stroke="#33271f" stroke-width="5"/>'
        + '<circle cx="176" cy="252" r="10" fill="#ffe8a0" stroke="#33271f" stroke-width="4"/>';
    }

    const eyebrowTilt = p.seed % 2 ? -5 : 4;
    return [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="360" height="360" role="img" aria-label="Getekende frikandel, persoonlijk stripfiguur van ',xml(p.name || 'nieuwe inwoner'),'">',
      '<title>Stripfiguur ',xml(p.name || 'nieuwe inwoner'),'</title>',
      '<rect width="360" height="360" rx="28" fill="',c.bg,'"/>',
      '<circle cx="280" cy="73" r="48" fill="#fff9e7" opacity=".4"/>',
      '<path d="M45 53l10 15 16 6-16 7-10 15-7-15-15-7 15-6Z" fill="#fffdf0" opacity=".9"/>',
      '<circle cx="302" cy="264" r="9" fill="#fffdf0" opacity=".9"/><circle cx="64" cy="291" r="6" fill="#fffdf0"/>',
      '<ellipse cx="177" cy="335" rx="95" ry="13" fill="#4a3126" opacity=".13"/>',
      '<g fill="none" stroke="#39291f" stroke-width="13" stroke-linecap="round"><path d="M144 276L132 322"/><path d="M204 277L218 322"/><path d="M102 197Q66 217 52 184"/><path d="M244 198Q282 229 310 183"/></g>',
      '<g fill="#fff9e9" stroke="#39291f" stroke-width="5"><circle cx="52" cy="184" r="13"/><circle cx="310" cy="183" r="13"/></g>',
      '<path d="M103 321Q126 310 148 328L146 342L89 342Q87 329 103 321Z" fill="#343230" stroke="#33271f" stroke-width="5"/>',
      '<path d="M204 328Q225 311 248 325L259 342L201 342Z" fill="#343230" stroke="#33271f" stroke-width="5"/>',
      '<path d="M117 89Q123 59 176 62Q230 62 235 94Q254 143 246 208Q240 304 178 312Q116 305 107 216Q95 141 117 89Z" fill="',c.main,'" stroke="#33271f" stroke-width="9" stroke-linejoin="round"/>',
      '<path d="M121 120Q139 95 158 111" fill="none" stroke="',c.rim,'" stroke-width="9" stroke-linecap="round" opacity=".42"/>',
      '<path d="M204 111Q218 102 230 122" fill="none" stroke="',c.rim,'" stroke-width="8" stroke-linecap="round" opacity=".45"/>',
      '<path d="M123 234Q135 249 147 236M204 239Q216 249 228 234" fill="none" stroke="',c.rim,'" stroke-width="7" opacity=".55" stroke-linecap="round"/>',
      '<g transform="rotate(',eyebrowTilt,' 175 165)"><path d="M124 141L160 142M190 143L222 141" fill="none" stroke="#39271e" stroke-width="7" stroke-linecap="round"/></g>',
      '<ellipse cx="145" cy="175" rx="9" ry="13" fill="#2f2925"/><ellipse cx="206" cy="175" rx="9" ry="13" fill="#2f2925"/>',
      '<circle cx="148" cy="171" r="3.5" fill="#fff"/><circle cx="209" cy="171" r="3.5" fill="#fff"/>',
      '<ellipse cx="122" cy="211" rx="12" ry="6" fill="#ed9684" opacity=".55"/><ellipse cx="228" cy="211" rx="12" ry="6" fill="#ed9684" opacity=".55"/>',
      '<path d="M153 217Q176 245 199 216" fill="none" stroke="#34261f" stroke-width="7" stroke-linecap="round"/>',
      costume, accessory, hat,
      '</svg>'
    ].join('');
  }

  function show(p, final) {
    namePreview.textContent = p.name || 'Jouw naam hier';
    saucePreview.textContent = p.sauce;
    wijkPreview.textContent = districts[p.wijk];
    mottoPreview.textContent = p.motto ? '“' + p.motto + '”' : 'Waar iedereen speciaal is!';
    codePreview.textContent = p.code;
    avatarEl.innerHTML = avatarSvg(p);
    passportButton.disabled = !final;
    avatarButton.disabled = !final;
  }

  function updateDraft() {
    ready = null;
    show(details(), false);
    hint.textContent = 'Jouw stripfiguur staat klaar om gemaakt te worden!';
  }
  for (const control of [nameEl, sauceEl, wijkEl, lookEl, extraEl, mottoEl]) {
    control.addEventListener('input', updateDraft);
    control.addEventListener('change', updateDraft);
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const p = details();
    if (!p.name) { nameEl.focus(); return; }
    ready = p;
    show(p, true);
    hint.textContent = '🎉 Welkom, ' + p.name + '! Je stripfiguur en paspoort zijn klaar.';
    byId('passport-card').scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
  });

  function passportSvg(p) {
    const name = xml(p.name);
    const width = p.name.length > 23 ? 42 : p.name.length > 16 ? 49 : 60;
    const lengthAttr = p.name.length > 24 ? ' textLength="610" lengthAdjust="spacingAndGlyphs"' : '';
    const motto = xml(p.motto || 'Waar iedereen speciaal is!');
    return [
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">',
      '<rect width="1200" height="800" fill="#ffdf79"/>',
      '<rect x="26" y="26" width="1148" height="748" rx="36" fill="none" stroke="#2d251e" stroke-width="17"/>',
      '<rect x="55" y="55" width="1090" height="690" rx="26" fill="none" stroke="#bc8744" stroke-width="4" stroke-dasharray="12 12"/>',
      '<text x="95" y="145" font-size="55" font-family="Arial,sans-serif" font-weight="900" fill="#27201b">FRIKANDELLENSTAD</text>',
      '<text x="1100" y="145" text-anchor="end" font-size="43" fill="#e9533b">★★★★★</text>',
      '<path d="M95 178H1105" stroke="#27201b" stroke-width="8"/>',
      '<rect x="86" y="220" width="305" height="319" rx="24" fill="#fff6d9" stroke="#27201b" stroke-width="8"/>',
      '<svg x="99" y="232" width="277" height="291" viewBox="0 0 360 360">',avatarSvg(p),'</svg>',
      '<text x="430" y="262" font-size="25" font-family="Arial,sans-serif" font-weight="900" letter-spacing="3" fill="#87592f">MIJN PERSOONLIJKE SNACKPASPOORT</text>',
      '<text x="430" y="349" font-size="',width,'" font-family="Arial,sans-serif" font-weight="900" fill="#27201b"',lengthAttr,'>',name,'</text>',
      '<text x="430" y="406" font-size="29" font-family="Arial,sans-serif" font-weight="800" fill="#87592f">WIJK: ',xml(districts[p.wijk]),'</text>',
      '<text x="430" y="452" font-size="27" font-family="Arial,sans-serif" fill="#87592f">',xml(p.sauce),'</text>',
      '<text x="430" y="499" font-size="22" font-family="Arial,sans-serif" font-style="italic" fill="#70523e">',motto.length > 65 ? motto.slice(0,65) : motto,'</text>',
      '<path d="M95 581H1105" stroke="#27201b" stroke-width="8"/>',
      '<text x="99" y="641" font-size="29" font-family="Arial,sans-serif" font-weight="900" fill="#27201b">STATUS: BIJZONDER SPECIAAL</text>',
      '<text x="99" y="689" font-size="23" font-family="Arial,sans-serif" fill="#7a5632">SNACKCODE: ',xml(p.code),'</text>',
      '<circle cx="1015" cy="663" r="89" fill="none" stroke="#c94b35" stroke-width="8"/>',
      '<text x="1015" y="649" text-anchor="middle" font-size="25" font-family="Arial,sans-serif" font-weight="900" fill="#b7432e">100%</text>',
      '<text x="1015" y="685" text-anchor="middle" font-size="24" font-family="Arial,sans-serif" font-weight="900" fill="#b7432e">SPECIAAL</text>',
      '</svg>'
    ].join('');
  }

  function downloadPng(svg, filename, width, height, button) {
    if (!ready) return;
    button.disabled = true;
    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function () {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { button.disabled = false; return; }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(function (png) {
        button.disabled = false;
        if (!png) { hint.textContent = 'Download mislukt. Probeer het nog eens.'; return; }
        const imageUrl = URL.createObjectURL(png);
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(function () { URL.revokeObjectURL(imageUrl); }, 10000);
      }, 'image/png');
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      button.disabled = false;
      hint.textContent = 'Download mislukt. Probeer het nog eens.';
    };
    img.src = url;
  }
  avatarButton.addEventListener('click', function () {
    if (ready) downloadPng(avatarSvg(ready), 'frikandellenstad-mijn-stripfiguur.png', 1080, 1080, avatarButton);
  });
  passportButton.addEventListener('click', function () {
    if (ready) downloadPng(passportSvg(ready), 'frikandellenstad-snackpaspoort.png', 1200, 800, passportButton);
  });
  show(details(), false);
})();
