/* =========================================================
   PROJECT GRID — reads SITE_DATA.projects (data/site-data.js)
   ========================================================= */
(function () {
  "use strict";

  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return node;
  }

  function projectCard(p) {
    return el("div", { class: "card project-card reveal" }, [
      el("div", { class: "project-thumb" }, [p.title]),
      el("div", { class: "project-body" }, [
        el("h3", {}, [p.title]),
        el("p", {}, [p.desc]),
        el("div", { class: "tag-row" }, p.tags.map((t) => el("span", { class: "tag" }, [t]))),
        el("div", { class: "project-links" }, [
          el("a", { href: p.live, target: "_blank", rel: "noopener noreferrer" }, ["Live \u2197"]),
          el("a", { href: p.code, target: "_blank", rel: "noopener noreferrer" }, ["Code \u2192"])
        ])
      ])
    ]);
  }

  function renderGrid(list, root) {
    root.innerHTML = "";
    list.forEach((p) => root.appendChild(projectCard(p)));
    // These cards are added after main.js already ran its one-time scroll-
    // reveal scan, so they need to be picked up explicitly or they'd stay
    // invisible (opacity:0) forever.
    if (window.refreshRevealObserver) window.refreshRevealObserver();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const limit = grid.dataset.limit ? Number(grid.dataset.limit) : SITE_DATA.projects.length;
    let dataset = SITE_DATA.projects.slice(0, limit);
    renderGrid(dataset, grid);

    const filters = document.querySelectorAll(".filter-btn");
    if (!filters.length) return;

    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        const filtered = cat === "all" ? SITE_DATA.projects : SITE_DATA.projects.filter((p) => p.category === cat);
        renderGrid(filtered, grid);
      });
    });
  });
})();
