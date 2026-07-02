# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

2.0.0 - 2026-07-02

* **Breaking:** PostCSS 8 is now a peer dependency (was a bundled PostCSS 6 dependency)
* **Breaking:** Node.js >= 20 is required
* **Breaking:** plugin registers as `postcss-encode-background-svgs` (previously `postcss-urlencode-background-svgs`)
* Migrated to the PostCSS 8 plugin API
* Rewrote source in TypeScript; package now ships ESM + CommonJS builds with type declarations
* Replaced Jest with Vitest and added plugin-level integration tests (encoding behaviour is unchanged)
* Replaced Travis CI with GitHub Actions (test matrix on Node 20/22/24)
* Releases are published from CI via npm trusted publishing with provenance
* Switched to pnpm, added Dependabot, ESLint 10 flat config, and a `files` whitelist instead of `.npmignore`

1.0.3 - 2018-03-16

* Updated REGEX to take into account both double and single quote marks

1.0.2 - 2018-03-16

* Updated encoded REGEX detection to take into account an already optimised encoded SVG

1.0.1 - 2018-02-21

* Ensured input SVG is valid

1.0.0 - 2018-01-03

* Wrote test to check for inline styles
* Correctly throw errors if SVG is invalid

0.0.9 - 2017-12-08

* Fixed quote marks bug

0.0.7 - 2017-11-29

* [Better way](https://codepen.io/tigt/post/optimizing-svgs-in-data-uris) to encode SVG thanks to [retyui](https://github.com/retyui) for the spot

0.0.4 - 2017-10-27

* Fixes bug where if SVG is already encoded, plugin doesn't throw error

0.0.0 - 2017-10-26

* Initial release
