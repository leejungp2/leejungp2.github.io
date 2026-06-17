---
layout: page
title: archives
permalink: /blog/archives/
description: Paper reviews and lecture notes I keep returning to.
---

<nav class="blog-tabs" aria-label="Blog sections">
  <a class="blog-tab" href="{{ '/blog/' | relative_url }}">Writing</a>
  <a class="blog-tab is-active" href="{{ '/blog/archives/' | relative_url }}">Archives</a>
</nav>

<div class="archive-switcher">
  <input class="archive-toggle-input" type="radio" name="archive-view" id="archive-classes" checked>
  <input class="archive-toggle-input" type="radio" name="archive-view" id="archive-paper-reviews">

  <div class="blog-tabs archive-toggle" role="tablist" aria-label="Archive type">
    <label class="blog-tab" for="archive-classes" role="tab">Lecture Notes</label>
    <label class="blog-tab" for="archive-paper-reviews" role="tab">Paper Reviews</label>
  </div>

  <section class="archive-section archive-panel archive-panel-classes">
    <ul class="post-list">
      {%- for post in site.posts -%}
        {%- if post.archive_kind == "lecture" and post.hidden != true -%}
          <li>
            <div class="post-date">{{ post.date | date: "%B %-d, %Y" }}</div>
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {%- if post.excerpt -%}<p class="muted">{{ post.excerpt | strip_html | truncate: 140 }}</p>{%- endif -%}
          </li>
        {%- endif -%}
      {%- endfor -%}
    </ul>
  </section>

  <section class="archive-section archive-panel archive-panel-paper-reviews">
    <ul class="post-list">
      {%- for post in site.posts -%}
        {%- if post.archive_kind == "paper_review" and post.hidden != true -%}
          <li>
            <div class="post-date">{{ post.date | date: "%B %-d, %Y" }}</div>
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {%- if post.excerpt -%}<p class="muted">{{ post.excerpt | strip_html | truncate: 140 }}</p>{%- endif -%}
          </li>
        {%- endif -%}
      {%- endfor -%}
    </ul>
  </section>
</div>
