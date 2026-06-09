// ── COLOUR PALETTE RENDERER ──
function initColorPage(){
  function lin(c){ c/=255; return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); }
  function lum(h){ return 0.2126*lin(parseInt(h.slice(1,3),16))+0.7152*lin(parseInt(h.slice(3,5),16))+0.0722*lin(parseInt(h.slice(5,7),16)); }
  function cr(a,b){ const la=lum(a),lb=lum(b),hi=Math.max(la,lb),lo=Math.min(la,lb); return (hi+0.05)/(lo+0.05); }
  function bestText(h){ return cr(h,'#FFFFFF')>=cr(h,'#000000')?'#FFFFFF':'#000000'; }
  function wcagBadge(h){
    const t=bestText(h), r=cr(h,t), s=r.toFixed(1)+':1';
    if(r>=4.5) return `<span class="cpv2-wcag pass">AA ${s}</span>`;
    if(r>=3.0) return `<span class="cpv2-wcag large">AA Large ${s}</span>`;
    return `<span class="cpv2-wcag fail">Fail ${s}</span>`;
  }

  const data = {
    groups: [
      {
        title: 'Primary Colors',
        desc: "Primary colors represent the brand's core identity. They are used for key interactive elements such as buttons, links, highlights, and navigational emphasis.",
        sections: [
          {
            title: 'Primary',
            type: 'primary',
            colors: [
              { name:'Marine', hex:'#1852FE' },
              { name:'Navy',   hex:'#001E4C' },
              { name:'White',  hex:'#FFFFFF' },
            ]
          },
          {
            title: 'Blue',
            type: 'scale',
            steps:[
              {s:'900',h:'#001e4c'},{s:'800',h:'#1f3a8a'},{s:'700',h:'#1d40af'},
              {s:'600',h:'#1c4ed8'},{s:'500',h:'#2463eb'},{s:'400',h:'#3b81f6'},
              {s:'300',h:'#5fa5f9'},{s:'200',h:'#92c5fd'},{s:'100',h:'#bedbfe'},
              {s:'50',h:'#dbeafe'},{s:'10',h:'#eef6ff'}
            ]
          }
        ]
      },
      {
        title: 'Semantic Colors',
        desc: 'Semantic colors communicate meaning, status, and feedback. They help users quickly understand warnings, errors, success messages, and contextual information.',
        sections: [
          { title:'Red',    type:'scale', steps:[{s:'900',h:'#450a0b'},{s:'800',h:'#7f1c1d'},{s:'700',h:'#981b1b'},{s:'600',h:'#b91c1b'},{s:'500',h:'#dc2625'},{s:'400',h:'#ef4444'},{s:'300',h:'#f77171'},{s:'200',h:'#fca5a5'},{s:'100',h:'#fecaca'},{s:'50',h:'#fde2e2'},{s:'10',h:'#fef1f2'}] },
          { title:'Yellow', type:'scale', steps:[{s:'900',h:'#412007'},{s:'800',h:'#713e11'},{s:'700',h:'#844d0f'},{s:'600',h:'#a16207'},{s:'500',h:'#ca8a03'},{s:'400',h:'#eab305'},{s:'300',h:'#facc14'},{s:'200',h:'#fde046'},{s:'100',h:'#feef89'},{s:'50',h:'#fef9c3'},{s:'10',h:'#fefce8'}] },
          { title:'Orange', type:'scale', steps:[{s:'900',h:'#5c2a06'},{s:'800',h:'#a34706'},{s:'700',h:'#c25203'},{s:'600',h:'#ce5b0a'},{s:'500',h:'#e76a10'},{s:'400',h:'#fb7d24'},{s:'300',h:'#ff9348'},{s:'200',h:'#ffa96b'},{s:'100',h:'#ffb988'},{s:'50',h:'#ffe0ca'},{s:'10',h:'#fff3eb'}] },
          { title:'Green',  type:'scale', steps:[{s:'900',h:'#0a3b1c'},{s:'800',h:'#0e4f26'},{s:'700',h:'#147638'},{s:'600',h:'#1b9e4b'},{s:'500',h:'#22c55e'},{s:'400',h:'#4ed17e'},{s:'300',h:'#7adc9e'},{s:'200',h:'#a7e8bf'},{s:'100',h:'#bdeecf'},{s:'50',h:'#d3f3df'},{s:'10',h:'#e9f9ef'}] },
        ]
      },
      {
        title: 'Neutral Colors',
        desc: 'Neutral colors form the foundation of layouts. They are used for text, borders, backgrounds, surfaces, and subtle UI components. The scale allows for building depth, contrast, and hierarchy without overpowering primary or semantic colors.',
        sections: [
          { title:'Grey',  type:'scale', showHex:true, steps:[{s:'900',h:'#030712'},{s:'800',h:'#10172a'},{s:'700',h:'#1e293b'},{s:'600',h:'#334154'},{s:'500',h:'#475569'},{s:'400',h:'#64748b'},{s:'300',h:'#94a3b8'},{s:'200',h:'#cbd5e1'},{s:'100',h:'#e2e8f0'},{s:'50',h:'#f1f5f9'},{s:'10',h:'#f7fafc'}] },
          { title:'Black', type:'scale', steps:[{s:'900',h:'#000000'},{s:'800',h:'#111111'},{s:'700',h:'#222222'},{s:'600',h:'#333333'},{s:'500',h:'#444444'},{s:'400',h:'#555555'},{s:'300',h:'#666666'},{s:'200',h:'#999999'},{s:'100',h:'#cccccc'},{s:'50',h:'#eeeeee'},{s:'10',h:'#f8f8f8'}] },
        ]
      },
      {
        title: 'Accent Colors',
        desc: 'Accent colors complement the primary palette and bring unique visual character to specific modules or data-heavy interfaces. They should be used sparingly to highlight, categorize, or differentiate content.',
        sections: [
          { title:'Teal',   type:'scale', steps:[{s:'900',h:'#01443c'},{s:'800',h:'#006559'},{s:'700',h:'#008475'},{s:'600',h:'#00aa97'},{s:'500',h:'#00dac1'},{s:'400',h:'#00f0d4'},{s:'300',h:'#42f8e3'},{s:'200',h:'#7cf7e8'},{s:'100',h:'#99fbef'},{s:'50',h:'#b9fff7'},{s:'10',h:'#e6fefb'}] },
          { title:'Purple', type:'scale', steps:[{s:'900',h:'#380731'},{s:'800',h:'#4b0941'},{s:'700',h:'#710e61'},{s:'600',h:'#961282'},{s:'500',h:'#bc17a2'},{s:'400',h:'#c945b4'},{s:'300',h:'#d773c7'},{s:'200',h:'#e4a0d9'},{s:'100',h:'#ebb7e2'},{s:'50',h:'#f2ceec'},{s:'10',h:'#f8e5f5'}] },
        ]
      }
    ]
  };

  const copyIconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

  function renderPrimarySection(sec){
    return `<div style="margin-bottom:40px;">
      <div class="cpv2-scale-title">${sec.title}</div>
      <div class="cpv2-primary-row">${
        sec.colors.map(c=>{
          const border=c.hex==='#FFFFFF'?'border:1.5px solid #cbd5e1;':'';
          return `<div class="cpv2-primary-block" onclick="copyColorBlock(this,'${c.hex.toUpperCase()}')">
            <div style="position:relative;">
              <div class="cpv2-primary-swatch" style="background:${c.hex};${border};"></div>
              <div class="cpv2-copy-icon">${copyIconSvg} Copy</div>
            </div>
            <div class="cpv2-primary-meta">
              <span class="cpv2-primary-name">${c.name}</span>
              <span class="cpv2-primary-hex">${c.hex.toUpperCase()}</span>
              ${wcagBadge(c.hex)}
            </div>
          </div>`;
        }).join('')
      }</div>
    </div>`;
  }

  function renderScaleSection(sec){
    return `<div style="margin-bottom:40px;">
      <div class="cpv2-scale-title">${sec.title}</div>
      <div class="cpv2-scale">${
        sec.steps.map(st=>{
          const border=st.h==='#ffffff'||st.h==='#f7fafc'||st.h==='#f8f8f8'||st.h==='#eef6ff'||st.h==='#fef1f2'||st.h==='#fefce8'||st.h==='#fff3eb'||st.h==='#e9f9ef'||st.h==='#e6fefb'||st.h==='#f8e5f5'?'border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;':'';
          const isFirst=sec.steps[0].h===st.h;
          const isLast=sec.steps[sec.steps.length-1].h===st.h;
          const radius=isFirst?'border-radius:8px 0 0 0;':isLast?'border-radius:0 8px 0 0;':'';
          return `<div class="cpv2-block" onclick="copyColorBlock(this,'${st.h.toUpperCase()}')">
            <div style="position:relative;">
              <div class="cpv2-swatch" style="background:${st.h};${radius}${border}"></div>
              <div class="cpv2-copy-icon">${copyIconSvg}</div>
            </div>
            <div class="cpv2-meta">
              <span class="cpv2-step">${st.s}</span>
              <span class="cpv2-hex">${st.h.toUpperCase()}</span>
              ${wcagBadge(st.h)}
            </div>
          </div>`;
        }).join('')
      }</div>
    </div>`;
  }

  let html = '';
  data.groups.forEach(g=>{
    html += `<div class="cpv2-group">
      <div class="cpv2-group-title">${g.title}</div>
      <div class="cpv2-group-desc">${g.desc}</div>`;
    g.sections.forEach(sec=>{
      html += sec.type==='primary' ? renderPrimarySection(sec) : renderScaleSection(sec);
    });
    html += `</div>`;
  });
  const root = document.getElementById('cpv2-root');
  if (root) root.innerHTML = html;
}

// ── NAVIGATION & SEARCH ──
const PAGES = {
  'welcome':              { label: 'Welcome',              nav: 'nav-welcome' },
  'get-started':          { label: 'Get Started',           nav: 'nav-get-started' },
  'foundations':          { label: 'Foundations',           nav: 'nav-foundations' },
  'found-color':          { label: 'Colour Palette',        nav: 'nav-found-color',        parent: 'Foundations' },
  'found-tokens':         { label: 'Design Tokens',         nav: 'nav-found-tokens',        parent: 'Foundations' },
  'found-typography':     { label: 'Typography',            nav: 'nav-found-typography',   parent: 'Foundations' },
  'found-icons':          { label: 'Icons',                 nav: 'nav-found-icons',        parent: 'Foundations' },
  'found-illustrations':  { label: 'Illustrations',         nav: 'nav-found-illustrations',parent: 'Foundations' },
  'found-logos':          { label: 'Logos',                 nav: 'nav-found-logos',        parent: 'Foundations' },
  'found-spacing':        { label: 'Spacing',               nav: 'nav-found-spacing',      parent: 'Foundations' },
  'found-padding':        { label: 'Padding',               nav: 'nav-found-padding',      parent: 'Foundations' },
  'found-margin':         { label: 'Margin',                nav: 'nav-found-margin',       parent: 'Foundations' },
  'found-radius':         { label: 'Radius',                nav: 'nav-found-radius',       parent: 'Foundations' },
  'found-elevation':      { label: 'Elevation',             nav: 'nav-found-elevation',    parent: 'Foundations' },
  // Primitives
  'prim-accordion':       { label: 'Accordion',             nav: 'nav-prim-accordion',     parent: 'Primitives' },
  'prim-badge':           { label: 'Badge',                 nav: 'nav-prim-badge',         parent: 'Primitives' },
  'prim-breadcrumb':      { label: 'Breadcrumb',            nav: 'nav-prim-breadcrumb',    parent: 'Primitives' },
  'prim-banners':         { label: 'Banners',               nav: 'nav-prim-banners',       parent: 'Primitives' },
  'prim-buttons':         { label: 'Buttons',               nav: 'nav-prim-buttons',       parent: 'Primitives' },
  'prim-cards':           { label: 'Cards',                 nav: 'nav-prim-cards',         parent: 'Primitives' },
  'prim-checkbox':        { label: 'Checkbox',              nav: 'nav-prim-checkbox',      parent: 'Primitives' },
  'prim-chips':           { label: 'Chips',                 nav: 'nav-prim-chips',         parent: 'Primitives' },
  'prim-radio':           { label: 'Radio Button',          nav: 'nav-prim-radio',         parent: 'Primitives' },
  'prim-dropdowns':       { label: 'Dropdowns',             nav: 'nav-prim-dropdowns',     parent: 'Primitives' },
  'prim-slider':          { label: 'Slider',                nav: 'nav-prim-slider',        parent: 'Primitives' },
  'prim-textfields':      { label: 'Text Fields',           nav: 'nav-prim-textfields',    parent: 'Primitives' },
  'prim-search':          { label: 'Search & Filter',       nav: 'nav-prim-search',        parent: 'Primitives' },
  'prim-scroll':          { label: 'Scroll',                nav: 'nav-prim-scroll',        parent: 'Primitives' },
  'prim-toasts':          { label: 'Toasts',                nav: 'nav-prim-toasts',        parent: 'Primitives' },
  'prim-tooltip':         { label: 'Tooltip',               nav: 'nav-prim-tooltip',       parent: 'Primitives' },
  'prim-toggles':         { label: 'Switch',                 nav: 'nav-prim-toggles',       parent: 'Primitives' },
  'prim-segmented':       { label: 'Segmented Button',       nav: 'nav-prim-segmented',     parent: 'Primitives' },
  'prim-menu':            { label: 'Menu',                   nav: 'nav-prim-menu',           parent: 'Primitives' },
  // Panels
  'panel-calendars':      { label: 'Calendars',             nav: 'nav-panel-calendars',    parent: 'Panels' },
  'panel-email':          { label: 'Email',                 nav: 'nav-panel-email',        parent: 'Panels' },
  'panel-popover':        { label: 'Popover',               nav: 'nav-panel-popover',      parent: 'Panels' },
  'panel-modals':         { label: 'Modals',                nav: 'nav-panel-modals',       parent: 'Panels' },
  'panel-notifications':  { label: 'Notification Panel',    nav: 'nav-panel-notifications',parent: 'Panels' },
  'panel-slideout':       { label: 'Slideout',              nav: 'nav-panel-slideout',     parent: 'Panels' },
  // Views
  'view-map':             { label: 'Map Components',        nav: 'nav-view-map',           parent: 'Views' },
  'view-dashboard':       { label: 'Dashboard View',        nav: 'nav-view-dashboard',     parent: 'Views' },
  'view-upload':          { label: 'Upload',                nav: 'nav-view-upload',        parent: 'Views' },
  'view-table':           { label: 'Table View',            nav: 'nav-view-table',         parent: 'Views' },
  'view-detail':          { label: 'Detail Page View',      nav: 'nav-view-detail',        parent: 'Views' },
  'view-charts':          { label: 'Information Cards',     nav: 'nav-view-charts',        parent: 'Views' },
  // Navigations
  'nav-pagination':       { label: 'Pagination',            nav: 'nav-nav-pagination',     parent: 'Navigations' },
  'nav-progress':         { label: 'Progress Bar',           nav: 'nav-nav-progress',      parent: 'Navigations' },
  'nav-sidenav':          { label: 'Side Navigation',       nav: 'nav-nav-sidenav',        parent: 'Navigations' },
  'nav-steppers':         { label: 'Steppers',              nav: 'nav-nav-steppers',       parent: 'Navigations' },
  'nav-topnav':           { label: 'Top Navigation',        nav: 'nav-nav-topnav',         parent: 'Navigations' },
  'nav-tabs':             { label: 'Tabs',                  nav: 'nav-nav-tabs',           parent: 'Navigations' },
  // Loading
  'loading-spinner':      { label: 'Spinner',               nav: 'nav-loading-spinner',    parent: 'Loading' },
  'loading-skeleton':     { label: 'Skeleton',              nav: 'nav-loading-skeleton',   parent: 'Loading' },
  // Forms
  'form-tabular':         { label: 'Tabular Form',          nav: 'nav-form-tabular',       parent: 'Forms' },
  'form-scrollable':      { label: 'Scrollable Form',       nav: 'nav-form-scrollable',    parent: 'Forms' },
  'form-signup':          { label: 'Signup',                nav: 'nav-form-signup',        parent: 'Forms' },
  'release-phases':       { label: 'Release Phases',        nav: 'nav-release-phases' },
};

const SEARCH_INDEX = [
  { title: 'Welcome',           path: 'welcome',         icon: '🏠', cat: 'Pages' },
  { title: 'Get Started',       path: 'get-started',     icon: '🚀', cat: 'Pages' },
  { title: 'Colour Palette',    path: 'found-color',      icon: '🎨', cat: 'Foundations' },
  { title: 'Design Tokens',     path: 'found-tokens',     icon: '🔷', cat: 'Foundations' },
  { title: 'Typography',        path: 'found-typography', icon: '✏️', cat: 'Foundations' },
  { title: 'Spacing',           path: 'found-spacing',    icon: '📐', cat: 'Foundations' },
  { title: 'Padding',           path: 'found-padding',    icon: '📦', cat: 'Foundations' },
  { title: 'Radius',            path: 'found-radius',     icon: '⬜', cat: 'Foundations' },
  { title: 'Elevation',         path: 'found-elevation',  icon: '🪟', cat: 'Foundations' },
  { title: 'Color Tokens',      path: 'found-tokens',    icon: '🔷', cat: 'Primitives' },
  { title: 'Spacing Tokens',    path: 'found-spacing',   icon: '📐', cat: 'Primitives' },
  { title: 'Shadow Tokens',     path: 'found-elevation', icon: '🪟', cat: 'Primitives' },
  { title: 'Radius Tokens',     path: 'found-radius',    icon: '⬜', cat: 'Primitives' },
  { title: 'Buttons',           path: 'prim-buttons',    icon: '⚡', cat: 'Components' },
  { title: 'Switch',            path: 'prim-toggles',   icon: '⚡', cat: 'Components' },
  { title: 'Checkbox',          path: 'prim-checkbox',   icon: '⚡', cat: 'Components' },
  { title: 'Badge',             path: 'prim-badge',      icon: '⚡', cat: 'Components' },
  { title: 'Accordion',         path: 'prim-accordion',  icon: '⚡', cat: 'Components' },
  { title: 'Text Fields',       path: 'prim-textfields', icon: '⚡', cat: 'Components' },
  { title: 'Breadcrumb',        path: 'prim-breadcrumb', icon: '⚡', cat: 'Components' },
  { title: 'Banners',           path: 'prim-banners',    icon: '⚡', cat: 'Components' },
  { title: 'Progress Bar',      path: 'nav-progress',      icon: '⚡', cat: 'Components' },
  { title: 'Spinner',           path: 'loading-spinner',   icon: '⚡', cat: 'Components' },
  { title: 'Skeleton',          path: 'loading-skeleton',  icon: '⚡', cat: 'Components' },
  { title: 'Toasts',            path: 'prim-toasts',       icon: '⚡', cat: 'Components' },
  { title: 'Dropdowns',         path: 'prim-dropdowns',  icon: '⚡', cat: 'Components' },
  { title: 'Chips',             path: 'prim-chips',      icon: '⚡', cat: 'Components' },
  { title: 'Radio Button',      path: 'prim-radio',      icon: '⚡', cat: 'Components' },
  { title: 'Icons',             path: 'found-icons',     icon: '✦',  cat: 'Foundations' },
  { title: 'Illustrations',     path: 'found-illustrations', icon: '🎨', cat: 'Foundations' },
  { title: 'Logos',             path: 'found-logos',     icon: '🏷️', cat: 'Foundations' },
  { title: 'Margin',            path: 'found-margin',    icon: '📐', cat: 'Foundations' },
  { title: 'Release Phases',    path: 'release-phases',  icon: '📋', cat: 'Info' },
];

let currentPage = 'welcome';

// ── Ocean ambient — calm waves · distant seagulls · ship horn ────
// All sound generated via Web Audio API — no audio files required.
let _oceanNodes = null;
let _oceanReady = false;

// ── Noise buffers ─────────────────────────────────────────────────

/**
 * Brown (Brownian) noise — deep, ocean-like rumble.
 * Lower spectral density than white/pink: suits distant waves.
 */
function _brownNoiseBuf(ctx, seconds, channels) {
  const buf = ctx.createBuffer(channels, ctx.sampleRate * seconds, ctx.sampleRate);
  for (let ch = 0; ch < channels; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      last = (last + 0.018 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.5;
    }
  }
  return buf;
}

/**
 * Pink noise — fills the mid-frequency surf texture.
 * Keeps it from sounding too boomy or too hissy.
 */
function _pinkNoiseBuf(ctx, seconds, channels) {
  const buf = ctx.createBuffer(channels, ctx.sampleRate * seconds, ctx.sampleRate);
  for (let ch = 0; ch < channels; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  }
  return buf;
}

// ── Seagull (distant, low, single call) ──────────────────────────

function _seagullCry(ctx, masterGain) {
  // Distant seagull: lower pitch, very quiet, gentle tremolo, soft release
  const osc1 = ctx.createOscillator(); osc1.type = 'sine';
  const osc2 = ctx.createOscillator(); osc2.type = 'triangle';

  // Slow, gentle vibrato
  const vib = ctx.createOscillator(); vib.frequency.value = 5.2;
  const vibG = ctx.createGain();      vibG.gain.value = 10;
  vib.connect(vibG);
  vibG.connect(osc1.frequency);
  vibG.connect(osc2.frequency);

  // Bandpass to shape each layer — lower centre freq = more distant
  const bp1 = ctx.createBiquadFilter();
  bp1.type = 'bandpass'; bp1.frequency.value = 680; bp1.Q.value = 2.0;
  const bp2 = ctx.createBiquadFilter();
  bp2.type = 'bandpass'; bp2.frequency.value = 1180; bp2.Q.value = 3.0;

  // High-shelf cut to push it further away
  const shelf = ctx.createBiquadFilter();
  shelf.type = 'highshelf'; shelf.frequency.value = 2200; shelf.gain.value = -12;

  const env  = ctx.createGain(); env.gain.value = 0;
  const mix1 = ctx.createGain(); mix1.gain.value = 1.0;
  const mix2 = ctx.createGain(); mix2.gain.value = 0.28;
  // Very quiet — distant bird floating far offshore
  const vol  = ctx.createGain(); vol.gain.value = 0.024;

  osc1.connect(bp1); bp1.connect(mix1); mix1.connect(env);
  osc2.connect(bp2); bp2.connect(mix2); mix2.connect(env);
  env.connect(shelf); shelf.connect(vol); vol.connect(masterGain);

  const t = ctx.currentTime;

  // Softer "kee-yah" — shorter sweep, gentler slopes
  osc1.frequency.setValueAtTime(420, t);
  osc1.frequency.linearRampToValueAtTime(740,  t + 0.18);
  osc1.frequency.linearRampToValueAtTime(620,  t + 0.45);
  osc1.frequency.linearRampToValueAtTime(460,  t + 0.85);

  osc2.frequency.setValueAtTime(630, t);
  osc2.frequency.linearRampToValueAtTime(1110, t + 0.18);
  osc2.frequency.linearRampToValueAtTime(930,  t + 0.45);
  osc2.frequency.linearRampToValueAtTime(690,  t + 0.85);

  // Slow swell in, slow fade out
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(0.8,  t + 0.10);
  env.gain.setValueAtTime(0.7,           t + 0.35);
  env.gain.linearRampToValueAtTime(0.45, t + 0.60);
  env.gain.linearRampToValueAtTime(0,    t + 0.95);

  const dur = 1.05;
  vib.start(t); osc1.start(t); osc2.start(t);
  vib.stop(t + dur); osc1.stop(t + dur); osc2.stop(t + dur);
}

function _scheduleGulls(ctx, masterGain, idHolder) {
  // Very infrequent — just a hint of life in the distance
  const gap = 10000 + Math.random() * 8000;  // 10–18 s between events
  idHolder.t = setTimeout(() => {
    if (!_oceanOn) return;
    // Usually a single cry; occasionally a soft pair
    const cries = Math.random() < 0.25 ? 2 : 1;
    for (let c = 0; c < cries; c++) {
      setTimeout(() => _seagullCry(ctx, masterGain), c * 800);
    }
    _scheduleGulls(ctx, masterGain, idHolder);
  }, gap);
}

// ── Ship horn (distant foghorn) ───────────────────────────────────

function _shipHorn(ctx, masterGain) {
  // Deep, low foghorn: fundamental ~90 Hz + harmonics for body
  // Very quiet, long sustain — sounds like it's far out at sea
  const fundamentals = [
    { freq: 92,  gain: 1.00, type: 'sine'     },
    { freq: 184, gain: 0.45, type: 'sine'     },
    { freq: 276, gain: 0.18, type: 'triangle' },
    { freq: 368, gain: 0.06, type: 'sine'     },
  ];

  const oscs = fundamentals.map(f => {
    const osc = ctx.createOscillator();
    osc.type = f.type;
    osc.frequency.value = f.freq;
    // Slight pitch flutter — like a real horn
    osc.frequency.setValueAtTime(f.freq * 0.994, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(f.freq,       ctx.currentTime + 0.6);
    osc.frequency.linearRampToValueAtTime(f.freq * 1.003, ctx.currentTime + 1.8);
    osc.frequency.linearRampToValueAtTime(f.freq,       ctx.currentTime + 3.5);
    const g = ctx.createGain(); g.gain.value = f.gain;
    osc.connect(g);
    return { osc, g };
  });

  // Low-pass to dull the horn (it's far away — high freqs don't carry)
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 480; lp.Q.value = 0.6;

  // Envelope — slow attack (0.6 s), long sustain, slow fade
  const env = ctx.createGain(); env.gain.value = 0;
  const vol = ctx.createGain(); vol.gain.value = 0.032; // quiet — background only

  oscs.forEach(({ g }) => g.connect(lp));
  lp.connect(env); env.connect(vol); vol.connect(masterGain);

  const t   = ctx.currentTime;
  const dur = 3.2 + Math.random() * 1.4; // 3.2–4.6 s blast

  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(1,   t + 0.60);   // slow swell in
  env.gain.setValueAtTime(0.92,         t + dur - 0.8);
  env.gain.linearRampToValueAtTime(0,   t + dur + 0.5); // tail off

  oscs.forEach(({ osc }) => { osc.start(t); osc.stop(t + dur + 0.8); });
}

function _scheduleHorn(ctx, masterGain, idHolder) {
  // Very occasional — a distant ship passing by every 45–100 seconds
  const gap = 45000 + Math.random() * 55000;
  idHolder.hornT = setTimeout(() => {
    if (!_oceanOn) return;
    _shipHorn(ctx, masterGain);
    _scheduleHorn(ctx, masterGain, idHolder);
  }, gap);
}

// ── Build the full soundscape ─────────────────────────────────────

function _buildOcean() {
  const ctx  = new (window.AudioContext || window.webkitAudioContext)();

  // Master gain — everything routes here before ctx.destination
  const master = ctx.createGain(); master.gain.value = 0.85;
  master.connect(ctx.destination);

  // ── Wave layer A: deep swell (brown noise, very low cutoff) ──
  const waveSrcA = ctx.createBufferSource();
  waveSrcA.buffer = _brownNoiseBuf(ctx, 8, 2);
  waveSrcA.loop = true;

  const lpA1 = ctx.createBiquadFilter();
  lpA1.type = 'lowpass'; lpA1.frequency.value = 340; lpA1.Q.value = 0.35;
  const lpA2 = ctx.createBiquadFilter();
  lpA2.type = 'lowpass'; lpA2.frequency.value = 640; lpA2.Q.value = 0.5;

  // Slow, deep swell — like swells rolling in from far away (one per ~15 s)
  const swellLfo = ctx.createOscillator();
  swellLfo.type = 'sine'; swellLfo.frequency.value = 0.042; // ~0.042 Hz = ~24 s period
  const swellDepth = ctx.createGain(); swellDepth.gain.value = 140;
  swellLfo.connect(swellDepth); swellDepth.connect(lpA1.frequency);

  const gainA = ctx.createGain(); gainA.gain.value = 0;
  waveSrcA.connect(lpA1); lpA1.connect(lpA2); lpA2.connect(gainA); gainA.connect(master);

  // ── Wave layer B: surf texture (pink noise, mid-band) ──
  const waveSrcB = ctx.createBufferSource();
  waveSrcB.buffer = _pinkNoiseBuf(ctx, 5, 1);
  waveSrcB.loop = true;

  const lpB = ctx.createBiquadFilter();
  lpB.type = 'bandpass'; lpB.frequency.value = 800; lpB.Q.value = 0.55;

  // Slightly different swell rhythm — layering creates natural variation
  const surfLfo = ctx.createOscillator();
  surfLfo.type = 'sine'; surfLfo.frequency.value = 0.058;
  const surfDepth = ctx.createGain(); surfDepth.gain.value = 220;
  surfLfo.connect(surfDepth); surfDepth.connect(lpB.frequency);

  const gainB = ctx.createGain(); gainB.gain.value = 0;
  waveSrcB.connect(lpB); lpB.connect(gainB); gainB.connect(master);

  // ── Gentle wash layer: very high-passed white noise (foam hiss) ──
  const waveSrcC = ctx.createBufferSource();
  waveSrcC.buffer = _brownNoiseBuf(ctx, 4, 1);
  waveSrcC.loop = true;

  const hpC = ctx.createBiquadFilter();
  hpC.type = 'highpass'; hpC.frequency.value = 1800; hpC.Q.value = 0.3;
  const lpC = ctx.createBiquadFilter();
  lpC.type  = 'lowpass';  lpC.frequency.value = 4200;

  // Foam rises and falls with each swell — offset phase from layer A
  const foamLfo = ctx.createOscillator();
  foamLfo.type = 'sine'; foamLfo.frequency.value = 0.038;
  const foamDepth = ctx.createGain(); foamDepth.gain.value = 0.018;
  const gainC = ctx.createGain(); gainC.gain.value = 0;
  foamLfo.connect(foamDepth); foamDepth.connect(gainC.gain);

  waveSrcC.connect(hpC); hpC.connect(lpC); lpC.connect(gainC); gainC.connect(master);

  // ── Fade everything in very slowly (5 s) ──
  waveSrcA.start(); waveSrcB.start(); waveSrcC.start();
  swellLfo.start(); surfLfo.start(); foamLfo.start();

  const now = ctx.currentTime;
  gainA.gain.linearRampToValueAtTime(0.15, now + 5); // deep swell — subdued
  gainB.gain.linearRampToValueAtTime(0.07, now + 5); // surf texture — subtle
  gainC.gain.linearRampToValueAtTime(0.028, now + 5); // foam hiss — barely there

  // ── Schedule distant life ──
  const timers = {};

  // First gull appears after ~12 s so the waves establish themselves first
  timers.t = setTimeout(() => _scheduleGulls(ctx, master, timers), 12000 + Math.random() * 4000);

  // First horn blast waits a while — it's a surprise, not a greeting
  _scheduleHorn(ctx, master, timers);

  return {
    ctx,
    sources: [waveSrcA, waveSrcB, waveSrcC],
    lfos:    [swellLfo, surfLfo, foamLfo],
    gullTimer: timers,
  };
}

function _stopOcean() {
  if (!_oceanNodes) return;
  clearTimeout(_oceanNodes.gullTimer.t);
  clearTimeout(_oceanNodes.gullTimer.hornT);
  try { _oceanNodes.sources.forEach(s => s.stop()); } catch(e) {}
  try { _oceanNodes.lfos.forEach(l => l.stop()); }   catch(e) {}
  try { _oceanNodes.ctx.close(); }                    catch(e) {}
  _oceanNodes = null;
}

let _oceanOn = false;

function _resumeOnGesture(ctx) {
  const resume = () => {
    ctx.resume();
    document.removeEventListener('click',    resume);
    document.removeEventListener('keydown',  resume);
    document.removeEventListener('touchend', resume);
  };
  document.addEventListener('click',    resume);
  document.addEventListener('keydown',  resume);
  document.addEventListener('touchend', resume);
}

function _startOcean() {
  if (_oceanReady) return;
  _oceanReady = true;
  _oceanNodes = _buildOcean();
  if (_oceanNodes.ctx.state === 'suspended') {
    _resumeOnGesture(_oceanNodes.ctx);
  }
  _updateSoundBtn();
}

// Sound is OFF by default — user turns it on via the toggle button.
// Just update the button UI so it reflects the off state on load.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _updateSoundBtn);
} else {
  _updateSoundBtn();
}

function toggleOceanSound() {
  if (_oceanOn) {
    _stopOcean();
    _oceanOn = false;
    _oceanReady = false;
  } else {
    _oceanOn = true;
    _oceanReady = false;
    _startOcean();
  }
  _updateSoundBtn();
}

function _updateSoundBtn() {
  const v = _oceanOn ? '1' : '0';
  const t = _oceanOn ? 'Mute ocean ambience' : 'Play ocean ambience';
  ['sound-toggle', 'sidebar-sound-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.setAttribute('data-on', v); el.title = t; }
  });
}

// ── Pronunciation — Web Speech API ───────────────────────────────
// Drop Assets/pelagos-pronunciation.mp3 (>2 KB) to use a recorded file instead.
function pronouncePelagos() {
  const mp3 = new Audio('Assets/pelagos-pronunciation.mp3');
  mp3.addEventListener('canplaythrough', () => {
    if (mp3.duration > 0.5) { mp3.play(); return; }
    _speakPelagos();
  }, { once: true });
  mp3.addEventListener('error', _speakPelagos, { once: true });
  mp3.load();
  setTimeout(() => { if (mp3.readyState < 4) _speakPelagos(); }, 400);
}
function _speakPelagos() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance('Pelagos Design System');
  u.rate = 0.88; u.pitch = 1.0; u.volume = 1;
  window.speechSynthesis.speak(u);
}

// ── Welcome page metrics ──────────────────────────────────────────
function buildWelcomeMetrics() {
  const componentParents = new Set(['Primitives', 'Panels']);
  let components = 0, foundations = 0;
  Object.values(PAGES).forEach(p => {
    if (componentParents.has(p.parent)) components++;
    else if (p.parent === 'Foundations') foundations++;
  });
  const ce = document.getElementById('wmet-components');
  const fe = document.getElementById('wmet-foundations');
  const te = document.getElementById('wmet-tokens');
  if (ce) ce.textContent = components;
  if (fe) fe.textContent = foundations;
  if (te) {
    let tokenCount = 0;
    try {
      const styles = getComputedStyle(document.documentElement);
      for (let prop of styles) { if (prop.startsWith('--')) tokenCount++; }
    } catch(e) { tokenCount = 200; }
    te.textContent = tokenCount || 200;
  }
}

// ── Page-specific init functions run after content loads ──────────
// ── CALENDAR DEMO ENGINE (full-featured v2 — Figma-accurate pill cells) ───────
(function() {
  var S = {}; // state keyed by id
  var DAYS_LONG = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var ML = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var MS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var WD = ['Mo','Tu','We','Th','Fr','Sa','Su'];

  function p2(n) { return n < 10 ? '0' + n : '' + n; }
  function dk(y,m,d) { return y + '-' + p2(m) + '-' + p2(d); }
  function cmp(a,b) {
    if (!a || !b) return 0;
    var av = a[0]*10000+a[1]*100+a[2], bv = b[0]*10000+b[1]*100+b[2];
    return av < bv ? -1 : av > bv ? 1 : 0;
  }

  // ─── SVG arrows ──────────────────────────────────────────────
  var PREV_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>';
  var NEXT_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>';

  // ─── Render day grid (pill cells + wrapper cols for range bg) ────────────────
  function renderDays(id) {
    var s = S[id]; if (!s) return;
    var el = document.getElementById(id); if (!el) return;
    var y = s.year, m = s.month;
    var now = new Date(); var ty=now.getFullYear(), tm=now.getMonth(), td=now.getDate();
    var firstDay = new Date(y,m,1).getDay();
    var start = firstDay === 0 ? 6 : firstDay - 1;
    var dim = new Date(y,m+1,0).getDate();
    var dip = new Date(y,m,0).getDate();

    var titleClick = 'gsCalSetMode(\'' + id + '\',\'months\')';
    var h = '<div class="gs-cal-header">'
      + '<button class="gs-cal-nav" onclick="gsCalNav(\'' + id + '\',-1)" aria-label="Prev month">' + PREV_SVG + '</button>'
      + '<button class="gs-cal-title-btn" onclick="' + titleClick + '">' + ML[m] + ' ' + y + '</button>'
      + '<button class="gs-cal-nav" onclick="gsCalNav(\'' + id + '\',1)" aria-label="Next month">' + NEXT_SVG + '</button>'
      + '</div>';

    var wd = '<div class="gs-cal-wdays">' + WD.map(function(d){return '<span>'+d+'</span>';}).join('') + '</div>';

    var body = '<div class="gs-cal-body">', day=1, nxt=1;
    for (var row=0; row<6; row++) {
      var rh = '<div class="gs-cal-row">';
      for (var col=0; col<7; col++) {
        var idx=row*7+col, cd, cy=y, cm=m, mu=false;
        if (idx < start) {
          cd=dip-start+idx+1; cm=m-1; cy=m===0?y-1:y; if(cm<0)cm=11; mu=true;
        } else if (day > dim) {
          cd=nxt++; cm=m+1; cy=m===11?y+1:y; if(cm>11)cm=0; mu=true;
        } else { cd=day++; }

        var isToday = !mu && cy===ty && cm===tm && cd===td;
        var isSel=false, rsStart=false, rsEnd=false, inRng=false;
        var td3 = [cy,cm,cd];

        if (s.rangeMode) {
          if (s.rs) rsStart = cmp(td3,s.rs)===0;
          if (s.re) rsEnd   = cmp(td3,s.re)===0;
          if (s.rs && s.re) inRng = cmp(td3,s.rs)>0 && cmp(td3,s.re)<0;
        } else {
          isSel = s.sel && !mu && cy===s.sel[0] && cm===s.sel[1] && cd===s.sel[2];
        }

        // Column wrapper: handles range background strip
        var colCls = 'gs-cal-col';
        if (inRng)   colCls += ' gs-col-in-range';
        if (rsStart) colCls += ' gs-col-rs';  // right-half range bg
        if (rsEnd)   colCls += ' gs-col-re';  // left-half range bg

        // Pill button: handles cell appearance
        var cls = 'gs-cal-cell';
        if (mu) cls += ' gs-cal-muted';
        if (isToday && !isSel && !rsStart && !rsEnd) cls += ' gs-cal-today';
        if (isSel || rsStart || rsEnd) cls += ' gs-cal-selected';

        var ds = dk(cy,cm,cd);
        rh += '<div class="'+colCls+'">'
          + '<button class="'+cls+'" onclick="gsCalSelect(\''+id+'\',\''+ds+'\')" tabindex="0">'+cd+'</button>'
          + '</div>';
      }
      rh += '</div>';
      body += rh;
      if (day > dim) break;
    }
    body += '</div>';
    el.innerHTML = h + wd + body;
    updateDtHeader(id);
    updateFooter(id);
  }

  // ─── Time picker (15-min slots from 00:00 to 23:45) ─────────────────────────
  function renderTimePicker(id) {
    var s = S[id]; if (!s) return;
    var panel = document.getElementById(id + '-timepanel'); if (!panel) return;
    var selH = s.h, selMin = s.min;
    var slots = '';
    for (var hh=0; hh<24; hh++) {
      for (var mm=0; mm<60; mm+=15) {
        var ampm = hh < 12 ? 'AM' : 'PM';
        var dh = hh > 12 ? hh-12 : (hh===0 ? 12 : hh);
        var label = p2(dh) + ':' + p2(mm) + ' ' + ampm;
        var isSel = hh===selH && mm===selMin;
        var cls = 'gs-cal-tslot' + (isSel ? ' gs-cal-tslot-sel' : '');
        slots += '<button class="'+cls+'" onclick="gsCalSelectTime(\''+id+'\','+hh+','+mm+')">'+label+'</button>';
      }
    }
    panel.innerHTML = slots;
    // Scroll selected into view
    var selEl = panel.querySelector('.gs-cal-tslot-sel');
    if (selEl) { setTimeout(function(){ selEl.scrollIntoView({block:'center',behavior:'smooth'}); }, 50); }
  }

  // ─── Dark header for date+time variant ──────────────────────────────────────
  function updateDtHeader(id) {
    var s = S[id]; if (!s || !s.showTime) return;
    var hdr = document.getElementById(id + '-dthdr'); if (!hdr) return;
    var now = new Date(); var ty=now.getFullYear();
    if (s.sel) {
      var d = new Date(s.sel[0], s.sel[1], s.sel[2]);
      var dayName = DAYS_LONG[d.getDay()];
      var ampm = s.h < 12 ? 'AM' : 'PM';
      var dh = s.h > 12 ? s.h-12 : (s.h===0 ? 12 : s.h);
      hdr.querySelector('.gs-cal-dthdr-year').textContent = s.sel[0];
      hdr.querySelector('.gs-cal-dthdr-date').textContent = dayName + ', ' + p2(s.sel[2]) + ' ' + MS[s.sel[1]] + '  |  ' + p2(dh) + ':' + p2(s.min) + ' ' + ampm;
    } else {
      hdr.querySelector('.gs-cal-dthdr-year').textContent = s.year;
      hdr.querySelector('.gs-cal-dthdr-date').textContent = 'Pick a date';
    }
  }

  // ─── Render month picker ──────────────────────────────────────
  function renderMonths(id) {
    var s = S[id]; if (!s) return;
    var el = document.getElementById(id); if (!el) return;
    var now = new Date(); var ty=now.getFullYear(), tm=now.getMonth();
    var h = '<div class="gs-cal-header">'
      + '<button class="gs-cal-nav" onclick="gsCalNavYear(\''+id+'\',-1)" aria-label="Prev year">'+PREV_SVG+'</button>'
      + '<button class="gs-cal-title-btn" onclick="gsCalSetMode(\''+id+'\',\'years\')">'+s.year+'</button>'
      + '<button class="gs-cal-nav" onclick="gsCalNavYear(\''+id+'\',1)" aria-label="Next year">'+NEXT_SVG+'</button>'
      + '</div>';
    var grid = '<div class="gs-cal-pick-grid">';
    MS.forEach(function(mn,mi) {
      var isNow = s.year===ty && mi===tm;
      var isSel = s.sel && s.year===s.sel[0] && mi===s.sel[1];
      var cls = 'gs-cal-pick-cell'+(isNow?' gs-cal-today':'')+(isSel?' gs-cal-selected':'');
      grid += '<button class="'+cls+'" onclick="gsCalPickMonth(\''+id+'\','+mi+')">'+mn+'</button>';
    });
    grid += '</div>';
    el.innerHTML = h + grid;
  }

  // ─── Render year picker ───────────────────────────────────────
  function renderYears(id) {
    var s = S[id]; if (!s) return;
    var el = document.getElementById(id); if (!el) return;
    var now = new Date(); var ty=now.getFullYear();
    var ds = Math.floor(s.year/12)*12;
    var h = '<div class="gs-cal-header">'
      + '<button class="gs-cal-nav" onclick="gsCalNavDecade(\''+id+'\',-1)">'+PREV_SVG+'</button>'
      + '<span class="gs-cal-title-btn gs-cal-title-static">'+ds+'–'+(ds+11)+'</span>'
      + '<button class="gs-cal-nav" onclick="gsCalNavDecade(\''+id+'\',1)">'+NEXT_SVG+'</button>'
      + '</div>';
    var grid = '<div class="gs-cal-pick-grid">';
    for (var yr=ds; yr<ds+12; yr++) {
      var isNow=yr===ty, isSel=s.sel&&yr===s.sel[0];
      var cls='gs-cal-pick-cell'+(isNow?' gs-cal-today':'')+(isSel?' gs-cal-selected':'');
      grid += '<button class="'+cls+'" onclick="gsCalPickYear(\''+id+'\','+yr+')">'+yr+'</button>';
    }
    grid += '</div>';
    el.innerHTML = h + grid;
  }

  function render(id) {
    var s = S[id]; if (!s) return;
    if (s.mode==='months') renderMonths(id);
    else if (s.mode==='years') renderYears(id);
    else renderDays(id);
    if (s.showTime) renderTimePicker(id);
  }

  function updateFooter(id) {
    var s = S[id]; if (!s) return;
    var lbl = document.getElementById(id+'-sel');
    if (!lbl) return;
    if (s.rangeMode) {
      var a = s.rs ? p2(s.rs[2])+' '+MS[s.rs[1]]+' '+s.rs[0] : '—';
      var b = s.re ? p2(s.re[2])+' '+MS[s.re[1]]+' '+s.re[0] : '—';
      lbl.textContent = a + '  →  ' + b;
    } else if (s.sel) {
      var ampm = s.h < 12 ? 'AM' : 'PM';
      var dh = s.h>12?s.h-12:(s.h===0?12:s.h);
      var t = s.showTime ? '  ' + p2(dh) + ':' + p2(s.min) + ' ' + ampm : '';
      lbl.textContent = p2(s.sel[2])+' '+MS[s.sel[1]]+' '+s.sel[0]+t;
    } else {
      lbl.textContent = '—';
    }
  }

  // ─── Public API ───────────────────────────────────────────────
  window.gsCalInit = function(id, year, month, opts) {
    opts = opts||{};
    var now = new Date();
    S[id] = {
      year: year||now.getFullYear(), month: month!=null?month:now.getMonth(),
      sel: null, mode: 'days',
      rangeMode: !!opts.range, rs: null, re: null,
      showTime: !!opts.time, h: 0, min: 0
    };
    render(id);
  };
  window.gsCalNav = function(id, d) {
    var s=S[id]; if(!s) return;
    s.month+=d; if(s.month>11){s.month=0;s.year++;} if(s.month<0){s.month=11;s.year--;} render(id);
  };
  window.gsCalNavYear = function(id, d) { var s=S[id]; if(!s) return; s.year+=d; render(id); };
  window.gsCalNavDecade = function(id, d) { var s=S[id]; if(!s) return; s.year+=d*12; render(id); };
  window.gsCalSetMode = function(id, mode) { var s=S[id]; if(!s) return; s.mode=mode; render(id); };
  window.gsCalPickMonth = function(id, m) { var s=S[id]; if(!s) return; s.month=m; s.mode='days'; render(id); };
  window.gsCalPickYear = function(id, y) { var s=S[id]; if(!s) return; s.year=y; s.mode='months'; render(id); };

  window.gsCalSelect = function(id, ds) {
    var s=S[id]; if(!s) return;
    var pts=ds.split('-').map(Number), d=[pts[0],pts[1],pts[2]];
    if (s.rangeMode) {
      if (!s.rs || s.re) { s.rs=d; s.re=null; }
      else {
        if (cmp(d,s.rs)<0) { s.re=s.rs; s.rs=d; } else { s.re=d; }
      }
      // Sync partner calendar for range pairs
      if (s.partner && S[s.partner]) {
        S[s.partner].rs=s.rs; S[s.partner].re=s.re; render(s.partner);
      }
    } else {
      s.sel=d; s.year=d[0]; s.month=d[1];
    }
    render(id);
  };
  // Link two calendars as a range pair (share rs/re state)
  window.gsCalLinkRange = function(idA, idB) {
    if(S[idA]) S[idA].partner=idB;
    if(S[idB]) S[idB].partner=idA;
  };

  window.gsCalSetHour = function(id, v) {
    var s=S[id]; if(!s) return; s.h=parseInt(v)||0; updateFooter(id); updateDtHeader(id);
  };
  window.gsCalSetMinute = function(id, v) {
    var s=S[id]; if(!s) return; s.min=parseInt(v)||0; updateFooter(id); updateDtHeader(id);
  };
  window.gsCalSelectTime = function(id, hh, mm) {
    var s=S[id]; if(!s) return;
    s.h=hh; s.min=mm;
    renderTimePicker(id);
    updateFooter(id);
    updateDtHeader(id);
  };
})();

const PAGE_INITS = {
  'welcome':       () => buildWelcomeMetrics(),
  'found-color':   () => initColorPage(),
  'found-icons':   () => setTimeout(initIconsPage, 50),
  'prim-search':   () => setTimeout(initSFSearch, 50),
  'prim-buttons':  () => setTimeout(initBtnDesignScrollSpy, 80),
  'prim-badge':    () => setTimeout(initBadgeDesignScrollSpy, 80),
  'prim-checkbox': () => setTimeout(initCheckboxDesignScrollSpy, 80),
  'panel-modals':  () => setTimeout(function() {
    // Auto-open both demos so the user sees the modals immediately on page load
    if (typeof openDemoModal    === 'function') openDemoModal();
    if (typeof openConfirmModal === 'function') openConfirmModal('delete');
  }, 80),
  'panel-slideout': () => setTimeout(function() {
    if (typeof openOverlayDrawer === 'function') openOverlayDrawer();
  }, 80),
  'prim-toasts': function() {
    // ensure Design tab is active on load
    switchToastTab('design');
  },
  'view-table': function() {
    setTimeout(gsTableInitTooltips, 100);
    setTimeout(gsTableInitInfiniteScrollDemo, 150);
    setTimeout(function(){ gsTblInitStickyScroll('tbl-sticky-wrap'); }, 80);
  },
  'prim-scroll': function() {
    setTimeout(gsScrollInitHover, 80);
  },
  'prim-banners': function() {
    // Store original innerHTML of each demo group so the reload button can restore it
    setTimeout(function() {
      var page = document.getElementById('page-content');
      if (!page) return;
      page.querySelectorAll('[data-demo-group]').forEach(function(g) {
        if (!g.getAttribute('data-original-html')) {
          g.setAttribute('data-original-html', g.innerHTML);
        }
      });
    }, 120);
  },
  'prim-segmented': function() {
    setTimeout(_gsSegInitAll, 80);
  },
  'nav-tabs': function() {
    // Initialise sliding ink bars for all line tab demos
    setTimeout(_gsTabInkInitAll, 80);
  },
  'panel-calendars': function() {
    setTimeout(function() {
      if (typeof gsCalInit !== 'function') return;
      var now = new Date(); var y=now.getFullYear(), m=now.getMonth();
      gsCalInit('cal-ov-1',   y, m);
      gsCalInit('cal-ov-2',   y, m);
      var rm=m+1>11?0:m+1, ry=m+1>11?y+1:y;
      gsCalInit('cal-range-l',y,  m,  {range:true});
      gsCalInit('cal-range-r',ry, rm, {range:true});
      if(typeof gsCalLinkRange==='function') gsCalLinkRange('cal-range-l','cal-range-r');
      gsCalInit('cal-v-std',  y, m);
      gsCalInit('cal-v-full', y, m);
      gsCalInit('cal-v-time', y, m, {time:true});
      gsCalInit('cal-s-mon',  y, m); gsCalSetMode('cal-s-mon','months');
      gsCalInit('cal-s-yr',   y, m); gsCalSetMode('cal-s-yr','years');
    }, 60);
  },
};

// In-memory cache: page id → HTML string
const pageCache = {};

async function navigate(page) {
  if (!PAGES[page]) return;

  // ── Nav highlight ────────────────────────────────────────────
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navEl = document.getElementById(PAGES[page].nav);
  if (navEl) navEl.classList.add('active');

  // ── Breadcrumb ───────────────────────────────────────────────
  const p = PAGES[page];
  const sep = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
  document.getElementById('topbar-breadcrumb').innerHTML =
    `<span>Pelagos</span>${sep}` +
    (p.parent ? `<span>${p.parent}</span>${sep}` : '') +
    `<span class="current">${p.label}</span>`;

  const mainEl = document.getElementById('main');
  mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  mainEl.classList.toggle('welcome-view', page === 'welcome');
  closeSidebar();
  currentPage = page;

  // ── Auto-expand nav group ────────────────────────────────────
  const autoOpen = {
    'Foundations':  { group: 'foundations-group',  toggle: 'foundations-toggle'  },
    'Primitives':   { group: 'primitives-group',   toggle: 'primitives-toggle'   },
    'Panels':       { group: 'panels-group',       toggle: 'panels-toggle'       },
    'Views':        { group: 'views-group',        toggle: 'views-toggle'        },
    'Navigations':  { group: 'navigations-group',  toggle: 'navigations-toggle'  },
    'Loading':      { group: 'loading-group',      toggle: 'loading-toggle'      },
    'Forms':        { group: 'forms-group',        toggle: 'forms-toggle'        },
  };
  const parentName = p.parent;
  if (parentName && autoOpen[parentName]) {
    const { group, toggle } = autoOpen[parentName];
    const groupEl  = document.getElementById(group);
    const toggleEl = document.getElementById(toggle);
    if (groupEl && !groupEl.classList.contains('open')) {
      groupEl.classList.add('open');
      if (toggleEl) toggleEl.classList.add('open');
    }
  }

  closeSearch();

  // ── Load page content ────────────────────────────────────────
  // Priority: 1) in-memory cache  2) PAGES_BUNDLE (works on file://)  3) fetch (GitHub Pages / server)
  const container = document.getElementById('page-content');

  if (pageCache[page]) {
    container.innerHTML = pageCache[page];
  } else if (window.PAGES_BUNDLE && window.PAGES_BUNDLE[page]) {
    // Bundled mode — works when opened directly as a file (no server needed)
    pageCache[page] = window.PAGES_BUNDLE[page];
    container.innerHTML = pageCache[page];
  } else {
    // Fetch mode — used on GitHub Pages or any HTTP server
    container.innerHTML = '<div class="page-loading"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary,#1852fe)" stroke-width="2.5" stroke-linecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite"/></path></svg></div>';
    try {
      const res = await fetch('pages/' + page + '.html');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      pageCache[page] = html;
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = '<div class="page-header"><h1>' + p.label + '</h1></div>' +
        '<div class="content-area"><div class="ds-card" style="text-align:center;padding:48px;color:var(--color-text-muted);">' +
        'Could not load page.<br><br><code style="font-size:11px;opacity:.7;">' + err.message + '</code></div></div>';
      return;
    }
  }

  // ── Page-specific init ───────────────────────────────────────
  if (PAGE_INITS[page]) PAGE_INITS[page]();
  // Bind hover-expand listeners to every .gs-scroll on the new page
  setTimeout(gsScrollInitHover, 120);
  updateTabBarState();
}

function copyColor(hex) {
  navigator.clipboard.writeText(hex).then(() => {
    const toast = document.getElementById('copy-toast');
    toast.textContent = '✓ ' + hex + ' copied';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1600);
  });
}

function copyColorBlock(el, hex) {
  navigator.clipboard.writeText(hex).then(() => {
    const icon = el.querySelector('.cpv2-copy-icon');
    const origHtml = icon.innerHTML;
    icon.innerHTML = '✓ Copied';
    el.classList.add('copied');
    setTimeout(() => {
      icon.innerHTML = origHtml;
      el.classList.remove('copied');
    }, 1500);
  });
}

function downloadLogoPng() {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width * 4;
    canvas.height = img.height * 4;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const a = document.createElement('a');
    a.download = 'Geoserve-logo.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };
  img.src = 'Assets/Product=Geoserve.svg';
}

function downloadLogoWebp() {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width * 4;
    canvas.height = img.height * 4;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const a = document.createElement('a');
    a.download = 'Geoserve-logo.webp';
    a.href = canvas.toDataURL('image/webp', 0.95);
    a.click();
  };
  img.src = 'Assets/Product=Geoserve.svg';
}

function downloadLogoZip() {
  const a = document.createElement('a');
  a.href = 'Assets/Product=Geoserve.svg';
  a.download = 'Geoserve-logo.svg';
  a.click();
  const toast = document.getElementById('copy-toast');
  toast.textContent = 'SVG downloaded (ZIP requires server)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function toggleGroup(id) {
  const el = document.getElementById(id);
  const toggle = document.getElementById(id.replace('-group', '-toggle'));
  el.classList.toggle('open');
  if (toggle) toggle.classList.toggle('open');
}

function toggleSidebar() {
  document.body.classList.toggle('sidebar-open');
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
}

function openSearch() {
  document.getElementById('search-overlay').classList.add('open');
  document.getElementById('search-input').value = '';
  filterSearch('');
  setTimeout(() => document.getElementById('search-input').focus(), 50);
}

function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
}

function closeSearchOnOverlay(e) {
  if (e.target === document.getElementById('search-overlay')) closeSearch();
}

function filterSearch(q) {
  const results = document.getElementById('search-results');
  const filtered = q.trim() === ''
    ? SEARCH_INDEX.slice(0, 8)
    : SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(q.toLowerCase()) ||
        item.cat.toLowerCase().includes(q.toLowerCase())
      );

  // Clear keyboard focus state when results change
  document.querySelectorAll('.search-result-item.kb-focus').forEach(el => el.classList.remove('kb-focus'));
  results.innerHTML = filtered.length === 0
    ? '<div style="padding:24px;text-align:center;color:var(--color-text-muted);font-size:14px;">No results found</div>'
    : filtered.map(item => `
      <div class="search-result-item" onclick="navigate('${item.path}')">
        <div class="search-result-icon" style="background:${item.cat === 'Components' ? '#eef3ff' : item.cat === 'Foundations' ? '#fff8f0' : '#f0fff4'}">
          ${item.icon}
        </div>
        <div>
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-path">${item.cat}</div>
        </div>
      </div>
    `).join('');
}

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
  if (e.key === 'Escape') { closeSearch(); if (typeof closeSFOverlay === 'function') closeSFOverlay(); }

  // Keyboard navigation within search results
  const overlay = document.getElementById('search-overlay');
  if (!overlay || !overlay.classList.contains('open')) return;

  const items = Array.from(document.querySelectorAll('.search-result-item'));
  if (!items.length) return;
  const focused = document.querySelector('.search-result-item.kb-focus');
  let idx = focused ? items.indexOf(focused) : -1;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (focused) focused.classList.remove('kb-focus');
    idx = Math.min(idx + 1, items.length - 1);
    items[idx].classList.add('kb-focus');
    items[idx].scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (focused) focused.classList.remove('kb-focus');
    if (idx <= 0) {
      document.getElementById('search-input').focus();
    } else {
      idx = idx - 1;
      items[idx].classList.add('kb-focus');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
  } else if (e.key === 'Enter' && focused) {
    e.preventDefault();
    focused.click();
  } else if (e.key === 'Tab') {
    // Focus trap: keep Tab inside search modal
    const modal = document.querySelector('.search-modal');
    const focusable = Array.from(modal.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
});

// ── ICON SYMBOLS (builds <symbol> defs from ICON_LIBRARY so <use href="#gsi-id"> works everywhere) ──
function buildIconSymbols() {
  var defs = document.getElementById('icon-defs');
  if (!defs || typeof ICON_LIBRARY === 'undefined') return;
  defs.innerHTML = ICON_LIBRARY.map(function(icon) {
    return '<symbol id="gsi-' + icon.id + '" viewBox="0 0 24 24">' + icon.line + '</symbol>';
  }).join('');
}

// ── NAV TREE ──
const NAV_TREE = [
  { type:'item', id:'welcome',       label:'Welcome',       icon:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { type:'item', id:'get-started',   label:'Get Started',   icon:'<polygon points="5 3 19 12 5 21 5 3"/>' },
  { type:'divider' },
  { type:'section', id:'foundations', label:'Foundations', open:true,
    icon:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    children:[
      { id:'found-color',        label:'Colour Palette',  version:'v1.0' },
      { id:'found-typography',   label:'Typography',      version:'v1.0' },
      { id:'found-icons',        label:'Icons',           version:'v1.0' },
      { id:'found-illustrations',label:'Illustrations',   version:'v1.0' },
      { id:'found-logos',        label:'Logos',           version:'v1.0' },
      { id:'found-spacing',      label:'Spacing',         version:'v1.0' },
      { id:'found-padding',      label:'Padding',         version:'v1.0' },
      { id:'found-margin',       label:'Margin' },
      { id:'found-radius',       label:'Radius',          version:'v1.0' },
      { id:'found-elevation',    label:'Elevation',       version:'v1.0' },
    ]
  },
  { type:'divider' },
  { type:'tokens', id:'found-tokens', label:'Design Tokens', version:'v1.0',
    icon:'<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>' },
  { type:'divider' },
  { type:'group-title', label:'Components' },
  { type:'accordion', id:'primitives', label:'Primitives',
    icon:'<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    children:[
      { id:'prim-accordion', label:'Accordion',          version:'v1.0' },
      { id:'prim-badge',      label:'Badge',              version:'v1.0' },
      { id:'prim-breadcrumb',label:'Breadcrumb',         version:'v1.0' },
      { id:'prim-banners',   label:'Banners',            version:'v1.0' },
      { id:'prim-buttons',   label:'Buttons',            version:'v1.0' },
      { id:'prim-checkbox',  label:'Checkbox',           version:'v1.0' },
      { id:'prim-chips',     label:'Chips',              version:'v1.0' },
      { id:'prim-radio',     label:'Radio Button',       version:'v1.0' },
      { id:'prim-dropdowns', label:'Dropdowns', version:'v1.0' },
      { id:'prim-slider', label:'Slider', version:'v1.0' },
      { id:'prim-textfields',label:'Text Fields',   version:'v1.0' },
      { id:'prim-search',    label:'Search & Filter',    version:'v1.0' },
      { id:'prim-scroll',    label:'Scroll',             version:'v1.0' },
      { id:'prim-toasts',    label:'Toasts',             version:'v1.0' },
      { id:'prim-tooltip',   label:'Tooltip',            version:'v1.0' },
      { id:'prim-toggles',   label:'Switch',              version:'v1.0' },
      { id:'prim-segmented', label:'Segmented Button',    version:'v1.0' },
      { id:'prim-menu',      label:'Menu',               version:'v1.0' },
    ]
  },
  { type:'accordion', id:'panels', label:'Panels',
    icon:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    children:[
      { id:'panel-calendars',    label:'Calendars',          version:'v1.0' },
      { id:'panel-email',        label:'Email',              version:'v1.0' },
      { id:'panel-popover',      label:'Popover',            version:'v1.0' },
      { id:'panel-modals',       label:'Modals',             version:'v1.0' },
      { id:'panel-slideout',     label:'Slideout',           version:'v1.0' },
    ]
  },
  { type:'accordion', id:'views', label:'Views',
    icon:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    children:[
      { id:'view-map',       label:'Map Components' },
      { id:'view-dashboard', label:'Dashboard View' },
      { id:'view-upload',    label:'Upload',        version:'v1.0' },
      { id:'view-table',     label:'Table',         version:'v1.0' },
      { id:'view-detail',    label:'Detail Page View' },
      { id:'view-charts',    label:'Information Cards' },
    ]
  },
  { type:'accordion', id:'navigations', label:'Navigations',
    icon:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    children:[
      { id:'nav-pagination', label:'Pagination', disabled: true, tag: 'Soon' },
      { id:'nav-progress',   label:'Progress Bar',  version:'v1.0' },
      { id:'nav-sidenav',    label:'Side Navigation',         version:'v1.0' },
      { id:'nav-steppers',   label:'Steppers',                version:'v1.0' },
      { id:'nav-tabs',       label:'Tabs',                    version:'v1.0' },
    ]
  },
  { type:'accordion', id:'loading', label:'Loading',
    icon:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',
    children:[
      { id:'loading-spinner',  label:'Spinner',  version:'v1.0' },
      { id:'loading-skeleton', label:'Skeleton', version:'v1.0' },
    ]
  },
  { type:'accordion', id:'forms', label:'Forms',
    icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>',
    children:[
      { id:'form-tabular',    label:'Tabular Form' },
      { id:'form-scrollable', label:'Scrollable Form' },
      { id:'form-signup',     label:'Signup' },
    ]
  },
  { type:'divider' },
  { type:'group-title', label:'Info' },
  { type:'item', id:'release-phases', label:'Release Phases',
    icon:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' },
];

function buildNav() {
  function icon(paths, size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  }
  const chevron = id => `<svg class="nav-toggle" id="${id}-toggle" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;

  let html = '';
  NAV_TREE.forEach(node => {
    if (node.type === 'divider') {
      html += '<div class="nav-sidebar-divider"></div>';
    } else if (node.type === 'group-title') {
      html += `<div class="nav-group-title">${node.label}</div>`;
    } else if (node.type === 'item') {
      html += `<div class="nav-item" id="nav-${node.id}" data-navigate="${node.id}">${icon(node.icon, 15)}${node.label}</div>`;
    } else if (node.type === 'tokens') {
      html += `<div class="nav-item nav-item-tokens" id="nav-${node.id}" data-navigate="${node.id}">${icon(node.icon, 15)}${node.label}<span class="nav-version">${node.version}</span></div>`;
    } else if (node.type === 'section') {
      const oc = node.open ? ' open' : '';
      html += `<div class="nav-section-toggle" id="nav-${node.id}" data-toggle-group="${node.id}-group">${icon(node.icon, 14)}${node.label}<svg class="nav-toggle${oc}" id="${node.id}-toggle" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></div>`;
      html += `<div class="nav-children${oc}" id="${node.id}-group">`;
      node.children.forEach(c => {
        var disabledCls = c.disabled ? ' nav-item--disabled' : '';
        var navAttr     = c.disabled ? '' : ` data-navigate="${c.id}"`;
        var badge       = c.version  ? `<span class="nav-version">${c.version}</span>` : '';
        var tagBadge    = c.tag      ? `<span class="nav-tag">${c.tag}</span>` : '';
        html += `<div class="nav-item nav-item-child${disabledCls}" id="nav-${c.id}"${navAttr}>${c.label}${badge}${tagBadge}</div>`;
      });
      html += '</div>';
    } else if (node.type === 'accordion') {
      html += `<div class="nav-accordion" id="nav-${node.id}" data-toggle-group="${node.id}-group">${icon(node.icon, 13)}${node.label}${chevron(node.id)}</div>`;
      html += `<div class="nav-children" id="${node.id}-group">`;
      node.children.forEach(c => {
        var disabledCls = c.disabled ? ' nav-item--disabled' : '';
        var navAttr     = c.disabled ? '' : ` data-navigate="${c.id}"`;
        var badge       = c.version  ? `<span class="nav-version">${c.version}</span>` : '';
        var tagBadge    = c.tag      ? `<span class="nav-tag">${c.tag}</span>` : '';
        html += `<div class="nav-item nav-item-child nav-item-child2${disabledCls}" id="nav-${c.id}"${navAttr}>${c.label}${badge}${tagBadge}</div>`;
      });
      html += '</div>';
    }
  });
  document.getElementById('main-nav').innerHTML = html;
}

// ── EVENT DELEGATION ──────────────────────────────────────────────
// Handles sidebar nav clicks, accordion toggles, and search bar click
document.addEventListener('click', function(e) {
  const navTarget = e.target.closest('[data-navigate]');
  if (navTarget) { navigate(navTarget.dataset.navigate); return; }

  const toggleTarget = e.target.closest('[data-toggle-group]');
  if (toggleTarget) { toggleGroup(toggleTarget.dataset.toggleGroup); return; }

  if (e.target.closest('[data-open-search]')) openSearch();
});

buildNav();
navigate('welcome');
setTimeout(buildIconSymbols, 0);

// ── ICONS PAGE ── (sizes: SM=16px, MD=24px, LG=32px - matching Figma icon sizes)
var ICON_SIZE_MAP = { sm: 16, md: 24, lg: 32 };

var ICON_LIBRARY = [

  // ── Navigation (Figma: Frame 20) ──
  { id:'arrow-left',           label:'Arrow Left',           category:'Navigation & Flow', tags:['direction','back','previous'],
    line:'<path d="M18.25 12H5.75"/><path d="M10 7.75L5.75 12L10 16.25"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>'},
  { id:'arrow-right',          label:'Arrow Right',          category:'Navigation & Flow', tags:['direction','next','forward'],
    line:'<path d="M5 12h14M12 19l7-7-7-7"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>'},
  { id:'arrow-up',             label:'Arrow Up',             category:'Navigation & Flow', tags:['direction','ascending','up'],
    line:'<path d="M12 19V5M5 12l7-7 7 7"/>',
    filled:'<path fill="currentColor" stroke="none" d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"/>'},
  { id:'arrow-down',           label:'Arrow Down',           category:'Navigation & Flow', tags:['direction','descending','down'],
    line:'<path d="M12 5v14M19 12l-7 7-7-7"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z"/>'},
  { id:'arrow-up-right',       label:'Arrow Up Right',       category:'Navigation & Flow', tags:['diagonal','northeast','external'],
    line:'<path d="M7 17L17 7M7 7h10v10"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2l14-16z"/>'},
  { id:'arrow-up-left',        label:'Arrow Up Left',        category:'Navigation & Flow', tags:['diagonal','northwest'],
    line:'<path d="M17 17L7 7M17 7H7v10"/>',
    filled:'<path fill="currentColor" stroke="none" d="M5 3h14c1.1 0 2 .9 2 2L5 19c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"/>'},
  { id:'arrow-down-left',      label:'Arrow Down Left',      category:'Navigation & Flow', tags:['diagonal','southwest'],
    line:'<path d="M17 7L7 17M17 17H7V7"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 21H5c-1.1 0-2-.9-2-2V5l16 16z"/>'},
  { id:'arrow-down-right',     label:'Arrow Down Right',     category:'Navigation & Flow', tags:['diagonal','southeast'],
    line:'<path d="M7 7l10 10M17 7v10H7"/>',
    filled:'<path fill="currentColor" stroke="none" d="M5 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14L5 3z"/>'},
  { id:'chevron-left',         label:'Chevron Left',         category:'Navigation & Flow', tags:['caret','back','previous','collapse'],
    line:'<path d="M15 18l-6-6 6-6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>'},
  { id:'chevron-right',        label:'Chevron Right',        category:'Navigation & Flow', tags:['caret','next','forward','expand'],
    line:'<path d="M9 18l6-6-6-6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>'},
  { id:'chevron-left-double',  label:'Chevron Left Double',  category:'Navigation & Flow', tags:['skip','first','double','rewind'],
    line:'<path d="M11 17l-5-5 5-5M17 17l-5-5 5-5"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18.41 7.41L17 6l-6 6 6 6 1.41-1.41L13.83 12zm-6 0L11 6l-6 6 6 6 1.41-1.41L7.83 12z"/>'},
  { id:'chevron-right-double', label:'Chevron Right Double', category:'Navigation & Flow', tags:['skip','last','double','fast-forward'],
    line:'<path d="M13 17l5-5-5-5M7 17l5-5-5-5"/>',
    filled:'<path fill="currentColor" stroke="none" d="M5.59 7.41L7 6l6 6-6 6-1.41-1.41L10.17 12zm6 0L13 6l6 6-6 6-1.41-1.41L16.17 12z"/>'},
  { id:'carrot-left',          label:'Caret Left',           category:'Navigation & Flow', tags:['caret','small','arrow','compact'],
    line:'<path d="M14 18l-6-6 6-6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M14 7l-5 5 5 5V7z"/>'},
  { id:'carrot-right',         label:'Caret Right',          category:'Navigation & Flow', tags:['caret','small','arrow','compact'],
    line:'<path d="M10 18l6-6-6-6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M10 17l5-5-5-5v10z"/>'},
  { id:'carrot-up',            label:'Caret Up',             category:'Navigation & Flow', tags:['caret','small','arrow','compact'],
    line:'<path d="M18 14l-6-6-6 6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M7 14l5-5 5 5H7z"/>'},
  { id:'carrot-down',          label:'Caret Down',           category:'Navigation & Flow', tags:['caret','small','arrow','compact'],
    line:'<path d="M6 10l6 6 6-6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M7 10l5 5 5-5H7z"/>'},
  { id:'chevron-circle-left',  label:'Chevron Circle Left',  category:'Navigation & Flow', tags:['circle','back','previous','button'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M13 16l-4-4 4-4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.59 13L10 12l4.59-4.59L16 8.83 12.83 12 16 15.17 14.59 15z"/>'},
  { id:'chevron-circle-right', label:'Chevron Circle Right', category:'Navigation & Flow', tags:['circle','next','forward','button'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M11 16l4-4-4-4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 5L15.17 12l-4.58 4.59L9.17 15.17 12.34 12 9.17 8.83 10.59 7z"/>'},
  { id:'chevron-circle-up',    label:'Chevron Circle Up',    category:'Navigation & Flow', tags:['circle','up','ascending','button'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M16 13l-4-4-4 4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 9L12 15.17 7.41 11 6 12.41l6 6 6-6-1.41-1.41z"/>'},
  { id:'chevron-circle-down',  label:'Chevron Circle Down',  category:'Navigation & Flow', tags:['circle','down','descending','button'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M8 11l4 4 4-4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.59 9L12 8.83 16.59 11 18 9.59l-6-6-6 6 1.41 1.41z"/>'},
  { id:'home',                 label:'Home',                 category:'Navigation & Flow', tags:['house','main','start','index'],
    line:'<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/>',
    filled:'<path fill="currentColor" stroke="none" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'},
  { id:'home2',                label:'Home 2',               category:'Navigation & Flow', tags:['house','main','alternate','start'],
    line:'<path d="M3 12L12 4l9 8"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 3L2 12h3v9h6v-5h2v5h6v-9h3L12 3z"/>'},
  { id:'home3',                label:'Home 3',               category:'Navigation & Flow', tags:['house','simple','minimal'],
    line:'<path d="M12 2L2 9.5v12.5h7v-6h6v6h7V9.5L12 2z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2L2 9.5V22h7v-6h6v6h7V9.5L12 2zm5 18h-3v-6H10v6H7V10.75l5-3.57 5 3.57V20z"/>'},
  { id:'ham-middle',           label:'Hamburger Menu',       category:'Navigation & Flow', tags:['menu','hamburger','nav','mobile','sidebar'],
    line:'<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>'},
  { id:'ham-left',             label:'Hamburger Left',       category:'Navigation & Flow', tags:['menu','nav','align','left'],
    line:'<line x1="4" y1="6" x2="16" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="16" y2="18"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3 18h12v-2H3v2zm0-5h18v-2H3v2zm0-7v2h12V6H3z"/>'},

  // ── Actions (Figma: Frame 22) ──
  { id:'refresh',              label:'Refresh',              category:'Actions & Editing', tags:['reload','sync','retry','update'],
    line:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>'},
  { id:'heart',                label:'Heart',                category:'Actions & Editing', tags:['like','favorite','love','wish'],
    line:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'},
  { id:'edit',                 label:'Edit',                 category:'Actions & Editing', tags:['pencil','modify','write','pen'],
    line:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'},
  { id:'edit2',                label:'Edit 2',               category:'Actions & Editing', tags:['pencil','compose','write','pen2'],
    line:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'},
  { id:'plus',                 label:'Plus',                 category:'Actions & Editing', tags:['add','create','new','insert'],
    line:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>'},
  { id:'minus',                label:'Minus',                category:'Actions & Editing', tags:['subtract','remove','decrease'],
    line:'<line x1="5" y1="12" x2="19" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 13H5v-2h14v2z"/>'},
  { id:'reset',                label:'Reset',                category:'Actions & Editing', tags:['undo','restore','revert','clear'],
    line:'<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>',
    filled:'<path fill="currentColor" stroke="none" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z"/>'},
  { id:'check',                label:'Check',                category:'Actions & Editing', tags:['done','correct','tick','confirm'],
    line:'<polyline points="20 6 9 17 4 12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'},
  { id:'check-circle',         label:'Check Circle',         category:'Actions & Editing', tags:['success','done','verified','ok'],
    line:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'},
  { id:'add-circle',           label:'Add Circle',           category:'Actions & Editing', tags:['plus','create','new','circle'],
    line:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'},
  { id:'delete',               label:'Delete',               category:'Actions & Editing', tags:['trash','remove','bin','clear'],
    line:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>'},
  { id:'save',                 label:'Save',                 category:'Actions & Editing', tags:['disk','floppy','store','persist'],
    line:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/>'},
  { id:'bookmark',             label:'Bookmark',             category:'Actions & Editing', tags:['save','mark','favorite','tag'],
    line:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>'},
  { id:'search',               label:'Search',               category:'Actions & Editing', tags:['find','query','lookup','magnify'],
    line:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'},
  { id:'search2',              label:'Search 2',             category:'Actions & Editing', tags:['find','query','alternate','magnify'],
    line:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'},
  { id:'search-add',           label:'Search Add',           category:'Actions & Editing', tags:['find','add','plus','create','search'],
    line:'<circle cx="10" cy="10" r="7"/><path d="m21 21-4.35-4.35"/><line x1="10" y1="7" x2="10" y2="13"/><line x1="7" y1="10" x2="13" y2="10"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z"/>'},
  { id:'scan',                 label:'Scan',                 category:'Actions & Editing', tags:['qr','barcode','camera','read'],
    line:'<path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><line x1="4" y1="12" x2="20" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5z"/>'},
  { id:'filter',               label:'Filter',               category:'Actions & Editing', tags:['sort','funnel','narrow','refine'],
    line:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>'},
  { id:'sort',                 label:'Sort',                 category:'Actions & Editing', tags:['order','arrange','list','organize'],
    line:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>'},
  { id:'sort-ascending',       label:'Sort Ascending',       category:'Actions & Editing', tags:['order','az','low-high','asc'],
    line:'<line x1="8" y1="16" x2="8" y2="4"/><polyline points="4 12 8 16 12 12"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="16" y1="9" x2="20" y2="9"/><line x1="16" y1="14" x2="20" y2="14"/>',
    filled:'<path fill="currentColor" stroke="none" d="M4 6h7v2H4zm0 5h5v2H4zm0 5h3v2H4zm11.5-3H13l4 5 4-5h-2.5V4H15.5v9z"/>'},
  { id:'sort-descending',      label:'Sort Descending',      category:'Actions & Editing', tags:['order','za','high-low','desc'],
    line:'<line x1="8" y1="8" x2="8" y2="20"/><polyline points="4 12 8 8 12 12"/><line x1="16" y1="4" x2="20" y2="4"/><line x1="16" y1="9" x2="20" y2="9"/><line x1="16" y1="14" x2="20" y2="14"/>',
    filled:'<path fill="currentColor" stroke="none" d="M4 6h7v2H4zm0 5h5v2H4zm0 5h3v2H4zm11.5-9V4H13l4-5 4 5h-2.5V20H15.5z"/>'},
  { id:'expand',               label:'Expand',               category:'Actions & Editing', tags:['fullscreen','enlarge','open','maximize'],
    line:'<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
    filled:'<path fill="currentColor" stroke="none" d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"/>'},
  { id:'collapse',             label:'Collapse',             category:'Actions & Editing', tags:['minimize','shrink','close','compress'],
    line:'<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>',
    filled:'<path fill="currentColor" stroke="none" d="M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z"/>'},
  { id:'expand2',              label:'Expand 2',             category:'Actions & Editing', tags:['fullscreen','open','maximize','alt'],
    line:'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15h2.5l-3.5 3.5L8 20l3.5-3.5V19H14v-4zM16 9h-2.5l3.5-3.5L16 4l-3.5 3.5V5H10v4z"/>'},
  { id:'collapse2',            label:'Collapse 2',           category:'Actions & Editing', tags:['minimize','shrink','reduce','alt'],
    line:'<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-8-6h-2.5l3.5 3.5-1.5 1.5-3.5-3.5V17H7v-4h6zm0-8v2.5l3.5-3.5 1.5 1.5-3.5 3.5H17V7h-4z"/>'},
  { id:'duplicate-copy',       label:'Duplicate / Copy',     category:'Actions & Editing', tags:['copy','clone','duplicate','paste'],
    line:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"/>'},
  { id:'thumbs-up',            label:'Thumbs Up',            category:'Actions & Editing', tags:['like','approve','good','positive'],
    line:'<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>'},
  { id:'thumbs-down',          label:'Thumbs Down',          category:'Actions & Editing', tags:['dislike','disapprove','bad','negative'],
    line:'<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>'},
  { id:'close',                label:'Close',                category:'Actions & Editing', tags:['x','dismiss','cancel','remove'],
    line:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'},
  { id:'close-small',          label:'Close Small',          category:'Actions & Editing', tags:['x','dismiss','small','compact'],
    line:'<line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    filled:'<path fill="currentColor" stroke="none" d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z"/>'},
  { id:'close-circle',         label:'Close Circle',         category:'Actions & Editing', tags:['x','circle','dismiss','cancel'],
    line:'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>'},
  { id:'print',                label:'Print',                category:'Actions & Editing', tags:['printer','output','paper','document'],
    line:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>'},
  { id:'print2',               label:'Print 2',              category:'Actions & Editing', tags:['printer','document','output','alt'],
    line:'<path d="M7 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><rect x="7" y="13" width="10" height="8" rx="1"/><path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 8H5c-1.66 0-3 1.34-3 3v4h4v4h12v-4h4v-4c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v3h12V3z"/>'},
  { id:'download',             label:'Download',             category:'Actions & Editing', tags:['save','export','get','receive'],
    line:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>'},
  { id:'cloud-download',       label:'Cloud Download',       category:'Actions & Editing', tags:['cloud','save','sync','backup'],
    line:'<polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>'},
  { id:'upload',               label:'Upload',               category:'Actions & Editing', tags:['send','import','push','post'],
    line:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    filled:'<path fill="currentColor" stroke="none" d="M5 18v2h14v-2H5zm7-14L5 11h4v6h6v-6h4L12 4z"/>'},
  { id:'upload-cloud',         label:'Upload Cloud',         category:'Actions & Editing', tags:['cloud','upload','send','sync'],
    line:'<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>'},
  { id:'alignment-left',       label:'Align Left',           category:'Actions & Editing', tags:['align','text','layout','left'],
    line:'<line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>'},
  { id:'alignment-right',      label:'Align Right',          category:'Actions & Editing', tags:['align','text','layout','right'],
    line:'<line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>'},

  // ── Alerts (Figma: Frame 23) ──
  { id:'info',                 label:'Info',                 category:'Feedback & Status', tags:['information','tip','help','note'],
    line:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'},
  { id:'warning',              label:'Warning',              category:'Feedback & Status', tags:['caution','alert','danger','triangle'],
    line:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    filled:'<path fill="currentColor" stroke="none" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'},
  { id:'alert',                label:'Alert',                category:'Feedback & Status', tags:['error','critical','notification','circle'],
    line:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'},
  { id:'question',             label:'Question',             category:'Feedback & Status', tags:['help','faq','support','query'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>'},
  { id:'star',                 label:'Star',                 category:'Feedback & Status', tags:['rating','favorite','bookmark','rank'],
    line:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>'},
  { id:'star-half',            label:'Star Half',            category:'Feedback & Status', tags:['rating','half','partial','review'],
    line:'<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.2l-6.2 4.1 2.4-7.4L2 9.4h7.6L12 2z"/><line x1="12" y1="2" x2="12" y2="17.2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>'},
  { id:'star-filled',          label:'Star Filled',          category:'Feedback & Status', tags:['rating','full','active','selected'],
    line:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>'},
  { id:'verified',             label:'Verified',             category:'Feedback & Status', tags:['check','badge','certified','trusted'],
    line:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>'},

  // ── New / Special (Figma: Frame 21) ──
  { id:'eye-open',             label:'Eye Open',             category:'General', tags:['visible','show','view','look'],
    line:'<path fill="currentColor" stroke="none" d="M12 5.99902C16.003 5.99902 18.4411 8.7901 19.5381 10.4541C20.158 11.3921 20.158 12.605 19.5381 13.5439C18.4411 15.2079 16.003 18 12 18C7.99704 18 5.55891 15.2089 4.46191 13.5449C3.84204 12.606 3.84203 11.393 4.46191 10.4541C5.55891 8.79011 7.99704 5.99906 12 5.99902ZM12 7.5C8.69904 7.50003 6.64486 9.86928 5.71387 11.2803C5.43011 11.7112 5.43011 12.2889 5.71387 12.7188C6.64486 14.1307 8.69904 16.5 12 16.5C15.301 16.5 17.3551 14.1307 18.2861 12.7197C18.5699 12.2888 18.57 11.7112 18.2861 11.2812C17.3551 9.86925 15.301 7.5 12 7.5ZM12 8.75C13.7949 8.75 15.25 10.2051 15.25 12C15.25 13.7949 13.7949 15.25 12 15.25C10.2051 15.25 8.75 13.7949 8.75 12C8.75 10.2051 10.2051 8.75 12 8.75Z"/>',
    filled:'<path fill="currentColor" stroke="none" fill-rule="evenodd" clip-rule="evenodd" d="M12.0005 6.22998C16.011 6.23013 18.4778 9.05885 19.5952 10.7554C20.0894 11.5058 20.0896 12.4933 19.5952 13.2437C18.4767 14.9391 16.011 17.7689 12.0005 17.769C7.98983 17.769 5.52227 14.9402 4.40478 13.2437C3.91058 12.4934 3.91071 11.5057 4.40478 10.7554C5.52337 9.05991 7.98983 6.22998 12.0005 6.22998ZM12.0005 9.25049C10.4817 9.25049 9.25049 10.4817 9.25049 12.0005C9.25075 13.519 10.4819 14.7505 12.0005 14.7505C13.519 14.7503 14.7502 13.5189 14.7505 12.0005C14.7505 10.4818 13.5191 9.25066 12.0005 9.25049Z"/>'},
  { id:'eye-close',            label:'Eye Closed',           category:'General', tags:['hidden','hide','invisible','off'],
    line:'<path fill="currentColor" stroke="none" d="M14.5001 11.9998C14.5001 10.6191 13.3808 9.4998 12.0001 9.4998C10.6194 9.4998 9.50012 10.6191 9.50012 11.9998C9.50012 13.3805 10.6194 14.4998 12.0001 14.4998C13.3808 14.4998 14.5001 13.3805 14.5001 11.9998ZM16.0001 11.9998C16.0001 14.2089 14.2093 15.9998 12.0001 15.9998C9.79098 15.9998 8.00012 14.2089 8.00012 11.9998C8.00012 9.79066 9.79098 7.9998 12.0001 7.9998C14.2093 7.9998 16.0001 9.79066 16.0001 11.9998Z"/><path fill="currentColor" stroke="none" d="M12.0001 17.9995C11.4191 17.9995 10.8431 17.9385 10.2901 17.8205C9.88507 17.7335 9.62707 17.3345 9.71407 16.9295C9.80107 16.5245 10.2011 16.2675 10.6051 16.3535C11.0551 16.4505 11.5241 16.4995 12.0001 16.4995C15.3011 16.4995 17.3551 14.1305 18.2861 12.7195C18.5701 12.2885 18.5701 11.7105 18.2861 11.2805C18.0111 10.8625 17.7051 10.4635 17.3771 10.0955C17.1021 9.78555 17.1291 9.31155 17.4391 9.03655C17.7491 8.76155 18.2231 8.78955 18.4981 9.09855C18.8731 9.52055 19.2231 9.97655 19.5381 10.4545C20.1571 11.3925 20.1571 12.6055 19.5381 13.5445C18.4411 15.2085 16.0031 17.9995 12.0001 17.9995Z"/><path fill="currentColor" stroke="none" d="M7.95507 16.7938C7.81507 16.7938 7.67407 16.7548 7.54907 16.6738C6.07507 15.7218 5.05607 14.4468 4.46207 13.5448C3.84207 12.6068 3.84207 11.3938 4.46207 10.4548C5.55907 8.7908 7.99707 5.9998 12.0001 5.9998C13.5921 5.9998 15.0901 6.4458 16.4521 7.3258C16.8001 7.5508 16.9001 8.0148 16.6751 8.3628C16.4501 8.7108 15.9861 8.8108 15.6381 8.5858C14.5231 7.8658 13.3001 7.5008 12.0011 7.5008C8.70007 7.5008 6.64607 9.8698 5.71507 11.2808C5.43107 11.7118 5.43107 12.2898 5.71507 12.7198C6.23107 13.5018 7.10907 14.6038 8.36307 15.4148C8.71107 15.6398 8.81107 16.1038 8.58607 16.4518C8.44207 16.6738 8.20207 16.7948 7.95607 16.7948L7.95507 16.7938Z"/><path fill="currentColor" stroke="none" d="M18.4056 4.48222C18.6959 4.18691 19.1707 4.18245 19.4662 4.47246C19.7615 4.76272 19.7661 5.23756 19.476 5.533L5.61462 19.6375C5.32438 19.9328 4.84952 19.9373 4.55408 19.6473C4.25874 19.357 4.25425 18.8822 4.54431 18.5867L18.4056 4.48222Z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'},
  { id:'archive',              label:'Archive',              category:'General', tags:['store','box','preserve','save'],
    line:'<path fill="currentColor" stroke="none" d="M17.5225 7.71191C17.5225 7.57393 17.4104 7.46206 17.2725 7.46191H6.72754C6.58947 7.46191 6.47754 7.57384 6.47754 7.71191V8.91406C6.47754 9.05213 6.58947 9.16406 6.72754 9.16406H17.2725C17.4104 9.16391 17.5225 9.05204 17.5225 8.91406V7.71191ZM19.0225 8.91406C19.0225 9.88047 18.2388 10.6639 17.2725 10.6641H6.72754C5.76104 10.6641 4.97754 9.88056 4.97754 8.91406V7.71191C4.97754 6.74541 5.76104 5.96191 6.72754 5.96191H17.2725C18.2388 5.96206 19.0225 6.74551 19.0225 7.71191V8.91406Z"/><path fill="currentColor" stroke="none" d="M13.4785 11.9424C13.8926 11.9426 14.2285 12.2783 14.2285 12.6924C14.2285 13.1065 13.8926 13.4422 13.4785 13.4424H10.3701C9.9559 13.4424 9.62012 13.1066 9.62012 12.6924C9.62012 12.2782 9.9559 11.9424 10.3701 11.9424H13.4785Z"/><path fill="currentColor" stroke="none" d="M6.05542 16.29V10.4199C6.05542 10.0057 6.39121 9.66992 6.80542 9.66992C7.21963 9.66992 7.55542 10.0057 7.55542 10.4199V16.29C7.55542 16.4281 7.66735 16.54 7.80542 16.54H16.1941C16.3322 16.54 16.4441 16.4281 16.4441 16.29V10.4199C16.4441 10.0057 16.7799 9.66996 17.1941 9.66992C17.6083 9.66992 17.9441 10.0057 17.9441 10.4199V16.29C17.9441 17.2565 17.1606 18.04 16.1941 18.04H7.80542C6.83892 18.04 6.05542 17.2565 6.05542 16.29Z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17.2722 6.71191H6.72754C6.17525 6.71191 5.72754 7.15963 5.72754 7.71191V8.91426C5.72754 9.46654 6.17525 9.91426 6.72754 9.91426H17.2722C17.8245 9.91426 18.2722 9.46654 18.2722 8.91426V7.71191C18.2722 7.15963 17.8245 6.71191 17.2722 6.71191Z"/><path fill="currentColor" stroke="none" fill-rule="evenodd" clip-rule="evenodd" d="M17.2725 5.96191C18.2388 5.96206 19.0225 6.74551 19.0225 7.71191V8.91406C19.0225 9.60705 18.6185 10.2038 18.0342 10.4873V16.8867C18.0341 17.4389 17.5864 17.8867 17.0342 17.8867H6.96582C6.4136 17.8867 5.96495 17.4389 5.96484 16.8867V10.4873C5.38094 10.2037 4.97754 9.6068 4.97754 8.91406V7.71191C4.97754 6.74541 5.76104 5.96191 6.72754 5.96191H17.2725ZM10.4463 11.9424C10.0321 11.9424 9.69629 12.2782 9.69629 12.6924C9.69629 13.1066 10.0321 13.4424 10.4463 13.4424H13.5547C13.9685 13.4419 14.3047 13.1063 14.3047 12.6924C14.3047 12.2785 13.9685 11.9428 13.5547 11.9424H10.4463ZM6.72754 7.46191C6.58947 7.46191 6.47754 7.57384 6.47754 7.71191V8.91406C6.47754 9.05213 6.58947 9.16406 6.72754 9.16406H17.2725C17.4104 9.16391 17.5225 9.05204 17.5225 8.91406V7.71191C17.5225 7.57393 17.4104 7.46206 17.2725 7.46191H6.72754Z"/>'},
  { id:'guide',                label:'Guide',                category:'General', tags:['tutorial','help','instructions','learn','book'],
    line:'<path fill="currentColor" stroke="none" d="M10 5C10.7892 5 11.4986 5.33403 12 5.86621C12.5014 5.33403 13.2108 5 14 5H18.25C19.2162 5 20 5.78379 20 6.75V16.25C20 17.2162 19.2162 18 18.25 18H14C13.3092 18 12.75 18.5592 12.75 19.25C12.75 19.6642 12.4142 20 12 20C11.5858 20 11.25 19.6642 11.25 19.25C11.25 18.5592 10.6908 18 10 18H5.75C4.78379 18 4 17.2162 4 16.25V6.75C4 5.78379 4.78379 5 5.75 5H10ZM5.75 6.5C5.61221 6.5 5.5 6.61221 5.5 6.75V16.25C5.5 16.3878 5.61221 16.5 5.75 16.5H10C10.4507 16.5 10.8747 16.6107 11.25 16.8027V7.75C11.25 7.05921 10.6908 6.5 10 6.5H5.75ZM14 6.5C13.3092 6.5 12.75 7.05921 12.75 7.75V16.8027C13.1253 16.6107 13.5493 16.5 14 16.5H18.25C18.3878 16.5 18.5 16.3878 18.5 16.25V6.75C18.5 6.61221 18.3878 6.5 18.25 6.5H14Z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18.25 5H14C13.213 5 12.502 5.333 12 5.864C11.498 5.332 10.787 5 10 5H5.75C4.785 5 4 5.785 4 6.75V16.25C4 17.215 4.785 18 5.75 18H10C10.689 18 11.25 18.561 11.25 19.25C11.25 19.664 11.586 20 12 20C12.414 20 12.75 19.664 12.75 19.25C12.75 18.561 13.311 18 14 18H18.25C19.215 18 20 17.215 20 16.25V6.75C20 5.785 19.215 5 18.25 5ZM18.5 16.25C18.5 16.388 18.388 16.5 18.25 16.5H14C13.548 16.5 13.127 16.62 12.75 16.814V7.75C12.75 7.061 13.311 6.5 14 6.5H18.25C18.388 6.5 18.5 6.612 18.5 6.75V16.25Z"/>'},
  { id:'ai',                   label:'AI',                   category:'General', tags:['artificial intelligence','smart','ml','machine learning'],
    line:'<path fill="currentColor" stroke="none" d="M19.9818 14.9967C19.9817 14.7818 19.866 14.5857 19.6841 14.4793C19.6772 14.4773 19.6696 14.4757 19.6617 14.4735C19.6069 14.4579 19.5291 14.4347 19.4337 14.4046C19.2428 14.3446 18.9792 14.255 18.6882 14.1376C18.1246 13.9102 17.3854 13.5497 16.8997 13.0456C16.4409 12.5693 16.0842 11.8345 15.8516 11.272C15.7314 10.9813 15.6368 10.7176 15.5721 10.5265C15.5398 10.431 15.5146 10.3532 15.4975 10.2985C15.4939 10.2871 15.4904 10.2764 15.4876 10.267C15.3819 10.0792 15.1851 9.96186 14.9718 9.96186C14.7583 9.96186 14.5609 10.079 14.4552 10.267C14.4524 10.2763 14.4497 10.2872 14.4461 10.2985C14.429 10.3532 14.4038 10.431 14.3715 10.5265C14.3069 10.7176 14.2122 10.9813 14.092 11.272C13.8594 11.8345 13.5027 12.5693 13.0439 13.0456C12.5582 13.5497 11.819 13.9102 11.2554 14.1376C10.9644 14.255 10.7008 14.3446 10.51 14.4046C10.4145 14.4347 10.3367 14.4579 10.2819 14.4735C10.2738 14.4758 10.2658 14.4773 10.2587 14.4793C10.0771 14.5858 9.96195 14.7821 9.96186 14.9967C9.96186 15.2113 10.0772 15.4075 10.2587 15.5141C10.2659 15.5161 10.2737 15.5184 10.2819 15.5207C10.3367 15.5363 10.4145 15.5595 10.51 15.5896C10.7008 15.6495 10.9644 15.7384 11.2554 15.8557C11.8191 16.0831 12.5583 16.4444 13.0439 16.9486C13.5026 17.4248 13.8594 18.1589 14.092 18.7214C14.2122 19.0119 14.3069 19.2758 14.3715 19.4668C14.4038 19.5626 14.429 19.641 14.4461 19.6957C14.4495 19.7065 14.4525 19.7166 14.4552 19.7255C14.5432 19.8749 14.7295 19.9818 14.9718 19.9818C15.2139 19.9818 15.3995 19.8747 15.4876 19.7255C15.4903 19.7165 15.4941 19.7066 15.4975 19.6957C15.5146 19.641 15.5398 19.5626 15.5721 19.4668C15.6368 19.2758 15.7314 19.0119 15.8516 18.7214C16.0842 18.1589 16.441 17.4248 16.8997 16.9486C17.3854 16.4444 18.1245 16.0831 18.6882 15.8557C18.9792 15.7384 19.2429 15.6495 19.4337 15.5896C19.5291 15.5595 19.6069 15.5363 19.6617 15.5207C19.6696 15.5185 19.6771 15.516 19.6841 15.5141C19.866 15.4076 19.9818 15.2115 19.9818 14.9967ZM10.6418 9.04561C10.6418 8.9556 10.5936 8.87499 10.5199 8.82836C10.4814 8.81672 10.4286 8.80042 10.3648 8.77944C10.2303 8.73516 10.0444 8.66975 9.83914 8.58541C9.44742 8.42442 8.91355 8.16576 8.55804 7.80929C8.20163 7.45188 7.94434 6.91578 7.78441 6.52239C7.70061 6.31624 7.63591 6.12934 7.59204 5.9942C7.5712 5.92998 7.55464 5.87697 7.54312 5.83831C7.4962 5.76334 7.4166 5.71642 7.33002 5.71642C7.24329 5.71642 7.16296 5.76312 7.11609 5.83831C7.10457 5.87695 7.0888 5.9301 7.06799 5.9942C7.02413 6.12934 6.95942 6.31624 6.87562 6.52239C6.7157 6.91578 6.4584 7.45188 6.10199 7.80929C5.74649 8.16576 5.21262 8.42442 4.8209 8.58541C4.61566 8.66975 4.42976 8.73516 4.29519 8.77944C4.23098 8.80056 4.17783 8.8167 4.1393 8.82836C4.06593 8.87506 4.01824 8.95584 4.01824 9.04561C4.01825 9.13521 4.06614 9.21528 4.1393 9.26202C4.17785 9.27368 4.23085 9.29061 4.29519 9.31177C4.42977 9.35605 4.61566 9.42146 4.8209 9.5058C5.21262 9.66679 5.74649 9.92545 6.10199 10.2819C6.4584 10.6393 6.7157 11.1754 6.87562 11.5688C6.95942 11.775 7.02413 11.9619 7.06799 12.097C7.08822 12.1593 7.1038 12.2112 7.11526 12.2496C7.1466 12.2926 7.21425 12.34 7.33002 12.34C7.44542 12.34 7.51247 12.2925 7.54395 12.2496C7.55541 12.2112 7.57178 12.1594 7.59204 12.097C7.63591 11.9619 7.70061 11.775 7.78441 11.5688C7.94433 11.1754 8.20163 10.6393 8.55804 10.2819C8.91355 9.92545 9.44742 9.66679 9.83914 9.5058C10.0444 9.42146 10.2303 9.35605 10.3648 9.31177C10.4288 9.29075 10.4814 9.27367 10.5199 9.26202C10.5934 9.21535 10.6418 9.13546 10.6418 9.04561ZM12.5995 4.733L12.5232 4.88474L11.8657 5.21476L12.5232 5.54561L12.5995 5.69735L12.8491 6.19818L13.0987 5.69735L13.175 5.54561L13.3267 5.46932L13.8317 5.21476L13.175 4.88474L13.0987 4.733L12.8491 4.23051L12.5995 4.733ZM21 14.9967C21 15.6087 20.655 16.17 20.1086 16.4444L20.0605 16.4685L20.0083 16.4818C20.0079 16.4819 20.007 16.4823 20.0058 16.4826C20.0033 16.4833 19.999 16.4844 19.9934 16.4859C19.9818 16.489 19.9637 16.4942 19.9403 16.5008C19.8935 16.5141 19.8245 16.5344 19.7388 16.5614C19.5668 16.6154 19.3293 16.6959 19.0688 16.801C18.5294 17.0186 17.9619 17.3143 17.6335 17.6551C17.3175 17.9832 17.0198 18.5619 16.7927 19.1111C16.6831 19.3761 16.5967 19.618 16.5373 19.7935C16.5077 19.8811 16.4852 19.952 16.4701 20C16.4627 20.0237 16.4572 20.0419 16.4536 20.0539C16.4518 20.0598 16.4502 20.0644 16.4494 20.0672C16.449 20.0685 16.4487 20.07 16.4486 20.0705L16.4353 20.1136L16.4154 20.1542C16.1226 20.7426 15.5165 21 14.9718 21C14.4271 21 13.8211 20.7426 13.5282 20.1542L13.5083 20.1136L13.495 20.0705C13.4949 20.07 13.4946 20.0685 13.4942 20.0672C13.4934 20.0644 13.4918 20.0598 13.49 20.0539C13.4864 20.0419 13.4809 20.0237 13.4735 20C13.4584 19.952 13.4359 19.8811 13.4063 19.7935C13.347 19.618 13.2605 19.3761 13.1509 19.1111C12.9238 18.5619 12.6261 17.9832 12.3101 17.6551C11.9818 17.3143 11.4142 17.0186 10.8748 16.801C10.6143 16.6959 10.3768 16.6154 10.2048 16.5614C10.1191 16.5344 10.0501 16.5141 10.0033 16.5008C9.97995 16.4942 9.96178 16.489 9.95025 16.4859C9.94461 16.4844 9.94032 16.4833 9.93781 16.4826C9.93664 16.4823 9.93574 16.4819 9.93532 16.4818L9.88308 16.4685L9.83499 16.4444C9.28857 16.17 8.94362 15.6087 8.94362 14.9967C8.94371 14.3848 9.28864 13.8242 9.83499 13.5498L9.88308 13.5257L9.93532 13.5116C9.93575 13.5115 9.93657 13.5111 9.93781 13.5108C9.94034 13.5101 9.94455 13.509 9.95025 13.5075C9.96178 13.5043 9.97995 13.5 10.0033 13.4934C10.0501 13.4801 10.1191 13.4598 10.2048 13.4328C10.3768 13.3788 10.6143 13.2983 10.8748 13.1932C11.4144 12.9755 11.9818 12.6792 12.3101 12.3383C12.6261 12.0102 12.9238 11.4323 13.1509 10.8831C13.2605 10.6181 13.3469 10.3762 13.4063 10.2007C13.4359 10.1132 13.4584 10.0422 13.4735 9.9942C13.481 9.97018 13.4864 9.95148 13.49 9.93947C13.4918 9.93353 13.4934 9.92893 13.4942 9.9262C13.4945 9.92502 13.4949 9.92421 13.495 9.92371L13.5083 9.87977L13.5282 9.83914C13.8007 9.29178 14.3593 8.94362 14.9718 8.94362C15.5843 8.94362 16.1429 9.29178 16.4154 9.83914L16.4353 9.87977L16.4486 9.92371C16.4487 9.92421 16.4491 9.92502 16.4494 9.9262C16.4502 9.92893 16.4518 9.93353 16.4536 9.93947C16.4572 9.95148 16.4626 9.97018 16.4701 9.9942C16.4852 10.0422 16.5077 10.1132 16.5373 10.2007C16.5967 10.3762 16.6831 10.6181 16.7927 10.8831C17.0198 11.4323 17.3175 12.0102 17.6335 12.3383C17.9618 12.6792 18.5292 12.9755 19.0688 13.1932C19.3294 13.2983 19.5668 13.3788 19.7388 13.4328C19.8245 13.4598 19.8935 13.4801 19.9403 13.4934C19.9637 13.5 19.9818 13.5043 19.9934 13.5075C19.9991 13.509 20.0033 13.5101 20.0058 13.5108L20.0083 13.5116L20.0605 13.5257L20.1086 13.5498C20.655 13.8242 20.9999 14.3848 21 14.9967ZM11.66 9.04561C11.66 9.52832 11.3882 9.97067 10.9569 10.1874L10.9129 10.2098L10.8648 10.2231L10.864 10.2239C10.8625 10.2243 10.8594 10.2245 10.8557 10.2255C10.8481 10.2277 10.8359 10.2316 10.8201 10.2363C10.7885 10.2458 10.7416 10.2602 10.6833 10.2794C10.5658 10.3181 10.4037 10.3749 10.2264 10.4478C9.85304 10.6012 9.48241 10.7974 9.27944 11.0008C9.07597 11.2049 8.88051 11.5776 8.72803 11.9527C8.65564 12.1308 8.59881 12.2933 8.56053 12.4113C8.54149 12.4699 8.52767 12.5172 8.51824 12.5489C8.51353 12.5648 8.50965 12.5769 8.50746 12.5846C8.50638 12.5884 8.50542 12.5913 8.50498 12.5929L8.49171 12.6418L8.47015 12.6857C8.2348 13.1586 7.75158 13.3582 7.33002 13.3582C6.90845 13.3582 6.42523 13.1586 6.18988 12.6857L6.16832 12.6418L6.15506 12.5937C6.15462 12.5921 6.15365 12.5884 6.15257 12.5846C6.15039 12.5769 6.1465 12.5648 6.14179 12.5489C6.13236 12.5172 6.11854 12.4699 6.0995 12.4113C6.06122 12.2933 6.00439 12.1308 5.93201 11.9527C5.77953 11.5776 5.58406 11.2049 5.3806 11.0008C5.17762 10.7974 4.80699 10.6012 4.43367 10.4478C4.25638 10.3749 4.09421 10.3181 3.97678 10.2794C3.91843 10.2602 3.87157 10.2458 3.83997 10.2363C3.82416 10.2316 3.81194 10.2277 3.80431 10.2255C3.80062 10.2245 3.79757 10.2243 3.79602 10.2239L3.79519 10.2231L3.7471 10.2098L3.70315 10.1874C3.27188 9.97068 3 9.52832 3 9.04561C3 8.56289 3.27189 8.12054 3.70315 7.90381L3.7471 7.88143L3.79519 7.86816L3.79602 7.86733C3.79757 7.86689 3.80062 7.86674 3.80431 7.86567C3.81194 7.86346 3.82416 7.85965 3.83997 7.85489C3.87157 7.84537 3.91843 7.83097 3.97678 7.81177C4.09421 7.77314 4.25638 7.7163 4.43367 7.64345C4.80698 7.49003 5.17762 7.29378 5.3806 7.09038C5.58406 6.88636 5.77953 6.51359 5.93201 6.13847C6.00439 5.96039 6.06122 5.79787 6.0995 5.67993C6.11854 5.62129 6.13236 5.57406 6.14179 5.54229C6.1465 5.52641 6.15039 5.51429 6.15257 5.50663C6.15365 5.50284 6.15462 5.49992 6.15506 5.49834V5.49668L6.16832 5.44942L6.18988 5.40547C6.40485 4.97359 6.84607 4.69818 7.33002 4.69818C7.7534 4.69818 8.14392 4.90849 8.37894 5.25041L8.47015 5.40547L8.49171 5.44942L8.50498 5.49668V5.49834C8.50542 5.49992 8.50638 5.50284 8.50746 5.50663C8.50965 5.51429 8.51353 5.52641 8.51824 5.54229C8.52767 5.57406 8.5415 5.62129 8.56053 5.67993C8.59881 5.79787 8.65564 5.96039 8.72803 6.13847C8.88051 6.51359 9.07597 6.88636 9.27944 7.09038C9.48241 7.29378 9.85305 7.49003 10.2264 7.64345C10.4037 7.7163 10.5658 7.77314 10.6833 7.81177C10.7416 7.83097 10.7885 7.84537 10.8201 7.85489C10.8359 7.85965 10.8481 7.86346 10.8557 7.86567C10.8594 7.86674 10.8625 7.86689 10.864 7.86733L10.8648 7.86816L10.9129 7.88143L10.9569 7.90381C11.3881 8.12054 11.66 8.56289 11.66 9.04561ZM15.0564 5.21476C15.0564 5.53604 14.8755 5.83064 14.5879 5.97512L13.9345 6.30348L13.6086 6.95937C13.4451 7.28753 13.1166 7.41459 12.8491 7.41459C12.5816 7.41459 12.2531 7.28753 12.0896 6.95937L11.7629 6.30348L11.1103 5.97512C10.8587 5.84873 10.6887 5.60771 10.6501 5.33416L10.6418 5.21476L10.6501 5.09619C10.6886 4.8225 10.8586 4.58082 11.1103 4.45439L11.7629 4.12604L12.0896 3.47098L12.1493 3.36816C12.3057 3.1403 12.5662 3 12.8491 3C13.1722 3 13.4655 3.18359 13.6086 3.47098L13.9345 4.12604L14.5879 4.45439C14.8754 4.59882 15.0563 4.89355 15.0564 5.21476Z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3.4482 9.59642C3.4482 9.59642 4.77437 9.9663 5.36628 10.5598C5.95981 11.155 6.32532 12.4866 6.32532 12.4866C6.59964 13.0378 7.50036 13.0378 7.77468 12.4866C7.77468 12.4866 8.14019 11.155 8.73372 10.5598C9.32563 9.9663 10.6518 9.59642 10.6518 9.59642C10.9261 9.45864 11.1 9.17656 11.1 8.86844C11.1 8.56033 10.9261 8.27825 10.6518 8.14046C10.6518 8.14046 9.32563 7.77059 8.73372 7.17706C8.14019 6.58191 7.77468 5.25024 7.77468 5.25024C7.63752 4.97467 7.35672 4.8 7.05 4.8C6.74328 4.8 6.46248 4.97467 6.32532 5.25024C6.32532 5.25024 5.95981 6.58191 5.36628 7.17706C4.77437 7.77058 3.4482 8.14046 3.4482 8.14046C3.17388 8.27825 3 8.56033 3 8.86844C3 9.17656 3.17388 9.45864 3.4482 9.59642Z"/><path fill="currentColor" stroke="none" d="M11.2992 5.13174L12.1517 5.55992L12.5779 6.41629C12.6998 6.66124 13.1002 6.66124 13.2221 6.41629L13.6483 5.55992L14.5008 5.13174C14.6227 5.07051 14.7 4.94514 14.7 4.8082C14.7 4.67126 14.6227 4.54589 14.5008 4.48465L13.6483 4.05647L13.2221 3.20011C13.1611 3.07763 13.0363 3 12.9 3C12.7637 3 12.6389 3.07763 12.5779 3.20011L12.1517 4.05647L11.2992 4.48465C11.1773 4.54589 11.1 4.67126 11.1 4.8082C11.1 4.94514 11.1773 5.07051 11.2992 5.13174Z"/><path fill="currentColor" stroke="none" d="M9.9474 16.2282C9.9474 16.2282 11.8551 16.724 12.718 17.6198C13.5392 18.4724 14.1032 20.4029 14.1032 20.4029C14.4995 21.199 15.8005 21.199 16.1968 20.4029C16.1968 20.4029 16.7608 18.4724 17.582 17.6198C18.4449 16.724 20.3526 16.2282 20.3526 16.2282C20.7488 16.0291 21 15.6217 21 15.1766C21 14.7316 20.7488 14.3241 20.3526 14.1251C20.3526 14.1251 18.4449 13.6293 17.582 12.7335C16.7608 11.8809 16.1968 9.95035 16.1968 9.95035C15.9986 9.5523 15.593 9.3 15.15 9.3C14.707 9.3 14.3014 9.5523 14.1032 9.95035C14.1032 9.95035 13.5392 11.8809 12.718 12.7335C11.8551 13.6293 9.9474 14.1251 9.9474 14.1251C9.55116 14.3241 9.3 14.7316 9.3 15.1766C9.3 15.6217 9.55116 16.0291 9.9474 16.2282Z"/>'},
  // ── Media & Communication (Figma: Icon Sheet Page 02, Frame 21) ──
  { id:'chat',                      label:'Chat',                      category:'Media & Communication', tags:['message','bubble','talk'],
    line:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>'},
  { id:'chat-dot',                   label:'Chat Dot',                  category:'Media & Communication', tags:['message','bubble','typing'],
    line:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 9H8V9h8v2z"/>'},
  { id:'notification-bell',          label:'Notification Bell',         category:'Media & Communication', tags:['alert','notify','ring'],
    line:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>'},
  { id:'notification-bell-new',       label:'Bell with Badge',           category:'Media & Communication', tags:['alert','notify','new','badge'],
    line:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><circle cx="19" cy="4" r="3" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/><circle cx="19" cy="4" r="3" fill="#ef4444" stroke="none"/>'},
  { id:'camera',                     label:'Camera',                    category:'Media & Communication', tags:['photo','picture','shoot'],
    line:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-13l-2 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-6l-2-2h-4z"/>'},
  { id:'record',                     label:'Record',                    category:'Media & Communication', tags:['video','capture','rec'],
    line:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>'},
  { id:'call',                       label:'Call',                      category:'Media & Communication', tags:['phone','voice','dial'],
    line:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>'},
  { id:'microphone',                 label:'Microphone',                category:'Media & Communication', tags:['mic','voice','audio','record'],
    line:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>'},
  { id:'mail',                       label:'Mail',                      category:'Media & Communication', tags:['email','envelope','inbox'],
    line:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>'},
  { id:'mail-opened',                label:'Mail Opened',               category:'Media & Communication', tags:['email','read','open','inbox'],
    line:'<polyline points="3 9 12 15 21 9"/><path d="M21 9V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"/><polyline points="3 9 12 3 21 9"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 4H4L2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8l-2-4zm0 4l-8 6-8-6V7l2-1h12l2 1v1z"/>'},
  { id:'remark',                     label:'Remark',                    category:'Media & Communication', tags:['comment','note','annotation'],
    line:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>'},
  { id:'video',                      label:'Video',                     category:'Media & Communication', tags:['camera','film','clip'],
    line:'<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>'},
  { id:'whatsapp',                   label:'WhatsApp',                  category:'Media & Communication', tags:['social','messaging','app'],
    line:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9 10c0 4 3 6 6 6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.57.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.41.77 1.07 1.42 1.79 1.92.6.39 1.28.66 1.95.81z"/><path fill="currentColor" stroke="none" d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652C8.1 23.345 10.048 23.9 12.045 23.9c6.582 0 11.941-5.334 11.944-11.893 0-3.176-1.24-6.165-3.469-8.558zm-8.475 18.3c-1.773 0-3.513-.476-5.028-1.374l-.36-.214-3.742.976.998-3.648-.235-.374a9.818 9.818 0 0 1-1.51-5.26c.003-5.45 4.436-9.884 9.893-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.892 6.993c-.003 5.453-4.437 9.887-9.896 9.887z"/>'},
  { id:'linkedin',                   label:'LinkedIn',                  category:'Media & Communication', tags:['social','network','professional'],
    line:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'},
  { id:'x-social',                   label:'X (Twitter)',               category:'Media & Communication', tags:['twitter','social','x'],
    line:'<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'},
  { id:'youtube',                    label:'YouTube',                   category:'Media & Communication', tags:['video','streaming','social'],
    line:'<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>',
    filled:'<path fill="currentColor" stroke="none" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>'},
  { id:'power',                      label:'Power',                     category:'Media & Communication', tags:['on','off','shutdown','energy'],
    line:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>'},
  { id:'play-circle',                label:'Play Circle',               category:'Media & Communication', tags:['play','video','media','start'],
    line:'<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>'},
  { id:'play',                       label:'Play',                      category:'Media & Communication', tags:['media','start','video','run'],
    line:'<polygon points="5 3 19 12 5 21 5 3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M8 5v14l11-7z"/>'},
  { id:'video1',                     label:'Video 2',                   category:'Media & Communication', tags:['film','clip','media'],
    line:'<rect x="2" y="6" width="16" height="12" rx="2"/><path d="m22 8-4 4 4 4V8z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>'},
  { id:'emoji',                      label:'Emoji',                     category:'Media & Communication', tags:['smile','face','emotion','reaction'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    filled:'<path fill="currentColor" stroke="none" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>'},
  { id:'headphone',                  label:'Headphone',                 category:'Media & Communication', tags:['audio','listen','music','earphone'],
    line:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/>'},
  { id:'loader',                     label:'Loader',                    category:'Media & Communication', tags:['loading','spinner','progress'],
    line:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18h-2v1.93A8 8 0 0 1 4.07 13H6v-2H4.07A8 8 0 0 1 11 4.07V6h2V4.07A8 8 0 0 1 19.93 11H18v2h1.93A8 8 0 0 1 13 19.93z"/>'},
  { id:'contact',                    label:'Contact',                   category:'Media & Communication', tags:['address','book','person','card'],
    line:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>'},
  { id:'image',                      label:'Image',                     category:'Media & Communication', tags:['photo','picture','gallery'],
    line:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    filled:'<path fill="currentColor" stroke="none" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>'},
  { id:'link',                       label:'Link',                      category:'Media & Communication', tags:['url','chain','connect','href'],
    line:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    filled:'<path fill="currentColor" stroke="none" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>'},
  { id:'piechart',                   label:'Pie Chart',                 category:'Media & Communication', tags:['chart','data','statistics','analytics'],
    line:'<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M11 2.05V13h10.95C21.46 7.36 17.2 2.87 11 2.05zM2 13c0 5.52 4.48 10 10 10s10-4.48 10-10v-1H12V2C6.48 2 2 6.48 2 12v1z"/>'},
  { id:'chart-bar',                  label:'Bar Chart',                 category:'Media & Communication', tags:['bar','graph','data','analytics'],
    line:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    filled:'<path fill="currentColor" stroke="none" d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zM16 13h3v6h-3z"/>'},
  { id:'chart-line',                 label:'Line Chart',                category:'Media & Communication', tags:['trend','graph','data','analytics'],
    line:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16.5 12.5H15l-3 8.5-6-17-3 8.5H1v2h3.5l1.5-4.26 6 17 3-8.5H22v-2h-5.5z"/>'},
  { id:'trendline-up',               label:'Trend Up',                  category:'Media & Communication', tags:['rising','increase','growth'],
    line:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>'},
  { id:'trendline-down',             label:'Trend Down',                category:'Media & Communication', tags:['falling','decrease','decline'],
    line:'<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>'},

  // ── User & Account (Figma: Icon Sheet Page 02) ──
  { id:'user-add',                   label:'User Add',                  category:'User & Account', tags:['person','invite','new user'],
    line:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
    filled:'<path fill="currentColor" stroke="none" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'},
  { id:'user-single',                label:'User Single',               category:'User & Account', tags:['person','profile','account'],
    line:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'},
  { id:'user-single-circle',         label:'User Circle',               category:'User & Account', tags:['person','avatar','circle'],
    line:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"/>'},
  { id:'user-two',                   label:'Two Users',                 category:'User & Account', tags:['people','pair','duo'],
    line:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>'},
  { id:'user-group',                 label:'User Group',                category:'User & Account', tags:['team','group','people','org'],
    line:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M20 21v-2a4 4 0 0 0-3-3.87"/>',
    filled:'<path fill="currentColor" stroke="none" d="M14 6c0 2.21-1.79 4-4 4S6 8.21 6 6s1.79-4 4-4 4 1.79 4 4zM2 17c0-2.67 5.33-4 8-4s8 1.33 8 4v1H2v-1zm18.01-4.93C21.2 12.6 22 13.7 22 15v2h2v-2c0-2.18-2.4-3.54-4-4-.01 0-.01-.01 0 0zM18 5c-1.11 0-2.08.6-2.6 1.5A4 4 0 0 1 18 10c.86 0 1.65-.26 2.3-.7.44-.47.7-1.08.7-1.3 0-1.66-1.34-3-3-3z"/>'},
  { id:'setting',                    label:'Settings',                  category:'User & Account', tags:['gear','configure','cog','preferences'],
    line:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'},
  { id:'lock',                       label:'Lock',                      category:'User & Account', tags:['secure','closed','password','private'],
    line:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>'},
  { id:'unlock',                     label:'Unlock',                    category:'User & Account', tags:['open','accessible','unsecured'],
    line:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>'},
  { id:'logout',                     label:'Logout',                    category:'User & Account', tags:['sign out','exit','leave'],
    line:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>'},
  { id:'logout2',                    label:'Logout 2',                  category:'User & Account', tags:['sign out','exit','leave','alt'],
    line:'<path d="M16 17l5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4-4-4zM5 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5z"/>'},
  { id:'user-setting',               label:'User Settings',             category:'User & Account', tags:['profile','configure','account','manage'],
    line:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><circle cx="20" cy="20" r="3"/><line x1="22" y1="18" x2="18" y2="18"/><line x1="20" y1="16" x2="20" y2="22"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h11.2a5.5 5.5 0 0 1 5.8-5v-1c0-2.66-5.33-4-9-4zm7 6v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V20h-1.5c-.28 0-.5.22-.5.5s.22.5.5.5H18v1.5c0 .28.22.5.5.5s.5-.22.5-.5V21h1.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H19z"/>'},
  { id:'user-inactive',              label:'User Inactive',             category:'User & Account', tags:['disabled','deactivated','blocked'],
    line:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="4" y1="20" x2="20" y2="4"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm9.19-4.19L19.77 8.4 18.36 9.81l1.42 1.42-1.42 1.41 1.42 1.42 1.41-1.42 1.42 1.42 1.41-1.42-1.41-1.41 1.41-1.42-1.42-1.41z"/>'},
  { id:'user-minus',                 label:'User Remove',               category:'User & Account', tags:['remove','delete','deactivate'],
    line:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" y1="11" x2="16" y2="11"/>',
    filled:'<path fill="currentColor" stroke="none" d="M14 6c0 2.21-1.79 4-4 4S6 8.21 6 6s1.79-4 4-4 4 1.79 4 4zM2 17c0-2.67 5.33-4 8-4s8 1.33 8 4v1H2v-1zm18-2h-4v2h4v-2z"/>'},
  { id:'shield',                     label:'Shield',                    category:'User & Account', tags:['security','protect','safe'],
    line:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>'},
  { id:'shield-check',               label:'Shield Check',              category:'User & Account', tags:['verified','security','trusted','safe'],
    line:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>'},
  { id:'drag-hand',                  label:'Drag Handle',               category:'User & Account', tags:['move','reorder','handle','grab'],
    line:'<path d="M9 3h2v2H9zM9 7h2v2H9zM9 11h2v2H9zM13 3h2v2h-2zM13 7h2v2h-2zM13 11h2v2h-2z"/>',
    filled:'<path fill="currentColor" stroke="none" d="M9 3h2v2H9zm4 0h2v2h-2zM9 7h2v2H9zm4 0h2v2h-2zM9 11h2v2H9zm4 0h2v2h-2z"/>'},

  // ── File & Document (Figma: Icon Sheet Page 02) ──
  { id:'document',                   label:'Document',                  category:'File & Document', tags:['file','paper','page'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    filled:'<path fill="currentColor" stroke="none" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>'},
  { id:'document-hand',              label:'Document Share',            category:'File & Document', tags:['file','send','transfer','share'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M9 11h6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm4 14H8v-2h2v2zm0-4H8v-2h2v2zm5 4h-3v-2h3v2zm0-4h-3v-2h3v2zm-2-5V3.5L18.5 9H13z"/>'},
  { id:'document-pdf',               label:'PDF Document',              category:'File & Document', tags:['pdf','file','adobe','export'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="6" y="19" font-size="5.5" fill="currentColor" stroke="none" font-weight="700">PDF</text>',
    filled:'<path fill="currentColor" stroke="none" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>'},
  { id:'document-word',              label:'Word Document',             category:'File & Document', tags:['doc','word','microsoft','text'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="5.5" y="19" font-size="5" fill="currentColor" stroke="none" font-weight="700">DOC</text>',
    filled:'<path fill="currentColor" stroke="none" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 16h2l1-4 1 4h2l1.5-7h-2l-.5 4-1-4h-2l-1 4-.5-4H7L8 16z"/>'},
  { id:'document-csv',               label:'CSV Document',              category:'File & Document', tags:['csv','spreadsheet','data','export'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="5.5" y="19" font-size="5.5" fill="currentColor" stroke="none" font-weight="700">CSV</text>',
    filled:'<path fill="currentColor" stroke="none" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM10 14H8v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-3H8v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>'},
  { id:'document-zip',               label:'ZIP Document',              category:'File & Document', tags:['zip','archive','compress','file'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="5.5" y="19" font-size="5.5" fill="currentColor" stroke="none" font-weight="700">ZIP</text>',
    filled:'<path fill="currentColor" stroke="none" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zm3 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z"/>'},
  { id:'document-xls',               label:'XLS Document',              category:'File & Document', tags:['excel','xls','spreadsheet','table'],
    line:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="5.5" y="19" font-size="5.5" fill="currentColor" stroke="none" font-weight="700">XLS</text>',
    filled:'<path fill="currentColor" stroke="none" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 13l1.5 2.5L8 18h1.5l.75-1.5.75 1.5H12.5L11 15.5 12.5 13H11l-.75 1.5L9.5 13H8z"/>'},
  { id:'attachment',                 label:'Attachment',                category:'File & Document', tags:['paperclip','attach','file','clip'],
    line:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    filled:'<path fill="currentColor" stroke="none" d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>'},
  { id:'attachment-add',             label:'Attachment Add',            category:'File & Document', tags:['paperclip','add','attach','new'],
    line:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/><line x1="18" y1="3" x2="18" y2="9"/><line x1="15" y1="6" x2="21" y2="6"/>',
    filled:'<path fill="currentColor" stroke="none" d="M14 3v2h2V3h2v2h2V1h-6v2zm-1.5 3A4 4 0 0 0 8 10v7.5c0 1.93 1.57 3.5 3.5 3.5S15 19.43 15 17.5V10a2.5 2.5 0 0 0-5 0v7c0 .55.45 1 1 1s1-.45 1-1v-7h1.5V17c0 1.38-1.12 2.5-2.5 2.5S9 18.38 9 17V10a2.5 2.5 0 0 1 5 0 4 4 0 0 0-4-4V6h2.5z"/>'},
  { id:'attachment-remove',          label:'Attachment Remove',         category:'File & Document', tags:['paperclip','remove','detach'],
    line:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/><line x1="15" y1="3" x2="21" y2="9"/>',
    filled:'<path fill="currentColor" stroke="none" d="M14.83 2.19L13.41 3.6 15.87 6H12.5A4 4 0 0 0 8 10v7.5c0 1.93 1.57 3.5 3.5 3.5S15 19.43 15 17.5V10a2.5 2.5 0 0 0-5 0v7c0 .55.45 1 1 1s1-.45 1-1v-7h1.5V17c0 1.38-1.12 2.5-2.5 2.5S9 18.38 9 17V10c0-1.38 1.12-2.5 2.5-2.5h3.37l-2.46 2.46 1.42 1.41L20 5.21l-5.17-3.02z"/>'},
  { id:'scissors',                   label:'Scissors',                  category:'File & Document', tags:['cut','trim','clip','edit'],
    line:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M9.64 7.64a3 3 0 1 0-3.64 2.83V10h4V8.47A3 3 0 0 0 9.64 7.64zm3.7 7.59L21 21l-7.66-5.77zm0-6.46L21 3 12 9.29l-2.09-1.58A3 3 0 0 0 9 6a3 3 0 1 0 3.64 2.83l-1.17-.88 1.87-1.42V8.77zM6 20a3 3 0 0 0 3.64-2.83L7.6 15.7 6 14.47l-1.59 1.24A3 3 0 0 0 6 20z"/>'},

  // ── Marine Icons (Figma: Icon Sheet Page 02) ──
  { id:'ship',                       label:'Ship',                      category:'Marine Icons', tags:['vessel','boat','maritime','fleet'],
    line:'<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.1.58 4.12 1.62 5.78"/><path d="M12 10V3"/><path d="M9 6h6"/><line x1="11" y1="14" x2="13" y2="14"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26-.04-.54-.29-.63L20 11.32V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v5.32l-1.61.68a.491.491 0 0 0-.29.63L3.95 19zM6 6h12v4.9L12 8 6 10.9V6z"/>'},
  { id:'ship-smoke',                 label:'Ship Smoke',                category:'Marine Icons', tags:['vessel','exhaust','emission','maritime'],
    line:'<path d="M12 10V3M9 6h6"/><path d="M5 14l-3 6h20l-3-6"/><path d="M5 14h14"/><path d="M3 12c1-1 2-1.5 3-1s2 2 3 2 2-1 3-1 2 1 3 1 2-1.5 3-1"/><path d="M7 8c0-1 .5-2 1.5-2.5"/>',
    filled:'<path fill="currentColor" stroke="none" d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zm-4-5c-.88 0-1.75-.18-2.55-.53L12 15l-1.45.47C9.75 15.82 8.88 16 8 16c-1.5 0-2.9-.48-4-1.3V18h16v-3.3c-1.1.82-2.5 1.3-4 1.3zm-2-9.17V5h-4v1.83C8.38 7.4 7 9.07 7 11h10c0-1.93-1.38-3.6-3-4.17z"/>'},
  { id:'ship-fleet',                 label:'Ship Fleet',                category:'Marine Icons', tags:['ships','vessels','group','fleet'],
    line:'<path d="M8 17H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4"/><path d="M16 17h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4"/><rect x="8" y="5" width="8" height="14" rx="1"/><path d="M12 5V3"/><line x1="10" y1="12" x2="14" y2="12"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18 4H6c-1.11 0-2 .89-2 2v9c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-5 9H7v-2h6v2zm0-4H7V7h6v2zm4 4h-2v-2h2v2zm0-4h-2V7h2v2zM4 19h16v2H4z"/>'},
  { id:'ship-add',                   label:'Ship Add',                  category:'Marine Icons', tags:['vessel','new','plus','maritime'],
    line:'<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2"/><path d="M14.5 20A11.6 11.6 0 0 0 16 14l-9-4-5 2.22"/><path d="M12 10V3M9 6h6"/><line x1="18" y1="14" x2="18" y2="20"/><line x1="15" y1="17" x2="21" y2="17"/>',
    filled:'<path fill="currentColor" stroke="none" d="M18 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm1 5h-2v-2h2v2zm0-4h-2v-2h2v2zM6 6h12v4.9L12 8 6 10.9V6zm-3.95 13H3c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.38.43.82.8 1.3 1.09A6 6 0 0 1 12 12v-1.68l-8.34 3.7c-.25.09-.37.37-.29.63L3.05 19z"/>'},

  // ── Map & Layout (Figma: Icon Sheet Page 02) ──
  { id:'location',                   label:'Location',                  category:'Map & Layout', tags:['pin','place','gps','map'],
    line:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>'},
  { id:'location-circle',            label:'Location Circle',           category:'Map & Layout', tags:['pin','gps','circle','area'],
    line:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="3" stroke-dasharray="2 2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zm0-7a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm1 3.5h-2V9h2v4z"/>'},
  { id:'location-square',            label:'Location Square',           category:'Map & Layout', tags:['pin','zone','area','region'],
    line:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="2"/>',
    filled:'<path fill="currentColor" stroke="none" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-4.5h-2V9h2v2.5z"/>'},
];

// ── ICONS PAGE FUNCTIONS ──
let iconVariant = 'line';
let iconSize = 'md';
let iconCategory = 'all';
let iconQuery = '';

function initIconsPage() {
  renderIconGrid();
  renderOverviewCategories();
}

function getIconSvg(icon) {
  const paths = iconVariant === 'filled' && icon.filled ? icon.filled : icon.line;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

function renderIconGrid() {
  const grid = document.getElementById('icon-grid');
  if (!grid) return;
  let filtered = ICON_LIBRARY;
  if (iconCategory !== 'all') filtered = filtered.filter(i => i.category === iconCategory);
  if (iconQuery) {
    const q = iconQuery.toLowerCase();
    filtered = filtered.filter(i => i.label.toLowerCase().includes(q) || i.tags.some(t => t.includes(q)) || i.category.toLowerCase().includes(q));
  }
  grid.className = 'icon-grid size-' + iconSize;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="icon-no-results">No icons found for "' + iconQuery + '"</div>';
    return;
  }

  // Group by category
  const groups = {};
  filtered.forEach(icon => {
    if (!groups[icon.category]) groups[icon.category] = [];
    groups[icon.category].push(icon);
  });

  let html = '';
  Object.entries(groups).forEach(([cat, icons]) => {
    if (iconCategory === 'all') html += `<div class="icon-section-label">${cat} <span style="color:#c0c8d8;font-weight:500">(${icons.length})</span></div>`;
    icons.forEach(icon => {
      const paths = iconVariant === 'filled' && icon.filled ? icon.filled : icon.line;
      html += `
        <div class="icon-card" title="${icon.label}">
          <div class="icon-card-preview">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>
          </div>
          <div class="icon-card-name">${icon.label}</div>
          <div class="icon-card-actions">
            <div class="icon-card-label">${icon.label}</div>
            <div class="icon-card-actions-btns">
              <button class="icon-dl-btn" onclick="downloadIconSvg(event,'${icon.id}')">SVG</button>
              <button class="icon-dl-btn" onclick="downloadIconPng(event,'${icon.id}')">PNG</button>
            </div>
          </div>
        </div>`;
    });
  });
  grid.innerHTML = html;
}

function renderOverviewCategories() {
  const el = document.getElementById('icon-cat-overview-grid');
  if (!el) return;
  const cats = {};
  ICON_LIBRARY.forEach(i => { if (!cats[i.category]) cats[i.category] = []; cats[i.category].push(i); });
  el.innerHTML = Object.entries(cats).map(([cat, icons]) => {
    return `<div class="icon-cat-card" onclick="switchIconTab('all');filterByCategory('${cat}')">
      <span class="icon-cat-card-title">${cat}</span>
      <span class="icon-cat-card-count">${icons.length}</span>
    </div>`;
  }).join('');
}

function switchIconTab(tab) {
  document.querySelectorAll('.icon-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.icon-tab-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('icon-tab-' + tab).classList.add('active');
  document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
  if (tab === 'all') renderIconGrid();
}

function filterByCategory(cat) {
  iconCategory = cat;
  document.querySelectorAll('.icon-cat-pill').forEach(p => p.classList.remove('active'));
  const pill = document.querySelector(`.icon-cat-pill[data-cat="${cat}"]`);
  if (pill) pill.classList.add('active');
  renderIconGrid();
}

function setIconVariant(v, el) {
  iconVariant = v;
  document.querySelectorAll('.icon-variant-toggle .icon-toggle-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderIconGrid();
}

function setIconSize(s, el) {
  iconSize = s;
  document.querySelectorAll('.icon-size-toggle .icon-toggle-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderIconGrid();
}

function filterIcons() {
  iconQuery = document.getElementById('icon-search').value;
  renderIconGrid();
}

function downloadIconSvg(e, id) {
  e.stopPropagation();
  const icon = ICON_LIBRARY.find(i => i.id === id);
  if (!icon) return;
  const paths = iconVariant === 'filled' && icon.filled ? icon.filled : icon.line;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  const blob = new Blob([svg], {type:'image/svg+xml'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = icon.id + '.svg'; a.click();
}

function downloadIconPng(e, id) {
  e.stopPropagation();
  const icon = ICON_LIBRARY.find(i => i.id === id);
  if (!icon) return;
  const paths = iconVariant === 'filled' && icon.filled ? icon.filled : icon.line;
  const size = 96;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas'); c.width = size; c.height = size;
    c.getContext('2d').drawImage(img, 0, 0);
    const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = icon.id + '.png'; a.click();
  };
  img.src = 'data:image/svg+xml;base64,' + btoa(svg);
}

/* ===========================
   BUTTONS PAGE
   =========================== */
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var main = document.getElementById('main');
  var offset = 112; // topbar 56px + tab bar 48px + 8px gap
  var top = el.getBoundingClientRect().top + (main ? main.scrollTop : window.scrollY) - offset;
  (main || window).scrollTo({ top: top, behavior: 'smooth' });
}

function switchFw(paneId, fw) {
  var pane = document.getElementById(paneId);
  if (!pane) return;
  pane.querySelectorAll('.fw-react, .fw-angular').forEach(function(el) {
    el.style.display = el.classList.contains('fw-' + fw) ? '' : 'none';
  });
  pane.querySelectorAll('.fw-toggle-bar-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-fw') === fw);
  });
}

function switchBtnTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.btn-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.btn-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('btn-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.btn-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  if (tab === 'code') setTimeout(initBtnCodeScrollSpy, 80);
  if (tab === 'design') setTimeout(initBtnDesignScrollSpy, 80);
}

var _btnCodeSpyCleanup = null;
function initBtnCodeScrollSpy() {
  var main = document.getElementById('main');
  if (!main) return;
  if (_btnCodeSpyCleanup) { _btnCodeSpyCleanup(); _btnCodeSpyCleanup = null; }
  var ids = ['btn-c-install','btn-c-struct','btn-c-token','btn-c-vars','btn-c-styles','btn-c-logic','btn-c-module','btn-c-usage'];
  function update() {
    var mainRect = main.getBoundingClientRect();
    var threshold = mainRect.top + 120;
    var active = ids[0];
    for (var i = ids.length - 1; i >= 0; i--) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) { active = ids[i]; break; }
    }
    var nav = document.getElementById('btn-code-qnav');
    if (!nav) return;
    nav.querySelectorAll('.code-qnav-link').forEach(function(btn) {
      var m = (btn.getAttribute('onclick') || '').match(/'([^']+)'/);
      btn.classList.toggle('active', !!(m && m[1] === active));
    });
  }
  main.addEventListener('scroll', update, { passive: true });
  update();
  _btnCodeSpyCleanup = function() { main.removeEventListener('scroll', update); };
}

var _btnDesignSpyCleanup = null;
function initBtnDesignScrollSpy() {
  var main = document.getElementById('main');
  if (!main) return;
  if (_btnDesignSpyCleanup) { _btnDesignSpyCleanup(); _btnDesignSpyCleanup = null; }
  var ids = ['btn-s-default','btn-s-danger','btn-s-neutral','btn-s-link','btn-s-tokens'];
  function update() {
    var mainRect = main.getBoundingClientRect();
    var threshold = mainRect.top + 120;
    var active = ids[0];
    for (var i = ids.length - 1; i >= 0; i--) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) { active = ids[i]; break; }
    }
    var nav = document.getElementById('btn-design-qnav');
    if (!nav) return;
    nav.querySelectorAll('.code-qnav-link').forEach(function(btn) {
      var m = (btn.getAttribute('onclick') || '').match(/'([^']+)'/);
      btn.classList.toggle('active', !!(m && m[1] === active));
    });
  }
  main.addEventListener('scroll', update, { passive: true });
  update();
  _btnDesignSpyCleanup = function() { main.removeEventListener('scroll', update); };
}

function copyBtnCode(id, btn) {
  var pre = document.getElementById(id);
  if (!pre) return;
  var text = pre.innerText || pre.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }
}

/* ===========================
   TEXTFIELD PAGE
   =========================== */
function switchTfTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.tf-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.tf-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('tf-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.tf-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

function copyTfCode(id, btn) {
  var pre = document.getElementById(id);
  if (!pre) return;
  var text = pre.innerText || pre.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }
}

function copyTok(btn, varName) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(varName).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = varName;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }
}

function downloadAllIcons() {
  const visible = ICON_LIBRARY.filter(i => {
    if (iconCategory !== 'all' && i.category !== iconCategory) return false;
    if (iconQuery) { const q = iconQuery.toLowerCase(); return i.label.toLowerCase().includes(q) || i.tags.some(t => t.includes(q)); }
    return true;
  });
  visible.forEach((icon, idx) => {
    setTimeout(() => {
      const paths = iconVariant === 'filled' && icon.filled ? icon.filled : icon.line;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
      const blob = new Blob([svg], {type:'image/svg+xml'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = icon.id + '.svg'; a.click();
    }, idx * 80);
  });
}
// ── SCROLL SHADOW ──
// 'is-scrolled'   → added to #main when scrollTop > 4px
// 'page-has-tabs' → added to #main when the active page contains a tab bar
// CSS: topbar shadow only fires on is-scrolled + NOT page-has-tabs
//      tab bar shadow fires on is-scrolled (tab bar already covers topbar shadow)
function updateTabBarState() {
  var main = document.getElementById('main');
  if (!main) return;
  var activePageEl = document.getElementById('page-content');
  var hasTabBar = activePageEl &&
    activePageEl.querySelector('.btn-tab-bar, .tf-tab-bar, .icon-tab-bar');
  main.classList.toggle('page-has-tabs', !!hasTabBar);
}

(function() {
  var main = document.getElementById('main');
  if (!main) return;
  main.addEventListener('scroll', function() {
    main.classList.toggle('is-scrolled', main.scrollTop > 4);
  }, { passive: true });
})();

/* ===========================
   MODALS PAGE
   =========================== */
function switchModalTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.modal-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.modal-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('modal-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.modal-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

function openGsModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.style.display = 'flex';
  overlay.classList.remove('is-closing');
  void overlay.offsetWidth; // force reflow for animation
  overlay.classList.add('is-open');
  var dialog = overlay.querySelector('.gs-modal');
  if (dialog) { dialog.classList.remove('is-closing'); dialog.classList.add('is-open'); }
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(function() {
    var first = overlay.querySelector('input, select, textarea');
    if (first) first.focus();
    else { var close = overlay.querySelector('.gs-modal__close'); if (close) close.focus(); }
  });
  overlay._escHandler = function(e) { if (e.key === 'Escape') closeGsModal(id); };
  document.addEventListener('keydown', overlay._escHandler);
}

function closeGsModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.classList.add('is-closing');
  var dialog = overlay.querySelector('.gs-modal');
  if (dialog) { dialog.classList.remove('is-open'); dialog.classList.add('is-closing'); }
  if (overlay._escHandler) { document.removeEventListener('keydown', overlay._escHandler); overlay._escHandler = null; }
  setTimeout(function() {
    overlay.style.display = 'none';
    overlay.classList.remove('is-closing');
    if (dialog) dialog.classList.remove('is-closing');
    document.body.style.overflow = '';
  }, 160);
}

function closeGsModalOnOverlay(event, id) {
  if (event.target === event.currentTarget) closeGsModal(id);
}

// ── Inject CSS keyframes for the looping preview widget only ─────────
// The live demo uses Web Animations API (no stylesheet dependency).
// These keyframes are only needed by the static animation preview in HTML.
(function() {
  if (document.getElementById('gs-modal-kf')) return;
  var s = document.createElement('style');
  s.id = 'gs-modal-kf';
  s.textContent =
    '@keyframes gs-demo-modal-loop{' +
      '0%{opacity:0;transform:translateY(-24px);animation-timing-function:cubic-bezier(0,0,0.3,1)}' +
      '7.5%{opacity:1;transform:translateY(0)}' +
      '68.75%{opacity:1;transform:translateY(0);animation-timing-function:cubic-bezier(0.4,0,1,1)}' +
      '75%{opacity:0;transform:translateY(-24px)}' +
      '100%{opacity:0;transform:translateY(-24px)}' +
    '}' +
    '@keyframes gs-demo-overlay-loop{' +
      '0%{opacity:0;animation-timing-function:cubic-bezier(0,0,0.3,1)}' +
      '7.5%{opacity:1}68.75%{opacity:1;animation-timing-function:cubic-bezier(0.4,0,1,1)}' +
      '75%{opacity:0}100%{opacity:0}' +
    '}' +
    '@keyframes gs-tab-fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}' +
    '@keyframes gs-demo-drawer-loop{' +
      '0%{transform:translateX(100%);animation-timing-function:cubic-bezier(0,0,0.3,1)}' +
      '9.375%{transform:translateX(0)}' +
      '65.625%{transform:translateX(0);animation-timing-function:cubic-bezier(0.4,0,1,1)}' +
      '74.375%{transform:translateX(100%)}' +
      '100%{transform:translateX(100%)}' +
    '}' +
    '@keyframes gs-demo-drawer-bg-loop{' +
      '0%{opacity:0;animation-timing-function:cubic-bezier(0,0,0.3,1)}' +
      '9.375%{opacity:1}65.625%{opacity:1;animation-timing-function:cubic-bezier(0.4,0,1,1)}' +
      '74.375%{opacity:0}100%{opacity:0}' +
    '}';
  document.head.appendChild(s);
}());

// ── WAAPI modal animation helpers ────────────────────────────────────
// Using Web Animations API avoids all @keyframe resolution issues.
// The browser takes keyframe objects directly — no stylesheet lookup needed.
var _GS_EASING_IN  = 'cubic-bezier(0, 0, 0.3, 1)';
var _GS_EASING_OUT = 'cubic-bezier(0.4, 0, 1, 1)';

function _gsWapiAnimate(el, frames, duration, easing) {
  if (!el || !el.animate) return null;
  // Cancel any in-flight animation on this element
  if (el._gsAnim && el._gsAnim.playState !== 'finished') {
    try { el._gsAnim.cancel(); } catch (e) {}
  }
  el._gsAnim = el.animate(frames, { duration: duration, easing: easing, fill: 'forwards' });
  return el._gsAnim;
}

var _MODAL_IN_FRAMES    = [{ opacity: 0, transform: 'translateY(-24px)' }, { opacity: 1, transform: 'translateY(0)' }];
var _MODAL_OUT_FRAMES   = [{ opacity: 1, transform: 'translateY(0)'     }, { opacity: 0, transform: 'translateY(-24px)' }];
var _OVERLAY_IN_FRAMES  = [{ opacity: 0 }, { opacity: 1 }];
var _OVERLAY_OUT_FRAMES = [{ opacity: 1 }, { opacity: 0 }];

function openDemoModal() {
  var overlay   = document.getElementById('demo-overlay');
  var container = document.getElementById('demo-modal-container');
  var modal     = document.getElementById('demo-modal');
  var btn       = document.getElementById('demo-open-btn');
  if (!overlay || !container || !modal) return;
  if (btn) { btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; }
  overlay.style.display   = 'block';
  container.style.display = 'flex';
  _gsWapiAnimate(overlay, _OVERLAY_IN_FRAMES, 240, _GS_EASING_IN);
  _gsWapiAnimate(modal,   _MODAL_IN_FRAMES,   240, _GS_EASING_IN);
  setTimeout(function() {
    var first = modal.querySelector('input, select');
    if (first) first.focus({ preventScroll: true });
  }, 260);
}

function closeDemoModal() {
  var overlay   = document.getElementById('demo-overlay');
  var container = document.getElementById('demo-modal-container');
  var modal     = document.getElementById('demo-modal');
  var btn       = document.getElementById('demo-open-btn');
  if (!overlay || !container || !modal) return;
  _gsWapiAnimate(overlay, _OVERLAY_OUT_FRAMES, 200, _GS_EASING_OUT);
  var anim = _gsWapiAnimate(modal, _MODAL_OUT_FRAMES, 200, _GS_EASING_OUT);
  if (anim) {
    anim.onfinish = function() {
      overlay.style.display   = 'none';
      container.style.display = 'none';
      // Clear fill so element returns to natural state
      if (modal._gsAnim)   { modal._gsAnim.cancel();   modal._gsAnim   = null; }
      if (overlay._gsAnim) { overlay._gsAnim.cancel(); overlay._gsAnim = null; }
      if (btn) { btn.style.opacity = ''; btn.style.pointerEvents = ''; }
    };
  }
}

function openConfirmModal(type) {
  var overlay   = document.getElementById('confirm-overlay');
  var container = document.getElementById('confirm-modal-container');
  var modal     = document.getElementById('confirm-modal-' + type);
  if (!overlay || !container || !modal) return;
  ['delete','discard'].forEach(function(t) {
    var m = document.getElementById('confirm-modal-' + t);
    if (m) m.style.display = 'none';
  });
  overlay.style.display   = 'block';
  container.style.display = 'flex';
  modal.style.display     = 'block';
  _gsWapiAnimate(overlay, _OVERLAY_IN_FRAMES, 240, _GS_EASING_IN);
  _gsWapiAnimate(modal,   _MODAL_IN_FRAMES,   240, _GS_EASING_IN);
}

function closeConfirmModal() {
  var overlay   = document.getElementById('confirm-overlay');
  var container = document.getElementById('confirm-modal-container');
  if (!overlay || !container) return;
  var activeModal = container.querySelector('[id^="confirm-modal-"]:not([style*="display:none"]):not([style*="display: none"])');
  _gsWapiAnimate(overlay, _OVERLAY_OUT_FRAMES, 200, _GS_EASING_OUT);
  if (activeModal) {
    var anim = _gsWapiAnimate(activeModal, _MODAL_OUT_FRAMES, 200, _GS_EASING_OUT);
    if (anim) {
      anim.onfinish = function() {
        overlay.style.display   = 'none';
        container.style.display = 'none';
        if (activeModal) {
          activeModal.style.display = 'none';
          if (activeModal._gsAnim) { activeModal._gsAnim.cancel(); activeModal._gsAnim = null; }
        }
        if (overlay._gsAnim) { overlay._gsAnim.cancel(); overlay._gsAnim = null; }
      };
    }
  } else {
    setTimeout(function() {
      overlay.style.display = 'none'; container.style.display = 'none';
    }, 200);
  }
}

function switchDemoTab(tab) {
  ['details','permissions','history'].forEach(function(t) {
    var btn  = document.getElementById('demo-tab-' + t);
    var pane = document.getElementById('demo-content-' + t);
    if (!btn || !pane) return;
    var isActive = (t === tab);
    // Tab button styles
    btn.style.color       = isActive ? '#1852fe' : '#64748b';
    btn.style.fontWeight  = isActive ? '600'     : '400';
    btn.style.borderBottom= isActive ? '2px solid #1852fe' : '2px solid transparent';
    // Content pane: fade+slide in via WAAPI for active, instant hide for inactive
    if (isActive) {
      pane.style.display = 'block';
      _gsWapiAnimate(pane,
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        180, _GS_EASING_IN
      );
    } else {
      pane.style.display = 'none';
      if (pane._gsAnim) { try { pane._gsAnim.cancel(); } catch(e){} pane._gsAnim = null; }
    }
  });
}

function replayModalAnimPreview() {
  // Force-restart the looping CSS animations on the preview elements
  var overlay = document.getElementById('anim-prev-overlay');
  var modal   = document.getElementById('anim-prev-modal');
  [overlay, modal].forEach(function(el) {
    if (!el) return;
    var anim = el.style.animation;
    el.style.animation = 'none';
    void el.offsetWidth; // reflow
    el.style.animation = anim;
  });
}

function switchGsModalTab(btn, modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.querySelectorAll('.gs-mtab').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

function copyModalCode(id, btn) {
  var pre = document.getElementById(id);
  if (!pre) return;
  var text = pre.innerText || pre.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function(){ btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }
}

// ── BADGE ────────────────────────────────────────────────────────────────

function switchBadgeTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.badge-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.badge-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('badge-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.badge-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  if (tab === 'design') setTimeout(initBadgeDesignScrollSpy, 80);
  if (tab === 'code')   setTimeout(initBadgeCodeScrollSpy,   80);
}

function switchBadgeFw(cardId, fw) {
  var card = document.getElementById(cardId);
  if (!card) return;
  card.querySelectorAll('.fw-react, .fw-angular').forEach(function(el) {
    el.style.display = el.classList.contains('fw-' + fw) ? '' : 'none';
  });
  card.querySelectorAll('.fw-toggle-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.classList.contains('fw-toggle-' + fw));
  });
}

function copyBadgeCode(id, btn) { copyModalCode(id, btn); }

var _bdgDesignSpyCleanup = null;
function initBadgeDesignScrollSpy() {
  var main = document.getElementById('main');
  if (!main) return;
  if (_bdgDesignSpyCleanup) { _bdgDesignSpyCleanup(); _bdgDesignSpyCleanup = null; }
  var ids = ['bdg-s-types','bdg-s-anatomy','bdg-s-states','bdg-s-behavior','bdg-s-motion','bdg-s-responsive','bdg-s-a11y','bdg-s-tokens'];
  function update() {
    var mainRect = main.getBoundingClientRect();
    var threshold = mainRect.top + 120;
    var active = ids[0];
    for (var i = ids.length - 1; i >= 0; i--) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) { active = ids[i]; break; }
    }
    var nav = document.getElementById('bdg-design-qnav');
    if (!nav) return;
    nav.querySelectorAll('.code-qnav-link').forEach(function(b) {
      var m = (b.getAttribute('onclick') || '').match(/'([^']+)'/);
      b.classList.toggle('active', !!(m && m[1] === active));
    });
  }
  main.addEventListener('scroll', update, { passive: true });
  update();
  _bdgDesignSpyCleanup = function() { main.removeEventListener('scroll', update); };
}

var _bdgCodeSpyCleanup = null;
function initBadgeCodeScrollSpy() {
  var main = document.getElementById('main');
  if (!main) return;
  if (_bdgCodeSpyCleanup) { _bdgCodeSpyCleanup(); _bdgCodeSpyCleanup = null; }
  var ids = ['bdg-c-install','bdg-c-struct','bdg-c-token','bdg-c-scss-vars','bdg-c-scss','bdg-c-component','bdg-c-usage','bdg-c-props'];
  function update() {
    var mainRect = main.getBoundingClientRect();
    var threshold = mainRect.top + 120;
    var active = ids[0];
    for (var i = ids.length - 1; i >= 0; i--) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) { active = ids[i]; break; }
    }
    var nav = document.getElementById('bdg-code-qnav');
    if (!nav) return;
    nav.querySelectorAll('.code-qnav-link').forEach(function(b) {
      var m = (b.getAttribute('onclick') || '').match(/'([^']+)'/);
      b.classList.toggle('active', !!(m && m[1] === active));
    });
  }
  main.addEventListener('scroll', update, { passive: true });
  update();
  _bdgCodeSpyCleanup = function() { main.removeEventListener('scroll', update); };
}

// ── CHECKBOX ─────────────────────────────────────────────────────────────
function switchCheckboxTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.chk-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.chk-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('chk-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.chk-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  if (tab === 'design') setTimeout(initCheckboxDesignScrollSpy, 80);
}

var _chkDesignSpyCleanup = null;
function initCheckboxDesignScrollSpy() {
  var main = document.getElementById('main');
  if (!main) return;
  if (_chkDesignSpyCleanup) { _chkDesignSpyCleanup(); _chkDesignSpyCleanup = null; }
  var ids = ['chk-s-states','chk-s-anatomy','chk-s-behavior','chk-s-motion','chk-s-responsive','chk-s-a11y','chk-s-tokens'];
  function update() {
    var mainRect = main.getBoundingClientRect();
    var threshold = mainRect.top + 120;
    var active = ids[0];
    for (var i = ids.length - 1; i >= 0; i--) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) { active = ids[i]; break; }
    }
    var nav = document.getElementById('chk-design-qnav');
    if (!nav) return;
    nav.querySelectorAll('.code-qnav-link').forEach(function(b) {
      var m = (b.getAttribute('onclick') || '').match(/getElementById\('([^']+)'\)/);
      b.classList.toggle('active', !!(m && m[1] === active));
    });
  }
  main.addEventListener('scroll', update, { passive: true });
  update();
  _chkDesignSpyCleanup = function() { main.removeEventListener('scroll', update); };
}

// ── SLIDEOUT / DRAWER ────────────────────────────────────────────────────
// Drawer animation frames (right-to-left slide)
var _DRAWER_IN_FRAMES  = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }];
var _DRAWER_OUT_FRAMES = [{ transform: 'translateX(0)' },   { transform: 'translateX(100%)' }];

function switchSlideoutTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.slideout-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.slideout-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('slideout-pane-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.slideout-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

function openInlineDrawer() {
  var content = document.getElementById('sd-inline-content');
  var drawer  = document.getElementById('sd-inline-drawer');
  var btn     = document.getElementById('sd-inline-open-btn');
  if (!drawer || !content) return;
  drawer.style.display = 'flex';
  _gsWapiAnimate(drawer, _DRAWER_IN_FRAMES, 300, _GS_EASING_IN);
  content.style.transition = 'transform 300ms cubic-bezier(0, 0, 0.3, 1)';
  content.style.transform  = 'translateX(-300px)';
  if (btn) { btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; }
}

function closeInlineDrawer() {
  var content = document.getElementById('sd-inline-content');
  var drawer  = document.getElementById('sd-inline-drawer');
  var btn     = document.getElementById('sd-inline-open-btn');
  if (!drawer || !content) return;
  var anim = _gsWapiAnimate(drawer, _DRAWER_OUT_FRAMES, 280, _GS_EASING_OUT);
  content.style.transition = 'transform 280ms cubic-bezier(0.4, 0, 1, 1)';
  content.style.transform  = 'translateX(0)';
  if (anim) {
    anim.onfinish = function() {
      drawer.style.display = 'none';
      if (drawer._gsAnim) { drawer._gsAnim.cancel(); drawer._gsAnim = null; }
      if (btn) { btn.style.opacity = ''; btn.style.pointerEvents = ''; }
    };
  }
}

function openOverlayDrawer() {
  var backdrop = document.getElementById('sd-overlay-backdrop');
  var drawer   = document.getElementById('sd-overlay-drawer');
  var skeleton = document.getElementById('sd-overlay-skeleton');
  var content  = document.getElementById('sd-overlay-content');
  var btn      = document.getElementById('sd-overlay-open-btn');
  if (!backdrop || !drawer) return;
  backdrop.style.display = 'block';
  drawer.style.display   = 'flex';
  if (skeleton) { skeleton.style.display = 'block'; skeleton.style.opacity = '1'; }
  if (content)  { content.style.display  = 'none'; }
  if (btn) { btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; }
  _gsWapiAnimate(backdrop, _OVERLAY_IN_FRAMES, 240, _GS_EASING_IN);
  _gsWapiAnimate(drawer,   _DRAWER_IN_FRAMES,  300, _GS_EASING_IN);
  // Skeleton → content swap after 1.4s
  setTimeout(function() {
    if (!document.getElementById('sd-overlay-skeleton')) return;
    var skel = document.getElementById('sd-overlay-skeleton');
    var cont = document.getElementById('sd-overlay-content');
    if (skel) {
      var sAnim = _gsWapiAnimate(skel, _OVERLAY_OUT_FRAMES, 180, _GS_EASING_OUT);
      if (sAnim) {
        sAnim.onfinish = function() {
          skel.style.display = 'none';
          if (cont) {
            cont.style.display = 'block';
            _gsWapiAnimate(cont,
              [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
              220, _GS_EASING_IN
            );
          }
        };
      }
    }
  }, 1400);
}

function closeOverlayDrawer() {
  var backdrop = document.getElementById('sd-overlay-backdrop');
  var drawer   = document.getElementById('sd-overlay-drawer');
  var btn      = document.getElementById('sd-overlay-open-btn');
  if (!backdrop || !drawer) return;
  _gsWapiAnimate(backdrop, _OVERLAY_OUT_FRAMES, 200, _GS_EASING_OUT);
  var anim = _gsWapiAnimate(drawer, _DRAWER_OUT_FRAMES, 280, _GS_EASING_OUT);
  if (anim) {
    anim.onfinish = function() {
      backdrop.style.display = 'none';
      drawer.style.display   = 'none';
      if (drawer._gsAnim)   { drawer._gsAnim.cancel();   drawer._gsAnim   = null; }
      if (backdrop._gsAnim) { backdrop._gsAnim.cancel(); backdrop._gsAnim = null; }
      if (btn) { btn.style.opacity = ''; btn.style.pointerEvents = ''; }
    };
  }
}

function replayDrawerAnimPreview() {
  var bg  = document.getElementById('sd-anim-prev-bg');
  var drw = document.getElementById('sd-anim-prev-drawer');
  [bg, drw].forEach(function(el) {
    if (!el) return;
    var a = el.style.animation;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = a;
  });
}

function copySlideoutCode(id, btn) { copyModalCode(id, btn); }

// ── Code-tab live demo ──────────────────────────────────────────────────────
function cdOpenOverlay() {
  var overlay  = document.getElementById('cd-overlay');
  var backdrop = document.getElementById('cd-overlay-backdrop');
  var skel     = document.getElementById('cd-overlay-skel');
  var content  = document.getElementById('cd-overlay-content');
  if (!overlay || !backdrop) return;
  cdCloseInline();
  overlay.style.transform   = 'translateX(0)';
  backdrop.style.display    = 'block';
  backdrop.style.opacity    = '1';
  backdrop.style.pointerEvents = 'auto';
  if (skel)    { skel.style.display    = 'flex'; }
  if (content) { content.style.display = 'none'; }
  setTimeout(function() {
    var s = document.getElementById('cd-overlay-skel');
    var c = document.getElementById('cd-overlay-content');
    if (s) s.style.display = 'none';
    if (c) { c.style.display = 'flex'; }
  }, 1400);
}

function cdCloseOverlay() {
  var overlay  = document.getElementById('cd-overlay');
  var backdrop = document.getElementById('cd-overlay-backdrop');
  if (!overlay || !backdrop) return;
  overlay.style.transform      = 'translateX(calc(100% + 12px))';
  backdrop.style.opacity       = '0';
  backdrop.style.pointerEvents = 'none';
  setTimeout(function(){ backdrop.style.display = 'none'; }, 300);
}

function cdOpenInline() {
  var inline = document.getElementById('cd-inline');
  if (!inline) return;
  cdCloseOverlay();
  inline.style.width       = '280px';
  inline.style.borderLeft  = '1px solid #e2e8f0';
}

function cdCloseInline() {
  var inline = document.getElementById('cd-inline');
  if (!inline) return;
  inline.style.width      = '0';
  inline.style.borderLeft = 'none';
}

// ── Behaviour demos (modal design tab) ──
function beh1Input() {
  var name = document.getElementById('beh1-name');
  var imo  = document.getElementById('beh1-imo');
  var btn  = document.getElementById('beh1-submit');
  if (!name || !imo || !btn) return;
  var hasAny = name.value.trim().length > 0 || imo.value.trim().length > 0;
  btn.disabled = !hasAny;
  if (name.getAttribute('data-v')) {
    var ne = document.getElementById('beh1-name-err');
    if (ne) ne.style.display = name.value.trim() ? 'none' : 'block';
    name.style.borderColor = name.value.trim() ? '#e2e8f0' : '#dc2626';
  }
  if (imo.getAttribute('data-v')) {
    var ie = document.getElementById('beh1-imo-err');
    if (ie) ie.style.display = imo.value.trim() ? 'none' : 'block';
    imo.style.borderColor = imo.value.trim() ? '#e2e8f0' : '#dc2626';
  }
}
function beh1Submit() {
  var name    = document.getElementById('beh1-name');
  var imo     = document.getElementById('beh1-imo');
  var nameErr = document.getElementById('beh1-name-err');
  var imoErr  = document.getElementById('beh1-imo-err');
  var banner  = document.getElementById('beh1-banner');
  var success = document.getElementById('beh1-success');
  if (!name || !imo) return;
  name.setAttribute('data-v', '1');
  imo.setAttribute('data-v', '1');
  var nameOk = name.value.trim().length > 0;
  var imoOk  = imo.value.trim().length > 0;
  if (nameErr) nameErr.style.display = nameOk ? 'none' : 'block';
  if (imoErr)  imoErr.style.display  = imoOk  ? 'none' : 'block';
  name.style.borderColor = nameOk ? '#e2e8f0' : '#dc2626';
  imo.style.borderColor  = imoOk  ? '#e2e8f0' : '#dc2626';
  if (!nameOk || !imoOk) {
    if (banner) banner.style.display = 'block';
    return;
  }
  if (banner) banner.style.display = 'none';
  if (success) success.style.display = 'flex';
}
function beh1Reset() {
  ['beh1-name', 'beh1-imo'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.value = ''; el.removeAttribute('data-v'); el.style.borderColor = '#e2e8f0'; }
  });
  ['beh1-name-err', 'beh1-imo-err', 'beh1-banner'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var success = document.getElementById('beh1-success');
  if (success) success.style.display = 'none';
  var btn = document.getElementById('beh1-submit');
  if (btn) btn.disabled = true;
}

function beh2Input() {
  var f     = document.getElementById('beh2-field');
  var badge = document.getElementById('beh2-dirty-badge');
  window._beh2dirty = f && f.value.trim().length > 0;
  if (badge) badge.style.display = window._beh2dirty ? 'inline-flex' : 'none';
}
function beh2Cancel() {
  if (window._beh2dirty) {
    var c = document.getElementById('beh2-confirm');
    if (c) { c.style.display = 'flex'; }
  } else {
    beh2ConfirmDiscard();
  }
}
function beh2Close() { beh2Cancel(); }
function beh2KeepEditing() {
  var c = document.getElementById('beh2-confirm');
  if (c) c.style.display = 'none';
}
function beh2ConfirmDiscard() {
  var f = document.getElementById('beh2-field');
  if (f) f.value = '';
  window._beh2dirty = false;
  var badge = document.getElementById('beh2-dirty-badge');
  if (badge) badge.style.display = 'none';
  var c = document.getElementById('beh2-confirm');
  if (c) c.style.display = 'none';
}

// ── CHIPS ─────────────────────────────────────────────────────────────────────
function switchChipsTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.chip-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.chip-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('chip-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.chip-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── BREADCRUMB ────────────────────────────────────────────────────────────────
function switchBreadcrumbTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.bc-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.bc-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('bc-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.bc-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── RADIO BUTTON ─────────────────────────────────────────────────────────────
function switchRadioTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.rb-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.rb-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('rb-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.rb-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── TOASTS ───────────────────────────────────────────────────────────────

// ── ACCORDION ────────────────────────────────────────────────────────────────
function switchAccordionTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.acc-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.acc-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('acc-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.acc-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── TOOLTIP ──────────────────────────────────────────────────────────────────
function switchTooltipTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.tt-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.tt-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('tt-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.tt-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── SIDE NAVIGATION ──────────────────────────────────────────────────────────
function switchSidenavTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.sidenav-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.sidenav-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('sidenav-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.sidenav-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// Expand sidebar: add is-expanded class (triggers width + label transitions)
// GPU-promoted via will-change:width + translateZ(0) in CSS
function gsSidenavExpand(id) {
  var nav      = document.getElementById(id);
  var backdrop = document.getElementById('snav-backdrop');
  if (nav)      nav.classList.add('is-expanded');
  if (backdrop) backdrop.classList.add('is-open');
}

// Collapse sidebar: remove is-expanded
function gsSidenavCollapse(id) {
  var nav      = document.getElementById(id);
  var backdrop = document.getElementById('snav-backdrop');
  if (nav)      nav.classList.remove('is-expanded');
  if (backdrop) backdrop.classList.remove('is-open');
}

// Select a nav item — deselect all siblings in the same sidebar
function gsSidenavSelect(btn, navId) {
  var nav = navId ? document.getElementById(navId) : btn.closest('.gs-snav');
  if (!nav) return;
  nav.querySelectorAll('.gs-snav-item').forEach(function(b) {
    b.classList.remove('gs-snav-item--active');
    b.removeAttribute('aria-current');
  });
  btn.classList.add('gs-snav-item--active');
  btn.setAttribute('aria-current', 'page');
}

// Legacy aliases kept for compatibility
function gsSidenavRailToggle()    { gsSidenavExpand('snav-demo'); }
function gsSidenavRailSelect(btn) { gsSidenavSelect(btn, 'snav-demo'); }
function gsSidenavPanelSelect(btn){ gsSidenavSelect(btn, 'snav-demo'); }

// Toggle accordion group — accordion=true closes siblings first
function gsSidenavToggleGroup(btn, accordion) {
  var group = btn.closest('.gs-snav-group');
  if (!group) return;
  var isOpen = group.classList.contains('is-open');
  if (accordion !== false) {
    // Accordion mode: close all other open groups at the same level
    var parent = group.parentElement;
    if (parent) {
      parent.querySelectorAll(':scope > .gs-snav-group.is-open').forEach(function(g) {
        if (g !== group) {
          g.classList.remove('is-open');
          var ch = g.querySelector('.gs-snav-chevron');
          if (ch) ch.style.transform = '';
        }
      });
    }
  }
  group.classList.toggle('is-open', !isOpen);
  var chevron = btn.querySelector('.gs-snav-chevron');
  if (chevron) chevron.style.transform = !isOpen ? 'rotate(90deg)' : '';
}

// Open/close the demo sidebar overlay
function gsSidenavOpen(id) {
  var overlay = document.getElementById(id + '-overlay');
  var drawer  = document.getElementById(id + '-drawer');
  if (!overlay || !drawer) return;
  overlay.style.display = 'block';
  drawer.style.display  = 'flex';
  requestAnimationFrame(function() {
    overlay.style.opacity = '1';
    drawer.style.transform = 'translateX(0)';
  });
  document.getElementById(id + '-close-btn') && document.getElementById(id + '-close-btn').focus();
}
function gsSidenavClose(id) {
  var overlay = document.getElementById(id + '-overlay');
  var drawer  = document.getElementById(id + '-drawer');
  if (!overlay || !drawer) return;
  overlay.style.opacity = '0';
  drawer.style.transform = 'translateX(-100%)';
  setTimeout(function() {
    overlay.style.display = 'none';
    drawer.style.display  = 'none';
  }, 280);
}
function gsSidenavNavItem(btn, groupId) {
  var group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.gs-snav-item').forEach(function(b) {
    b.classList.remove('gs-snav-item--active');
    b.removeAttribute('aria-current');
  });
  btn.classList.add('gs-snav-item--active');
  btn.setAttribute('aria-current', 'page');
}

// ── POPOVER ──────────────────────────────────────────────────────────────────
function switchPopoverTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.pop-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.pop-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('pop-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.pop-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// Open a popover by ID
function gsPopoverOpen(triggerId, popId, placement) {
  var trigger = document.getElementById(triggerId);
  var pop     = document.getElementById(popId);
  if (!pop || !trigger) return;
  // Close all other popovers first
  document.querySelectorAll('.gs-popover.is-open').forEach(function(p) {
    if (p !== pop) gsPopoverClose(p.id);
  });
  pop.classList.add('is-open');
  pop.setAttribute('aria-hidden', 'false');
  trigger.setAttribute('aria-expanded', 'true');
}
function gsPopoverClose(popId) {
  var pop = document.getElementById(popId);
  if (!pop) return;
  pop.classList.remove('is-open');
  pop.setAttribute('aria-hidden', 'true');
  // reset trigger
  var triggerId = pop.getAttribute('data-trigger');
  var trigger = triggerId ? document.getElementById(triggerId) : null;
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}
function gsPopoverToggle(triggerId, popId) {
  var pop = document.getElementById(popId);
  if (!pop) return;
  if (pop.classList.contains('is-open')) gsPopoverClose(popId);
  else gsPopoverOpen(triggerId, popId);
}
// Close any open popover when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.closest('.gs-popover') || e.target.closest('[data-popover-trigger]')) return;
  document.querySelectorAll('.gs-popover.is-open').forEach(function(p) { gsPopoverClose(p.id); });
});

// ── CALENDAR ─────────────────────────────────────────────────────────────────
function switchCalendarTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.cal-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.cal-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('cal-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.cal-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  if (tab === 'design' && typeof gsCalInit === 'function') {
    var now = new Date(); var y=now.getFullYear(), m=now.getMonth();
    setTimeout(function() {
      gsCalInit('cal-ov-1',   y, m);
      gsCalInit('cal-ov-2',   y, m);
      var rm=m+1>11?0:m+1, ry=m+1>11?y+1:y;
      gsCalInit('cal-range-l',y,  m,  {range:true});
      gsCalInit('cal-range-r',ry, rm, {range:true});
      if(typeof gsCalLinkRange==='function') gsCalLinkRange('cal-range-l','cal-range-r');
      gsCalInit('cal-v-std',  y, m);
      gsCalInit('cal-v-full', y, m);
      gsCalInit('cal-v-time', y, m, {time:true});
      gsCalInit('cal-s-mon',  y, m); gsCalSetMode('cal-s-mon','months');
      gsCalInit('cal-s-yr',   y, m); gsCalSetMode('cal-s-yr','years');
    }, 30);
  }
}

// ── SEGMENTED BUTTON ─────────────────────────────────────────────────────────
function switchSegmentedTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.seg-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.seg-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('seg-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.seg-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// Segmented button demo — selects clicked segment and slides the pill
function gsSelectSegment(btn) {
  var group = btn.closest('.gs-seggroup');
  if (!group) return;
  group.querySelectorAll('.gs-segdemo-btn').forEach(function(b) {
    b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    b.style.removeProperty('background');
    b.style.removeProperty('color');
    var ic = b.querySelector('.gs-segdemo-icon svg');
    if (ic) ic.style.removeProperty('filter');
    var badge = b.querySelector('.gs-segdemo-badge');
    if (badge) { badge.style.removeProperty('background'); badge.style.removeProperty('color'); }
  });
  _gsSegPillMove(group, btn);
}

// ── Sliding pill helpers (mirrors _gsTabInkMove pattern) ─────────────────────
function _gsSegPillPos(pill, btn) {
  pill.style.left   = btn.offsetLeft   + 'px';
  pill.style.top    = btn.offsetTop    + 'px';
  pill.style.width  = btn.offsetWidth  + 'px';
  pill.style.height = btn.offsetHeight + 'px';
}

function _gsSegPillMove(group, activeBtn) {
  var pill = group.querySelector('.gs-seg-pill');
  if (!pill) {
    pill = document.createElement('div');
    pill.className = 'gs-seg-pill';
    pill.style.transition = 'none';   // no animation on first paint
    group.insertBefore(pill, group.firstChild);
    _gsSegPillPos(pill, activeBtn);
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { pill.style.transition = ''; });
    });
  } else {
    _gsSegPillPos(pill, activeBtn);   // CSS transition handles the slide
  }
}

function _gsSegInitAll() {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.gs-seggroup').forEach(function(group) {
    var active = group.querySelector('.gs-segdemo-btn[aria-selected="true"]');
    if (active) _gsSegPillMove(group, active);
  });
}

// ── TOGGLES & SWITCHES ───────────────────────────────────────────────────────
function switchTogglesTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.tog-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.tog-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('tog-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.tog-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── TOASTS ───────────────────────────────────────────────────────────────────
function switchToastTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.toast-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.toast-tab-pane').forEach(function(p){
    p.classList.remove('active');
    p.style.display = 'none';
  });
  var pane = document.getElementById('toast-tab-' + tab);
  if (pane) { pane.classList.add('active'); pane.style.display = ''; }
  var btn = page.querySelector('.toast-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

(function() {
  var _toastSeq = 0;
  var _toastTimers = {};

  var TOAST_CONFIGS = {
    success:      { title: 'Successfully toasted',            desc: 'Your changes have been saved.',         dismissible: false },
    error:        { title: 'That did not work',               desc: 'Please try again or contact support.',  dismissible: false },
    warning:      { title: 'Session expired. Please sign in', desc: 'Session expired on security purpose.',  dismissible: false },
    notification: { title: 'You have 3 new alerts',           desc: 'Alert details in one line message...',  dismissible: false },
    neutral:      { title: 'Items Deleted',                   desc: 'Items Deleted Successfully.',            dismissible: true  },
    loading:      { title: 'Loading...',                      desc: null,                                    dismissible: false, duration: 0 },
    blank:        { title: 'Blank Toast',                     desc: null,                                    dismissible: false },
  };

  var TOAST_ICONS = {
    success:      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="var(--prim-green-700)"/><path d="M7.5 12.5l3 3 6-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error:        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="var(--prim-red-600)"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    warning:      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="var(--prim-orange-600)"/><line x1="12" y1="9" x2="12" y2="13" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="#fff"/></svg>',
    notification: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="var(--prim-blue-900)"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--prim-blue-900)" stroke-width="2" stroke-linecap="round"/><circle cx="17" cy="6" r="3" fill="var(--prim-red-500)"/></svg>',
    neutral:      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="var(--prim-grey-400)" stroke-width="2" stroke-linecap="round"/><path d="M19 6l-1 14H6L5 6" stroke="var(--prim-grey-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v6M14 11v6" stroke="var(--prim-grey-400)" stroke-width="2" stroke-linecap="round"/><path d="M9 6V4h6v2" stroke="var(--prim-grey-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    loading:      '<svg class="toast__spinner" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="var(--prim-grey-200)" stroke-width="2.5"/><path d="M12 3a9 9 0 0 1 9 9" stroke="var(--prim-grey-600)" stroke-width="2.5" stroke-linecap="round"/></svg>',
    blank:        null,
  };

  var CLOSE_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

  function getOrCreateContainer() {
    var c = document.getElementById('toast-live-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toast-live-container';
      c.setAttribute('aria-label', 'Notifications');
      c.setAttribute('role', 'region');
      document.body.appendChild(c);
    }
    return c;
  }

  function dismissToastLive(id) {
    clearTimeout(_toastTimers[id]);
    delete _toastTimers[id];
    var el = document.getElementById('toast-live-' + id);
    if (!el) return;
    el.classList.add('is-exiting');
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 240);
  }

  function showToastLive(variant, overrides) {
    var id = ++_toastSeq;
    var cfg = Object.assign({}, TOAST_CONFIGS[variant] || {}, overrides || {});
    var iconHtml = TOAST_ICONS[variant] ? '<span class="toast__icon">' + TOAST_ICONS[variant] + '</span>' : '';
    var descHtml = cfg.desc ? '<span class="toast__desc">' + cfg.desc + '</span>' : '';
    var dismissHtml = '';
    if (cfg.dismissible) {
      dismissHtml = '<button class="toast__dismiss" aria-label="Dismiss" onclick="(function(e){var t=document.getElementById(\'toast-live-' + id + '\');if(t){t.classList.add(\'is-exiting\');setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t)},240)}})()">' + CLOSE_SVG + '</button>';
    }

    var el = document.createElement('div');
    el.id = 'toast-live-' + id;
    el.className = 'toast-live toast--' + variant;
    el.setAttribute('role', (variant === 'error' || variant === 'warning') ? 'alert' : 'status');
    el.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');
    el.innerHTML = iconHtml + '<div class="toast__content"><span class="toast__title">' + cfg.title + '</span>' + descHtml + '</div>' + dismissHtml;

    var container = getOrCreateContainer();
    container.insertBefore(el, container.firstChild);

    var dur = ('duration' in cfg) ? cfg.duration : 4000;
    if (dur > 0) {
      _toastTimers[id] = setTimeout(function() { dismissToastLive(id); }, dur);
    }
    return id;
  }

  window.toastDemo = function(variant) { showToastLive(variant); };

  window.toastDemoStack = function() {
    showToastLive('warning',      { title: 'Session expired',  desc: 'Please sign in again.' });
    setTimeout(function() { showToastLive('success',      { title: 'File uploaded',    desc: 'report_Q2.pdf is ready.' }); }, 300);
    setTimeout(function() { showToastLive('notification', { title: '3 new alerts',     desc: 'Review pending items.' }); }, 600);
  };
})();

// ── DEMO INTERACTIONS (shared across component pages) ────────────────────────

// Toggle Switch — click to toggle on/off
function gsToggleSwitchDemo(btn) {
  var isOn = btn.getAttribute('data-on') === '1';
  var newOn = isOn ? '0' : '1';
  btn.setAttribute('data-on', newOn);
  btn.setAttribute('aria-checked', newOn === '1' ? 'true' : 'false');
  var thumb = btn.querySelector('.gs-sdemo-thumb');
  var travel = parseInt(btn.getAttribute('data-travel') || '20', 10);
  if (newOn === '1') {
    btn.style.background = 'var(--color-brand, #1852fe)';
    if (thumb) thumb.style.transform = 'translateX(' + travel + 'px)';
  } else {
    btn.style.background = 'var(--prim-grey-100, #e2e8f0)';
    if (thumb) thumb.style.transform = '';
  }
  var label = btn.nextElementSibling;
  if (label && label.classList.contains('gs-sdemo-label')) {
    label.style.color    = newOn === '1' ? 'var(--color-text-default, #1e293b)' : 'var(--color-text-secondary, #64748b)';
    label.style.fontWeight = newOn === '1' ? '600' : '500';
  }
}

// Accordion — click header to expand/collapse; data-acc-mode="single" enforces one-open
function gsToggleAccordionDemo(btn) {
  var item    = btn.closest('.gs-ademo-item') || btn.parentElement;
  var panel   = item.querySelector('.gs-ademo-body');
  var chevron = btn.querySelector('.gs-ademo-chevron');
  var isOpen  = btn.getAttribute('aria-expanded') === 'true';
  var parent  = item.parentElement;

  // Collapse helper with Carbon motion
  function collapsePanel(sp, sc, sb) {
    if (!sp) return;
    sp.style.overflow   = 'hidden';
    sp.style.height     = sp.scrollHeight + 'px';
    sp.style.transition = 'height 110ms cubic-bezier(0.2,0,1,0.9)';
    if (sb) { sb.setAttribute('aria-expanded','false'); sb.style.background = ''; }
    if (sc) sc.style.transform = '';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        sp.style.height = '0';
        sp.addEventListener('transitionend', function done() {
          sp.style.display    = 'none';
          sp.style.height     = '';
          sp.style.overflow   = '';
          sp.style.transition = '';
          sp.removeEventListener('transitionend', done);
        }, { once: true });
      });
    });
  }

  // Single-open: collapse siblings first
  if (parent && parent.getAttribute('data-acc-mode') === 'single') {
    parent.querySelectorAll('.gs-ademo-item').forEach(function(sib) {
      if (sib === item) return;
      var sibBtn = sib.querySelector('.gs-ademo-hdr');
      if (!sibBtn || sibBtn.getAttribute('aria-expanded') !== 'true') return;
      collapsePanel(
        sib.querySelector('.gs-ademo-body'),
        sibBtn.querySelector('.gs-ademo-chevron'),
        sibBtn
      );
    });
  }

  var newOpen = !isOpen;
  btn.setAttribute('aria-expanded', newOpen ? 'true' : 'false');
  // Expanded header = white (not brand-subtle) — per design spec
  btn.style.background = '';
  if (chevron) chevron.style.transform = newOpen ? 'rotate(180deg)' : '';

  if (panel) {
    if (newOpen) {
      // Expand — Carbon productive-expand easing
      panel.style.display    = '';
      panel.style.overflow   = 'hidden';
      panel.style.height     = '0';
      panel.style.transition = 'height 110ms cubic-bezier(0,0,0.38,0.9)';
      requestAnimationFrame(function() {
        panel.style.height = panel.scrollHeight + 'px';
        panel.addEventListener('transitionend', function done() {
          panel.style.height     = 'auto';
          panel.style.overflow   = '';
          panel.style.transition = '';
          panel.removeEventListener('transitionend', done);
        }, { once: true });
      });
    } else {
      collapsePanel(panel, null, null);
    }
  }
}
// ── Get Started tab switching ─────────────────────────────────────────────────
function switchGetStartedTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.gs-start-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.gs-start-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('gs-start-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.gs-start-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── Banners tab switching ────────────────────────────────────────────────────
function switchBannersTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.bnr-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.bnr-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('bnr-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.bnr-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// Banner dismiss helper — Ant Design smooth unmount (height→0, opacity→0, 300ms ease)
// Supports demo-group reload: add data-demo-group="id" to the container wrapper
function gsBannerDismiss(btn) {
  var el = btn.closest('.gs-alert, .gs-banner');
  if (!el) return;
  // Save group reference before animating
  var group = el.closest('[data-demo-group]');
  var h = el.offsetHeight;
  el.style.overflow   = 'hidden';
  el.style.height     = h + 'px';
  el.offsetHeight; // force reflow
  el.style.transition = 'height 300ms ease, opacity 300ms ease, padding 300ms ease, margin 300ms ease';
  requestAnimationFrame(function() {
    el.style.height  = '0';
    el.style.opacity = '0';
    el.style.padding = '0';
    el.style.margin  = '0';
  });
  setTimeout(function() {
    el.remove();
    // Check if group is now empty → show reload button
    if (group) _bnrCheckGroupEmpty(group);
  }, 310);
}

function _bnrCheckGroupEmpty(group) {
  var remaining = group.querySelectorAll('.gs-alert, .gs-banner');
  if (remaining.length > 0) return;
  // Remove any existing reload btn
  var old = group.querySelector('.bnr-reload-btn');
  if (old) old.remove();
  // Create reload button
  var btn = document.createElement('button');
  btn.className = 'bnr-reload-btn';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Reset examples';
  btn.onclick = function() {
    var orig = group.getAttribute('data-original-html');
    if (orig) {
      group.innerHTML = orig;
      group.setAttribute('data-original-html', orig); // restore attribute
    }
  };
  group.appendChild(btn);
}

// Size switcher for info-banner demo groups
function bnrSwitchSize(size) {
  var page = document.getElementById('page-content');
  if (!page) return;
  // Toggle active on size buttons
  page.querySelectorAll('.bnr-size-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-size') === size);
  });
  // Switch all gs-alert size classes in the demo group
  page.querySelectorAll('[data-demo-group="info-variants"] .gs-alert').forEach(function(a) {
    a.classList.remove('gs-alert--lg', 'gs-alert--sm');
    a.classList.add('gs-alert--' + size);
  });
}

// ── Scrollbar tab switching ──────────────────────────────────────────────────
function switchScrollTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.scr-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.scr-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('scr-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.scr-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// Scrollbar hover-expand + show:
// Uses CSS custom property injection (var() cascades into ::-webkit-scrollbar pseudo-elements,
// unlike :hover which doesn't reliably cascade in modern Chrome).
function gsScrollInitHover() {
  var page = document.getElementById('page-content') || document;
  page.querySelectorAll('.gs-scroll').forEach(function(el) {
    if (el.dataset.scrollInit) return;
    el.dataset.scrollInit = '1';
    el.addEventListener('mouseenter', function() {
      // Show scrollbar: set CSS vars that drive the scrollbar thumb + track
      el.style.setProperty('--scroll-handle',       '#94a3b8');
      el.style.setProperty('--scroll-track-active', 'rgba(226,232,240,0.35)'); /* show subtle groove */
      // Expand width (can't be done via CSS transition alone)
      el.classList.add('gs-scroll--hover');
    });
    el.addEventListener('mouseleave', function() {
      // Hide scrollbar
      el.style.setProperty('--scroll-handle',       'transparent');
      el.style.setProperty('--scroll-track-active', 'transparent');
      el.classList.remove('gs-scroll--hover');
    });
  });
}

// ── Slider tab switching ──────────────────────────────────────────────────────
function switchSliderTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.sld-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.sld-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('sld-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.sld-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── Email tab switching ───────────────────────────────────────────────────────
function switchEmailTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.eml-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.eml-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('eml-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.eml-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── Slider update — fills track via linear-gradient ──────────────────────────
function gsSliderUpdate(input) {
  var min = parseFloat(input.min) || 0;
  var max = parseFloat(input.max) || 100;
  var val = parseFloat(input.value);
  var pct = ((val - min) / (max - min)) * 100;
  // Update fill div if present (preferred over gradient hack)
  var wrap = input.closest('.gs-slider__track-wrap');
  if (wrap) {
    var fill = wrap.querySelector('.gs-slider__fill:not(.gs-slider__fill--range)');
    if (fill) fill.style.width = pct + '%';
    var tip = wrap.querySelector('.gs-slider__tip:not(.gs-slider__tip-lo):not(.gs-slider__tip-hi)');
    if (tip) { tip.textContent = Math.round(val); tip.style.left = pct + '%'; tip.classList.add('is-visible'); }
  }
}

// Show tooltip for a specific handle
function gsSliderShowTip(input) {
  var wrap = input.closest('.gs-slider__track-wrap');
  if (!wrap) return;
  var tipClass = input.classList.contains('gs-slider__input--lo') ? '.gs-slider__tip-lo'
               : input.classList.contains('gs-slider__input--hi') ? '.gs-slider__tip-hi'
               : '.gs-slider__tip:not(.gs-slider__tip-lo):not(.gs-slider__tip-hi)';
  var tip = wrap.querySelector(tipClass);
  if (tip) tip.classList.add('is-visible');
}

// Hide all tooltips in this track-wrap
function gsSliderHideTip(input) {
  var wrap = input.closest('.gs-slider__track-wrap');
  if (!wrap) return;
  wrap.querySelectorAll('.gs-slider__tip, .gs-slider__tip-lo, .gs-slider__tip-hi').forEach(function(t) {
    t.classList.remove('is-visible');
  });
}

// Range slider update
function gsRangeUpdate(container, skipFieldSync) {
  var lo = container.querySelector('.gs-slider__input--lo');
  var hi = container.querySelector('.gs-slider__input--hi');
  if (!lo || !hi) return;
  var min  = parseFloat(lo.min)  || 0;
  var max  = parseFloat(lo.max)  || 100;
  var step = parseFloat(lo.step) || 1;
  var loV  = parseFloat(lo.value);
  var hiV  = parseFloat(hi.value);
  // Prevent handles crossing
  if (loV >= hiV) {
    if (document.activeElement === lo) { loV = hiV - step; lo.value = loV; }
    else                               { hiV = loV + step; hi.value = hiV; }
  }
  var loPct = ((loV - min) / (max - min)) * 100;
  var hiPct = ((hiV - min) / (max - min)) * 100;
  // Fix z-index: lo handle on top when at minimum so it can be dragged left
  lo.style.zIndex = (loPct <= 0) ? 4 : 2;
  // Update range fill bar (left + width)
  var fill = container.querySelector('.gs-slider__fill--range');
  if (fill) { fill.style.left = loPct + '%'; fill.style.width = (hiPct - loPct) + '%'; }
  // Update tooltips position + value
  var tipLo = container.querySelector('.gs-slider__tip-lo');
  var tipHi = container.querySelector('.gs-slider__tip-hi');
  if (tipLo) { tipLo.textContent = Math.round(loV); tipLo.style.left = loPct + '%'; }
  if (tipHi) { tipHi.textContent = Math.round(hiV); tipHi.style.left = hiPct + '%'; }
  // Sync number input fields — skip when called FROM a field (avoids overwriting mid-type)
  if (!skipFieldSync) {
    var inpLo = container.querySelector('.gs-slider__input-field--lo');
    var inpHi = container.querySelector('.gs-slider__input-field--hi');
    if (inpLo && document.activeElement !== inpLo) inpLo.value = Math.round(loV);
    if (inpHi && document.activeElement !== inpHi) inpHi.value = Math.round(hiV);
  }
}

// Sync range slider from typed input fields
function gsRangeInputField(container, which, rawVal) {
  var lo = container.querySelector('.gs-slider__input--lo');
  var hi = container.querySelector('.gs-slider__input--hi');
  if (!lo || !hi) return;
  var min  = parseFloat(lo.min)  || 0;
  var max  = parseFloat(lo.max)  || 100;
  var step = parseFloat(lo.step) || 1;
  var parsed = parseFloat(rawVal);
  if (isNaN(parsed)) return; // user mid-type (empty / partial) — do nothing
  var val = Math.max(min, Math.min(max, parsed));
  if (which === 'lo') {
    val = Math.min(val, parseFloat(hi.value) - step);
    lo.value = val;
  } else {
    val = Math.max(val, parseFloat(lo.value) + step);
    hi.value = val;
  }
  gsRangeUpdate(container, true); // true = skip field sync so active field keeps focus
}

// Email modal helpers
function gsEmailOpen(id) {
  var modal = document.getElementById(id);
  if (modal) { modal.style.display = 'flex'; gsEmailInit(modal); }
}
function gsEmailClose(id) {
  var modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}
function gsEmailInit(modal) {
  // Chip input init
  modal.querySelectorAll('.gs-email-chip-input').forEach(function(inp) {
    if (inp.dataset.emailInit) return;
    inp.dataset.emailInit = '1';
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); gsEmailAddChip(inp); }
      if (e.key === 'Backspace' && !inp.value) {
        var chips = inp.closest('.gs-email-chips');
        var last = chips && chips.querySelector('.gs-chip:last-of-type');
        if (last) last.remove();
      }
    });
    inp.addEventListener('blur', function() { if (inp.value.trim()) gsEmailAddChip(inp); });
  });
  // +Cc / +Bcc toggles
  modal.querySelectorAll('[data-email-toggle]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-email-toggle');
      var row = modal.querySelector('#' + target);
      if (row) { row.style.display = row.style.display === 'none' ? '' : 'none'; btn.style.display = 'none'; }
    });
  });
  // Drag-drop
  var body = modal.querySelector('.gs-email-body');
  var dropZone = modal.querySelector('.gs-email-drop');
  if (body && dropZone) {
    body.addEventListener('dragover', function(e) { e.preventDefault(); dropZone.style.display = ''; body.style.display = 'none'; });
    dropZone.addEventListener('dragleave', function() { dropZone.style.display = 'none'; body.style.display = ''; });
    dropZone.addEventListener('drop', function(e) {
      e.preventDefault();
      dropZone.style.display = 'none'; body.style.display = '';
      if (e.dataTransfer.files) gsEmailAddFiles(modal, e.dataTransfer.files);
    });
  }
  // Toolbar
  modal.querySelectorAll('[data-cmd]').forEach(function(btn) {
    btn.addEventListener('mousedown', function(e) { e.preventDefault(); document.execCommand(btn.getAttribute('data-cmd'), false, null); });
  });
  // Attach file
  var attachBtn = modal.querySelector('[data-attach]');
  var fileInput = modal.querySelector('.gs-email-file-input');
  if (attachBtn && fileInput) {
    attachBtn.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', function() { gsEmailAddFiles(modal, fileInput.files); fileInput.value = ''; });
  }
  // Send
  var sendBtn = modal.querySelector('[data-email-send]');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      var hasError = modal.querySelector('.gs-chip--error');
      var banner = modal.querySelector('.gs-email-error-banner');
      if (hasError) { if (banner) banner.style.display = ''; return; }
      if (banner) banner.style.display = 'none';
      gsEmailClose(modal.id);
    });
  }
}
function gsEmailAddChip(input) {
  var val = input.value.trim().replace(/,$/, '');
  if (!val) return;
  var isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
  var chips = input.closest('.gs-email-chips');
  if (!chips) return;
  var chip = document.createElement('span');
  chip.className = 'gs-chip' + (isValid ? '' : ' gs-chip--error');
  chip.innerHTML = (isValid
    ? '<span class="gs-chip__avatar"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></span>'
    : '<span class="gs-chip__warn"><svg width="12" height="12" viewBox="0 0 24 24" fill="#dc2625"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2"/><circle cx="12" cy="17" r="1" fill="white"/></svg></span>')
    + '<span class="gs-chip__label">' + val + '</span>'
    + '<button class="gs-chip__close" onclick="this.parentElement.remove()" aria-label="Remove">×</button>';
  chips.insertBefore(chip, input);
  input.value = '';
}
function gsEmailAddFiles(modal, files) {
  var attachList = modal.querySelector('.gs-email-attachments');
  if (!attachList) return;
  attachList.style.display = '';
  Array.from(files).forEach(function(f) {
    var chip = document.createElement('span');
    chip.className = 'gs-attach-chip';
    chip.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
      + '<span>' + f.name + '</span>'
      + '<button onclick="this.parentElement.remove()" aria-label="Remove">×</button>';
    attachList.appendChild(chip);
  });
}

// ── Loading-page tab switchers ────────────────────────────────────────────────
function switchSpinnerTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.spinner-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.spinner-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('spinner-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.spinner-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}
function switchSkeletonTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.skel-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.skel-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('skel-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.skel-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// ── Table tab switching ───────────────────────────────────────────────────────
function switchTableTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.tbl-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.tbl-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('tbl-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.tbl-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  // Re-run tooltip init so Code-tab sort headers get bound after first reveal
  if (tab === 'code') setTimeout(gsTableInitTooltips, 80);
}

// Toggle stacked row group — triggered by chevron btn OR row click
// Uses CSS animation (tblChildIn / tblChildOut) for smooth expand/collapse
function gsTableToggleStack(trigger) {
  var parentRow = trigger.tagName === 'TR' ? trigger : trigger.closest('tr');
  if (!parentRow) return;
  var group    = parentRow.getAttribute('data-group');
  var isExp    = parentRow.getAttribute('data-expanded') === 'true';
  var newState = !isExp;
  parentRow.setAttribute('data-expanded', newState);
  parentRow.classList.toggle('tbl-group-expanded', newState);

  var page = document.getElementById('page-content') || document;
  page.querySelectorAll('[data-group-child="' + group + '"]').forEach(function(r) {
    if (newState) {
      // ── Expand: show row then fade+slide in (Carbon DS pattern) ──
      r.style.display   = '';
      r.style.opacity   = '0';
      r.style.transform = 'translateY(-6px)';
      r.style.transition = '';
      r.classList.add('tbl-group-line');
      // Double rAF ensures the initial state is painted before transition starts
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          r.style.transition = 'opacity 200ms cubic-bezier(0.2,0,0.38,0.9), transform 200ms cubic-bezier(0.2,0,0.38,0.9)';
          r.style.opacity   = '1';
          r.style.transform = 'translateY(0)';
          r.addEventListener('transitionend', function onIn(e) {
            if (e.propertyName !== 'opacity') return;
            r.style.transition = '';
            r.removeEventListener('transitionend', onIn);
          });
        });
      });
    } else {
      // ── Collapse: fade+slide out then hide (Carbon DS pattern) ──
      r.style.transition = 'opacity 180ms cubic-bezier(0.2,0,0.38,0.9), transform 180ms cubic-bezier(0.2,0,0.38,0.9)';
      r.style.opacity   = '0';
      r.style.transform = 'translateY(-6px)';
      r.addEventListener('transitionend', function onOut(e) {
        if (e.propertyName !== 'opacity') return;
        r.style.display    = 'none';
        r.style.opacity    = '';
        r.style.transform  = '';
        r.style.transition = '';
        r.classList.remove('tbl-group-line');
        r.removeEventListener('transitionend', onOut);
      });
    }
  });

  // Rotate chevron
  var chev = parentRow.querySelector('.tbl-chevron');
  if (chev) chev.style.transform = newState ? 'rotate(180deg)' : '';
  // Update aria-expanded on expand button
  var btn = parentRow.querySelector('.tbl-expand-btn');
  if (btn) btn.setAttribute('aria-expanded', newState);
}

// Sort header tooltip — reads data-sort-tip attribute (no DOM span needed)
function gsThSortHover(th) {
  var text = th.getAttribute('data-sort-tip') || 'Click to sort in ascending order';
  gsFloatTipShow(th, text, 'bottom', 'dark');
}

// Sort button tooltip — anchors to the button, not the full th
function gsThSortBtnHover(btn) {
  var th = btn.closest('th');
  var text = (th && th.getAttribute('data-sort-tip')) || 'Click to sort in ascending order';
  gsFloatTipShow(btn, text, 'bottom', 'dark');
}

// Sort cycle: none → ascending → descending → none
// Shows tooltip matching next state
// ── Global floating tooltip — fixed position, avoids overflow:hidden clipping ──
// Appended to document.body (Ant Design portal pattern)
var _gsFTip = null;
var _gsFTipHideTimer = null;

function _gsGetFloatTip() {
  if (!_gsFTip) {
    _gsFTip = document.createElement('span');
    _gsFTip.className = 'gs-tt gs-tt--dark gs-tt--arrow';
    _gsFTip.style.cssText = 'position:fixed!important;left:0;top:0;bottom:auto;right:auto;transform:none;';
    _gsFTip.setAttribute('role', 'tooltip');
    document.body.appendChild(_gsFTip);
  }
  return _gsFTip;
}

/**
 * Show the global floating tooltip.
 * @param {Element} trigger   — element to anchor to
 * @param {string}  text      — tooltip text
 * @param {string}  placement — 'top'|'bottom'|'left'|'right'
 * @param {string}  theme     — 'dark'|'light'
 */
function gsFloatTipShow(trigger, text, placement, theme) {
  clearTimeout(_gsFTipHideTimer);
  var tip = _gsGetFloatTip();
  placement = placement || 'bottom';
  theme     = theme     || 'dark';

  // 1. Set content + class, hide off-screen so layout runs but tip is invisible
  tip.textContent = text;
  tip.className = 'gs-tt gs-tt--arrow gs-tt--' + placement + ' gs-tt--' + theme;
  // Position off-screen at top-left so the browser lays it out (gives correct offsetWidth)
  tip.style.cssText = 'position:fixed!important;left:0;top:-9999px;bottom:auto;right:auto;transform:none;visibility:hidden;';
  tip.classList.remove('is-visible'); // ensure clean state

  // 2. Force layout — reading offsetWidth triggers a synchronous reflow
  var tw  = tip.offsetWidth;
  var th2 = tip.offsetHeight;

  // 3. Calculate correct position from TRIGGER's viewport-relative rect
  var r   = trigger.getBoundingClientRect();
  var gap = 8;
  var cx  = r.left + r.width  / 2;
  var cy  = r.top  + r.height / 2;
  var left, top;

  if      (placement === 'bottom') { left = cx - tw / 2; top = r.bottom + gap; }
  else if (placement === 'top')    { left = cx - tw / 2; top = r.top - th2 - gap; }
  else if (placement === 'left')   { left = r.left - tw - gap; top = cy - th2 / 2; }
  else                             { left = r.right + gap;     top = cy - th2 / 2; }

  // Clamp to viewport so tooltip never overflows left/right edges
  left = Math.max(4, Math.min(left, window.innerWidth  - tw  - 4));
  top  = Math.max(4, Math.min(top,  window.innerHeight - th2 - 4));

  // 4. Apply final position and reveal
  //    transform:none overrides gs-tt--bottom's translateX(-50%) and the
  //    gs-tt-in-bottom @keyframes which both shift the tip left by tw/2.
  //    We use explicit left/top so no transform-based centering is needed.
  tip.style.left       = left + 'px';
  tip.style.top        = top  + 'px';
  tip.style.transform  = 'none';
  tip.style.animation  = 'none';   // skip keyframe; opacity transition still works
  tip.style.visibility = '';
  tip.classList.add('is-visible');
}

function gsFloatTipHide(delay) {
  clearTimeout(_gsFTipHideTimer);
  _gsFTipHideTimer = setTimeout(function() {
    if (_gsFTip) _gsFTip.classList.remove('is-visible');
  }, delay || 0);
}

// ── Sort header hover-tooltip binding ────────────────────────────────────────
function gsTableInitTooltips() {
  var page = document.getElementById('page-content') || document;

  // 1. Sort header tooltips
  page.querySelectorAll('th.gs-th-sort').forEach(function(th) {
    if (th.dataset.ttInit) return;
    th.dataset.ttInit = '1';

    function _sortTipText(el) {
      // Prefer data-sort-tip (kept current by gsTableSort); fall back to aria-sort
      var tip  = el.getAttribute('data-sort-tip');
      if (tip) return tip;
      var sort = el.getAttribute('aria-sort') || 'none';
      return sort === 'ascending'  ? 'Click to sort in descending order'
           : sort === 'descending' ? 'Click to cancel sorting'
           : 'Click to sort in ascending order';
    }

    // Tooltip on sort button only — not the full th
    var sortBtn = th.querySelector('.tbl-th-action-sort');
    if (sortBtn && !sortBtn.dataset.ttInit) {
      sortBtn.dataset.ttInit = '1';
      sortBtn.addEventListener('mouseenter', function() {
        gsFloatTipShow(sortBtn, _sortTipText(th), 'bottom', 'dark');
      });
      sortBtn.addEventListener('mouseleave', function() { gsFloatTipHide(80); });
      sortBtn.addEventListener('click', function() {
        // Refresh tooltip text after sort state changes
        setTimeout(function() {
          if (_gsFTip && _gsFTip.classList.contains('is-visible')) {
            gsFloatTipShow(sortBtn, _sortTipText(th), 'bottom', 'dark');
          }
        }, 10);
      });
    }
  });

  // 2. Truncated cell tooltips — show full text when text overflows
  page.querySelectorAll('.gs-td-trunc').forEach(function(td) {
    if (td.dataset.ttInit) return;
    td.dataset.ttInit = '1';
    td.style.cursor = 'default';

    td.addEventListener('mouseenter', function() {
      // Check if text is actually truncated
      if (td.scrollWidth > td.clientWidth + 2) {
        var full = td.getAttribute('data-full') || td.textContent.trim();
        gsFloatTipShow(td, full, 'top', 'dark');
      }
    });
    td.addEventListener('mouseleave', function() { gsFloatTipHide(80); });
  });
}

// Sort cycle: none → ascending → descending → none
function gsTableSort(th) {
  var current = th.getAttribute('aria-sort') || 'none';
  var next    = current === 'none' ? 'ascending' : current === 'ascending' ? 'descending' : 'none';
  // Reset siblings
  th.closest('thead').querySelectorAll('th[aria-sort]').forEach(function(h) {
    if (h !== th) {
      h.setAttribute('aria-sort', 'none');
      h.classList.remove('tbl-sort-asc', 'tbl-sort-desc');
      var tip = h.querySelector('.tbl-sort-tip');
      if (tip) tip.textContent = 'Click to sort in ascending order';
    }
  });
  th.setAttribute('aria-sort', next);
  th.classList.toggle('tbl-sort-asc',  next === 'ascending');
  th.classList.toggle('tbl-sort-desc', next === 'descending');
  // Update data-sort-tip for next hover
  var tips = { 'none':'Click to sort in ascending order', 'ascending':'Click to sort in descending order', 'descending':'Click to cancel sorting' };
  th.setAttribute('data-sort-tip', tips[next] || tips['none']);
  // Also reset siblings' tips
  th.closest('thead').querySelectorAll('th.gs-th-sort').forEach(function(h) {
    if (h !== th) h.setAttribute('data-sort-tip', 'Click to sort in ascending order');
  });
}

// Row 3-dot menu — uses gs-popover component (is-open class)
function gsTableMenu(btn) {
  var wrap = btn.closest('.gs-pop-wrap, .gs-row-menu-wrap');
  if (!wrap) return;
  // Support both old and new class
  var dd = wrap.querySelector('.gs-popover, .gs-row-menu-dd');
  if (!dd) return;
  var isOpen = dd.classList.contains('is-open') || dd.style.display === 'block';
  // Close all open table menus
  document.querySelectorAll('.gs-table-menu-pop.is-open, .gs-row-menu-dd').forEach(function(d){
    d.classList.remove('is-open'); d.style.display = '';
  });
  if (!isOpen) {
    dd.classList.add('is-open');
    setTimeout(function() {
      document.addEventListener('click', function onOut(e) {
        if (!wrap.contains(e.target)) {
          dd.classList.remove('is-open');
          document.removeEventListener('click', onOut);
        }
      });
    }, 0);
  }
}

// Table lazy load demo — simulate appending a page of rows
function gsTableLazyDemo() {
  var sentinel = document.getElementById('tbl-lazy-sentinel');
  var footer   = document.getElementById('tbl-lazy-footer');
  var tbody    = document.getElementById('tbl-lazy-demo-body');
  if (!sentinel || !tbody) return;
  sentinel.style.display = 'flex';
  if (footer) footer.style.display = 'none';
  var newRows = [
    ['G6170', 'Crystal Wave',  'Hamburg, DEU',    'gs-b-booked',      'Booked'],
    ['G6158', 'Pacific Hawk',  'Houston, USA',     'gs-b-finalise',    'Finalise Qty'],
    ['G6143', 'Arctic Nomad',  'Oslo, NOR',        'gs-b-pending',     'Pending Credit'],
  ];
  setTimeout(function() {
    newRows.forEach(function(r) {
      var tr = document.createElement('tr');
      tr.addEventListener('click', function(){ tr.classList.toggle('gs-row-selected'); });
      tr.innerHTML = '<td class="gs-td-link">' + r[0] + '</td>'
        + '<td class="gs-td-bold">' + r[1] + '</td>'
        + '<td class="gs-td-dim">' + r[2] + '</td>'
        + '<td><span class="gs-badge ' + r[3] + '">' + r[4] + '</span></td>';
      tbody.appendChild(tr);
    });
    sentinel.style.display = 'none';
    if (footer) {
      footer.style.display = '';
      footer.innerHTML = 'Showing 6 of 1,202 records &nbsp;·&nbsp; <span style="color:#9CA3AF;font-size:12px;">All rows loaded</span>';
    }
  }, 1400);
}

// Tooltip — show/hide by element ID (used with onmouseenter/leave + onfocus/blur)
function gsShowTooltipDemo(id) {
  var el = document.getElementById(id);
  if (el) { el.classList.add('is-visible'); }
}
function gsHideTooltipDemo(id) {
  var el = document.getElementById(id);
  if (el) { el.classList.remove('is-visible'); }
}

// ── TABS ─────────────────────────────────────────────────────────────────────
// ── Ink-bar helper: create or reposition the sliding indicator ───────────────
function _gsTabInkMove(tablist, activeTab) {
  if (!tablist || !activeTab) return;
  // Skip vertical and card variants — they use border-based indicators
  if (tablist.closest('.gs-tabs--vertical') || tablist.closest('.gs-tabs--card')) return;
  var ink = tablist.querySelector('.gs-tab-ink');
  if (!ink) {
    ink = document.createElement('div');
    ink.className = 'gs-tab-ink';
    // Position instantly (no transition) on first creation
    ink.style.transition = 'none';
    tablist.appendChild(ink);
    ink.style.left  = activeTab.offsetLeft + 'px';
    ink.style.width = activeTab.offsetWidth + 'px';
    // Re-enable transition after first paint
    requestAnimationFrame(function() { requestAnimationFrame(function() { ink.style.transition = ''; }); });
  } else {
    // Subsequent moves use the CSS transition for the smooth slide
    ink.style.left  = activeTab.offsetLeft + 'px';
    ink.style.width = activeTab.offsetWidth + 'px';
  }
}

// Initialise ink bars for every line tablist visible on the page
function _gsTabInkInitAll() {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.gs-tablist').forEach(function(tl) {
    var activeTab = tl.querySelector('.gs-demo-tab--active');
    if (activeTab) _gsTabInkMove(tl, activeTab);
  });
}

function switchTabsTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.tabs-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.tabs-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('tabs-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.tabs-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  // Re-init ink bars when returning to the Design tab
  if (tab === 'design') setTimeout(_gsTabInkInitAll, 30);
}

// Demo tab group selection — switches panels + slides the ink bar
function gsDemoTabSelect(groupId, index) {
  var group = document.getElementById(groupId);
  if (!group) return;
  var tabs   = group.querySelectorAll('.gs-demo-tab');
  var panels = group.querySelectorAll('.gs-demo-panel');
  tabs.forEach(function(t, i) {
    t.classList.toggle('gs-demo-tab--active', i === index);
    t.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
  panels.forEach(function(p, i) {
    p.classList.toggle('gs-demo-panel--active', i === index);
  });
  // Slide ink bar to active tab
  var tablist = group.querySelector('.gs-tablist');
  _gsTabInkMove(tablist, tabs[index]);
}

// ── STEPPERS ─────────────────────────────────────────────────────────────────
function switchStepperTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.step-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  page.querySelectorAll('.step-tab-pane').forEach(function(p){ p.classList.remove('active'); });
  var pane = document.getElementById('step-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.step-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

function gsStepperGoTo(id, index) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var steps = wrap.querySelectorAll('.gs-step');
  var total = steps.length;
  index = Math.max(0, Math.min(total - 1, index));
  wrap.dataset.current = index;
  steps.forEach(function(step, i) {
    step.classList.remove('gs-step--done', 'gs-step--active', 'gs-step--waiting');
    if (i < index)      step.classList.add('gs-step--done');
    else if (i === index) step.classList.add('gs-step--active');
    else                step.classList.add('gs-step--waiting');
  });
  // update back/next buttons
  var prevBtn = document.getElementById(id + '-prev');
  var nextBtn = document.getElementById(id + '-next');
  var doneMsg = document.getElementById(id + '-done');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) { nextBtn.style.display = index < total - 1 ? '' : 'none'; }
  if (doneMsg) { doneMsg.style.display = index === total - 1 ? '' : 'none'; }
}
function gsStepperNext(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  gsStepperGoTo(id, parseInt(wrap.dataset.current || '0') + 1);
}
function gsStepperPrev(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  gsStepperGoTo(id, parseInt(wrap.dataset.current || '0') - 1);
}

// ── ILLUSTRATIONS PAGE ───────────────────────────────────────────────────────

// Download SVG file directly
function gsIllDownloadSVG(path, name) {
  var a = document.createElement('a');
  a.href = path;
  a.download = name + '.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Convert SVG → canvas → PNG download
function gsIllDownloadPNG(svgPath, name, size) {
  size = size || 800;
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, size, size);
    var a = document.createElement('a');
    a.download = name + '.png';
    a.href = canvas.toDataURL('image/png');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  img.onerror = function() {
    // fallback: open in new tab so user can save manually
    window.open(svgPath, '_blank');
  };
  img.src = svgPath;
}

// Filter illustration cards by search query and/or category
function gsIllFilter() {
  var query    = (document.getElementById('ill-search-input')?.value || '').toLowerCase().trim();
  var category = document.querySelector('.ill-cat-btn.active')?.dataset.cat || 'all';
  var cards    = document.querySelectorAll('.ill-card');
  var sections = document.querySelectorAll('.ill-section');

  cards.forEach(function(card) {
    var name = (card.dataset.name || '').toLowerCase();
    var cat  = (card.dataset.cat  || '');
    var matchQ = !query || name.includes(query);
    var matchC = category === 'all' || cat === category;
    card.style.display = matchQ && matchC ? '' : 'none';
  });

  // Show/hide section headers based on visible cards
  sections.forEach(function(sec) {
    var visible = sec.querySelectorAll('.ill-card:not([style*="display: none"])');
    sec.style.display = visible.length > 0 ? '' : 'none';
  });
}

// Switch category filter button
function gsIllSetCat(btn, cat) {
  document.querySelectorAll('.ill-cat-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  gsIllFilter();
}

/* ══════════════════════════════════════════════════════════════════
   SEARCH & FILTER PAGE  —  prim-search
   Functions wired via PAGE_INITS; inline <script> blocks don't run
   when pages load via innerHTML.
══════════════════════════════════════════════════════════════════ */
function initSFSearch() {
  // Close CDDs when clicking outside
  document.addEventListener('click', function sfCddOutside(e) {
    if (!e.target.closest('.sf-cdd')) {
      document.querySelectorAll('.sf-cdd-menu').forEach(function(m) { m.classList.remove('is-open'); });
      document.querySelectorAll('.sf-cdd-trigger').forEach(function(t) { t.classList.remove('is-open'); });
    }
  }, true);
}

/* ── Tab switching ──────────────────────────────────────────────── */
function switchSFTab(tab) {
  document.querySelectorAll('.sf-tab-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.tab === tab); });
  document.querySelectorAll('.sf-tab-pane').forEach(function(p) { p.classList.toggle('active', p.id === 'sf-tab-' + tab); });
}

/* ── Status chips ───────────────────────────────────────────────── */
function selectChip(rowId, btn) {
  var row = document.getElementById(rowId);
  if (!row) return;
  row.querySelectorAll('.sf-chip').forEach(function(c) { c.classList.remove('is-active'); });
  btn.classList.add('is-active');
}

/* ── Search field ───────────────────────────────────────────────── */
function handleSFSearch(input) {
  input.classList.toggle('has-value', input.value.length > 0);
}
function handleSFSearchStatic(input) {
  var hasVal = input.value.length > 0;
  input.classList.toggle('has-value', hasVal);
  var clearBtn = document.getElementById('sf-clear-static');
  if (clearBtn) clearBtn.style.display = hasVal ? 'flex' : 'none';
}
function clearSFSearchStatic() {
  var inp = document.getElementById('sf-search-static');
  var btn = document.getElementById('sf-clear-static');
  if (inp) { inp.value = ''; inp.classList.remove('has-value'); }
  if (btn) btn.style.display = 'none';
}

/* ── Filter button toggle (standalone demos) ────────────────────── */
function toggleSFFilterBtn(id) {
  var btn = document.getElementById(id);
  if (!btn) return;
  var isActive = btn.classList.toggle('is-active');
  var badge = btn.querySelector('.sf-filter-badge');
  if (isActive) {
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'gs-count-badge sf-filter-badge-active';
      badge.textContent = '2';
      btn.appendChild(badge);
    }
  } else {
    if (badge) badge.remove();
  }
}

/* ── Overlay (slideout shell) ───────────────────────────────────── */
function openSFOverlay() {
  var panel    = document.getElementById('sf-so-panel');
  var backdrop = document.getElementById('sf-so-backdrop');
  if (panel)    panel.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  updateSFOverlayCount();
}
function closeSFOverlay() {
  var panel    = document.getElementById('sf-so-panel');
  var backdrop = document.getElementById('sf-so-backdrop');
  if (panel)    panel.classList.remove('is-open');
  if (backdrop) backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  document.querySelectorAll('.sf-cdd-menu').forEach(function(m) { m.classList.remove('is-open'); });
  document.querySelectorAll('.sf-cdd-trigger').forEach(function(t) { t.classList.remove('is-open'); });
}
function clearSFOverlay() {
  document.querySelectorAll('#sf-so-panel .sf-cdd').forEach(function(cdd) {
    var t = cdd.querySelector('.sf-cdd-trigger');
    var v = cdd.querySelector('[id$="-val"]');
    if (t) t.classList.remove('has-value', 'is-open');
    if (v) { v.textContent = 'Select…'; v.style.color = '#94a3b8'; }
    cdd.querySelectorAll('.sf-cdd-option').forEach(function(o) { o.classList.remove('is-selected'); });
    var menu = cdd.querySelector('.sf-cdd-menu');
    if (menu) menu.classList.remove('is-open');
  });
  document.querySelectorAll('#sf-so-panel .sf-ms-chip').forEach(function(c) { c.remove(); });
  updateSFOverlayCount();
}
function updateSFOverlayCount() {
  var count = 0;
  document.querySelectorAll('#sf-so-panel .sf-cdd-trigger.has-value').forEach(function() { count++; });
  document.querySelectorAll('#sf-so-panel .sf-ms-chip').forEach(function() { count++; });
  var badge = document.getElementById('sf-so-count');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? '' : 'none'; }
}

/* ── Inline panel ───────────────────────────────────────────────── */
function toggleSFInline() {
  var panel   = document.getElementById('sf-inline-panel');
  var trigger = document.getElementById('sf-inline-trigger');
  var btn     = document.getElementById('sf-inline-toggle-btn');
  if (!panel) return;
  var opening = !panel.classList.contains('is-open');
  panel.classList.toggle('is-open', opening);
  if (trigger) trigger.classList.toggle('is-active', opening);
  if (btn) btn.textContent = opening ? 'Close inline' : 'Toggle inline';
}
function clearSFInline() {
  document.querySelectorAll('#sf-inline-panel .sf-cdd').forEach(function(cdd) {
    var t = cdd.querySelector('.sf-cdd-trigger');
    var v = cdd.querySelector('[id$="-val"]');
    if (t) t.classList.remove('has-value', 'is-open');
    if (v) { v.textContent = 'Select…'; v.style.color = '#94a3b8'; }
    cdd.querySelectorAll('.sf-cdd-option').forEach(function(o) { o.classList.remove('is-selected'); });
    var menu = cdd.querySelector('.sf-cdd-menu');
    if (menu) menu.classList.remove('is-open');
  });
  updateSFInlineBadge();
}
function updateSFInlineBadge() {
  var count = 0;
  document.querySelectorAll('#sf-inline-panel .sf-cdd-trigger.has-value').forEach(function() { count++; });
  var badge   = document.getElementById('sf-inline-badge');
  var trigger = document.getElementById('sf-inline-trigger');
  if (badge)   { badge.textContent = count; badge.style.display = count > 0 ? '' : 'none'; }
  if (trigger) trigger.classList.toggle('is-active', count > 0);
}

/* ── Custom dropdown ─────────────────────────────────────────────── */
function toggleSFCdd(id) {
  var wrap    = document.getElementById(id);
  var trigger = wrap && wrap.querySelector('.sf-cdd-trigger');
  var menu    = document.getElementById(id + '-menu');
  if (!wrap || !trigger || !menu) return;
  var isOpen = menu.classList.toggle('is-open');
  trigger.classList.toggle('is-open', isOpen);
  // close other CDDs
  document.querySelectorAll('.sf-cdd-menu').forEach(function(m) {
    if (m !== menu) {
      m.classList.remove('is-open');
      var sibling = m.closest('.sf-cdd');
      if (sibling) { var t2 = sibling.querySelector('.sf-cdd-trigger'); if (t2) t2.classList.remove('is-open'); }
    }
  });
}
function selectSFCddOption(cddId, value) {
  var wrap    = document.getElementById(cddId);
  var valSpan = document.getElementById(cddId + '-val');
  var trigger = wrap && wrap.querySelector('.sf-cdd-trigger');
  var menu    = document.getElementById(cddId + '-menu');
  if (!wrap) return;
  if (valSpan) valSpan.textContent = value;
  if (trigger) { trigger.classList.add('has-value'); trigger.classList.remove('is-open'); }
  wrap.querySelectorAll('.sf-cdd-option').forEach(function(o) {
    var label = o.querySelector('span:first-child');
    o.classList.toggle('is-selected', label && label.textContent === value);
  });
  if (menu) menu.classList.remove('is-open');
  if (cddId.startsWith('cdd-so-')) updateSFOverlayCount();
  else if (cddId.startsWith('cdd-il-')) updateSFInlineBadge();
}

/* ── Multi-select chip removal ───────────────────────────────────── */
function removeSFChip(msId, label) {
  var field = document.getElementById(msId);
  if (!field) return;
  field.querySelectorAll('.sf-ms-chip').forEach(function(chip) {
    if (chip.textContent.trim().startsWith(label.trim())) chip.remove();
  });
  if (msId.startsWith('ms-so-')) updateSFOverlayCount();
}

/* ── On-this-page smooth scroll ─────────────────────────────────── */
function sfScrollTo(id, linkEl) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.code-qnav-link').forEach(function(a) { a.classList.remove('active'); });
  if (linkEl) linkEl.classList.add('active');
  return false;
}

/* ── Legacy panel stubs ──────────────────────────────────────────── */
function toggleSFPanel()  { openSFOverlay(); }
function openSFPanel()    { openSFOverlay(); }
function closeSFPanel()   { closeSFOverlay(); }
function applySFFilters() { closeSFOverlay(); }
function clearSFFilters() { clearSFOverlay(); }

/* ════════════════════════════════════════════════════════════════════
   UPLOAD PAGE  —  view-upload
   All functions must live here; inline <script> blocks in HTML
   do not execute when pages are loaded via innerHTML.
════════════════════════════════════════════════════════════════════ */
function switchUplTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.upl-tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  page.querySelectorAll('.upl-tab-pane').forEach(function(p) {
    p.classList.toggle('active', p.id === 'upl-tab-' + tab);
  });
}

function triggerFileInput(id) {
  var inp = document.getElementById(id);
  if (inp) inp.click();
}

function handleUplDragOver(e, zoneId) {
  e.preventDefault(); e.stopPropagation();
  var zone = document.getElementById(zoneId);
  if (!zone) return;
  zone.classList.add('is-dragover');
  var img = zone.querySelector('[data-ill]');
  if (img) img.src = 'Assets/illustrations/img-folder-opened.svg';
}

function handleUplDragLeave(zoneId) {
  var zone = document.getElementById(zoneId);
  if (!zone) return;
  zone.classList.remove('is-dragover');
  var img = zone.querySelector('[data-ill]');
  if (img) img.src = 'Assets/illustrations/img-folder-closed.svg';
}

function handleUplDrop(e, zoneId, _, listId) {
  e.preventDefault(); e.stopPropagation();
  handleUplDragLeave(zoneId);
  var files = e.dataTransfer && e.dataTransfer.files;
  if (files && files.length) handleUplFiles(files, listId);
}

function fmtUplSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}

function handleUplFiles(files, listId) {
  var list = document.getElementById(listId);
  if (!list || !files) return;
  Array.from(files).forEach(function(file) {
    var id  = 'fi-' + Math.random().toString(36).slice(2, 8);
    var ext = file.name.split('.').pop().toUpperCase();
    var item = document.createElement('div');
    item.className = 'gs-file-item';
    item.id = id;
    item.innerHTML =
      '<div class="gs-file-item__icon">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
          '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>' +
          '<polyline points="14 2 14 8 20 8"/></svg></div>' +
      '<div class="gs-file-item__info">' +
        '<div class="gs-file-item__name">' + file.name + '</div>' +
        '<div class="gs-file-item__meta">' + fmtUplSize(file.size) + ' \xB7 ' + ext + '</div>' +
        '<div class="gs-progress gs-progress--sm" role="progressbar"' +
             ' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="pb-' + id + '"' +
             ' style="margin-top:4px;">' +
          '<div class="gs-progress__bar">' +
            '<div class="gs-progress__fill" id="fill-' + id + '" style="width:0%"></div></div>' +
          '<span class="gs-progress__label" id="lbl-' + id + '">0%</span></div></div>' +
      '<button class="gs-file-item__remove" onclick="removeUplFile(\'' + id + '\')"' +
              ' aria-label="Remove ' + file.name + '">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
             ' stroke-width="2.5" stroke-linecap="round">' +
          '<path d="M18 6L6 18M6 6l12 12"/></svg></button>';
    list.appendChild(item);
    simulateUplProgress(id);
  });
}

function simulateUplProgress(id) {
  var pct   = 0;
  var speed = Math.random() * 18 + 8;
  var tick  = function() {
    pct = Math.min(pct + speed * (Math.random() * 0.6 + 0.7), 100);
    var n    = Math.round(pct);
    var fill = document.getElementById('fill-' + id);
    var lbl  = document.getElementById('lbl-' + id);
    var bar  = document.getElementById('pb-' + id);
    if (fill) fill.style.width = n + '%';
    if (lbl)  lbl.textContent  = n + '%';
    if (bar)  bar.setAttribute('aria-valuenow', n);
    if (n < 100) { setTimeout(tick, 160 + Math.random() * 100); }
    else if (bar) {
      bar.classList.add('gs-progress--success');
      if (lbl) lbl.textContent = '✓';
    }
  };
  setTimeout(tick, 180);
}

function removeUplFile(id) {
  var el = document.getElementById(id);
  if (el) {
    el.style.transition = 'opacity .18s, transform .18s';
    el.style.opacity = '0'; el.style.transform = 'translateX(6px)';
    setTimeout(function() { el.remove(); }, 200);
  }
}

/* ════════════════════════════════════════════════════════════════════
   PROGRESS BAR PAGE  —  nav-progress
════════════════════════════════════════════════════════════════════ */
function switchPBTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.pb-tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  page.querySelectorAll('.pb-tab-pane').forEach(function(p) {
    p.classList.toggle('active', p.id === 'pb-tab-' + tab);
  });
}

function updatePBDemo(val) {
  var n      = parseInt(val, 10);
  var indet  = document.getElementById('pb-indeterminate');
  if (indet && indet.checked) return;
  var fill   = document.getElementById('pb-demo-fill');
  var label  = document.getElementById('pb-demo-label');
  var bar    = document.getElementById('pb-demo-bar');
  var slider = document.getElementById('pb-slider');
  var helper = document.getElementById('pb-demo-helper');
  if (fill)   fill.style.width = n + '%';
  if (label)  label.textContent = n + '%';
  if (bar)    bar.setAttribute('aria-valuenow', n);
  if (slider) slider.style.setProperty('--val', n + '%');
  if (helper) helper.textContent = Math.round(n * 0.52) + ' of 52 files uploaded';
}

function updatePBDemoLabel(show) {
  var label = document.getElementById('pb-demo-label');
  if (label) label.style.display = show ? '' : 'none';
}

function togglePBIndeterminate(on) {
  var bar    = document.getElementById('pb-demo-bar');
  var slider = document.getElementById('pb-slider');
  if (!bar) return;
  if (on) {
    bar.classList.add('gs-progress--indeterminate');
    if (slider) slider.disabled = true;
  } else {
    bar.classList.remove('gs-progress--indeterminate');
    if (slider) { slider.disabled = false; updatePBDemo(slider.value); }
  }
}

function updatePBState(state) {
  var bar = document.getElementById('pb-demo-bar');
  if (!bar) return;
  bar.classList.remove('gs-progress--success', 'gs-progress--error', 'gs-progress--warning');
  if (state !== 'default') bar.classList.add('gs-progress--' + state);
}

/* ════════════════════════════════════════════════════════════════════
   EMAIL PANEL  —  panel-email
════════════════════════════════════════════════════════════════════ */
function switchEmTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.em-tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  page.querySelectorAll('.em-tab-pane').forEach(function(p) {
    p.classList.toggle('active', p.id === 'em-tab-' + tab);
  });
}

/* ── Email modal — delegates to design system openGsModal/closeGsModal ─────
   Uses:  --modal-overlay-bg (rgba 31,41,55 @70%)
          @keyframes gs-modal-in / gs-modal-out (translateY -24px, 180/160ms)
          @keyframes gs-overlay-in (opacity, 160ms)
   Structure: #em-modal-overlay > .gs-email.gs-modal
─────────────────────────────────────────────────────────────────────────── */
function openEmModal() {
  openGsModal('em-modal-overlay');
  /* openGsModal already handles: display:flex, is-open class, ESC handler,
     focus trap, body overflow:hidden */
}
function closeEmModal() {
  closeGsModal('em-modal-overlay');
  /* closeGsModal handles: is-closing animation (160ms), then display:none,
     body overflow restore */
}
function sendEmModal() { closeEmModal(); }
/* handleEmOverlayClick is no longer needed — closeGsModalOnOverlay handles it */
function toggleEmCc() {
  var row = document.getElementById('em-cc-row');
  if (!row) return;
  var showing = row.style.display !== 'none';
  row.style.display = showing ? 'none' : 'flex';
  if (!showing) { var i = document.getElementById('em-cc-input'); if (i) i.focus(); }
}
function toggleEmBcc() {
  var row = document.getElementById('em-bcc-row');
  if (!row) return;
  var showing = row.style.display !== 'none';
  row.style.display = showing ? 'none' : 'flex';
  if (!showing) { var i = document.getElementById('em-bcc-input'); if (i) i.focus(); }
}
function handleEmRecipientKey(e, chipsId, inputId) {
  if (e.key !== 'Enter' && e.key !== ',') return;
  e.preventDefault();
  var input  = document.getElementById(inputId);
  var chips  = document.getElementById(chipsId);
  var val    = input && input.value.trim().replace(/,$/, '');
  if (!val || !chips) return;
  var chip   = document.createElement('span');
  chip.className = 'gs-email__chip';
  var ini = val.split('@')[0].slice(0, 2).toUpperCase();
  chip.innerHTML =
    '<span class="gs-email__chip-avatar">' + ini + '</span>' +
    (val.length > 24 ? val.slice(0, 22) + '…' : val) +
    '<button class="gs-email__chip-close" onclick="removeEmChip(this)" aria-label="Remove ' + val + '">' +
      '<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
        '<path d="M18 6L6 18M6 6l12 12"/></svg></button>';
  chips.insertBefore(chip, input);
  input.value = '';
}
function removeEmChip(btn) { if (btn) { var c = btn.closest('.gs-email__chip'); if (c) c.remove(); } }
function execEmCmd(cmd, btn, value) {
  var ed = document.getElementById('em-editor');
  if (ed) ed.focus();
  try { document.execCommand(cmd, false, value || null); } catch(e) {}
  if (btn) { try { btn.classList.toggle('is-active', document.queryCommandState(cmd)); } catch(e) {} }
}
function insertEmLink() {
  var url = prompt('Enter URL:', 'https://');
  if (!url) return;
  var ed = document.getElementById('em-editor');
  if (ed) { ed.focus(); document.execCommand('createLink', false, url); }
}
function insertEmTable() {
  var tbl = '<table><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
            '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table><p><br></p>';
  var ed = document.getElementById('em-editor');
  if (ed) { ed.focus(); document.execCommand('insertHTML', false, tbl); }
}
function triggerEmAttach() {
  var inp = document.getElementById('em-file-input');
  if (inp) inp.click();
}
function handleEmFileAttach(files) {
  var wrap = document.getElementById('em-attachments');
  if (!wrap || !files) return;
  Array.from(files).forEach(function(f) {
    var card = document.createElement('div');
    card.className = 'gs-attach-card';
    card.innerHTML =
      '<div class="gs-attach-card__icon">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
             ' stroke-width="1.8" stroke-linecap="round">' +
          '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>' +
          '<polyline points="14 2 14 8 20 8"/></svg></div>' +
      '<span class="gs-attach-card__name">' + f.name + '</span>' +
      '<button class="gs-attach-card__del" onclick="removeEmAttachment(this)"' +
              ' aria-label="Remove attachment">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
             ' stroke-width="2.5" stroke-linecap="round">' +
          '<path d="M18 6L6 18M6 6l12 12"/></svg></button>';
    wrap.appendChild(card);
  });
}
function removeEmAttachment(btn) { if (btn) { var c = btn.closest('.gs-attach-card'); if (c) c.remove(); } }
function handleEmDragOver(e) {
  e.preventDefault();
  var el = document.getElementById('em-content');
  if (el) el.closest('.gs-email') && el.closest('.gs-email').classList.add('gs-email--dragover');
}
function handleEmDragLeave(e) {
  if (e.currentTarget && !e.currentTarget.contains(e.relatedTarget)) {
    var el = document.getElementById('em-content');
    if (el) el.closest('.gs-email') && el.closest('.gs-email').classList.remove('gs-email--dragover');
  }
}
function handleEmDrop(e) {
  e.preventDefault();
  var el = document.getElementById('em-content');
  if (el) el.closest('.gs-email') && el.closest('.gs-email').classList.remove('gs-email--dragover');
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length)
    handleEmFileAttach(e.dataTransfer.files);
}

/* ════════════════════════════════════════════════════════════════════
   SEARCH & FILTER — prim-search additional stubs
════════════════════════════════════════════════════════════════════ */
function handleSFSearch(input) {
  if (input) input.classList.toggle('has-value', input.value.length > 0);
}
function handleSFDemoSearch(input) {
  if (input) input.classList.toggle('has-value', input.value.length > 0);
}


/* ── Dropdown loading state helpers ─────────────────────────────────── */
function gsDdSetLoading(id, isLoading) {
  var wrap  = document.getElementById(id);
  if (!wrap) return;
  var skel  = document.getElementById(id.replace('dd-','dd-') + '-skel') ||
              wrap.querySelector('.gs-dd__loading');
  var list  = document.getElementById(id.replace('dd-','dd-') + '-list') ||
              wrap.querySelector('.gs-dd__list');
  if (skel) skel.style.display = isLoading ? '' : 'none';
  if (list) list.style.display = isLoading ? 'none' : '';
}

/* Simulates async fetch — opens → skeleton → list */
function gsDdToggleLoading(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  if (wrap.classList.contains('is-open')) { gsDdClose(id); return; }
  // Open and show skeleton
  wrap.classList.add('is-open');
  _gsDdOpenId = id;
  var trigger = wrap.querySelector('.gs-dd__trigger');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  gsDdSetLoading(id, true);
  // Simulate 1.4s API delay then reveal items
  setTimeout(function() {
    gsDdSetLoading(id, false);
    // Focus search input after list appears
    var inp = wrap.querySelector('.gs-dd__search');
    if (inp) { inp.value = ''; setTimeout(function() { inp.focus(); }, 60); }
  }, 1400);
}


/* ════════════════════════════════════════════════════════════════════
   DROPDOWN  —  Data-driven API
   ─────────────────────────────────────────────────────────────────────
   gsDdSetOptions(id, options[])   Render items from a JS array.
   gsDdFetch(id, url, mapper)      Fetch from backend, auto loading state.
   ─────────────────────────────────────────────────────────────────────
   Option shape:
     { value: string,        required
       label: string,        required
       sub?:  string,        description sub-line  (gs-dd__item-sub)
       icon?: string,        raw SVG / HTML string (gs-dd__item-icon)
       right?: string,       right-slot HTML       (gs-dd__item-right — chip, badge…)
       group?: string,       group header label    (gs-dd__group-label + divider)
       disabled?: boolean }
════════════════════════════════════════════════════════════════════ */

/**
 * Populate a dropdown from a plain JS options array.
 * Replaces any existing list items; preserves the empty-state element.
 * Works for both single-select (.gs-dd) and multi-select (.gs-dd--multi).
 */
function gsDdSetOptions(id, options) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var list = wrap.querySelector('.gs-dd__list');
  if (!list) return;
  var isMulti = wrap.classList.contains('gs-dd--multi') ||
                wrap.getAttribute('data-dd-type') === 'multi';

  // Keep the empty-state sentinel
  var emptyEl = list.querySelector('.gs-dd__empty');
  if (emptyEl) emptyEl.parentNode.removeChild(emptyEl);
  list.innerHTML = '';

  var lastGroup = null;

  options.forEach(function(opt) {
    // Group divider + label
    if (opt.group && opt.group !== lastGroup) {
      if (lastGroup !== null) {
        var divEl = document.createElement('div');
        divEl.className = 'gs-dd__divider';
        list.appendChild(divEl);
      }
      var grpEl = document.createElement('div');
      grpEl.className = 'gs-dd__group-label';
      grpEl.textContent = opt.group;
      list.appendChild(grpEl);
      lastGroup = opt.group;
    }

    var item = document.createElement('div');
    item.className = 'gs-dd__item' + (opt.disabled ? ' is-disabled' : '');
    item.setAttribute('data-value', opt.value || '');
    item.setAttribute('role', 'option');

    var html = '';

    // Multi-select checkbox
    if (isMulti) {
      html += '<span class="gs-dd__item-cb">' +
        '<svg width="9" height="9" viewBox="0 0 12 12">' +
        '<polyline points="2 6 5 9 10 3"/></svg></span>';
    }

    // Optional leading icon
    if (opt.icon) {
      html += '<div class="gs-dd__item-icon">' + opt.icon + '</div>';
    }

    // Text — with or without description sub-line
    if (opt.sub) {
      html += '<div class="gs-dd__item-content">' +
        '<span class="gs-dd__item-text">' + opt.label + '</span>' +
        '<span class="gs-dd__item-sub">'  + opt.sub   + '</span>' +
        '</div>';
    } else {
      html += '<span class="gs-dd__item-text">' + opt.label + '</span>';
    }

    // Optional right slot (chip, badge, count…)
    if (opt.right) {
      html += '<div class="gs-dd__item-right">' + opt.right + '</div>';
    }

    // Check indicator (single mode only — multi uses checkbox)
    if (!isMulti) {
      html += '<span class="gs-dd__item-check">' +
        '<svg width="12" height="12" viewBox="0 0 24 24">' +
        '<polyline points="20 6 9 17 4 12"/></svg></span>';
    }

    item.innerHTML = html;

    // Wire interaction
    if (!opt.disabled) {
      (function(o) {
        if (isMulti) {
          item.onclick = function() { gsDdMultiToggle(id, item, o.label); };
        } else {
          item.onclick = function() { gsDdSelect(id, o.label); };
        }
      }(opt));
    }

    list.appendChild(item);
  });

  // Restore empty-state sentinel
  if (emptyEl) {
    list.appendChild(emptyEl);
  } else {
    var empty = document.createElement('div');
    empty.className = 'gs-dd__empty';
    empty.style.display = 'none';
    empty.textContent = 'No results found';
    list.appendChild(empty);
  }
}

/**
 * Async helper — fetches options from a backend URL.
 *   1. Opens the dropdown with a loading skeleton.
 *   2. Calls your mapper function on each response item.
 *   3. Calls gsDdSetOptions when data arrives.
 *   4. Shows an error state if the request fails.
 *
 * @param {string}   id      Dropdown element ID
 * @param {string}   url     API endpoint
 * @param {Function} mapper  fn(item) → DropdownOption — maps raw API data to option shape
 *
 * Usage:
 *   gsDdFetch('my-dd',
 *     '/api/ports',
 *     function(p) { return { value: p.id, label: p.name, sub: p.country }; }
 *   );
 */
function gsDdFetch(id, url, mapper) {
  gsDdOpen(id);
  gsDdSetLoading(id, true);

  fetch(url)
    .then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function(data) {
      // Accept root array OR common envelope shapes: {results, items, data}
      var raw = Array.isArray(data) ? data
              : (data.results || data.items || data.data || []);
      gsDdSetLoading(id, false);
      gsDdSetOptions(id, raw.map(mapper));
    })
    .catch(function(err) {
      gsDdSetLoading(id, false);
      var wrap = document.getElementById(id);
      if (!wrap) return;
      var empty = wrap.querySelector('.gs-dd__empty');
      if (empty) {
        empty.textContent = 'Failed to load — ' + err.message;
        empty.style.display = '';
        empty.style.color = 'var(--prim-red-500,#DC2625)';
      }
      console.error('[gs-dropdown] gsDdFetch error:', err);
    });
}

/* Demo helper — simulates a 1.2s backend fetch with List Item placeholders */
function gsDdBackendDemo(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  if (wrap.classList.contains('is-open')) { gsDdClose(id); return; }
  gsDdOpen(id);
  var skel = document.getElementById('dd-backend-skel');
  var list = document.getElementById('dd-backend-list');
  if (skel) skel.style.display = '';
  if (list) list.style.display = 'none';
  setTimeout(function() {
    if (skel) skel.style.display = 'none';
    gsDdSetOptions(id, [
      { value: 'item-1', label: 'List Item 1', sub: 'Sub-label text' },
      { value: 'item-2', label: 'List Item 2', sub: 'Sub-label text' },
      { value: 'item-3', label: 'List Item 3', sub: 'Sub-label text',
        right: '<span class="gs-ci gs-ci--sm gs-ci--light gs-ci--blue">Type A</span>' },
      { value: 'item-4', label: 'List Item 4',
        right: '<span class="gs-ci gs-ci--sm gs-ci--light gs-ci--green">Type B</span>' },
      { value: 'item-5', label: 'List Item 5', disabled: true, sub: 'Unavailable' },
    ]);
    if (list) list.style.display = '';
    var inp = wrap.querySelector('.gs-dd__search');
    if (inp) { inp.value = ''; setTimeout(function(){ inp.focus(); }, 60); }
  }, 1200);
}
// Navigation init

/* ════════════════════════════════════════════════════════════════════
   DROPDOWN PAGE  —  prim-dropdowns
   All functions here; inline <script> in HTML won't execute via innerHTML
════════════════════════════════════════════════════════════════════ */
function switchDdTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.dd-tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  page.querySelectorAll('.dd-tab-pane').forEach(function(p) {
    p.classList.toggle('active', p.id === 'dd-tab-' + tab);
  });
}

/* ── Core open/close ─────────────────────────────────────────────── */
var _gsDdOpenId = null;

function gsDdOpen(id) {
  // Close any other open dropdown first
  if (_gsDdOpenId && _gsDdOpenId !== id) gsDdClose(_gsDdOpenId);
  var wrap = document.getElementById(id);
  if (!wrap) return;
  wrap.classList.add('is-open');
  _gsDdOpenId = id;
  // Focus search input
  var inp = wrap.querySelector('.gs-dd__search');
  if (inp) { inp.value = ''; setTimeout(function() { inp.focus(); }, 60); }
  // Reset all items visible
  gsDdFilter(id, '');
  // Update aria
  var trigger = wrap.querySelector('.gs-dd__trigger');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
}

function gsDdClose(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  wrap.classList.remove('is-open');
  if (_gsDdOpenId === id) _gsDdOpenId = null;
  var trigger = wrap.querySelector('.gs-dd__trigger');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function gsDdToggle(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  if (wrap.classList.contains('is-open')) gsDdClose(id);
  else gsDdOpen(id);
}

/* ── Filter (search within list) ─────────────────────────────────── */
function gsDdFilter(id, query) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var q       = (query || '').toLowerCase().trim();
  var items   = wrap.querySelectorAll('.gs-dd__item:not(.is-disabled)');
  var visible = 0;
  items.forEach(function(item) {
    var text  = (item.querySelector('.gs-dd__item-text') || item).textContent.toLowerCase();
    var match = !q || text.indexOf(q) > -1;
    item.classList.toggle('is-hidden', !match);
    if (match) visible++;
  });
  // Show/hide empty state
  var empty = wrap.querySelector('.gs-dd__empty');
  if (empty) empty.style.display = visible === 0 ? '' : 'none';
}

/* ── Single select ───────────────────────────────────────────────── */
function gsDdSelect(id, label) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  // Update display
  var display = wrap.querySelector('.gs-dd__display');
  if (display) {
    display.textContent = label;
    display.classList.remove('is-placeholder');
  }
  wrap.classList.add('has-value');
  // Mark selected item
  wrap.querySelectorAll('.gs-dd__item').forEach(function(item) {
    var itemText = item.querySelector('.gs-dd__item-text');
    var match = itemText && itemText.textContent.trim() === label;
    item.classList.toggle('is-selected', match);
  });
  gsDdClose(id);
}

/* ── Clear ───────────────────────────────────────────────────────── */
function gsDdClear(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var display = wrap.querySelector('.gs-dd__display');
  if (display) {
    // Restore placeholder text
    var placeholder = wrap.querySelector('.gs-dd__search') && wrap.querySelector('.gs-dd__search').placeholder;
    display.textContent = wrap.querySelector('.gs-dd__trigger').getAttribute('data-placeholder') || 'Select…';
    display.classList.add('is-placeholder');
  }
  wrap.classList.remove('has-value');
  wrap.querySelectorAll('.gs-dd__item').forEach(function(i) { i.classList.remove('is-selected'); });
  // Also clear multi chips
  gsDdClearChips(id);
  gsDdClose(id);
}

/* ── Multi-select (chips inline in trigger — Figma 7111-13865) ─────── */
/* Chips render immediately on toggle; max-height 136px, scrollable     */
function gsDdMultiToggle(id, itemEl, label) {
  var isSelected = itemEl.classList.toggle('is-selected');
  gsDdMultiSyncChips(id);
}

/* Sync all chips in the trigger from the current selection state */
function gsDdMultiSyncChips(id) {
  var wrap      = document.getElementById(id);
  if (!wrap) return;
  var chipsWrap = document.getElementById(id + '-chips') || wrap.querySelector('.gs-dd__chips-wrap');
  if (!chipsWrap) return;

  // Remove existing chips (not placeholder, not search input)
  chipsWrap.querySelectorAll('.gs-dd__chip').forEach(function(c) { c.remove(); });

  // Collect selected items
  var selected = [];
  wrap.querySelectorAll('.gs-dd__item.is-selected').forEach(function(item) {
    var t = item.querySelector('.gs-dd__item-text');
    if (t) selected.push(t.textContent.trim());
  });

  var display = chipsWrap.querySelector('.gs-dd__display');
  var inp     = chipsWrap.querySelector('.gs-dd__search');

  if (selected.length > 0) {
    // Hide placeholder, render one chip per selection (before search input)
    if (display) display.style.display = 'none';
    selected.forEach(function(label) {
      var chip = document.createElement('span');
      chip.className = 'gs-dd__chip';
      chip.setAttribute('data-label', label);
      chip.innerHTML = label +
        '<button class="gs-dd__chip-del" onclick="gsDdMultiRemoveChip(event,\'' + id + '\',this)" ' +
        'aria-label="Remove ' + label.replace(/"/g, '&quot;') + '">\xd7</button>';
      chipsWrap.insertBefore(chip, inp || null);
    });
    wrap.classList.add('has-value');
  } else {
    if (display) display.style.display = '';
    wrap.classList.remove('has-value');
  }
}

/* Remove a single chip and deselect its list item */
function gsDdMultiRemoveChip(event, id, delBtn) {
  event.stopPropagation();
  var chip  = delBtn.closest('.gs-dd__chip');
  var label = chip && chip.getAttribute('data-label');
  if (!label || !chip) return;
  chip.remove();
  // Deselect the matching list item
  var wrap = document.getElementById(id);
  if (wrap) {
    wrap.querySelectorAll('.gs-dd__item.is-selected').forEach(function(item) {
      var t = item.querySelector('.gs-dd__item-text');
      if (t && t.textContent.trim() === label) item.classList.remove('is-selected');
    });
    // Update has-value
    var chipsWrap = document.getElementById(id + '-chips') || wrap.querySelector('.gs-dd__chips-wrap');
    if (chipsWrap) {
      var remaining = chipsWrap.querySelectorAll('.gs-dd__chip');
      var display   = chipsWrap.querySelector('.gs-dd__display');
      if (remaining.length === 0) {
        wrap.classList.remove('has-value');
        if (display) display.style.display = '';
      }
    }
  }
}

function gsDdApply(id) {
  // Chips are already in the trigger — just close the panel
  gsDdClose(id);
}

function gsDdClearChips(id) {
  var wrap = document.getElementById(id);
  if (!wrap) return;
  var chipsWrap = document.getElementById(id + '-chips') || wrap.querySelector('.gs-dd__chips-wrap');
  if (chipsWrap) chipsWrap.querySelectorAll('.gs-dd__chip').forEach(function(c) { c.remove(); });
  // Show placeholder
  var display = chipsWrap && chipsWrap.querySelector('.gs-dd__display');
  if (display) display.style.display = '';
}

/* ── Keyboard navigation ─────────────────────────────────────────── */
function gsDdKeydown(event, id) {
  var key  = event.key;
  var wrap = document.getElementById(id);
  if (!wrap) return;
  if (key === 'Escape') { gsDdClose(id); return; }
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    event.preventDefault();
    var items = Array.from(wrap.querySelectorAll('.gs-dd__item:not(.is-disabled):not(.is-hidden)'));
    if (!items.length) return;
    var active = wrap.querySelector('.gs-dd__item:focus') || wrap.querySelector('.gs-dd__item.is-selected');
    var idx    = items.indexOf(active);
    var next   = key === 'ArrowDown' ? Math.min(idx + 1, items.length - 1) : Math.max(idx - 1, 0);
    if (idx < 0) next = 0;
    items[next] && items[next].focus && items[next].focus();
  }
}

/* ── Close on outside click ──────────────────────────────────────── */
document.addEventListener('click', function(e) {
  if (_gsDdOpenId && !e.target.closest('#' + _gsDdOpenId)) {
    gsDdClose(_gsDdOpenId);
  }
}, true);

/* ── Close on Escape (global) ────────────────────────────────────── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && _gsDdOpenId) gsDdClose(_gsDdOpenId);
});

/* ════════════════════════════════════════════════════════════════════
   TABLE  —  Column Filter, Infinite Scroll, Sticky Columns
════════════════════════════════════════════════════════════════════ */

/* gsTblThClick — route th click: sort only when not in filter mode */
function gsTblThClick(event, th) {
  if (th.classList.contains('is-filtering')) return;
  gsTableSort(th);
}

/* gsTblColSearchOpen — open column search input */
function gsTblColSearchOpen(event, btn) {
  event.stopPropagation();
  var th = btn.closest('th');
  if (!th) return;
  th.classList.add('is-filtering');
  // Overlay mode when column is narrower than the 140px min-width
  if (th.offsetWidth < 140) th.classList.add('tbl-search-overlay');
  gsFloatTipHide(0);
  var inp = th.querySelector('.gs-tf-input');
  if (inp) {
    inp.value = '';
    setTimeout(function(){ inp.focus(); }, 60);
  }
}

/* gsTblColFilter — real-time column filter */
function gsTblColFilter(event, input) {
  var th    = input.closest('th');
  var table = input.closest('table');
  if (!th || !table) return;
  var query  = input.value.toLowerCase().trim();
  var colIdx = parseInt(th.getAttribute('data-col') || '0', 10);
  th.classList.toggle('has-filter', query.length > 0);
  Array.from(table.querySelectorAll('tbody tr:not(.tbl-skeleton-row)'))
    .filter(function(r){ return !r.querySelector('.tbl-inf-sentinel'); })
    .forEach(function(row) {
      var cell = row.cells[colIdx];
      var text = cell ? cell.textContent.toLowerCase() : '';
      row.style.display = (!query || text.indexOf(query) > -1) ? '' : 'none';
    });
}

/* gsTblColSearchClear — clear filter and close search mode */
function gsTblColSearchClear(event, el) {
  event.stopPropagation();
  var th    = el.closest('th');
  var table = el.closest('table');
  if (!th) return;
  var inp = th.querySelector('.gs-tf-input');
  if (inp) inp.value = '';
  if (table) Array.from(table.querySelectorAll('tbody tr'))
    .forEach(function(r){ r.style.display = ''; });
  th.classList.remove('is-filtering', 'has-filter', 'tbl-search-overlay');
}

/* ── Infinite scroll ──────────────────────────────────────────────
   gsTblInitInfiniteScroll(wrapperId, loadMoreFn)
   loadMoreFn(tbody, page) — append rows, return false when done
─────────────────────────────────────────────────────────────────── */
var _tblInfState = {};

function gsTblAddSkeletonRows(tbody, count) {
  var rows = [];
  if (!tbody) return rows;
  var hdr      = tbody.closest('table') && tbody.closest('table').querySelector('thead tr');
  var colCount = hdr ? hdr.cells.length : 4;
  for (var k = 0; k < count; k++) {
    var tr = document.createElement('tr');
    tr.className = 'tbl-skeleton-row';
    var widths = [40,65,55,45,50,60,70,35];
    for (var c = 0; c < colCount; c++) {
      var td = document.createElement('td');
      td.innerHTML = '<div class="tbl-skeleton-cell" style="width:' + widths[c % widths.length] + '%"></div>';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    rows.push(tr);
  }
  return rows;
}

/* gsTblInitStickyScroll — dynamic shadow on sticky-first/last columns based on scroll position */
function gsTblInitStickyScroll(wrapperId) {
  var wrap = document.getElementById(wrapperId);
  if (!wrap) return;
  function update() {
    var sl = wrap.scrollLeft;
    var max = wrap.scrollWidth - wrap.clientWidth;
    wrap.classList.toggle('can-scroll-left',  sl > 1);
    wrap.classList.toggle('can-scroll-right', sl < max - 1);
  }
  wrap.addEventListener('scroll', update, { passive: true });
  // Run once on load so initial state is correct
  setTimeout(update, 60);
}

function gsTblInitInfiniteScroll(wrapperId, loadMoreFn) {
  var wrapper  = document.getElementById(wrapperId);
  var sentinel = wrapper && wrapper.querySelector('.tbl-inf-sentinel');
  if (!wrapper || !sentinel) return;
  var state = _tblInfState[wrapperId] = { page: 1, loading: false, done: false };
  var obs = new IntersectionObserver(function(entries) {
    if (!entries[0].isIntersecting || state.loading || state.done) return;
    state.loading = true;
    // 1. Show 2 skeleton rows for 600ms
    var tbody = wrapper.querySelector('#' + wrapperId.replace('-wrap','-body')) ||
                wrapper.querySelector('tbody');
    var skels = gsTblAddSkeletonRows(tbody, 2);
    setTimeout(function() {
      skels.forEach(function(s){ s.parentNode && s.parentNode.removeChild(s); });
      var result = loadMoreFn(tbody, state.page);
      if (result === false) { state.done = true; obs.disconnect(); }
      else state.page++;
      state.loading = false;
    }, 600);
  }, { root: wrapper, threshold: 0.1 });
  obs.observe(sentinel);
}

/* Demo data loader for tbl-vscroll */
function gsTblDemoLoadMore(tbody, page) {
  if (page > 4) return false;
  var vessels  = ['Torm Freya','MV Pacific Star','Nordic Hawk','STI Virtus','Al Wukir','Ocean Iris'];
  var statuses = ['gs-cs--teal','gs-cs--green','gs-cs--yellow','gs-cs--blue','gs-cs--grey'];
  var labels   = ['Booked','Active','Pending','Auction','Closed'];
  var ports    = ['Singapore','Rotterdam','Dubai','Hamburg','Antwerp'];
  for (var i = 0; i < 5; i++) {
    var tr = document.createElement('tr');
    var idx = (page * 5 + i) % vessels.length;
    var si  = (page + i) % statuses.length;
    tr.innerHTML =
      '<td class="gs-td-link">G' + (6600 - page * 10 - i) + '</td>' +
      '<td class="gs-td-bold">' + vessels[idx] + '</td>' +
      '<td class="gs-td-dim">'  + ports[i % ports.length] + '</td>' +
      '<td><span class="gs-cs ' + statuses[si] + '">' + labels[si] + '</span></td>';
    tbody.appendChild(tr);
  }
  return true;
}

function gsTableInitInfiniteScrollDemo() {
  gsTblInitInfiniteScroll('tbl-vscroll-wrap', function(tbody, page) {
    return gsTblDemoLoadMore(
      document.getElementById('tbl-vscroll-body') || tbody, page
    );
  });
}

/* ── Table Row Selection ─────────────────────────────────────────── */
function gsTblCbSelectAll(cb, tableId) {
  var table = document.getElementById(tableId);
  if (!table) return;
  table.querySelectorAll('.tbl-row-cb').forEach(function(r) {
    r.checked = cb.checked;
    r.closest('tr').classList.toggle('gs-row-selected', cb.checked);
  });
  cb.indeterminate = false;
  _gsTblCbUpdateBar(tableId);
}

function gsTblCbRowToggle(cb, tableId) {
  cb.closest('tr').classList.toggle('gs-row-selected', cb.checked);
  var table = document.getElementById(tableId);
  if (!table) return;
  var all = table.querySelectorAll('.tbl-row-cb');
  var checked = table.querySelectorAll('.tbl-row-cb:checked');
  var hdr = document.getElementById('tbl-sel-all');
  if (hdr) {
    if (checked.length === 0) { hdr.checked = false; hdr.indeterminate = false; }
    else if (checked.length === all.length) { hdr.checked = true; hdr.indeterminate = false; }
    else { hdr.checked = false; hdr.indeterminate = true; }
  }
  _gsTblCbUpdateBar(tableId);
}

function gsTblCbRowClick(event, row, tableId) {
  if (event.target.closest('.gs-cb-wrap')) return;
  var cb = row.querySelector('.tbl-row-cb');
  if (cb) { cb.checked = !cb.checked; gsTblCbRowToggle(cb, tableId); }
}

function gsTblCbClear(tableId) {
  var table = document.getElementById(tableId);
  if (!table) return;
  table.querySelectorAll('.tbl-row-cb').forEach(function(cb) {
    cb.checked = false;
    cb.closest('tr').classList.remove('gs-row-selected');
  });
  var hdr = document.getElementById('tbl-sel-all');
  if (hdr) { hdr.checked = false; hdr.indeterminate = false; }
  _gsTblCbUpdateBar(tableId);
}

function _gsTblCbUpdateBar(tableId) {
  var table = document.getElementById(tableId);
  if (!table) return;
  var count = table.querySelectorAll('.tbl-row-cb:checked').length;
  var bar = document.getElementById('tbl-select-bar');
  var countEl = document.getElementById('tbl-select-count');
  var wrap = document.getElementById('tbl-sel-wrap');
  if (!bar) return;
  if (countEl) countEl.textContent = count;
  if (count > 0) {
    bar.style.display = 'flex';
    if (wrap) { wrap.style.borderTopLeftRadius = '0'; wrap.style.borderTopRightRadius = '0'; wrap.style.borderTop = 'none'; }
  } else {
    bar.style.display = 'none';
    if (wrap) { wrap.style.borderTopLeftRadius = ''; wrap.style.borderTopRightRadius = ''; wrap.style.borderTop = ''; }
  }
}

/* ── Inline Editable Table ───────────────────────────────────────── */
function gsTblIfeAddRow(bodyId) {
  var tbody = document.getElementById(bodyId);
  if (!tbody) return;
  var rows = tbody.querySelectorAll('tr');
  var template = rows[rows.length - 1];
  var newRow = template.cloneNode(true);
  newRow.querySelectorAll('input').forEach(function(inp) { inp.value = ''; });
  newRow.querySelectorAll('select').forEach(function(sel) { sel.value = ''; });
  tbody.appendChild(newRow);
}

// ── Menu tab switching ─────────────────────────────────────────────────────
function mnToggleSubmenu(headerId) {
  var header = document.getElementById(headerId);
  if (!header) return;
  var parent = header.closest('.mn-demo-submenu');
  if (!parent) return;
  var isOpen = parent.classList.toggle('is-open');
  var arrow = header.querySelector('.mn-demo-arrow');
  if (arrow) arrow.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
  var list = parent.querySelector('.mn-demo-sub-list');
  if (list) list.style.display = isOpen ? 'block' : 'none';
}

function switchMenuTab(tab) {
  var page = document.getElementById('page-content');
  if (!page) return;
  page.querySelectorAll('.mn-tab-btn').forEach(function(b) { b.classList.remove('active'); });
  page.querySelectorAll('.mn-tab-pane').forEach(function(p) { p.classList.remove('active'); });
  var pane = document.getElementById('mn-tab-' + tab);
  if (pane) pane.classList.add('active');
  var btn = page.querySelector('.mn-tab-btn[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

function gsTblIfeDelRow(btn) {
  var tbody = btn.closest('tbody');
  if (!tbody) return;
  if (tbody.querySelectorAll('tr').length <= 1) return;
  btn.closest('tr').remove();
}
