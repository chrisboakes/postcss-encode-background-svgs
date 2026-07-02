/**
 * Check to see if value contains the string 'data:image/svg+xml'
 * @param decVal - CSS value
 */
export function isBackgroundSVG(decVal: string): boolean {
    return decVal.indexOf('data:image/svg+xml') !== -1 && decVal.indexOf('data:image/svg+xml;base64,') === -1;
}
