# PostCSS Encode Background SVGs
[![CI][ci-badge]][ci-link] [![npm version][npm-badge-version]][npm-link]

[npm-badge-version]: https://img.shields.io/npm/v/postcss-encode-background-svgs.svg
[npm-link]: https://www.npmjs.com/package/postcss-encode-background-svgs
[ci-badge]: https://github.com/chrisboakes/postcss-encode-background-svgs/actions/workflows/ci.yml/badge.svg
[ci-link]: https://github.com/chrisboakes/postcss-encode-background-svgs/actions/workflows/ci.yml

[PostCSS](https://github.com/postcss/postcss) plugin to encode background-image SVGs for cross browser compatibility.

### The Problem
Background image SVGs are great but they don't render on IE unless encoded properly.

### The Solution
Write your background as you usually would:

```scss
/* Input example */
background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg"></svg>');
```
This encoder will then take your readable SVG and return a UTF-8 cross browser encoded solution like so:

```scss
/* Output example */
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
```

## Requirements

- Node.js >= 20
- PostCSS 8 (peer dependency)

## Installation

[pnpm](https://pnpm.io/)

```sh
pnpm add -D postcss postcss-encode-background-svgs
```

[npm](https://www.npmjs.com/)

```sh
npm install --save-dev postcss postcss-encode-background-svgs
```

## Usage

In your `postcss.config.js`:

```js
module.exports = {
    plugins: {
        'postcss-encode-background-svgs': {}
    }
};
```

Or via the API — the package ships both ESM and CommonJS builds with TypeScript types:

```js
// ESM
import postcss from 'postcss';
import encodeBackgroundSVGs from 'postcss-encode-background-svgs';

postcss([encodeBackgroundSVGs()]);
```

```js
// CommonJS
const postcss = require('postcss');
const encodeBackgroundSVGs = require('postcss-encode-background-svgs');

postcss([encodeBackgroundSVGs()]);
```

See the [PostCSS](https://github.com/postcss/postcss#usage) docs for examples for your environment.

Once included in your environment, the plugin will search for any scss value with ```data:image/svg+xml```.

## Migrating from v1

Version 2 is a modernisation release — the encoding behaviour is unchanged:

- PostCSS 8 is now a peer dependency (v1 bundled PostCSS 6); install `postcss` alongside the plugin
- Node.js >= 20 is required
- The plugin registers under the name `postcss-encode-background-svgs` (previously `postcss-urlencode-background-svgs`)

## Credits

Big thanks for [Vasi](https://github.com/Vasiharan) and [Rob](https://github.com/RobDWaller) for their help with the Regex.

MIT © [Chris Boakes](https://twitter.com/cboakes)
