---
layout: post
title: "JAAMSIM"
description: "A comprehensive simulation designed to teach situational leadership in high-pressure environments. This long-form text explains the core pedagogical goals and the experiential learning outcomes expected from the session."
type: "Simulation Software"
category: "Industry"
complexity: "★★★☆☆"
activity: "★★★★☆"
tags: [Simulation, Training, Discreet Manufacturing, Jaamsim, Java]
website: "https://practi.city"
github: "https://github.com/practicity"
license: "Apache 2.0"
last_survey: "March 15, 2026"
---

{{ page.description }}

### 📊 Quick Facts

|:---- |:--- |
| **Type** | {{ page.type }} |
| **Category** | {{ page.category }} |
| **Complexity** | <span style="color: #f1c40f;">{{ page.complexity }}</span> |
| **Activity** | <span style="color: #3498db;">{{ page.activity }}</span> |
| **License** | {{ page.license }} |
| **Last Survey** | {{ page.last_survey }} |

---

### 🖼️ Screenshots

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
  <img src="https://picsum.photos/400/250?random=1" style="border-radius: 8px; border: 1px solid #eee; width: 100%;">
  <img src="https://picsum.photos/400/250?random=2" style="border-radius: 8px; border: 1px solid #eee; width: 100%;">
  <img src="https://picsum.photos/400/250?random=3" style="border-radius: 8px; border: 1px solid #eee; width: 100%;">
</div>

---

### 🔗 Resources
*   🌐 **Official Website:** [Visit Site]({{ page.website }})
*   💻 **Source Code:** [GitHub Repository]({{ page.github }})

---

### 🏷️ Tags
{% for tag in page.tags %}
<a href="{{ site.baseurl }}/tags#{{ tag | slugize }}" style="background-color: #f0f0f0; padding: 4px 10px; border-radius: 20px; font-size: 0.8em; margin-right: 5px; text-decoration: none; color: #333;">
  #{{ tag }}
</a>
{% endfor %}
