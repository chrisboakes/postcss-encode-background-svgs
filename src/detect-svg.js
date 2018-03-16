/**
 * Gets SVG element from CSS background-image value
 * @return String
 */
module.exports = {
    /**
     * Use Regex to find the <svg /></svg> segment of the URL
     * @param String svgURL - string of background-image value
     * @return String
     */
    getSVGElement(svgURL) {
        // Regex for an un-encoded SVG
        const svgRegex = /url\((?:\'|\")data:image\/svg\+xml(?:,|;utf8,|;charset=utf-8,)\s?(<svg.*<\/svg>)(?:\'|\")\)(.*)/g;
        // Regex for an encoded SVG
        const svgRegexEncoded = /url\((?:\'|\")data:image\/svg\+xml(?:,|;utf8,|;charset=utf-8,)\s?(%3Csvg.*(?:\/%3E%3C\/svg%3E|%2F%3E%3C%2Fsvg%3E))(?:\'|\")\)(.*)/g;
        // Execute our regex on the value passed in to this method
        let match = svgRegex.exec(svgURL);
        let matchEncoded = svgRegexEncoded.exec(svgURL);
        // If our Regex matches
        if (match !== null && match.length > 1 && match[1] !== 0 && match[2] !== 0) {
            return {
                svg: match[1],
                shorthandRules: match[2],
                svgAlreadyEncoded: false
            };
        } else if (matchEncoded !== null && matchEncoded.length > 1 && matchEncoded[1] !== 0 && matchEncoded[2] !== 0) {
            return {
                svg: matchEncoded[1],
                shorthandRules: matchEncoded[2],
                svgAlreadyEncoded: true
            };
        } else {
            return null;
        }
    }
};
