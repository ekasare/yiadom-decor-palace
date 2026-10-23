/* ============================================================
   EDIT HERE — shop settings
   ============================================================ */

// Grand Opening date & time (Ghana time, GMT). Example: "2026-11-21T10:00:00Z"
// Leave as null to show "Date announcing soon" instead of a countdown.
const GRAND_OPENING = null;

const PAGE = 12;

/* ============================================================ */

const $ = (s, el = document) => el.querySelector(s);
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile nav */
const toggle = $("#navToggle"), links = $("#navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
});

/* Countdown */
(function countdown() {
  const box = $("#countdown");
  if (!GRAND_OPENING) {
    box.innerHTML = `<div class="countdown__note">✦ <strong>Grand Opening — November 2026.</strong> Opening date announcing soon. Follow <strong>@yiadomdecorpalace</strong></div>`;
    return;
  }
  const target = new Date(GRAND_OPENING).getTime();
  const units = [["Days", 864e5], ["Hours", 36e5], ["Mins", 6e4], ["Secs", 1e3]];
  function tick() {
    let diff = target - Date.now();
    if (diff <= 0) {
      box.innerHTML = `<div class="countdown__note">✦ <strong>We are now OPEN!</strong> Come and visit us in Kumasi — Merry Christmas from the Palace 🎄</div>`;
      return;
    }
    box.innerHTML = units.map(([label, ms]) => {
      const v = Math.floor(diff / ms); diff -= v * ms;
      return `<div class="countdown__box"><strong>${String(v).padStart(2, "0")}</strong><span>${label}</span></div>`;
    }).join("");
    setTimeout(tick, 1000);
  }
  tick();
})();

/* Shop grid */
const grid = $("#productGrid"), moreBtn = $("#showMore");
let filter = "all", shown = PAGE, visible = [];

function render() {
  visible = PRODUCTS.filter(p => filter === "all" || (filter === "christmas" ? p.xmas : p.cat === filter));
  grid.innerHTML = visible.slice(0, shown).map((p, i) => `
    <button class="card" data-i="${i}" style="animation-delay:${(i % PAGE) * 40}ms">
      <div class="card__img">
        <img src="images/${p.img}.jpg" alt="${p.name}" loading="lazy">
        <span class="card__tag">${CAT_LABEL[p.cat]}</span>
        ${p.xmas && filter !== "christmas" ? '<span class="card__tag card__tag--xmas">🎄 Xmas</span>' : ""}
      </div>
      <div class="card__body"><h3>${p.name}</h3><span>Ask price on WhatsApp →</span></div>
    </button>`).join("");
  moreBtn.style.display = shown >= visible.length ? "none" : "";
}

function setFilter(f) {
  filter = f; shown = PAGE;
  document.querySelectorAll(".chip").forEach(c => {
    const on = c.dataset.filter === f;
    c.classList.toggle("is-active", on); c.setAttribute("aria-selected", on);
  });
  render();
}

$("#filters").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) setFilter(c.dataset.filter); });
moreBtn.addEventListener("click", () => { shown += PAGE; render(); });
document.querySelectorAll("[data-jump]").forEach(a => a.addEventListener("click", () => setFilter(a.dataset.jump)));
render();

/* Lightbox */
const lb = $("#lightbox");
let current = 0;
function openLb(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  $("#lbImg").src = `images/${p.img}.jpg`;
  $("#lbImg").alt = p.name;
  $("#lbCat").textContent = `${p.code} · ${CAT_LABEL[p.cat]}` + (p.xmas ? " · Christmas Pick" : "");
  $("#lbTitle").textContent = p.name;
  $("#lbDesc").textContent = p.desc;
  $("#lbWa").href = waLink(`Hello Yiadom Decor Palace! I'm interested in the "${p.name}" (${p.code}) I saw on your website. What is the price and is it available?`);
  lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#lbClose").focus();
}
function closeLb() { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
grid.addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openLb(+c.dataset.i); });
$("#lbClose").addEventListener("click", closeLb);
$("#lbPrev").addEventListener("click", () => openLb(current - 1));
$("#lbNext").addEventListener("click", () => openLb(current + 1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") openLb(current - 1);
  if (e.key === "ArrowRight") openLb(current + 1);
});

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* Reels: load & play only when visible (saves mobile data) */
const vio = new IntersectionObserver((entries) => {
  entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) {
      if (!v.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else v.pause();
  });
}, { threshold: .5 });
document.querySelectorAll(".reel video").forEach(v => vio.observe(v));

/* Christmas snow (gold & white flakes) */
(function snow() {
  const c = $("#snow");
  if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d");
  let w, h, flakes = [], running = false;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = c.offsetWidth; h = c.offsetHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: Math.round(w / 14) }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2.2 + .6,
      s: Math.random() * .6 + .25, d: Math.random() * Math.PI * 2, gold: Math.random() < .35,
    }));
  };
  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.y += f.s; f.d += .01; f.x += Math.sin(f.d) * .3;
      if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = f.gold ? "rgba(241,214,142,.8)" : "rgba(255,255,255,.7)";
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  resize(); addEventListener("resize", resize);
  new IntersectionObserver(([en]) => {
    running = en.isIntersecting; if (running) draw();
  }).observe(c.parentElement);
})();
