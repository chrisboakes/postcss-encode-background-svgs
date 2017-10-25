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
        const svgRegex = /url\(\'data:image\/svg\+xml(?:,|;utf8,)\s?(<svg.*<\/svg>)\'\)(.*)/g;
        // Execute our regex on the value passed in to this method
        let match = svgRegex.exec(svgURL);
        // If our Regex matches
        if (match !== null && match.length > 1 && match[1] !== 0 && match[2] !== 0) {
            return {
                svg: match[1],
                shorthandRules: match[2]
            };
        } else {
            return null;
        }
    }
};
