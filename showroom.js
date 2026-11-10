/* ============================================================
   3D SHOWROOM — "Grand Opening Picks" shown in a round 3D gallery room.
   Customers drag/swipe to look around, tap a piece for its price and "Add to order".
   three.js is only downloaded when someone taps "Enter the 3D showroom", so the page stays fast.
   EDIT HERE: the product codes shown (in this order). Sold-out or hidden items are skipped automatically.
   ============================================================ */
const SHOWROOM_PICKS = ["YDP-013", "YDGV-001A", "YBPF-004", "YDP-005", "YDGV-010", "YDP-G001",
                        "YDP-003", "YLV-001", "YDPSP-004", "YDGV-009A", "YDP-016", "YDPSP-002"];

(() => {
  const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
  const el = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ghs = n => "GH₵ " + Number(n).toLocaleString("en-GH", { maximumFractionDigits: 2 });
  const byCode = c => (typeof PRODUCTS !== "undefined" ? PRODUCTS : []).find(p => p.code === c);
  const priceText = p => typeof p.salePrice === "number" ? `<s>${ghs(p.price)}</s> ${ghs(p.salePrice)}` : typeof p.price === "number" ? ghs(p.price) : esc(p.price || "");
  const picks = () => SHOWROOM_PICKS.map(byCode).filter(p => p && !p.soldOut && p.img);
  let items = [], view = null, engine = null, current = 0;

  // ---------- the section on the page ----------
  function preview() {
    const box = el("#showroomPreview"); if (!box) return;
    box.innerHTML = picks().slice(0, 5).map(p => `<img src="images/${esc(p.img)}.jpg" alt="${esc(p.name)}" loading="lazy">`).join("");
  }
  const ready = typeof loadLivePrices === "function" ? loadLivePrices() : Promise.resolve();
  ready.then(preview);
  document.addEventListener("click", e => { if (e.target.closest("[data-showroom]")) { e.preventDefault(); open(); } });

  // ---------- the full-screen viewer ----------
  function buildView() {
    view = document.createElement("div");
    view.className = "showroom-view"; view.setAttribute("role", "dialog"); view.setAttribute("aria-label", "3D showroom"); view.hidden = true;
    view.innerHTML = `
      <div class="sv__stage" id="svStage"></div>
      <header class="sv__top"><div><strong>3D Showroom</strong><span>Grand Opening picks</span></div><button class="sv__x" type="button" id="svClose" aria-label="Close showroom">×</button></header>
      <p class="sv__hint" id="svHint">Drag to look around · tap a piece to see it</p>
      <div class="sv__loading" id="svLoading">Opening the showroom…</div>
      <nav class="sv__nav" aria-label="Move between pieces">
        <button type="button" id="svPrev" aria-label="Previous piece">‹</button>
        <button type="button" class="sv__now" id="svNow"></button>
        <button type="button" id="svNext" aria-label="Next piece">›</button>
      </nav>
      <aside class="sv__card" id="svCard" hidden></aside>`;
    document.body.appendChild(view);
    el("#svClose").addEventListener("click", close);
    el("#svPrev").addEventListener("click", () => go(current - 1, true));
    el("#svNext").addEventListener("click", () => go(current + 1, true));
    el("#svNow").addEventListener("click", () => showCard(current));
    document.addEventListener("keydown", e => {
      if (!view || view.hidden) return;
      if (e.key === "Escape") { if (!el("#svCard").hidden) hideCard(); else close(); }
      if (e.key === "ArrowLeft") go(current - 1, true);
      if (e.key === "ArrowRight") go(current + 1, true);
    });
    el("#svCard").addEventListener("click", onCardClick);
  }

  async function open() {
    await ready;
    items = picks();
    if (!items.length) return;
    if (!view) buildView();
    view.hidden = false; document.documentElement.classList.add("showroom-open");
    label();
    if (!engine) {
      try {
        if (!webgl()) throw new Error("no webgl");
        const THREE = await import(THREE_URL);
        engine = await makeEngine(THREE, el("#svStage"));
      } catch (x) {
        console.warn("3D showroom unavailable:", x);
        fallbackGrid(); return;
      }
    }
    el("#svLoading").hidden = true;
    engine.start();
  }
  function close() {
    if (!view) return;
    view.hidden = true; document.documentElement.classList.remove("showroom-open");
    if (engine) engine.stop();
  }
  const webgl = () => { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; } };

  function label() { const p = items[current]; if (p) el("#svNow").innerHTML = `<b>${esc(p.name)}</b><span>${current + 1} / ${items.length} · ${priceText(p)}</span>`; }
  function go(i, show) {
    current = (i + items.length) % items.length; label();
    if (engine) engine.face(current);
    if (show) showCard(current); else hideCard();
  }
  function showCard(i) {
    const p = items[i], c = el("#svCard"); if (!p) return;
    const canAdd = window.YDPOrder && window.YDPOrder.canAdd(p.code);
    const wa = `https://wa.me/233275957777?text=${encodeURIComponent(`Hello! I saw ${p.name} (${p.code}) in your 3D showroom.`)}`;
    c.innerHTML = `<button class="sv__cx" type="button" data-hide aria-label="Close">×</button>
      <img src="images/${esc(p.img)}.jpg" alt="">
      <div><span class="sv__code">${esc(p.code)}</span><h3>${esc(p.name)}</h3><p class="sv__price">${priceText(p)}${p.unit ? " / " + esc(p.unit) : ""}</p>
      ${p.desc ? `<p class="sv__desc">${esc(p.desc)}</p>` : ""}
      <div class="sv__acts">${canAdd ? `<button type="button" class="btn btn--gold" data-add="${esc(p.code)}">Add to order</button>` : ""}
      <a class="btn btn--ghost-dark" href="${wa}" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>`;
    c.hidden = false; el("#svHint").hidden = true;
    if (engine) engine.focus(true);
  }
  function hideCard() { el("#svCard").hidden = true; if (engine) engine.focus(false); }
  function onCardClick(e) {
    if (e.target.closest("[data-hide]")) return hideCard();
    const add = e.target.closest("[data-add]");
    if (add && window.YDPOrder) {
      if (window.YDPOrder.add(add.dataset.add, 1)) { add.textContent = "Added ✓ · View my order"; add.removeAttribute("data-add"); add.dataset.view = "1"; }
      else add.textContent = "Not available online";
      return;
    }
    if (e.target.closest("[data-view]") && window.YDPOrder) { close(); window.YDPOrder.open(); }
  }
  function fallbackGrid() {
    el("#svLoading").hidden = true; el("#svHint").hidden = true; view.querySelector(".sv__nav").hidden = true;
    el("#svStage").innerHTML = `<div class="sv__grid">${items.map((p, i) => `<button type="button" data-i="${i}"><img src="images/${esc(p.img)}.jpg" alt=""><b>${esc(p.name)}</b><span>${priceText(p)}</span></button>`).join("")}</div>`;
    el("#svStage").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) { current = +b.dataset.i; showCard(current); } });
  }

  // ---------- the 3D room ----------
  async function makeEngine(THREE, stage) {
    const W = () => stage.clientWidth, H = () => stage.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W(), H());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    stage.appendChild(renderer.domElement);
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0b3326);
    scene.fog = new THREE.Fog(0x0b3326, 9, 16);
    const camera = new THREE.PerspectiveCamera(W() < H() ? 68 : 55, W() / H(), 0.1, 40);
    camera.rotation.order = "YXZ"; camera.position.set(0, 1.55, 0); camera.rotation.x = -0.06;

    const R = 7.4, r = 5.0, N = items.length;
    const GOLD = new THREE.MeshStandardMaterial({ color: 0xd4af5f, metalness: 0.85, roughness: 0.3, emissive: 0x3a2a08, emissiveIntensity: 0.4 });
    scene.add(new THREE.HemisphereLight(0xfff3dd, 0x0b3326, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(2, 6, 3); scene.add(key);
    const centre = new THREE.PointLight(0xffe7b0, 22, 14, 1.6); centre.position.set(0, 3.6, 0); scene.add(centre);

    // marble-look floor drawn on a canvas
    const fc = document.createElement("canvas"); fc.width = fc.height = 1024; const fx = fc.getContext("2d");
    fx.fillStyle = "#efe6d6"; fx.fillRect(0, 0, 1024, 1024);
    fx.filter = "blur(1.5px)";
    for (let i = 0; i < 26; i++) {                     // a few long, soft veins
      fx.strokeStyle = `rgba(${150 + Math.random() * 30},${135 + Math.random() * 25},${115 + Math.random() * 25},${0.05 + Math.random() * 0.08})`;
      fx.lineWidth = 0.8 + Math.random() * 1.8; fx.beginPath();
      let x = Math.random() * 1024, y = Math.random() * 1024, ang = Math.random() * Math.PI; fx.moveTo(x, y);
      for (let k = 0; k < 14; k++) { ang += (Math.random() - 0.5) * 0.7; x += Math.cos(ang) * 60; y += Math.sin(ang) * 60; fx.lineTo(x, y); }
      fx.stroke();
    }
    fx.filter = "none";
    const ftex = new THREE.CanvasTexture(fc); ftex.colorSpace = THREE.SRGBColorSpace; ftex.wrapS = ftex.wrapT = THREE.RepeatWrapping; ftex.repeat.set(3, 3);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(R, 64), new THREE.MeshStandardMaterial({ map: ftex, roughness: 0.35, metalness: 0.05 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 4.6, 72, 1, true), new THREE.MeshStandardMaterial({ color: 0xf3ecdf, roughness: 0.95, side: THREE.BackSide }));
    wall.position.y = 2.3; scene.add(wall);
    const ceil = new THREE.Mesh(new THREE.CircleGeometry(R, 64), new THREE.MeshStandardMaterial({ color: 0x0b3326, roughness: 1 }));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = 4.6; scene.add(ceil);
    const cove = new THREE.Mesh(new THREE.TorusGeometry(R - 0.05, 0.035, 8, 120), new THREE.MeshBasicMaterial({ color: 0xf1d68e }));
    cove.rotation.x = Math.PI / 2; cove.position.y = 4.35; scene.add(cove);
    const skirt = new THREE.Mesh(new THREE.TorusGeometry(R - 0.03, 0.03, 6, 120), GOLD); skirt.rotation.x = Math.PI / 2; skirt.position.y = 0.12; scene.add(skirt);
    const rug = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.48, 64), new THREE.MeshBasicMaterial({ color: 0xd4af5f }));
    rug.rotation.x = -Math.PI / 2; rug.position.y = 0.005; scene.add(rug);

    // soft round shadow texture for under each plinth
    const sc = document.createElement("canvas"); sc.width = sc.height = 128; const sx = sc.getContext("2d");
    const g = sx.createRadialGradient(64, 64, 10, 64, 64, 64); g.addColorStop(0, "rgba(0,0,0,.45)"); g.addColorStop(1, "rgba(0,0,0,0)"); sx.fillStyle = g; sx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(sc);

    try { await Promise.all([document.fonts.load("600 60px 'Cormorant Garamond'"), document.fonts.load("500 40px Jost")]); } catch {}
    const plaque = p => {
      const c = document.createElement("canvas"); c.width = 640; c.height = 220; const x = c.getContext("2d");
      x.fillStyle = "#0b3326"; x.fillRect(0, 0, 640, 220); x.strokeStyle = "#d4af5f"; x.lineWidth = 6; x.strokeRect(8, 8, 624, 204);
      x.fillStyle = "#d4af5f"; x.font = "500 26px Jost, sans-serif"; x.textAlign = "center"; x.fillText(p.code, 320, 52);
      x.fillStyle = "#ffffff"; let size = 46; x.font = `600 ${size}px 'Cormorant Garamond', Georgia, serif`;
      while (x.measureText(p.name).width > 580 && size > 28) { size -= 2; x.font = `600 ${size}px 'Cormorant Garamond', Georgia, serif`; }
      x.fillText(p.name, 320, 118);
      x.fillStyle = "#f1d68e"; x.font = "600 40px Jost, sans-serif";
      const pr = typeof p.salePrice === "number" ? p.salePrice : p.price;
      x.fillText(typeof pr === "number" ? ghs(pr) : String(pr || ""), 320, 178);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
    };

    const loader = new THREE.TextureLoader(), panels = [];
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xfaf6ee, roughness: 0.6 });
    const backMat = new THREE.MeshStandardMaterial({ color: 0x114533, roughness: 0.9 });
    await Promise.all(items.map((p, i) => new Promise(resolve => {
      const a = (i / N) * Math.PI * 2;
      const grp = new THREE.Group(); grp.position.set(Math.sin(a) * r, 0, -Math.cos(a) * r); grp.lookAt(0, 0, 0); scene.add(grp);
      // green wall panel behind each piece
      const back = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 3.9), backMat);
      const wa = new THREE.Group(); wa.position.set(Math.sin(a) * (R - 0.04), 2.15, -Math.cos(a) * (R - 0.04)); wa.lookAt(0, 2.15, 0); wa.add(back); scene.add(wa);
      const trim = new THREE.Mesh(new THREE.PlaneGeometry(2.42, 4.02), GOLD); trim.position.z = -0.005; wa.add(trim);
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
      sh.rotation.x = -Math.PI / 2; sh.position.y = 0.01; grp.add(sh);
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 1.0), plinthMat); plinth.position.y = 0.4; grp.add(plinth);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.05, 1.06), GOLD); cap.position.y = 0.825; grp.add(cap);
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 0.3), new THREE.MeshBasicMaterial({ map: plaque(p) }));
      pl.position.set(0, 0.46, 0.505); grp.add(pl);
      loader.load(`images/${p.img}.jpg`, tex => {
        tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const asp = tex.image.width / tex.image.height, h = 1.75, w = h * asp;
        const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, h + 0.08, 0.04), GOLD); frame.position.set(0, 0.86 + h / 2 + 0.06, -0.02); grp.add(frame);
        const photo = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
        photo.position.set(0, 0.86 + h / 2 + 0.06, 0.002); photo.userData.index = i; grp.add(photo); panels.push(photo);
        resolve();
      }, undefined, () => resolve());
    })));

    // looking around
    let yaw = 0, yawTo = 0, vel = 0, dragging = false, lastX = 0, downX = 0, downY = 0, moved = 0, touched = false, raf = 0, last = 0, zoom = 0, zoomTo = 0;
    const faceAngle = i => -(i / N) * Math.PI * 2;
    const nearest = (from, to) => { let d = (to - from) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return from + d; };
    const canvas = renderer.domElement; canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", e => { dragging = true; touched = true; lastX = downX = e.clientX; downY = e.clientY; moved = 0; vel = 0; canvas.setPointerCapture(e.pointerId); el("#svHint").hidden = true; });
    canvas.addEventListener("pointermove", e => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      const k = 2.4 / Math.max(320, W()); yawTo += dx * k; vel = dx * k;
      if (moved > 8 && !el("#svCard").hidden) hideCard();
    });
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
    canvas.addEventListener("pointerup", e => {
      dragging = false;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 8) {          // a tap: which piece?
        const b = canvas.getBoundingClientRect();
        ptr.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
        ray.setFromCamera(ptr, camera);
        const hit = ray.intersectObjects(panels)[0];
        if (hit) { current = hit.object.userData.index; label(); yawTo = nearest(yaw, faceAngle(current)); showCard(current); }
      } else {
        yawTo += vel * 12;                                                      // a little glide after a swipe
        const step = (Math.PI * 2) / N;                                         // then settle on the nearest piece
        const idx = Math.round(-yawTo / step); yawTo = -idx * step; current = ((idx % N) + N) % N; label();
      }
    });
    canvas.addEventListener("wheel", e => { e.preventDefault(); yawTo += e.deltaY * 0.0025; }, { passive: false });
    window.addEventListener("resize", () => { if (!raf) return; camera.aspect = W() / H(); camera.fov = W() < H() ? 68 : 55; camera.updateProjectionMatrix(); renderer.setSize(W(), H()); });

    function tick(t) {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
      if (!touched) yawTo += dt * 0.12;                                         // slow turn until the customer takes over
      yaw += (yawTo - yaw) * Math.min(1, dt * 6);
      zoom += (zoomTo - zoom) * Math.min(1, dt * 5);
      camera.rotation.y = yaw;
      camera.position.set(-Math.sin(yaw) * zoom, 1.55, -Math.cos(yaw) * zoom);
      if (!touched) { const idx = Math.round(-yaw / ((Math.PI * 2) / N)); const c = ((idx % N) + N) % N; if (c !== current) { current = c; label(); } }
      renderer.render(scene, camera);
    }
    return {
      start() { if (!raf) { last = 0; camera.aspect = W() / H(); camera.updateProjectionMatrix(); renderer.setSize(W(), H()); raf = requestAnimationFrame(tick); } },
      stop() { cancelAnimationFrame(raf); raf = 0; },
      face(i) { touched = true; yawTo = nearest(yaw, faceAngle(i)); },
      focus(on) { zoomTo = on ? 1.6 : 0; },
    };
  }
})();
