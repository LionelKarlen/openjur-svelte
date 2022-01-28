# Openjur

Open implementation of the winjur timesheet system using svelte, sqlite, and electron, written in typescript.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg?style=for-the-badge)](https://www.contributor-covenant.org/)
[![](https://img.shields.io/github/issues/LionelKarlen/openjur-svelte?style=for-the-badge)](https://github.com/LionelKarlen/openjur/issues)
[![](https://img.shields.io/badge/Electron-%5E13.0.0-brightgreen?style=for-the-badge)](https://github.com/electron/electron)

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. For builds, please see the [releases](https://github.com/LionelKarlen/openjur-svelte/releases) tab.

### Prerequisites

Requirements for the software and other tools. I highly recommend using yarn.

- [yarn](https://github.com/yarnpkg/yarn) or [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [npx](https://www.npmjs.com/package/npx)

### Installing

A step by step series of examples that tell you how to get a development
environment running

Install dependencies

```
yarn install
```

Run the project locally

```
yarn electron:dev
```

## Running the tests

There are currently svelte and style tests. These are run in a pre-commit hook thanks to [husky](https://typicode.github.io/husky/#/).

### Svelte test

Checks if the svelte code can be compiled.

```
yarn check-svelte
```

### Style test

Checks if the right coding style has been used.

```
yarn check-format
```

To automatically fix style issues

```
yarn format
```

## Contributing

Please read through the issues and comment on one you are interested in. Make sure you run the checks before you submit a pull request. Technical documentation can be found in the [docs](https://github.com/LionelKarlen/openjur-svelte/tree/main/docs) folder. A roadmap of future features can be found [here](https://github.com/lionelkarlen/openjur-svelte/tree/main/docs/roadmap.md).

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this
repository](https://github.com/LionelKarlen/openjur-svelte/tags).
