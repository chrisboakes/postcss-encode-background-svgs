# PostCSS Encode Background SVGs
[![Build Status][travis-badge]][travis-link] [![Code Coverage][codecov-badge]][codecov-link] [![npm version][npm-badge-version]][npm-link]

[npm-badge-version]: https://img.shields.io/npm/v/postcss-encode-background-svgs.svg
[npm-link]: https://www.npmjs.com/package/postcss-encode-background-svgs
[travis-badge]: https://travis-ci.org/chrisboakes/postcss-encode-background-svgs.svg?branch=master
[travis-link]: https://travis-ci.org/chrisboakes/postcss-encode-background-svgs
[codecov-badge]: https://codecov.io/gh/chrisboakes/postcss-encode-background-svgs/branch/master/graph/badge.svg
[codecov-link]: https://codecov.io/gh/chrisboakes/postcss-encode-background-svgs

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

## Installation
[yarn](https://yarnpkg.com/en/)

```sh
yarn add postcss-encode-background-svgs
```

[npm](https://www.npmjs.com/)

```sh
npm install postcss-encode-background-svgs
```

## Usage
```js
postcss([require('postcss-encode-background-svgs')()])
```

See the [PostCSS](https://github.com/postcss/postcss#usage) docs for examples for your environment.

Once included in your environment, the plugin will search for any scss value with ```data:image/svg+xml```.

## Credits

Big thanks for [Vasi](https://github.com/Vasiharan) and [Rob](https://github.com/RobDWaller) for their help with the Regex.

MIT © [Chris Boakes](https://twitter.com/cboakes)
