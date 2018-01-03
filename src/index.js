let postcss = require('postcss');
let encode = require('./encode-svg');
let isSVG = require('./is-background-svg');

/**
 * PostCSS plugin to urlencode background svgs
 * Loop through all CSS rules
 * Search for value with 'data:image/svg+xml'
 * Encode the <svg /></svg> segment of it and amend the value
 */
module.exports = postcss.plugin('postcss-urlencode-background-svgs', () => {
    return (root) => {
        root.walkRules((rule) => {
            // Loop through the declarations
            rule.walkDecls((decl) => {
                if (isSVG.isBackgroundSVG(decl.value)) {
                    decl.value = encode.encodeSVG(decl);
                }
            });
        });
    };
});
