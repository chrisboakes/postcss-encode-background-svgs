/* eslint-disable */
let detectSVG = require('../src/detect-svg');

test('svg to be detected', () => {
    let svgValue = 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    let svgSegement = {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" /></svg>',
        shorthandRules: '',
        svgAlreadyEncoded: false
    };
    expect(detectSVG.getSVGElement(svgValue)).toEqual(svgSegement);
});

test('svg to be detected with shorthand rules', () => {
    let svgValue = 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\') no-repeat top center';
    let svgSegement = {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" /></svg>',
        shorthandRules: ' no-repeat top center',
        svgAlreadyEncoded: false
    };
    expect(detectSVG.getSVGElement(svgValue)).toEqual(svgSegement);
});

test('svg to be detected with explicit utf8', () => {
    let svgValue = 'url(\'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    let svgSegement = {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" /></svg>',
        shorthandRules: '',
        svgAlreadyEncoded: false
    };
    expect(detectSVG.getSVGElement(svgValue)).toEqual(svgSegement);
});

test('svg to be null if invalid text preceding opening svg tag', () => {
    let svgValue = 'url(\'data:image/svg+xml,apples <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(detectSVG.getSVGElement(svgValue)).toBeNull();
});

test('svg to be detected with space after comma', () => {
    let svgValue = 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>\')';
    let svgSegement = {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>',
        shorthandRules: '',
        svgAlreadyEncoded: false
    };
    expect(detectSVG.getSVGElement(svgValue)).toEqual(svgSegement);
});

test('svg to be detected with no space after comma', () => {
    let svgValue = 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>\')';
    let svgSegement = {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>',
        shorthandRules: '',
        svgAlreadyEncoded: false
    };
    expect(detectSVG.getSVGElement(svgValue)).toEqual(svgSegement);
});

test('svg to return encoded version if already encoded', () => {
    let svgValue = 'url(\'data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2011.5%2023.7%22%3E%3Cpath%20d%3D%22M2.5%204.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2%20.5-4.2H7.6V5.3c0-.4.6-1%201.1-1h2.8V0H7.7C2.4%200%202.5%204.2%202.5%204.8%22%2F%3E%3C%2Fsvg%3E\')';
    let svgSegement = {
        svg: '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2011.5%2023.7%22%3E%3Cpath%20d%3D%22M2.5%204.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2%20.5-4.2H7.6V5.3c0-.4.6-1%201.1-1h2.8V0H7.7C2.4%200%202.5%204.2%202.5%204.8%22%2F%3E%3C%2Fsvg%3E',
        shorthandRules: '',
        svgAlreadyEncoded: true
    };
    expect(detectSVG.getSVGElement(svgValue)).toEqual(svgSegement);
});

test('svg be null with incorrect data', () => {
    let svgValue = 'url(\'data:image/svg+jpg, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(detectSVG.getSVGElement(svgValue)).toBeNull();
});

test('svg be null without closing svg tag', () => {
    let svgValue = 'url(\'data:image/svg+jpg, <svg xmlns="http://www.w3.org/2000/svg" />\')';
    expect(detectSVG.getSVGElement(svgValue)).toBeNull();
});

test('svg be null if no data definition', () => {
    let svgValue = 'url(\'<svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(detectSVG.getSVGElement(svgValue)).toBeNull();
});
