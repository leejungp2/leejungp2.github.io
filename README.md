# leejungp2.github.io

Personal research portfolio, built as a self-contained [Jekyll](https://jekyllrb.com/)
site (no external theme gems) and deployed via GitHub Pages.

## Structure

| Path | What it is |
| --- | --- |
| `_pages/` | Top-level sections (about, CV, publications, projects, blog, misc) |
| `_posts/` | Blog posts (`YYYY-MM-DD-title.md`) |
| `_projects/` | Project entries (collection) |
| `_data/nav.yml` | Navigation menu order |
| `_data/socials.yml` | Social link URLs (LinkedIn, GitHub) |
| `_layouts/`, `_includes/` | Page templates and partials |
| `assets/css/main.css` | Design system (light + dark), from `DESIGN.md` |
| `assets/js/theme.js` | Dark-mode toggle |
| `assets/img/logo.svg` | Site logo (placeholder — replace with your own) |

`about` is the homepage (`permalink: /`).

## Run locally

Needs Ruby ≥ 3.0 (the macOS system Ruby 2.6 is too old). Installed here via
Homebrew (`brew install ruby`); add it to your PATH first:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install
bundle exec jekyll serve   # → http://localhost:4000/
```

## Deploy

GitHub Pages builds this site automatically from the `main` branch (Settings →
Pages → **Source: Deploy from a branch**, `main` / root). Just push to `main`;
the live site updates in ~1–2 minutes. No Actions workflow or build step needed
(the CSS is plain hand-written CSS, not a Tailwind build).

## TODO

- Replace `assets/img/logo.svg` with a real logo.
- Set the LinkedIn URL in `_data/socials.yml`.
- Fill in real bio / CV / publications / projects content.
