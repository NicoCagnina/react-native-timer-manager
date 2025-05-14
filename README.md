# **🕰️ react-native-timer-manager**

****Global, optimized timer management for React Native apps**** — built for performance and flexibility

**---**

#### **🔥 Why use this?**

React Native apps often rely on multiple `setInterval` calls across components, which can ****crush performance**** — especially on lower-end devices.
This library centralizes all interval timers under a ****single master interval****, improving performance by up to ****23x**** in heavy-use scenarios.

**---**

#### **✅ Features**

- 🔁 One shared `setInterval` for all timers (by default 1s)
- 🧠 Global timer context with `registerTimer()`
- ⏸️ Pause/resume all timers
- 📊 Optional `<TimerStats />` debug widget
- 💤 Idle mode detection support (via optional `IdleProvider`)
- 🪶 Zero dependencies, fully typed, and tree-shakable

**---**

#### **🚀 Quick Start**

```bash
yarn add react-native-timer-manager