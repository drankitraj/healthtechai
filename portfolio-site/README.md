# Dr. Ankit Raj, portfolio site

Static single-page site. No build step, no framework, no external requests (fonts and images are bundled).

## Structure

```
index.html            all content
404.html              fallback page
assets/css/style.css  design tokens at the top (:root)
assets/js/main.js     scroll progress, reveals, menu, expand/collapse
assets/img/           photos (WebP, metadata stripped)
assets/fonts/         Inter, subset to Latin (WOFF)
assets/og.jpg         link-preview image (LinkedIn, WhatsApp, etc.)
```

## Deploy on GitHub Pages

1. On GitHub, create a **public** repository named `<your-username>.github.io` (this gives you `https://<your-username>.github.io/`). A repo with any other name works too, but the URL then includes the repo name.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`. The site is live within a minute or two.
4. `index.html` already points the canonical and `og:image` URLs at `https://ankitraj-a11y.github.io/`. If you use a different repo name or a custom domain, update those three tags (`canonical`, `og:url`, `og:image`).

## Editing

- **Text**: edit `index.html`. Each section has an `id` (`about`, `focus`, `experience`, `work`, `research`, `recognition`, `contact`).
- **Colours and fonts**: change the variables in `:root` at the top of `assets/css/style.css`.
- **Photos**: replace files in `assets/img/` keeping the names, or update the `<img>` tags. Export as WebP, about 1200 px wide.
- After pushing, GitHub Pages redeploys automatically.

## Privacy

- Phone numbers from the CV are deliberately not on the site. The email address is public in the page source and will be picked up by scrapers.
- Do not commit your CV PDF unless you first remove phone numbers from it. If you add a download link, put the file in `assets/` and link to it from the Contact section.
- Photos have no location metadata.
