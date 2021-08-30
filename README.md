# khmer-chess.js [![Build Status](https://travis-ci.com/K4us/khmer-chess.js.svg?branch=main)](https://travis-ci.com/K4us/khmer-chess.js)

khmer-chess.js is a Javascript chess library that is used for khmer-chess [Ouk-Khmer](https://en.wikipedia.org/wiki/Ouk-Khmer_(Hill%27s_version)) move generation/validation, piece placement/movement, and check/checkmate/stalemate detection - basically everything but the AI.

Inspired by [chess.js](https://github.com/jhlywa/chess.js)

Notation [KPNG Spec](https://github.com/K4us/khmer-chess.js/tree/main/src/kpgn/kpng-spec)

## Importing

* `npm i -D khmer-chess`
* [Typescript](https://www.typescriptlang.org/): `import { KhmerChess } from 'khmer-chess'`
* [Node.js](https://nodejs.org/en/): `const { KhmerChess } = require('khmer-chess/dist/src')`

## Run

```bash
> npm i
> npm start
```

## Build

```bash
> npm i
> npm run build
```

## Test and Coverage

```bash
> npm run test
> npm run cov
```
