/* eslint-disable */
let isSVG = require('../src/is-background-svg');

test('is background svg', () => {
    let svgValue = 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(isSVG.isBackgroundSVG(svgValue)).toBeTruthy();
});

test('is background svg with explicit utf8', () => {
    let svgValue = 'url(\'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(isSVG.isBackgroundSVG(svgValue)).toBeTruthy();
});

test('is not background svg because svg is not defined properly', () => {
    let svgValue = 'url(\'image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(isSVG.isBackgroundSVG(svgValue)).toBeFalsy();
});
