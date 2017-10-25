# PostCSS Encode Background SVGs [![npm version][npm-badge-version]][npm-link] [![gitter][gitter-badge]][gitter-link]

[npm-badge-version]: https://img.shields.io/npm/v/postcss-encode-background-svgs.svg
[npm-link]: https://www.npmjs.com/package/postcss-encode-background-svgs
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/peterramsing/lost

[PostCSS](https://github.com/postcss/postcss) plugin to encode background-image SVGs for cross browser compatibility.

### The Problem
Background image SVGs are great but they don't render on IE unless encoded properly.

### The Solution
Write your background as you usually would:

```scss
background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" /></svg>');
```
This encoder will then take your readable SVG and return a UTF-8 cross browser encoded solution like so:

```scss
background-image: url('data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%2F%3E%3C%2Fsvg%3E');
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
postcss([require('urlencode-background-svgs')()])
```

See the [PostCSS](https://github.com/postcss/postcss#usage) docs for examples for your environment.

Once included in your environment, the plugin will search for any value with ```data:image/svg+xml```.

## Credits

Big thanks for [Vasi](https://github.com/Vasiharan) and [Rob](https://github.com/RobDWaller) for their help with the Regex.

MIT © [Chris Boakes](https://twitter.com/cboakes)
