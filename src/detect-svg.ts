export interface SVGMatch {
    svg: string;
    shorthandRules: string;
    svgAlreadyEncoded: boolean;
}

/**
 * Use Regex to find the <svg /></svg> segment of the URL
 * @param svgURL - string of background-image value
 */
export function getSVGElement(svgURL: string): SVGMatch | null {
    // Regex for an un-encoded SVG
    const svgRegex = /url\((?:'|")data:image\/svg\+xml(?:,|;utf8,|;charset=utf-8,)\s?(<svg.*<\/svg>)(?:'|")\)(.*)/g;
    // Regex for an encoded SVG
    const svgRegexEncoded = /url\((?:'|")data:image\/svg\+xml(?:,|;utf8,|;charset=utf-8,)\s?(%3Csvg.*(?:\/%3E%3C\/svg%3E|%2F%3E%3C%2Fsvg%3E))(?:'|")\)(.*)/g;
    // Execute our regex on the value passed in to this method
    const match = svgRegex.exec(svgURL);
    const matchEncoded = svgRegexEncoded.exec(svgURL);
    // If our Regex matches
    if (match !== null && match.length > 1) {
        return {
            svg: match[1],
            shorthandRules: match[2],
            svgAlreadyEncoded: false
        };
    } else if (matchEncoded !== null && matchEncoded.length > 1) {
        return {
            svg: matchEncoded[1],
            shorthandRules: matchEncoded[2],
            svgAlreadyEncoded: true
        };
    } else {
        return null;
    }
}
