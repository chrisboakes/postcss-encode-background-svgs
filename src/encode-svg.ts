import { getSVGElement } from './detect-svg';

/**
 * Structural stand-in for a PostCSS Declaration: only the members this
 * module touches. Real Declaration instances satisfy it, and so do the
 * plain mock objects used in the unit tests.
 */
export interface EncodableDecl {
    value: string;
    error: (message: string, options?: { plugin?: string }) => Error;
}

/**
 * URL encode our SVG
 * @param decl - declaration whose value holds the background-image
 */
export function encodeSVG(decl: EncodableDecl): string {
    const matchSVG = getSVGElement(decl.value);
    // If our Regex doesn't match, throw an error
    if (!matchSVG) {
        throw decl.error('Background SVG syntax error - please correct your syntax and try again.', { plugin: 'postcss-encode-background-svgs' });
    }
    let encodedURL = matchSVG.svg;
    // Ensure that the <svg /></svg> segment of the URL is not already encoded
    // If not, encode it
    if (!matchSVG.svgAlreadyEncoded) {
        encodedURL = encodeOptimizedSVGDataUri(matchSVG.svg);
    }
    // Place the encoded URL back into the value structure
    return `url("data:image/svg+xml,${encodedURL}")${matchSVG.shorthandRules}`;
}

/**
 * Correctly optimise SVG
 * Taken from: https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
 * @author Taylor Hunt
 * @param svgString - SVG unencoded
 */
export function encodeOptimizedSVGDataUri(svgString: string): string {
    return encodeURIComponent(svgString) // encode URL-unsafe characters
        .replace(/%0A/g, '') // remove newlines
        .replace(/%20/g, ' ') // put spaces back in
        .replace(/%3D/g, '=') // ditto equals signs
        .replace(/%3A/g, ':') // ditto colons
        .replace(/%2F/g, '/') // ditto slashes
        .replace(/%22/g, '\''); // replace quotes with apostrophes (may break certain SVGs)
}
