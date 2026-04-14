---
title: First PC Build
date: 2026-04-14
summary: Building my first PC
slug: first-pc-build
tags: hardware, pc
keywords: pc, computer, specs, build, personal computer, cpu, gpu, ram, ssd, fans, case, thermal, rpm
---

# First PC Build

## Current Specs (table)

| Component | Final Choice |
| --- | --- |
| CPU | AMD Ryzen 7 9700X |
| GPU | ASRock Radeon RX 9070 XT Steel Legend 16GB |
| Motherboard | Gigabyte B650 Gaming X AX V2 |
| RAM | Crucial Pro OC 32GB (2x16GB) DDR5-6000 CL36 |
| Storage | Crucial P310 2TB NVMe SSD |
| CPU Cooler | Thermalright Peerless Assassin 120 SE RGB |
| Power Supply | Super Flower SF850 Combat FM (850W, 80+ Gold, ATX) |
| Case | Lian Li Lancool 217 TG (Black) |
| Monitor | Acer Nitro VG270U Z1 (27 inch, 2560x1440, up to 270Hz) |
| Operating System | Windows 11 Home 64-bit |

I built my first desktop after running into instability and crash issues during heavier workloads on my laptop. Definetly ran into issues with wiring and hardware as it was a new learning experience for me. The final result though is a stable high performance PC that handles gaming and engineering tasks far better than my laptop.

## Why I Started This Project

I wanted a machine that could handle gaming and engineering work without the random crashes I was seeing on my laptop. I also noticed RAM prices moving up, so I decided to stop delaying and build sooner instead of waiting for a potential dip.

- Problem I was trying to solve: Laptop instability/crashing and performance limits for games plus technical workloads.
- What success looked like: A PC that powers on reliably, stays stable, and delivers high performance in games and productivity software.

## Constraints

- Budget: Started at about $1200, then increased to about $2000 after realizing my target performance was not realistic at the original budget.
- Time spent: No hard deadline, but I wanted to finish before RAM prices increased further.


## Tools, Parts, and References

### Parts Journey (Two Passes)

I did this build in two passes: first a value oriented draft, then a higher performance final pass after changing budget.

#### Pass 1 (Initial Plan)

| Part | Selection | Price |
| --- | --- | --- |
| Case | Gamdias Apollo E2 Elite Mid Tower | $49.99 |
| CPU | AMD Ryzen 5 7600X | $87.78 |
| RAM | G.Skill 16GB DDR5-6000 CL36 (single stick) | $129.99 |
| Motherboard | ASUS B650E Max Gaming WiFi | $132.22 |
| Cooler | Thermalright Assassin X120 SE Slim | $24.99 |
| PSU | Lian Li RB750W 80+ | $69.99 |
| GPU | ASRock RX 9060 XT Challenger 16GB | $369.99 |
| Microcenter Tax | | $67.03 |
| SSD | Crucial P310 2TB Internal SSD PCIe Gen 4 x4 NVMe M.2 (Best Buy)| 208.79 |
| Total |  | $1,140.77 |

#### Pass 2 (Final Build)

| Part | Final Selection | Price |
| --- | --- | --- |
| First pass total |  | $1,140.77 |
| Case | GAMDIAS APOLLO E2 ELITE MID TOW | -$49.99 |
| CPU | AMD AMD RYZEN 5 7600X WO COOL | -$87.78 |
| RAM | G.SKILL 16G 1X D5 6000 C36 FX B | -$129.99 |
| Motherboard | ASUS B650E MAX GAMING WF | -$132.22 |
| Cooler | THERMALRI ASSASSIN X120 SE SLIM | -$24.99 |
| PSU | LIANLI RB750W SM 80+B ATX3.1 | -$69.99 |
| GPU | ASROCK RX9060XT CL 16GO | -$369.99 |
| Case | Lian Li Lancool 217 TG ATX | $119.99 |
| CPU | AMD Ryzen 7 9700X | $194.77 |
| RAM | Crucial 32GB (2x16GB) DDR5-6000 CL36 Pro OC | $249.99 |
| Motherboard | Gigabyte B650 Gaming X AX V2 | $155.23 |
| Cooler | Thermalright Peerless Assassin 120 SE RGB | $54.99 |
| PSU | Super Flower SF850 Combat FM 80+ Gold | $119.99 |
| GPU | ASRock RX 9070 XT Steel Legend 16GB | $669.99 |
| Monitor | Acer 27 inch IPS VG270U | $199.99 |
| Cable ties | Wrap-It self-grip cable ties | $6.99 |
| Protection plan | TWG 2-year protection plan | $139.99 |
| Replacement plan | TWG 2-year replacement | $24.99 |
| Tax | | $70.29 |
| E-waste Recycle Fee | | $5.00 |
| Actual total spent |  | $2,288.02 |

- Hardware: Final pass 2 parts listed above, plus basic cable ties for management.
- Software: BIOS (F34), Windows 11 Home, AMD graphics driver stack, and DxDiag for validation.
- Reference links:
  - https://www.youtube.com/watch?v=v7MYOpFONCU
  - https://youtu.be/ZZnZe-e7-vU?si=yN-GvNidwhFuGtN8
  - https://youtu.be/fDzO5g_jzGo?si=1WMN2oxrhePPOtw5

The second-pass total above is the actual amount I spent after the return/exchange, not just the raw price of the final parts list.

## Process Walkthrough

### Step 1: Research and Selection

I first targeted a budget-first build around a Ryzen 5 + RX 9060 XT class setup. After comparing expected performance for high-refresh 1440p gaming and heavier engineering workloads, I realized I would likely outgrow that configuration quickly. I then shifted budget and rebuilt the list around a Ryzen 7 9700X, RX 9070 XT, 32GB RAM, and a stronger cooling and power setup.

### Step 2: Installation/Implementation

I followed the standard PC assembly order: CPU install, cooler mount, RAM and NVMe placement, motherboard install, case setup, GPU install, and then cable routing/wiring. I double checked front panel connectors, EPS/CPU power, GPU power, and 24-pin ATX power before first boot. After posting successfully, I finished BIOS setup and enabled the memory profile to run RAM at the rated speed.

### Step 3: Validation and Testing

I validated the build by confirming system detection in BIOS and Windows, then checking DxDiag for core hardware details and driver health. The machine reported Ryzen 7 9700X, 32GB memory, RX 9070 XT, and clean DirectX diagnostics with "No problems found". I also confirmed display output at 2560x1440 with high refresh support and used normal real-world gaming/software sessions as practical stability checks.

## What Went Wrong

- Issue 1: System would not power on after full assembly
  - Symptom: Pressing the power button did nothing.
  - Root cause: The 24-pin motherboard power cable was not fully seated.
  - Fix: Firmly reseated the 24-pin connector until fully locked, system powered on immediately.
- Issue 2: RAM install felt "stuck"
  - Symptom: DIMMs looked seated but were not fully clicking in.
  - Root cause: I was being too gentle because I was worried about damaging the motherboard or RAM.
  - Fix: Applied even, firm pressure until both latches properly engaged.
- Issue 3: RAM speed lower than box rating
  - Symptom: Memory initially ran around 5400 MT/s instead of 6000 MT/s.
  - Root cause: Default BIOS memory settings.
  - Fix: Enabled the memory profile in BIOS (EXPO/XMP equivalent for this board/RAM combo) and confirmed expected speed.

## Final Outcome

The build achieved exactly what I wanted: a reliable desktop that boots consistently and performs well in both games and engineering/software workloads. Moving from pass 1 to pass 2 increased cost, but it also removed the main compromises that would have bothered me long term. For a first build, the mistakes were minor and easy to recover from once I slowed down and checked basics.

