(() => {
  const id = 'G-EGQHQTY80V';
  const key = 'frikandellenstad-statistieken';
  let choice;
  try { choice = localStorage.getItem(key); } catch {}
  let started = false;
  function enableAnalytics() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', id, {allow_google_signals: false, allow_ad_personalization_signals: false});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  const panel = document.createElement('aside');
  panel.setAttribute('aria-label', 'Bezoekersstatistieken');
  panel.style.cssText = 'position:fixed;bottom:12px;left:12px;z-index:9999;max-width:min(360px,calc(100vw - 24px));box-sizing:border-box;padding:16px;background:white;color:#222;border:1px solid #aaa;border-radius:10px;box-shadow:0 2px 12px #0003;font:16px/1.4 system-ui';
  const message = document.createElement('p');
  message.style.margin = '0 0 10px';
  message.textContent = 'Mag Frikandellenstad Google Analytics gebruiken om bezoeken en paginaweergaven te tellen? Je kunt je keuze onderaan de pagina wijzigen.';
  panel.append(message);
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.textContent = 'Bezoekersstatistieken instellen';
  settings.onclick = () => { panel.hidden = false; panel.querySelector('button').focus(); };
  for (const [label, value] of [['Toestaan', 'ja'], ['Weigeren', 'nee']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.style.cssText = 'cursor:pointer;padding:6px 12px;margin-right:8px';
    button.onclick = () => {
      try { localStorage.setItem(key, value); } catch {}
      window['ga-disable-' + id] = value === 'nee';
      if (value === 'ja') enableAnalytics();
      panel.hidden = true;
      if (panel.contains(document.activeElement)) settings.focus({preventScroll:true});
    };
    panel.append(button);
  }
  (document.querySelector('footer') || document.body).append(settings);
  document.body.append(panel);
  panel.hidden = choice === 'ja' || choice === 'nee';
  if (choice === 'ja') enableAnalytics();
})();