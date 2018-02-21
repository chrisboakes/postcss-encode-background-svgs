/* eslint-disable */
let encode = require('../src/encode-svg');

test('svg to be encoded', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg"></svg>\')',
        error: () => { throw new Error(); }
    };
    let svgEncoded = 'url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3C/svg%3E\")';
    expect(encode.encodeSVG(svgValue)).toBe(svgEncoded);
});

test('svg to be encoded with shorthand attributes', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>\') no-repeat center center',
        error: () => { throw new Error(); }
    };
    let svgEncoded = 'url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 11.5 23.7\'%3E%3Cpath d=\'M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8\'/%3E%3C/svg%3E\") no-repeat center center';
    expect(encode.encodeSVG(svgValue)).toBe(svgEncoded);
});

test('svg to be encoded with style tags', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml, <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 178 157" style="enable-background:new 0 0 178 157;" xml:space="preserve"><style type="text/css">.st0{fill:#F90000;}</style><g><rect style="background-color: red" x="0.5" y="0.5" class="st0" width="177" height="156"/><path d="M177,1v155H1V1H177 M178,0H0v157h178V0L178,0z"/></g></svg>\')',
        error: () => { throw new Error(); }
    };
    let svgEncoded = 'url(\"data:image/svg+xml,%3Csvg version=\'1.1\' id=\'Layer_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 178 157\' style=\'enable-background:new 0 0 178 157%3B\' xml:space=\'preserve\'%3E%3Cstyle type=\'text/css\'%3E.st0%7Bfill:%23F90000%3B%7D%3C/style%3E%3Cg%3E%3Crect style=\'background-color: red\' x=\'0.5\' y=\'0.5\' class=\'st0\' width=\'177\' height=\'156\'/%3E%3Cpath d=\'M177%2C1v155H1V1H177 M178%2C0H0v157h178V0L178%2C0z\'/%3E%3C/g%3E%3C/svg%3E\")';
    expect(encode.encodeSVG(svgValue)).toBe(svgEncoded);
});

test('svg to be encoded with no space after comma', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>\')',
        error: () => { throw new Error(); }
    };
    let svgEncoded = 'url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 11.5 23.7\'%3E%3Cpath d=\'M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8\'/%3E%3C/svg%3E\")';
    expect(encode.encodeSVG(svgValue)).toBe(svgEncoded);
});

test('svg to be encoded with explicit utf8 declaration', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>\')',
        error: () => { throw new Error(); }
    };
    let svgEncoded = 'url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 11.5 23.7\'%3E%3Cpath d=\'M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8\'/%3E%3C/svg%3E\")';
    expect(encode.encodeSVG(svgValue)).toBe(svgEncoded);
});

test('svg to return same value with an already encoded svg', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2011.5%2023.7%22%3E%3Cpath%20d%3D%22M2.5%204.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2%20.5-4.2H7.6V5.3c0-.4.6-1%201.1-1h2.8V0H7.7C2.4%200%202.5%204.2%202.5%204.8%22%2F%3E%3C%2Fsvg%3E\')',
        error: () => { throw new Error(); }
    };
    let svgEncoded = 'url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2011.5%2023.7%22%3E%3Cpath%20d%3D%22M2.5%204.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2%20.5-4.2H7.6V5.3c0-.4.6-1%201.1-1h2.8V0H7.7C2.4%200%202.5%204.2%202.5%204.8%22%2F%3E%3C%2Fsvg%3E\")';
    expect(encode.encodeSVG(svgValue)).toBe(svgEncoded);
});

test('svg to not be encoded because of no closing svg tag', () => {
    let svgValue = {
        value: 'url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/>\')',
        error: () => { throw new Error(); }
    };
    expect(() => {
        encode.encodeSVG(svgValue);
    }).toThrow();
});

test('svg to not be encoded because of incorrect type declaration', () => {
    let svgValue = {
        value: 'url(\'image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 23.7"><path d="M2.5 4.8v3.4H0v4.2h2.5v11.4h5.1V12.3H11s.3-2 .5-4.2H7.6V5.3c0-.4.6-1 1.1-1h2.8V0H7.7C2.4 0 2.5 4.2 2.5 4.8"/></svg>\')',
        error: () => { throw new Error(); }
    };
    expect(() => {
        encode.encodeSVG(svgValue);
    }).toThrow();
});
