/* Faixa "Ver como": aparece em todas as páginas quando o dono está simulando outro usuário (somente leitura). */
(function () {
  var SK = 'pcs_session', OK = 'pcs_session_orig';
  window.pcsExitSim = function () {
    try {
      var cur = JSON.parse(localStorage.getItem(SK) || 'null');
      var orig = localStorage.getItem(OK);
      if (cur && cur.token) { try { fetch('https://script.google.com/macros/s/AKfycbyGtMi4dY_1_eewqbyU8w05JNk9IqPOKFHkwzLGEP1tICwpZSyyswetMA8VA_ZwkI83-A/exec?action=logout&token=' + encodeURIComponent(cur.token)); } catch (e) {} }
      if (orig) localStorage.setItem(SK, orig); else localStorage.removeItem(SK);
      localStorage.removeItem(OK);
    } catch (e) {}
    location.replace('app.html');
  };
  try {
    var s = JSON.parse(localStorage.getItem(SK) || 'null');
    if (!s || !s.sim) return;
    var lang = 'pt'; try { lang = localStorage.getItem('pcs_lang') || 'pt'; } catch (e) {}
    var T = {
      pt: ['👁 Vendo como', 'somente visualização, nada é salvo', 'Sair da simulação'],
      en: ['👁 Viewing as', 'view only, nothing is saved', 'Exit simulation'],
      es: ['👁 Viendo como', 'solo lectura, nada se guarda', 'Salir de la simulación']
    }[lang] || ['👁 Vendo como', 'somente visualização, nada é salvo', 'Sair da simulação'];
    function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function mount() {
      if (document.getElementById('pcs-sim-bar')) return;
      var d = document.createElement('div');
      d.id = 'pcs-sim-bar';
      d.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#b45309;color:#fff;font:600 13px -apple-system,Segoe UI,Roboto,Arial,sans-serif;display:flex;align-items:center;gap:10px;justify-content:space-between;padding:10px 14px calc(10px + env(safe-area-inset-bottom));box-shadow:0 -4px 16px rgba(0,0,0,.25)';
      d.innerHTML = '<span style="line-height:1.35">' + T[0] + ' <b>' + esc(s.simNome || s.nome || '') + '</b><br><span style="font-weight:500;opacity:.9;font-size:12px">' + T[1] + '</span></span>' +
        '<button id="pcs-sim-exit" style="border:none;background:#fff;color:#b45309;font:700 12px inherit;font-family:inherit;border-radius:999px;padding:9px 14px;cursor:pointer;white-space:nowrap">' + T[2] + '</button>';
      document.body.appendChild(d);
      document.body.style.paddingBottom = '80px';
      document.getElementById('pcs-sim-exit').onclick = window.pcsExitSim;
    }
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  } catch (e) {}
})();
