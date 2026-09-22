(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (_) {}
  const apply = (dark) => {
    root.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#101923' : '#f8f9fb';
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.setAttribute('aria-pressed', String(dark));
  };
  apply(saved === 'dark' || (saved !== 'light' && preference.matches));
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    toggle.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      saved = dark ? 'dark' : 'light';
      apply(dark);
      try { localStorage.setItem('portfolio-theme', saved); } catch (_) {}
    });
  });
  preference.addEventListener('change', (event) => {
    if (saved !== 'dark' && saved !== 'light') apply(event.matches);
  });
})();
