/* Radar de Oferta: funil do site (20/11/2026, Fabricio: "quando a pessoa clicar para comprar ou entrar,
   ficar recebendo ofertas").
   1) Quem toca numa oferta e volta da loja ve o convite para receber as proximas (grupo, canal, Telegram).
   2) Quem rola a vitrine e ainda nao entrou ve uma barra discreta no rodape.
   Regras: no maximo 1 convite por dia, para de vez depois de 3 "Agora nao", some por 90 dias depois que a
   pessoa toca em qualquer convite. Nada sai do aparelho: o estado fica so no localStorage.
   Gerado por pagina/gerar_paginas.py a partir de pagina/funil_modelo.js (nao editar pagina/funil.js). */
(function () {
  var GRUPO = "https://chat.whatsapp.com/GlYLxnTKPGBANX3SIshXVh", CANAL = "https://whatsapp.com/channel/0029VbEAzmO6GcGJVEc9Oh3K", TG = "https://t.me/radardeofertabra";
  var CHAVE = "radar_funil", DIA = 864e5;
  if (!window.addEventListener || !document.querySelector) return;

  function ler() { try { return JSON.parse(localStorage.getItem(CHAVE) || "{}") || {}; } catch (e) { return {}; } }
  function gravar() { try { localStorage.setItem(CHAVE, JSON.stringify(st)); } catch (e) {} }
  var st = ler();
  function agora() { return Date.now(); }
  function entrou() { return st.entrou && agora() - st.entrou < 90 * DIA; }
  function cansou() { return (st.nao || 0) >= 3; }
  function medir(ga, d, fb, dfb) {
    try { if (window.gtag) window.gtag("event", ga, d || {}); } catch (e) {}
    try { if (fb && window.fbq) window.fbq("track", fb, dfb || {}); } catch (e) {}
  }
  function marcarEntrada(origem, canal) {
    st.entrou = agora(); gravar();
    if (canal === "grupo") medir("generate_lead", {lead_source: "grupo_whatsapp", grupo: "Achados", origem: origem, pagina: location.pathname}, "Lead", {content_name: "Achados", content_category: origem});
    else medir("entrar_canal", {canal: canal, origem: origem, pagina: location.pathname}, "Contact", {content_name: canal, content_category: origem});
  }

  var ZAP = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>';
  var CSS = ".rf-fundo{position:fixed;inset:0;background:rgba(4,18,12,.62);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:9998;animation:rfF .25s ease both}"
    + ".rf-folha{position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:min(440px,100%);z-index:9999;box-sizing:border-box;color:#f4f7ff;font:400 15px/1.45 Inter,system-ui,sans-serif;"
    + "background:radial-gradient(120% 80% at 50% 0%,rgba(43,255,177,.18),transparent 60%),#04120c;border:1px solid rgba(255,255,255,.12);border-bottom:0;border-radius:26px 26px 0 0;"
    + "padding:26px 20px calc(18px + env(safe-area-inset-bottom,0px));box-shadow:0 -30px 80px -20px rgba(43,255,177,.35);animation:rfS .38s cubic-bezier(.2,.9,.25,1.1) both;text-align:center}"
    + "@media (min-width:700px){.rf-folha{bottom:24px;border-radius:26px;border-bottom:1px solid rgba(255,255,255,.12)}}"
    + ".rf-x{position:absolute;right:12px;top:10px;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.07);color:#b9c9c1;font:400 22px/1 Inter,system-ui,sans-serif;cursor:pointer}"
    + ".rf-radar{width:62px;height:62px;margin:0 auto 10px;border-radius:50%;position:relative;background:radial-gradient(circle,rgba(43,255,177,.25),transparent 70%)}"
    + ".rf-radar::before,.rf-radar::after{content:'';position:absolute;inset:8px;border-radius:50%;border:2px solid #2bffb1;opacity:.5;animation:rfO 1.8s ease-out infinite}"
    + ".rf-radar::after{animation-delay:.9s;border-color:#2bffb1}.rf-radar i{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px;border-radius:50%;background:#ffb020;box-shadow:0 0 18px #ffb020}"
    + ".rf-rot{margin:0;color:#2bffb1;font:700 11.5px Inter,system-ui,sans-serif;letter-spacing:.09em;text-transform:uppercase}"
    + ".rf-folha h2{margin:6px 0 8px;color:#fff;font:900 21px/1.15 Unbounded,system-ui,sans-serif;letter-spacing:-.01em}"
    + ".rf-sub{margin:0 0 16px;color:#b9c9c1;font-size:14px}"
    + ".rf-b{display:flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;font:700 16px Inter,system-ui,sans-serif;color:#04140e;background:linear-gradient(90deg,#2bffb1,#2bffb1);border-radius:999px;padding:15px 18px}"
    + ".rf-b svg{width:20px;height:20px}"
    + ".rf-dois{display:flex;gap:8px;margin-top:8px}.rf-dois a{flex:1;text-decoration:none;color:#fff;font:600 14px Inter,system-ui,sans-serif;border-radius:999px;padding:11px 8px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}"
    + ".rf-nao{margin-top:12px;background:none;border:0;color:#b9c9c1;font:500 14px Inter,system-ui,sans-serif;text-decoration:underline;cursor:pointer;padding:6px}"
    + ".rf-barra{position:fixed;left:50%;bottom:calc(12px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:9990;display:flex;align-items:center;gap:6px;max-width:calc(100% - 24px);box-sizing:border-box;"
    + "background:#04120c;border:1px solid rgba(43,255,177,.35);border-radius:999px;padding:6px 6px 6px 14px;box-shadow:0 14px 40px -10px rgba(0,0,0,.7);font:600 14px Inter,system-ui,sans-serif;color:#f4f7ff;animation:rfS .4s ease both}"
    + ".rf-barra span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rf-barra a{flex:none;display:flex;align-items:center;gap:6px;text-decoration:none;color:#04140e;background:linear-gradient(90deg,#2bffb1,#2bffb1);border-radius:999px;padding:9px 14px;font-weight:700}"
    + ".rf-barra a svg{width:17px;height:17px}.rf-barra button{flex:none;width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:#b9c9c1;font:400 20px/1 Inter,system-ui,sans-serif;cursor:pointer}"
    + "@keyframes rfF{from{opacity:0}}@keyframes rfS{from{opacity:0;transform:translate(-50%,40px)}}@keyframes rfO{from{transform:scale(.4);opacity:.9}to{transform:scale(1.35);opacity:0}}"
    + "@media (prefers-reduced-motion:reduce){.rf-fundo,.rf-folha,.rf-barra,.rf-radar::before,.rf-radar::after{animation:none}}";
  var estilo = document.createElement("style"); estilo.textContent = CSS; document.head.appendChild(estilo);

  function el(tag, cls, html) { var x = document.createElement(tag); if (cls) x.className = cls; if (html != null) x.innerHTML = html; return x; }
  function link(href, cls, html, canal) {
    var a = el("a", cls, html); a.href = href; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("data-rf", canal); return a;
  }

  /* 1) convite depois do toque na oferta */
  var aberto = null, pendente = null, antes = null;
  function fechar(recusou) {
    if (!aberto) return;
    if (recusou) { st.nao = (st.nao || 0) + 1; gravar(); medir("funil_recusa", {vezes: st.nao}); }
    aberto.f.remove(); aberto.d.remove(); aberto = null;
    document.removeEventListener("keydown", tecla);
    if (antes && antes.focus) try { antes.focus(); } catch (e) {}
  }
  function tecla(ev) { if (ev.key === "Escape") fechar(true); }
  function abrir() {
    var p = pendente; pendente = null;
    if (!p || aberto || entrou() || cansou()) return;
    if (st.ultimo && agora() - st.ultimo < DIA) return;
    if (!GRUPO && !CANAL && !TG) return;
    st.ultimo = agora(); gravar();
    esconderBarra();
    var d = el("div", "rf-fundo"), f = el("div", "rf-folha");
    f.setAttribute("role", "dialog"); f.setAttribute("aria-modal", "true"); f.setAttribute("aria-labelledby", "rf-t");
    var x = el("button", "rf-x", "&times;"); x.type = "button"; x.setAttribute("aria-label", "Fechar"); f.appendChild(x);
    f.appendChild(el("div", "rf-radar", "<i></i>"));
    f.appendChild(el("p", "rf-rot", "Enquanto você confere na loja"));
    var h = el("h2"); h.id = "rf-t"; h.textContent = "Quer receber as próximas quedas de preço?"; f.appendChild(h);
    f.appendChild(el("p", "rf-sub", "O Radar acompanha o preço todo dia e avisa quando cai de verdade. Desconto falso não entra. Só a administração posta e você sai quando quiser."));
    var principal = GRUPO ? link(GRUPO, "rf-b", ZAP + "Receber no grupo do WhatsApp", "grupo") : link(CANAL, "rf-b", ZAP + "Receber no canal do WhatsApp", "canal_whatsapp");
    f.appendChild(principal);
    var dois = el("div", "rf-dois");
    if (GRUPO && CANAL) dois.appendChild(link(CANAL, "", "Canal do WhatsApp", "canal_whatsapp"));
    if (TG) dois.appendChild(link(TG, "", "Telegram", "telegram"));
    if (dois.children.length) f.appendChild(dois);
    var nao = el("button", "rf-nao", "Agora não"); nao.type = "button"; f.appendChild(nao);
    f.addEventListener("click", function (ev) {
      var a = ev.target.closest && ev.target.closest("a[data-rf]");
      if (a) { ev.stopPropagation(); marcarEntrada("pos_clique", a.getAttribute("data-rf")); setTimeout(function () { fechar(false); }, 300); }
    });
    x.addEventListener("click", function () { fechar(true); });
    nao.addEventListener("click", function () { fechar(true); });
    d.addEventListener("click", function () { fechar(true); });
    antes = document.activeElement;
    document.body.appendChild(d); document.body.appendChild(f);
    aberto = {f: f, d: d};
    document.addEventListener("keydown", tecla);
    try { principal.focus({preventScroll: true}); } catch (e) {}
    medir("view_promotion", {promotion_name: "convite_pos_clique", items: [{item_name: p.t}]});
  }

  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("a");
    if (!a || !a.href || a.hasAttribute("data-rf")) return;
    var h = a.href;
    if (/chat\.whatsapp\.com|whatsapp\.com\/channel|t\.me\//.test(h)) { st.entrou = agora(); gravar(); esconderBarra(); return; }
    if ((a.getAttribute("rel") || "").indexOf("sponsored") > -1) {
      var art = a.closest("article"), t = a.getAttribute("data-t") || (art && art.querySelector("h2,h3") ? art.querySelector("h2,h3").textContent : "");
      pendente = {t: (t || "").slice(0, 60), quando: agora(), saiu: false};
      /* se a loja abriu sem tirar a pessoa da pagina (janela por cima, bloqueio), mostra mesmo assim */
      setTimeout(function () { if (pendente && !pendente.saiu && document.visibilityState === "visible") abrir(); }, 3500);
    }
  }, true);
  document.addEventListener("visibilitychange", function () {
    if (!pendente) return;
    if (document.visibilityState === "hidden") pendente.saiu = true;
    else if (pendente.saiu) setTimeout(abrir, 450);
  });
  window.addEventListener("pageshow", function (ev) { if (ev.persisted && pendente) setTimeout(abrir, 450); });

  /* 2) barra discreta para quem esta olhando a vitrine */
  var barra = null, inicio = agora();
  function esconderBarra() { if (barra) { barra.remove(); barra = null; } }
  function talvezBarra() {
    if (barra || aberto || entrou() || cansou()) return;
    if (st.barra && agora() - st.barra < 3 * DIA) return;
    if (agora() - inicio < 15000 || window.scrollY < window.innerHeight * 1.2) return;
    var href = GRUPO || CANAL; if (!href) return;
    barra = el("div", "rf-barra");
    barra.appendChild(el("span", "", "📡 Ofertas no seu WhatsApp"));
    var a = link(href, "", ZAP + "Entrar", GRUPO ? "grupo" : "canal_whatsapp"); barra.appendChild(a);
    var x = el("button", "", "&times;"); x.type = "button"; x.setAttribute("aria-label", "Fechar"); barra.appendChild(x);
    a.addEventListener("click", function (ev) { ev.stopPropagation(); marcarEntrada("barra", a.getAttribute("data-rf")); esconderBarra(); });
    x.addEventListener("click", function () { st.barra = agora(); gravar(); esconderBarra(); medir("funil_barra_fechada", {}); });
    document.body.appendChild(barra);
  }
  var tBarra = null;
  window.addEventListener("scroll", function () { if (!tBarra) tBarra = setTimeout(function () { tBarra = null; talvezBarra(); }, 400); }, {passive: true});
  setTimeout(talvezBarra, 16000);
})();
