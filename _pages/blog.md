---
layout: page
title: blog
permalink: /blog/
description: Notes, write-ups, and the occasional thought. <!-- TODO -->
---

{%- if site.posts.size > 0 -%}
  <ul class="post-list">
    {%- for post in site.posts -%}
      <li>
        <div class="post-date">{{ post.date | date: "%B %-d, %Y" }}</div>
        <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {%- if post.excerpt -%}<p class="muted">{{ post.excerpt | strip_html | truncate: 140 }}</p>{%- endif -%}
      </li>
    {%- endfor -%}
  </ul>
{%- else -%}
  <div class="empty-state">
    <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
    <strong>No posts yet</strong>
    Add Markdown files under <code>_posts/</code>.
  </div>
{%- endif -%}
