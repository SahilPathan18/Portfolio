# Sahil Pathan — Portfolio

A responsive, animated, interactive portfolio site. Plain HTML/CSS/JS —
no build step, no framework. Open `index.html` in a browser, or deploy
anywhere that serves static files (GitHub Pages, Netlify, Vercel).

## File structure

```
portfolio/
├── index.html          Home page (hero, featured projects, services)
├── about.html           Bio, timeline, skills
├── projects.html        Full project grid with filters
├── services.html        Services + process
├── contact.html         Contact form
├── css/
│   ├── style.css        Colors, fonts, layout, components
│   └── animations.css   All animation keyframes
├── js/
│   ├── main.js           Nav, footer, typing effect, scroll reveal, etc.
│   ├── projects.js       Project grid rendering + filtering
│   ├── contact.js        Form validation + spam protection
│   └── icons.js          Inline SVG icon set
├── data/
│   └── site-data.js      ALL editable text content — start here
└── assets/
    └── Sahil-Pathan-CV.pdf   Replace with your real CV
```

## How to edit content (do this first)

Open **`data/site-data.js`**. Nearly everything on the site is driven
from this one file:

- `name` — your name, shown in the footer copyright line
- `nav` — the navigation links (add/remove/reorder pages here)
- `roles` — the words that type/delete in the hero
- `skills` — name + percentage, shown as bars on the About page
- `timeline` — your journey, shown on the About page
- `services` — cards on the Services page (and home preview)
- `projects` — every project card; `category` must be `"web"`,
  `"app"`, or `"fullstack"` to work with the filter buttons
- `social` — your GitHub / LinkedIn / Instagram URLs
- `email`, `location` — shown on the Contact page

You will not need to touch the HTML for any of the above — the JS
renders it from this file. Colors and fonts live at the top of
`css/style.css` under `:root` if you want to restyle.

## Wiring up the contact form

This is a static site, so the form has no server of its own. To make
it actually deliver messages to your inbox, sign up for a free form
backend such as [Formspree](https://formspree.io) or
[Web3Forms](https://web3forms.com), then open `js/contact.js` and set:

```js
const CONFIG = {
  endpoint: "https://formspree.io/f/your-id-here"
};
```

Until that's set, the form validates input but shows a message
telling you it isn't connected yet — it will not silently fail.

## Social links

Your GitHub / LinkedIn / Instagram icons now appear in three places so
they're always within reach:
- a fixed rail on the left edge of the screen on every page (desktop only)
- the hero's "Follow me" row on the home page
- the footer on every page

All three pull from the same `social` object in `data/site-data.js` —
update the URLs there once and all three update together. The fixed
rail hides below 900px width since a fixed sidebar gets in the way on
phones; mobile visitors use the hero/footer icons instead.

## Dark mode

There's a sun/moon toggle button in the nav pill. It remembers the
visitor's choice (via `localStorage`) and otherwise follows their
system's light/dark preference on first visit. Colors for both modes
are defined once, at the top of `css/style.css` — light mode under
`:root`, dark mode under `html[data-theme="dark"]`. Edit those two
blocks to restyle either mode; nothing else needs to change.

## Background gradient

Every page has a very subtle radial-gradient wash fixed behind the
content (`body::before` in `css/style.css`), using the accent color
at ~5% opacity (~9% in dark mode). Adjust the `opacity` values there
if you want it more or less visible, or remove the rule entirely for
a flat background.

## Security notes

- A `Content-Security-Policy` meta tag on every page restricts
  scripts to same-origin files only (no inline scripts, no third-party
  script injection) and limits styles/fonts to Google Fonts.
- All dynamic content (project titles, skills, etc.) is inserted with
  `textContent`/DOM APIs, not `innerHTML`, so nothing from the data
  file can inject HTML/script into the page.
- The contact form has a **honeypot field** (invisible to real
  visitors) to silently reject basic bots, plus length limits and
  input sanitization on every field, on top of whatever validation
  your form backend provides.
- `target="_blank"` links use `rel="noopener noreferrer"` to prevent
  the opened page from accessing `window.opener`.

Since this is a static front end, "secure" here means: no injectable
HTML, no inline scripts, no leaking referrer/opener data, and a form
that can't be trivially spammed. It does not include server-side
protections — those depend on whatever form backend or hosting you
connect it to.

## Adding a real profile photo / illustration

The hero currently uses an animated code terminal instead of a photo.
To swap in a photo, add an `<img>` inside `.hero-art` in `index.html`
and drop the image into `assets/`.

## Deploying

Any static host works. Easiest options:
- **GitHub Pages**: push this folder to a repo, enable Pages on the
  `main` branch.
- **Netlify / Vercel**: drag-and-drop the folder in their dashboard,
  or connect the GitHub repo for auto-deploys.

No build command is needed — it's plain static files.
