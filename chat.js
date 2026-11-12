/* ============================================================
   "ASK YIADOM" — the website chat assistant.
   Answers come from the till (till.yiadomdecorpalace.com/api/public/chat), which asks Claude using the
   catalogue. Only shown when "Website chat assistant" is switched on in the till's Setup.
   The conversation is kept in this browser tab only (sessionStorage) and is not saved by the shop.
   ============================================================ */
(() => {
  const URL_CHAT = "https://till.yiadomdecorpalace.com/api/public/chat";
  const KEY = "ydp.chat";
  const el = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ghs = n => "GH₵ " + Number(n).toLocaleString("en-GH", { maximumFractionDigits: 2 });
  const byCode = code => (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).find(p => p.code === code);
  const read = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || "[]") || []; } catch { return []; } };
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(log.slice(-24))); } catch {} };
  const STARTERS = ["Plants for my living room", "Vases under GH₵ 400", "Something for an office entrance", "How do I order?"];
  let log = read(), sending = false;

  const start = () => (typeof loadLivePrices === "function" ? loadLivePrices() : Promise.resolve(false)).then(() => {
    if (typeof CHAT_ON === "undefined" || !CHAT_ON) return;
    build();
  });

  function build() {
    const btn = document.createElement("button");
    btn.className = "chat-float"; btn.type = "button"; btn.id = "chatBtn";
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "chatPanel");
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 6.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm5 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm5 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Z"/></svg><span>Ask Yiadom</span>`;
    const panel = document.createElement("section");
    panel.className = "chat"; panel.id = "chatPanel"; panel.setAttribute("aria-label", "Ask Yiadom chat"); panel.hidden = true;
    panel.innerHTML = `
      <header class="chat__head">
        <div><strong>Ask Yiadom</strong><span>Our shop assistant · answers in seconds</span></div>
        <button class="chat__x" type="button" id="chatClose" aria-label="Close chat">×</button>
      </header>
      <div class="chat__body" id="chatBody" aria-live="polite"></div>
      <form class="chat__form" id="chatForm" autocomplete="off">
        <textarea id="chatInput" rows="1" maxlength="800" placeholder="Ask about plants, vases, prices…" aria-label="Your question"></textarea>
        <button class="chat__send" type="submit" aria-label="Send">➤</button>
      </form>
      <p class="chat__fine">Automated assistant — it can make mistakes. For orders and anything urgent, <a href="https://wa.me/233275957777" target="_blank" rel="noopener">WhatsApp 027 595 7777</a>.</p>`;
    document.body.append(btn, panel);
    btn.addEventListener("click", () => (panel.hidden ? openChat() : closeChat()));
    el("#chatClose").addEventListener("click", closeChat);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closeChat(); });
    el("#chatForm").addEventListener("submit", e => { e.preventDefault(); send(el("#chatInput").value); });
    const ta = el("#chatInput");
    ta.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(ta.value); } });
    ta.addEventListener("input", () => { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 120) + "px"; });
    el("#chatBody").addEventListener("click", onBodyClick);
    render();
  }

  function openChat() {
    const p = el("#chatPanel"); p.hidden = false; el("#chatBtn").setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("chat-open");
    render(); setTimeout(() => el("#chatInput").focus(), 50);
  }
  function closeChat() {
    el("#chatPanel").hidden = true; el("#chatBtn").setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("chat-open"); el("#chatBtn").focus();
  }

  // Assistant text: escaped, **bold** kept, [CODE] shown as a small code tag, line breaks kept.
  const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\[([A-Za-z]{2,6}-[A-Za-z0-9]{2,6})\]/g, '<span class="chat__code">$1</span>').replace(/\n/g, "<br>");

  function card(code) {
    const p = byCode(code); if (!p) return "";
    const price = typeof p.salePrice === "number" ? `<s>${ghs(p.price)}</s> ${ghs(p.salePrice)}` : typeof p.price === "number" ? ghs(p.price) : esc(p.price || "");
    const canAdd = window.YDPOrder && window.YDPOrder.canAdd(code);
    const wa = `https://wa.me/233275957777?text=${encodeURIComponent(`Hello! I'm interested in ${p.name} (${p.code}).`)}`;
    return `<div class="chat__card"><img src="${esc(imgSrc(p))}" alt="" loading="lazy">
      <div><span class="chat__code">${esc(p.code)}</span><b>${esc(p.name)}</b><span class="chat__price">${price}${p.unit ? " / " + esc(p.unit) : ""}</span>
      ${canAdd ? `<button type="button" class="chat__add" data-add="${esc(p.code)}">Add to order</button>` : `<a class="chat__add chat__add--wa" href="${wa}" target="_blank" rel="noopener">Ask on WhatsApp</a>`}</div></div>`;
  }

  function render() {
    const body = el("#chatBody"); if (!body) return;
    let h = `<div class="chat__msg chat__msg--bot">Hello! I'm the Yiadom Decor Palace assistant. Tell me about your space and I'll suggest plants, vases or flowers — or ask about prices and ordering.</div>`;
    if (!log.length) h += `<div class="chat__starters">${STARTERS.map(s => `<button type="button" data-ask="${esc(s)}">${esc(s)}</button>`).join("")}</div>`;
    for (const m of log) {
      if (m.role === "user") h += `<div class="chat__msg chat__msg--me">${esc(m.text)}</div>`;
      else h += `<div class="chat__msg chat__msg--bot">${fmt(m.text)}</div>${(m.products || []).length ? `<div class="chat__cards">${m.products.map(card).join("")}</div>` : ""}`;
    }
    if (sending) h += `<div class="chat__msg chat__msg--bot chat__typing" aria-label="Typing"><i></i><i></i><i></i></div>`;
    body.innerHTML = h;
    body.scrollTop = body.scrollHeight;
  }

  async function send(text) {
    text = String(text || "").trim();
    if (!text || sending) return;
    el("#chatInput").value = ""; el("#chatInput").style.height = "auto";
    log.push({ role: "user", text }); sending = true; save(); render();
    try {
      const r = await fetch(URL_CHAT, { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: log.filter(m => !m.error).slice(-12).map(m => ({ role: m.role, text: m.text })) }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.reply) throw new Error(d.error || "Sorry, I couldn't answer just now. Please WhatsApp us on 027 595 7777.");
      log.push({ role: "assistant", text: d.reply, products: d.products || [] });
    } catch (x) {
      log.push({ role: "assistant", text: (x && x.message) || "Sorry, I couldn't answer just now. Please WhatsApp us on 027 595 7777.", error: true });
      if (log.length >= 2 && log[log.length - 2].role === "user") log[log.length - 2].error = true;   // don't resend a failed turn
    }
    sending = false; save(); render();
  }

  function onBodyClick(e) {
    const ask = e.target.closest("[data-ask]");
    if (ask) return send(ask.dataset.ask);
    const add = e.target.closest("[data-add]");
    if (add && window.YDPOrder) {
      if (window.YDPOrder.add(add.dataset.add, 1)) {
        add.textContent = "Added ✓ · View order"; add.dataset.view = "1"; delete add.dataset.add;
      } else add.textContent = "Not available online";
      return;
    }
    const view = e.target.closest("[data-view]");
    if (view && window.YDPOrder) { closeChat(); window.YDPOrder.open(); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
