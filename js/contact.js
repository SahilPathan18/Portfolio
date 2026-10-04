/* =========================================================
   CONTACT FORM — client-side validation + basic spam protection.
   This is a static site, so there is no server here. To actually
   receive messages, connect the form to a form backend (Formspree,
   Web3Forms, etc.) and put its endpoint in the CONFIG below —
   see README.md "Wiring up the contact form".
   ========================================================= */
(function () {
  "use strict";

  const CONFIG = {
    // Replace with your form endpoint, e.g. "https://formspree.io/f/xxxxxxx"
    endpoint: ""
  };

  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const nameEl = document.getElementById("cf-name");
  const emailEl = document.getElementById("cf-email");
  const messageEl = document.getElementById("cf-message");
  const honeypot = document.getElementById("cf-company"); // hidden field, humans leave it blank

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Strip characters that have no business in a plain-text field,
  // and hard-cap length so no one can post a giant payload.
  function sanitize(value, maxLen) {
    return value.replace(/[<>]/g, "").trim().slice(0, maxLen);
  }

  function showStatus(message, ok) {
    statusEl.textContent = message;
    statusEl.className = "form-status " + (ok ? "ok" : "err");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: bots fill every field, real users never see this one.
    if (honeypot && honeypot.value.trim() !== "") {
      showStatus("Something went wrong. Please try again.", false);
      return;
    }

    const name = sanitize(nameEl.value, 80);
    const email = sanitize(emailEl.value, 120);
    const message = sanitize(messageEl.value, 2000);

    if (name.length < 2) return showStatus("Please enter your name.", false);
    if (!EMAIL_RE.test(email)) return showStatus("Please enter a valid email.", false);
    if (message.length < 10) return showStatus("Message should be at least 10 characters.", false);

    if (!CONFIG.endpoint) {
      // No backend configured yet — tell the developer, not a real visitor, what to do.
      showStatus("Form isn't connected to an email service yet — see README.md.", false);
      return;
    }

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    try {
      const res = await fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        showStatus("Message sent — thanks for reaching out!", true);
        form.reset();
      } else {
        showStatus("Message could not be sent. Please try again later.", false);
      }
    } catch (err) {
      showStatus("Network error. Please try again later.", false);
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
