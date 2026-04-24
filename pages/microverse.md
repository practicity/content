---
layout: page
title: Understanding Practicity Microverse
permalink: /microverse/
---

## What is it?

Practi.City Microverse is a browser-based 3D world featuring a full city layout—complete with streets, buildings, a nuclear plant, a port, and an airport.

Sound familiar? If you’re looking to manage citizen happiness or defend your town from Godzilla like in SIMCITY™, you’re in the wrong place! Practi.City isn't a game; it’s a platform designed to showcase experiential learning and open-source solutions by envisioning a city dedicated entirely to educational simulations.

## Why?

The internet is full of experiential learning resources. We curate and categorize these materials, using a familiar 3D interface to offer an intuitive, original way to explore the various domains Practi.City covers.

Ultimately, our goal is to pioneer "cross-simulations"—combining different learning environments to foster collaboration and shared assets. For instance, pairing a Model UN assembly with an interpreter school creates a unique, high-value experience for participants in both fields.

As the saying goes: "If you want to go fast, go alone; if you want to go far, go together." Perhaps one day, this city will become a reality. Who knows?


## How to access it ?
You will need a usual laptop or your phone to navigate into PractiCity Microverse, nothing else, no installation (thanks to babylon.js - see our public repository at github).

Navigate with your keyboard like you would do in a 'first person view' game. Interact with buildings, items or people using E key (or pressing the Interact button displayed for mobile access).


{% if site.microverse_url contains '?' %}{% assign mv_sep = '&' %}{% else %}{% assign mv_sep = '?' %}{% endif %}
<div class="text-center">
  <a href="{{ site.microverse_url }}{{ mv_sep }}locationid=PRACTICITY{% if site.microverse_urlparams %}&{{ site.microverse_urlparams | join: "&" }}{% endif %}" target="microverse-tab" class="btn-standard">
    🏬 Enter Practicity Microverse
  </a>
</div>

## My device is too slow
You can simply navigate in the Locations page of this web site

<a href="{{ site.baseurl }}/locations">Visit PractiCity Microverse Locations</a>

## I want to contribute ?
You are most welcome to contribute ! Any ideas of buildings, streets, items, people, vehicles ? Just contact one of our main <a href="{{ site.baseurl }}/contributors">contributors</a>. 

Browse <a href="https://github.com/practicity/microverse">our github repository dedicated to PractiCity Microverse</a> and find out how this model has been elaborated and follow the usual procedure to contribute to a usual repositories in Github