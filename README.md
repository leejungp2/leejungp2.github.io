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
Homebrew (`brew install ruby`). From a new terminal, run:

```bash
cd /Users/Owner/git_inside/leejungp2.github.io
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install # First run, or after changing the Gemfile
bundle exec jekyll serve
```

Open <http://localhost:4000/> in your browser, or
<http://localhost:4000/projects/> to review the projects section. Keep the
terminal running; Jekyll rebuilds when files change, then refresh the browser
to see the update. Press **Ctrl+C** in the terminal to stop the server.

For later previews, run `bundle exec jekyll serve` from the repository directory
with the Homebrew Ruby PATH set as above. If port 4000 is already in use, stop
the existing preview with **Ctrl+C**, or use `bundle exec jekyll serve --port 4001`
and open <http://localhost:4001/>.

## Deploy

GitHub Pages builds this site automatically from the `main` branch (Settings →
Pages → **Source: Deploy from a branch**, `main` / root). Just push to `main`;
the live site updates in ~1–2 minutes. No Actions workflow or build step needed
(the CSS is plain hand-written CSS, not a Tailwind build).

## Website counter

Each page displays `Today 1 / Total 3,000` at the bottom. The counter uses
[HitsCounter](https://hitscounter.dev/) without an account, API key, or GitHub
token. One request records a visit and returns both counts; every page
shares the same counter using `url` from `_config.yml`.

`Today` resets at midnight in `Asia/Seoul`; `Total` accumulates from when this
counter was added. Each browser records at most one visit per Korean calendar
day using `localStorage`. Navigation, reloads, and new tabs reuse that day's
saved counts; the display may therefore lag visits from other browsers. Web
Locks serialize requests from simultaneous tabs in supported browsers. Clearing
site data, private browsing, or using another browser/device can count another
visit, so these are approximate daily browser visits, not unique people. Totals
recorded before this change still include page views.

The shared counts are stored by HitsCounter, so its availability and data
retention govern the totals. Local previews do not send count requests. The
display remains `—` when no saved counts exist and the service or browser
storage is unavailable.

## TODO

- Replace `assets/img/logo.svg` with a real logo.
- Set the LinkedIn URL in `_data/socials.yml`.
- Fill in real bio / CV / publications / projects content.
