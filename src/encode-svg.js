let detectSVG = require('./detect-svg');
/**
 * URL encode our SVG
 * @param String svgURL - string of background-image value
 */
module.exports = {
    encodeSVG(decl) {
        // Default value is what we've passed in
        // If the regex is successful, this will be overidden
        let svgURL = decl.value;
        let newValue = svgURL;
        let matchSVG = detectSVG.getSVGElement(svgURL);
        if (matchSVG) {
            let encodedURL = matchSVG.svg;
            // Ensure that the <svg /></svg> segment of the URL is not already encoded
            // If not, encode it
            if (!matchSVG.svgAlreadyEncoded) {
                encodedURL = module.exports.encodeOptimizedSVGDataUri(matchSVG.svg);
            }
            let shorthandRules = matchSVG.shorthandRules;
            // Place the encoded URL back into the value structure
            newValue = `url("data:image/svg+xml,${encodedURL}")${shorthandRules}`;
        // If our Regex doesn't match, throw an error
        } else {
            throw decl.error('Background SVG syntax error - please correct your syntax and try again.', {plugin: 'postcss-encode-background-svgs'});
        }
        return newValue;
    },

    /**
     * Correctly optimise SVG
     * Taken from: https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
     * @author Taylor Hunt
     * @param  String svgString - SVG unencoded
     * @return String
     */
    encodeOptimizedSVGDataUri(svgString) {
        var uriPayload = encodeURIComponent(svgString) // encode URL-unsafe characters
            .replace(/%0A/g, '') // remove newlines
            .replace(/%20/g, ' ') // put spaces back in
            .replace(/%3D/g, '=') // ditto equals signs
            .replace(/%3A/g, ':') // ditto colons
            .replace(/%2F/g, '/') // ditto slashes
            .replace(/%22/g, '\''); // replace quotes with apostrophes (may break certain SVGs)
        return uriPayload;
    }
};
