// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions,
        'no-new': 0,
        'no-useless-escape': 0,
        'arrow-parens': 0,
        "indent": ["error", 4],
        "space-before-function-paren": 0,
        "semi": [2, "always"],
        "quotes": ["error", "single"],
        // allow async-await
        'generator-star-spacing': 0
    }
}
