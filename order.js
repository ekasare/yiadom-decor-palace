/* ============================================================
   ONLINE ORDERING — basket and checkout.
   Orders go straight into the till (till.yiadomdecorpalace.com) as "online orders":
   the items are set aside at the chosen store (delivery comes from the Warehouse)
   and the customer pays when they collect or on delivery.
   Only shown when online ordering is switched on in the till's Setup.
   ============================================================ */
(() => {
  const ORDER_URL = "https://till.yiadomdecorpalace.com/api/public/orders";
  const KEY = "ydp.basket";
  const el = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ghs = n => "GH₵ " + Number(n).toLocaleString("en-GH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter(l => l && l.code && l.qty > 0); } catch { return []; } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch {} };
  const byCode = code => PRODUCTS.find(p => p.code === code);
  const priceOf = p => (typeof p.salePrice === "number" ? p.salePrice : p.price);
  const canOrder = p => p && typeof p.price === "number" && p.avail && Object.values(p.avail).some(n => n > 0);
  let basket = load(), place = null, orderId = null, sending = false;

  loadLivePrices().then(() => {
    if (!ORDERING.on) return;
    basket = basket.filter(l => canOrder(byCode(l.code)));
    place = place || (ORDERING.pickup[0] && ORDERING.pickup[0].loc) || "delivery";
    build();
  });

  function build() {
    // Floating basket button (bottom left; WhatsApp stays bottom right)
    document.body.insertAdjacentHTML("beforeend", `
      <button class="basket-float" id="basketBtn" aria-label="Your order" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 4H2v2h2l3.6 7.6-1.4 2.5A2 2 0 0 0 8 19h12v-2H8.4l1.1-2h7.5a2 2 0 0 0 1.8-1.1l3.6-6.5A1 1 0 0 0 21.5 6H6.2l-1-2Z"/></svg><span id="basketCount">0</span></button>
      <div class="basket" id="basket" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="basketTitle"><div class="basket__panel" id="basketPanel"></div></div>`);
    el("#basketBtn").addEventListener("click", open);
    el("#basket").addEventListener("click", e => { if (e.target.id === "basket") close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && el("#basket").classList.contains("is-open")) close(); });
    // "Add to order" inside the product pop-up
    const wa = el("#lbWa");
    wa.insertAdjacentHTML("beforebegin", `<div class="lb-order" id="lbOrder"><div class="lb-order__row"><div class="qty-pick"><button type="button" id="lbMinus" aria-label="One less">−</button><input id="lbQty" type="number" min="1" max="20" value="1" aria-label="Quantity"><button type="button" id="lbPlus" aria-label="One more">+</button></div><button type="button" class="btn btn--gold" id="lbAdd">Add to order</button></div><p class="lb-order__avail" id="lbAvail"></p></div>`);
    wa.classList.remove("btn--gold"); wa.classList.add("btn--ghost-dark");
    el("#lbMinus").addEventListener("click", () => { el("#lbQty").value = Math.max(1, (+el("#lbQty").value || 1) - 1); });
    el("#lbPlus").addEventListener("click", () => { el("#lbQty").value = Math.min(20, (+el("#lbQty").value || 1) + 1); });
    el("#lbAdd").addEventListener("click", () => { const p = visible[current]; add(p.code, Math.max(1, Math.min(20, Math.floor(+el("#lbQty").value || 1)))); });
    new MutationObserver(() => { if (el("#lightbox").classList.contains("is-open")) showInLightbox(); }).observe(el("#lightbox"), { attributes: true, attributeFilter: ["class"] });
    // Product pop-up arrows change the product without closing: refresh on those too
    ["#lbPrev", "#lbNext"].forEach(s => el(s) && el(s).addEventListener("click", () => setTimeout(showInLightbox, 0)));
    refreshButton();
  }
  function where(p) {
    const a = p.avail || {}, out = ORDERING.pickup.filter(s => a[s.loc] > 0).map(s => s.name);
    if (a[ORDERING.deliveryFrom] > 0) out.push("delivery");
    return out;
  }
  function showInLightbox() {
    const p = visible[current], box = el("#lbOrder");
    if (!p || !box) return;
    el("#lbQty").value = 1;
    if (canOrder(p)) { box.hidden = false; el("#lbAdd").disabled = false; el("#lbAvail").textContent = "Available for " + where(p).map(w => w === "delivery" ? "delivery in Kumasi" : "pickup at " + w).join(", ") + ". Pay when you collect or on delivery."; }
    else { box.hidden = typeof p.price !== "number"; el("#lbAdd").disabled = true; el("#lbAvail").textContent = "Not in stock to order online right now. Ask us on WhatsApp."; }
  }
  function add(code, qty) {
    const ex = basket.find(l => l.code === code);
    if (ex) ex.qty = Math.min(ORDERING.maxQty || 20, ex.qty + qty); else basket.push({ code, qty });
    orderId = null; save(); refreshButton();
    const b = el("#basketBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    el("#lbAdd").textContent = "Added ✓"; setTimeout(() => { const a = el("#lbAdd"); if (a) a.textContent = "Add to order"; }, 1400);
  }
  function refreshButton() {
    const n = basket.reduce((a, l) => a + l.qty, 0);
    el("#basketBtn").hidden = !n; el("#basketCount").textContent = n;
  }
  const srcLoc = () => (place === "delivery" ? ORDERING.deliveryFrom : place);
  const placeName = () => (place === "delivery" ? "delivery" : (ORDERING.pickup.find(s => s.loc === place) || {}).name);
  function open() { render(); const b = el("#basket"); b.classList.add("is-open"); b.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function close() { const b = el("#basket"); b.classList.remove("is-open"); b.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  function totals() {
    const sub = basket.reduce((a, l) => { const p = byCode(l.code); return a + (p ? priceOf(p) * l.qty : 0); }, 0);
    const fee = place === "delivery" && ORDERING.deliveryFee > 0 ? ORDERING.deliveryFee : 0;
    return { sub, fee, total: sub + fee };
  }
  function problems() {
    const loc = srcLoc();
    return basket.map(l => { const p = byCode(l.code), have = p && p.avail ? p.avail[loc] || 0 : 0; return have < l.qty ? { code: l.code, name: p ? p.name : l.code, have } : null; }).filter(Boolean);
  }
  function render(form = {}) {
    const t = totals(), short = problems(), panel = el("#basketPanel");
    if (!basket.length) {
      panel.innerHTML = `<button class="basket__close" data-close aria-label="Close">×</button><h3 id="basketTitle">Your order</h3><p class="basket__empty">Your order is empty. Open a product and tap <b>Add to order</b>.</p>`;
      panel.querySelector("[data-close]").addEventListener("click", close); return;
    }
    panel.innerHTML = `<button class="basket__close" data-close aria-label="Close">×</button>
      <h3 id="basketTitle">Your order</h3>
      <ul class="basket__lines">${basket.map(l => { const p = byCode(l.code); if (!p) return ""; const bad = short.find(x => x.code === l.code);
        return `<li><img src="images/${esc(p.img)}.jpg" alt=""><div><b>${esc(p.name)}</b><span>${p.code} · ${typeof p.salePrice === "number" ? `<s>${ghs(p.price)}</s> ` : ""}${ghs(priceOf(p))}${p.unit ? " / " + esc(p.unit) : ""}</span>
          ${bad ? `<em>Only ${bad.have} available for ${esc(placeName())}</em>` : ""}</div>
          <div class="qty-pick small"><button type="button" data-dec="${esc(l.code)}" aria-label="One less">−</button><span>${l.qty}</span><button type="button" data-inc="${esc(l.code)}" aria-label="One more">+</button></div>
          <strong>${ghs(priceOf(p) * l.qty)}</strong></li>`; }).join("")}</ul>
      <form class="basket__form" id="basketForm" novalidate>
        <fieldset><legend>How do you want to get it?</legend>
          ${ORDERING.pickup.map(s => `<label class="opt"><input type="radio" name="place" value="${esc(s.loc)}"${place === s.loc ? " checked" : ""}> <span>Collect at our <b>${esc(s.name)}</b> store</span></label>`).join("")}
          <label class="opt"><input type="radio" name="place" value="delivery"${place === "delivery" ? " checked" : ""}> <span><b>Delivery</b>: ${esc(ORDERING.deliveryNote || "within Kumasi")}${ORDERING.deliveryFee > 0 ? ` (${ghs(ORDERING.deliveryFee)})` : " (fee confirmed by phone)"}</span></label>
        </fieldset>
        <label>Your name<input name="name" autocomplete="name" required value="${esc(form.name || "")}"></label>
        <label>Phone number (WhatsApp if you have it)<input name="phone" type="tel" autocomplete="tel" placeholder="024 123 4567" required value="${esc(form.phone || "")}"></label>
        ${place === "delivery" ? `<label>Delivery address or landmark<textarea name="address" rows="2" required>${esc(form.address || "")}</textarea></label>` : ""}
        <label>Note (optional)<input name="note" maxlength="300" placeholder="e.g. best time to call" value="${esc(form.note || "")}"></label>
        <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="basket__sum"><span>Items</span><span>${ghs(t.sub)}</span></div>
        ${place === "delivery" ? `<div class="basket__sum"><span>Delivery</span><span>${t.fee ? ghs(t.fee) : "confirmed by phone"}</span></div>` : ""}
        <div class="basket__sum basket__total"><span>To pay ${place === "delivery" ? "on delivery" : "when you collect"}</span><span>${ghs(t.total)}</span></div>
        <p class="basket__msg" id="basketMsg" ${short.length ? "" : "hidden"}>${short.length ? `Some items aren't available in that quantity for ${esc(placeName())}. Lower the quantity or choose another option.` : ""}</p>
        <button class="btn btn--gold basket__go" type="submit"${short.length ? " disabled" : ""}>Place order</button>
        <p class="basket__small">No payment now. We'll call you to confirm, then you pay by cash, MoMo or card when you collect or on delivery.</p>
      </form>`;
    const f = el("#basketForm");
    const keep = () => ({ name: f.name.value, phone: f.phone.value, address: f.address ? f.address.value : form.address, note: f.note.value });
    panel.querySelector("[data-close]").addEventListener("click", close);
    panel.querySelectorAll("[data-inc],[data-dec]").forEach(b => b.addEventListener("click", () => {
      const code = b.dataset.inc || b.dataset.dec, l = basket.find(x => x.code === code);
      l.qty += b.dataset.inc ? 1 : -1; l.qty = Math.min(ORDERING.maxQty || 20, l.qty);
      if (l.qty <= 0) basket = basket.filter(x => x !== l);
      orderId = null; save(); refreshButton(); render(keep());
    }));
    f.querySelectorAll("input[name=place]").forEach(r => r.addEventListener("change", () => { place = r.value; orderId = null; render(keep()); }));
    f.addEventListener("submit", e => { e.preventDefault(); submit(f, keep()); });
  }
  async function submit(f, form) {
    if (sending) return;
    const msg = el("#basketMsg"), say = t => { msg.hidden = false; msg.textContent = t; };
    if (form.name.trim().length < 2) return say("Please enter your name.");
    if (String(form.phone).replace(/\D/g, "").length < 9) return say("Please enter your phone number.");
    if (place === "delivery" && String(form.address || "").trim().length < 6) return say("Please enter the delivery address or a landmark.");
    sending = true; const btn = f.querySelector(".basket__go"); btn.disabled = true; btn.textContent = "Sending…";
    orderId = orderId || (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "") : Date.now().toString(36) + Math.random().toString(36).slice(2, 14));
    try {
      const r = await fetch(ORDER_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
        id: orderId, name: form.name.trim(), phone: form.phone, fulfilment: place === "delivery" ? "delivery" : "pickup", pickup: place === "delivery" ? undefined : place,
        address: form.address, note: form.note, website: f.website.value, items: basket.map(l => ({ code: l.code, qty: l.qty })) }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { sending = false; if (d.short) d.short.forEach(x => { const p = byCode(x.code); if (p && p.avail) p.avail[srcLoc()] = x.available; }); render(form); el("#basketMsg").hidden = false; el("#basketMsg").textContent = d.error || "Your order couldn't be sent. Please try again."; return; }
      done(d, form);
    } catch {
      sending = false; btn.disabled = false; btn.textContent = "Place order";
      say("No connection. Check your internet and press Place order again — it won't be sent twice.");
    }
  }
  function done(d, form) {
    const lines = basket.map(l => { const p = byCode(l.code); return `${l.qty} x ${p ? p.name : l.code} (${l.code})`; });
    const text = `Hello Yiadom Decor Palace! I placed order ${d.no} on your website:\n${lines.join("\n")}\nTotal ${ghs(d.total)}${d.deliveryFeeLater ? " + delivery" : ""}. ${place === "delivery" ? "Delivery to: " + form.address : "I'll collect at " + d.store + "."}\nName: ${form.name}`;
    basket = []; orderId = null; sending = false; save(); refreshButton();
    el("#basketPanel").innerHTML = `<button class="basket__close" data-close aria-label="Close">×</button>
      <div class="basket__done"><h3 id="basketTitle">Thank you, ${esc(form.name.split(" ")[0])}!</h3>
        <p>Your order number is <b>${esc(d.no)}</b>. We've set your items aside${place === "delivery" ? "" : ` at our <b>${esc(d.store)}</b> store`}.</p>
        <p>We'll call or WhatsApp you on <b>${esc(form.phone)}</b> to confirm. Pay <b>${ghs(d.total)}</b>${d.deliveryFeeLater ? " plus delivery" : ""} by cash, MoMo or card ${place === "delivery" ? "on delivery" : "when you collect"}.</p>
        <a class="btn btn--gold" target="_blank" rel="noopener" href="https://wa.me/${typeof WHATSAPP !== "undefined" ? WHATSAPP : "233275957777"}?text=${encodeURIComponent(text)}">Send my order on WhatsApp</a>
        <button class="btn btn--ghost-dark" data-close type="button">Continue shopping</button></div>`;
    el("#basketPanel").querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", close));
  }
})();
