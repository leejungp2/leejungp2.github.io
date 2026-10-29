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

<figure class="project-figure">
  <a href="{{ '/assets/img/projects/style-print.webp' | relative_url }}"><img src="{{ '/assets/img/projects/style-print.webp' | relative_url }}" alt="StylePrint reference upload interface with extracted color, typography, and layout facets" width="2082" height="1315"></a>
  <figcaption>Upload references and inspect their extracted visual style before building a recipe.</figcaption>
</figure>

## Links

- [View the repository](https://github.com/leejungp2/style-print)
- [Watch the presentation](https://youtu.be/Ki7SdYj6aTA)
