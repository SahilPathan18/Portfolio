/* Runs synchronously, before CSS/paint, to avoid a flash of the wrong
   theme. Kept separate and tiny on purpose — this is the only script
   that must load before the stylesheet. */
(function () {
  "use strict";
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    // localStorage unavailable (e.g. private browsing) — default light theme applies via CSS.
  }
})();
