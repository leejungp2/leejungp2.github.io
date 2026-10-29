---
layout: page
title: StylePrint
description: AI interface that turns UI reference images into reviewable React/Tailwind designs.
thumbnail: /assets/img/projects/style-print.webp
order: 2
---

## Highlights

- Built an interface for combining design signals from multiple UI reference images.
- Structured extracted design intent into facets such as color, typography, layout, spacing, and component style.
- Used an IntentSpec layer to keep provenance, conflicts, repairs, and coherence checks visible.
- Focused on making AI-generated UI easier to inspect, judge, and iterate on.

## Overview

StylePrint is a frontend final project that helps users upload UI reference
images, extract visual style facets, and generate new React/Tailwind UI code
from the selected references.

## Interface Screens

<div class="project-media-grid project-media-grid--natural">
  <figure>
    <a href="{{ '/assets/img/projects/styleprint/01-recommended-recipes.webp' | relative_url }}"><img src="{{ '/assets/img/projects/styleprint/01-recommended-recipes.webp' | relative_url }}" alt="StylePrint recommended recipes and custom facet sources" loading="lazy" width="2940" height="1590"></a>
    <figcaption>Compare recommended recipes and begin a custom mix.</figcaption>
  </figure>
  <figure>
    <a href="{{ '/assets/img/projects/styleprint/02-recipe-mix-controls.webp' | relative_url }}"><img src="{{ '/assets/img/projects/styleprint/02-recipe-mix-controls.webp' | relative_url }}" alt="StylePrint recipe builder controls and selected facet sources" loading="lazy" width="2940" height="1590"></a>
    <figcaption>Choose reference sources for each design facet.</figcaption>
  </figure>
  <figure>
    <a href="{{ '/assets/img/projects/styleprint/03-custom-facet-sources.webp' | relative_url }}"><img src="{{ '/assets/img/projects/styleprint/03-custom-facet-sources.webp' | relative_url }}" alt="StylePrint custom facet source controls" loading="lazy" width="2940" height="1590"></a>
    <figcaption>Review and apply a custom facet mix.</figcaption>
  </figure>
  <figure>
    <a href="{{ '/assets/img/projects/styleprint/04-generated-result.webp' | relative_url }}"><img src="{{ '/assets/img/projects/styleprint/04-generated-result.webp' | relative_url }}" alt="StylePrint live preview of generated scheduling interface" loading="lazy" width="2390" height="1590"></a>
    <figcaption>Inspect the generated interface in the live preview.</figcaption>
  </figure>
  <figure>
    <a href="{{ '/assets/img/projects/styleprint/05-generated-code.webp' | relative_url }}"><img src="{{ '/assets/img/projects/styleprint/05-generated-code.webp' | relative_url }}" alt="StylePrint generated React and Tailwind code" loading="lazy" width="2390" height="1590"></a>
    <figcaption>View and export the generated React and Tailwind code.</figcaption>
  </figure>
  <figure>
    <a href="{{ '/assets/img/projects/styleprint/06-audit-provenance.webp' | relative_url }}"><img src="{{ '/assets/img/projects/styleprint/06-audit-provenance.webp' | relative_url }}" alt="StylePrint facet diff and provenance audit" loading="lazy" width="2390" height="1590"></a>
    <figcaption>Check facet differences and trace each design choice to its source.</figcaption>
  </figure>
</div>

## Links

- [View the repository](https://github.com/leejungp2/style-print)
- [Watch the presentation](https://youtu.be/Ki7SdYj6aTA)
- [Read the project reflection: StylePrint Project Reflection: Evaluating AI-Generated Results]({{ '/blog/2026/06/15/tistory-19/' | relative_url }})
