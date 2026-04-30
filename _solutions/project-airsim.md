---
layout: solution
title: PROJECT AIRSIM
description: >
  Project AirSim is an OPEN SOURCE simulation platform for drones, robots, and
  other autonomous systems.
type: Simulation Software
category: Aerospace
complexity: ★★★
activity: ★★★★
github: https://github.com/iamaisim/ProjectAirSim
last_survey: 30/04/2026
screenshot1: /images/solutions/airsim.jpg
tags:
  - Aerospace
locationids:
  - ARTWAPT
contributor_id: alexandre-gain
comments: true
---
Project AirSim consists of three main layers:



Project AirSim Sim Libs - Base infrastructure for defining a generic robot structure and simulation scene tick loop



Project AirSim Plugin - Host package (currently an Unreal Plugin) that builds on the sim libs to connect external components (controller, physics, rendering) at runtime that are specific to each configured robot-type scenario (ex. quadrotor drones)



Project AirSim Client Library - End-user library to enable API calls to interact with the robot and simulation over a network connection



Copyright (C) Microsoft Corporation.

Copyright (C) 2025 IAMAI CONSULTING CORP

MIT License
