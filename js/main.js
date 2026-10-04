/* =========================================================
   CORE SITE BEHAVIOR — runs on every page.
   Depends on: data/site-data.js, js/icons.js (loaded before this file)
   ========================================================= */
(function () {
  "use strict";

  const currentPage = location.pathname.split("/").pop() || "index.html";

  /* ---------- helpers: safe text/element builders (no innerHTML on data) ---------- */
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v; // only ever used with our own ICONS strings
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return node;
  }

  /* ---------- NAV ---------- */
  function renderNav() {
    const root = document.getElementById("nav-root");
    if (!root) return;
    const pill = el("div", { class: "nav-pill" });
    SITE_DATA.nav.forEach((item) => {
      const isActive = item.href === currentPage;
      const a = el("a", { href: item.href, class: isActive ? "active" : "" });
      a.innerHTML = `${ICONS[item.icon] || ""}<span class="label"></span>`;
      a.querySelector(".label").textContent = item.label; // text set safely
      pill.appendChild(a);
    });

    const themeBtn = el("button", { class: "theme-toggle", type: "button", "aria-label": "Toggle dark mode" });
    themeBtn.innerHTML = `<span class="icon-sun">${ICONS.sun}</span><span class="icon-moon">${ICONS.moon}</span>`;
    themeBtn.addEventListener("click", toggleTheme);
    pill.appendChild(themeBtn);

    root.appendChild(pill);
  }

  /* ---------- THEME (light / dark) — initial theme is set by
     js/theme-init.js, which runs before paint. This just handles
     the toggle click. ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable — theme just won't persist */ }
  }

  /* ---------- FIXED SOCIAL RAIL (every page) ---------- */
  function renderSocialRail() {
    const root = document.getElementById("social-rail-root");
    if (!root) return;
    root.appendChild(el("a", { href: SITE_DATA.social.github, target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub", html: ICONS.github }));
    root.appendChild(el("a", { href: SITE_DATA.social.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn", html: ICONS.linkedin }));
    root.appendChild(el("a", { href: SITE_DATA.social.instagram, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", html: ICONS.instagram }));
  }

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    const root = document.getElementById("footer-root");
    if (!root) return;
    const year = new Date().getFullYear();
    const left = el("p", {}, [`\u00A9 ${year} ${SITE_DATA.name}. All rights reserved.`]);
    const socials = el("div", { class: "social-icons" }, [
      el("a", { href: SITE_DATA.social.github, target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub", html: ICONS.github }),
      el("a", { href: SITE_DATA.social.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn", html: ICONS.linkedin }),
      el("a", { href: SITE_DATA.social.instagram, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", html: ICONS.instagram })
    ]);
    const row = el("div", { class: "footer-row" }, [left, socials]);
    root.appendChild(row);
  }

  /* ---------- HERO SOCIAL ICONS (index page) ---------- */
  function renderHeroSocials() {
    const root = document.getElementById("hero-social-root");
    if (!root) return;
    root.appendChild(el("a", { href: SITE_DATA.social.github, target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub", html: ICONS.github }));
    root.appendChild(el("a", { href: SITE_DATA.social.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn", html: ICONS.linkedin }));
    root.appendChild(el("a", { href: SITE_DATA.social.instagram, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", html: ICONS.instagram }));
  }

  /* ---------- LOCATION BADGE (index page) ---------- */
  function renderLocation() {
    const node = document.getElementById("location-badge");
    if (!node) return;
    node.appendChild(document.createTextNode(SITE_DATA.location));
  }

  /* ---------- TYPING EFFECT (role line) ---------- */
  function initTyping() {
    const node = document.getElementById("role-text");
    if (!node) return;
    const words = SITE_DATA.roles;
    let wordIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const word = words[wordIdx];
      if (!deleting) {
        charIdx++;
        node.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          return setTimeout(tick, 1400);
        }
      } else {
        charIdx--;
        node.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ---------- MARQUEE ---------- */
  function renderMarquee() {
    const root = document.getElementById("marquee-root");
    if (!root) return;
    const track = el("div", { class: "marquee-track" });
    const items = SITE_DATA.marquee.concat(SITE_DATA.marquee); // duplicate for seamless loop
    items.forEach((word) => track.appendChild(el("span", {}, [word])));
    root.appendChild(track);
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    // :not(.in) so calling this again later (after other scripts add more
    // .reveal elements to the page) doesn't re-touch ones already shown.
    const targets = document.querySelectorAll(".reveal:not(.in)");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
  }
  // Exposed so scripts that render content into the page AFTER this file's
  // DOMContentLoaded handler has already run (e.g. js/projects.js) can
  // re-scan for newly-added .reveal elements — otherwise those elements
  // are never observed and stay stuck at opacity:0.
  window.refreshRevealObserver = initReveal;

  /* ---------- SKILL BARS (about page) ---------- */
  function renderSkills() {
    const root = document.getElementById("skills-root");
    if (!root) return;
    SITE_DATA.skills.forEach((skill) => {
      const row = el("div", { class: "skill-row reveal" }, [
        el("div", { class: "top" }, [
          el("span", {}, [skill.name]),
          el("span", {}, [skill.level + "%"])
        ]),
        el("div", { class: "skill-track" }, [
          el("div", { class: "skill-fill", "data-level": skill.level })
        ])
      ]);
      root.appendChild(row);
    });
    // animate fill once visible
    const fills = root.querySelectorAll(".skill-fill");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.level + "%";
            io.unobserve(bar);
          }
        });
      },
      { threshold: 0.4 }
    );
    fills.forEach((f) => io.observe(f));
  }

  /* ---------- TIMELINE (about page) ---------- */
  function renderTimeline() {
    const root = document.getElementById("timeline-root");
    if (!root) return;
    SITE_DATA.timeline.forEach((item) => {
      root.appendChild(
        el("div", { class: "t-item reveal" }, [
          el("div", { class: "t-date" }, [item.date]),
          el("h4", {}, [item.title]),
          el("p", {}, [item.desc])
        ])
      );
    });
  }

  /* ---------- SERVICES (services page + home preview) ---------- */
  function renderServices() {
    document.querySelectorAll("[data-services-root]").forEach((root) => {
      const limit = root.dataset.limit ? Number(root.dataset.limit) : SITE_DATA.services.length;
      SITE_DATA.services.slice(0, limit).forEach((service) => {
        const icon = el("div", { class: "icon", html: ICONS[service.icon] || ICONS.code });
        root.appendChild(
          el("div", { class: "card reveal" }, [
            icon,
            el("h3", {}, [service.title]),
            el("p", {}, [service.desc])
          ])
        );
      });
    });
  }

  /* ---------- CONTACT INFO PANEL ---------- */
  function renderContactInfo() {
    const mail = document.getElementById("ci-mail");
    if (!mail) return;
    mail.innerHTML = ICONS.mail;
    document.getElementById("ci-pin").innerHTML = ICONS.pin;
    document.getElementById("ci-clock").innerHTML = ICONS.clock;
    document.getElementById("ci-email-text").textContent = SITE_DATA.email;
    document.getElementById("ci-location-text").textContent = SITE_DATA.location;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderSocialRail();
    renderFooter();
    renderHeroSocials();
    renderLocation();
    initTyping();
    renderMarquee();
    renderSkills();
    renderTimeline();
    renderServices();
    renderContactInfo();
    initReveal();
  });
})();
