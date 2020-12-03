# [pxseu.com](https://www.pxseu.com)

[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)

### About

This repo contains the full content of my website for free! (under a license)
Please check it out and contribute if you wish to do so!

### Installation

The website requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.
To use it to it's full potential it requires a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) and a [MongoDB](https://www.mongodb.com/) database.
For development use:

```sh
$ nano .env
WEBHOOK = (Your webhook token.)
MONGODB_URI = (Your database.)
$ npm install
$ npm run dev
```

And for production please do:

```sh
$ nano .env
WEBHOOK = (Your webhook token.)
MONGODB_URI = (Your database.)
$ npm install
$ npm run deploy
$ npm run prod
```
