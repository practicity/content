---
layout: page
title: Catalog
permalink: /catalog/
---

<div class="items-list">
  {% for item in site.items %}
    <article class="item" style="margin-bottom: 20px; border-bottom: 1px solid #eee;">
      <h2><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h2>
      <p>{{ item.description }}</p> 
      <a href="{{ item.url | relative_url }}" class="read-more">View Item Details</a>
    </article>
  {% endfor %}
</div>
