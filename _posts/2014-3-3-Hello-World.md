---
layout: post
title: The Experiential Community Contributions Page is ready
tags: [Simulation, Training, Jaamsim, News]
---

Find our contributions in our brand new web site !
Enjoy !

### 🏷️ Tags
{% for tag in page.tags %}
<a href="{{ site.baseurl }}/tags#{{ tag | slugize }}" style="background-color: #f0f0f0; padding: 4px 10px; border-radius: 20px; font-size: 0.8em; margin-right: 5px; text-decoration: none; color: #333;">
  #{{ tag }}
</a>
{% endfor %}