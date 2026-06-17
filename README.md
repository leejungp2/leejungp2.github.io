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
| `assets/css/style.css` | Design system (light + dark), from `style-print-design.md` |
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

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds with
Jekyll 4 and deploys to GitHub Pages. One-time setup: in the repo's
**Settings → Pages**, set **Source = GitHub Actions**.

## TODO

- Replace `assets/img/logo.svg` with a real logo.
- Set the LinkedIn URL in `_data/socials.yml`.
- Fill in real bio / CV / publications / projects content.
