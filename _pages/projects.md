---
layout: page
title: projects
permalink: /projects/
description: Selected research, product, and AI interface projects.
---

{%- if site.projects.size > 0 -%}
  <div class="card-grid project-card-grid">
    {%- assign sorted = site.projects | sort: "order" -%}
    {%- for project in sorted -%}
      <a class="interactive-card project-card" href="{{ project.url | relative_url }}">
        {%- if project.thumbnail -%}
          <img class="project-card-thumb" src="{{ project.thumbnail | relative_url }}" alt="" loading="lazy" />
        {%- endif -%}
        <div class="project-card-body">
          <h3>{{ project.title }}</h3>
          <p class="muted">{{ project.description }}</p>
        </div>
      </a>
    {%- endfor -%}
  </div>
{%- else -%}
  <div class="empty-state">
    <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7l10-5 10 5-10 5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    <strong>No projects yet</strong>
    Add entries under <code>_projects/</code>.
  </div>
{%- endif -%}
