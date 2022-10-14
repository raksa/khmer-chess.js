# khmer-chess.js [![Build Status](https://travis-ci.com/K4us/khmer-chess.js.svg?branch=main)](https://travis-ci.com/K4us/khmer-chess.js)

khmer-chess.js is a Javascript chess library that is used for khmer-chess [Ouk-Khmer](https://en.wikipedia.org/wiki/Ouk-Khmer_(Hill%27s_version)) move generation/validation, piece placement/movement, and check/checkmate/stalemate detection - basically everything but the AI.

Notation [KPNG Spec](https://github.com/K4us/khmer-chess.js/tree/main/src/kpgn/kpng-spec)

```typescript
const input = 'BHGQK2B/4GH2/TFFFFFFF/8/8/5ft1/2qg2b1/bhgk2h1 w ---- -- -.- ffffff';
const kc = new KhmerChess(input);
console.log(kc.drawAscii());
```

![alt text](./docs/Screen%20Shot%202022-10-13%20at%2010.18.25%20PM.png "Screen Shot 2022-10-13 at 10.18.25 PM.png")

## Installing

* `npm i -D khmer-chess`

## Importing

* [Typescript](https://www.typescriptlang.org/): 
```typescript
import { KhmerChess } from 'khmer-chess';
```
* [Node.js](https://nodejs.org/en/): 
```javascript
const { KhmerChess } = require('khmer-chess');
```

## Run

```bash
> npm i
> npm start
> npm run start:watch
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
