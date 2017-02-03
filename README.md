# Automacro

Automate tedious crafting procedures in FFXIV.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Features

* Supports capturing mouse position for the 'Synthesize' button in the Crafting Log window.
* Supports capturing multiple macroes each with customizable delay.
* Supports ability to craft as a collectable.
* Able to run until a certain time or total synth constraint are met. For example, run until 5 mins has elapsed, or until 10 synths are made, or perhaps both.
* Switches primary focused window to the game when performing mouse clicks or key strokes to ensure they are not lost in some other process. Will switches back to the previously focused process afterwards automatically.

### Prerequisites

1. Only compatible with Windows.
2. You need to have nodejs installed.
3. You need to install required [build dependencies](https://github.com/nodejs/node-gyp#installation). I followed the first option under Windows.

### Installing

Get package dependencies.

```
npm install
```

### Usage

Now run it as a standalone node app.

```
node app.js
```

You can also pass in a config file instead of passing in the settings manually via the CLI.

```
node app.js --config "./config/default.json"
```

### Potential Todos

This is mostly for my own personal use, but you can use if you have a need for it. Probably will make it a proper desktop app with Electron later or something but for now the bare minimum works on the CLI.
