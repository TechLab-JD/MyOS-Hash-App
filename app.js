// MyOS Hash Generator
const root = document.getElementById('HashApp');
if (root) {
  const algos = ['SHA-1', 'SHA-256', 'SHA-512'], out = document.getElementById('hs-out'), inp = document.getElementById('hs-in');
  out.innerHTML = algos.map(a => '<div class="hs-item"><div class="lbl">' + a + '<button data-a="' + a + '">Copy</button></div><code id="hs-' + a + '">—</code></div>').join('');
  async function run() {
    const data = new TextEncoder().encode(inp.value);
    for (const a of algos) {
      const el = document.getElementById('hs-' + a);
      if (!inp.value) { el.textContent = '—'; continue; }
      try { const buf = await crypto.subtle.digest(a, data); el.textContent = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''); }
      catch (e) { el.textContent = 'unavailable'; }
    }
  }
  inp.addEventListener('input', run);
  out.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const t = document.getElementById('hs-' + b.dataset.a).textContent;
    if (t && t !== '—') { navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {}); b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 900); } });
  run();
}
