let detectSVG = require('./detect-svg');
/**
 * URL encode our SVG
 * @param String svgURL - string of background-image value
 */
module.exports = {
    encodeSVG(svgURL) {
        // Default value is what we've passed in
        // If the regex is successful, this will be overidden
        let newValue = svgURL;
        let matchSVG = detectSVG.getSVGElement(svgURL);
        if (matchSVG) {
            // Encode the <svg /></svg> segment of the URL
            let encodedURL = encodeURIComponent(matchSVG.svg);
            let shorthandRules = matchSVG.shorthandRules;
            // Place the encoded URL back into the value structure
            newValue = `url('data:image/svg+xml, ${encodedURL}')${shorthandRules}`;
        // If our Regex doesn't match, throw an error
        } else {
            throw new Error('Background SVG syntax error - please correct your syntax and try again.');
        }
        return newValue;
    }
};
