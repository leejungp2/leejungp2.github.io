source "https://rubygems.org"

# Plain Jekyll 4 (built & deployed via GitHub Actions — see
# .github/workflows/pages.yml — so we're not limited to the frozen
# GitHub-Pages-native runtime).
gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.9"
  gem "jekyll-sitemap", "~> 1.4"
end

# Local dev server + Ruby 3.4+ stdlib gems that are no longer bundled.
gem "webrick"
gem "csv"
gem "base64"
gem "bigdecimal"
