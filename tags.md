---
layout: page
title: "Browse by Tag"
permalink: /tags/
---

<!-- 1. The "Tag Cloud" (Navigation) -->
<div style="margin-bottom: 40px; text-align: center;">
  {% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
  {% assign tag_words = site_tags | split:',' | sort %}

  {% for item in tag_words %}
    <a href="#{{ item | slugize }}" style="background-color: #f0f0f0; padding: 8px 15px; border-radius: 20px; display: inline-block; margin: 5px; text-decoration: none; color: #333;">
      {{ item }} <small>({{ site.tags[item].size }})</small>
    </a>
  {% endfor %}
</div>

<hr>

<!-- 2. The List of Items per Tag -->
{% for item in tag_words %}
  <h2 id="{{ item | slugize }}" style="border-bottom: 2px solid #eee; padding-top: 50px;">#{{ item }}</h2>
  <ul style="list-style: none; padding-left: 0;">
    {% for post in site.tags[item] %}
      <li style="margin-bottom: 15px;">
        <a href="{{ post.url | relative_url }}" style="font-size: 1.2em; font-weight: bold; text-decoration: none;">{{ post.title }}</a>
        <br>
        <small style="color: #666;">{{ post.description | truncate: 120 }}</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
