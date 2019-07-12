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

test('is background svg but is base64 encoded', () => {
    // Sample base64 encoded image cribbed from https://github.com/swagger-api/swagger-ui/blob/master/src/style/_form.scss
    let svgValue = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICAgIDxwYXRoIGQ9Ik0xMy40MTggNy44NTljLjI3MS0uMjY4LjcwOS0uMjY4Ljk3OCAwIC4yNy4yNjguMjcyLjcwMSAwIC45NjlsLTMuOTA4IDMuODNjLS4yNy4yNjgtLjcwNy4yNjgtLjk3OSAwbC0zLjkwOC0zLjgzYy0uMjctLjI2Ny0uMjctLjcwMSAwLS45NjkuMjcxLS4yNjguNzA5LS4yNjguOTc4IDBMMTAgMTFsMy40MTgtMy4xNDF6Ii8+PC9zdmc+)';
    expect(isSVG.isBackgroundSVG(svgValue)).toBeFalsy();
});

test('is not background svg because svg is not defined properly', () => {
    let svgValue = 'url(\'image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" /></svg>\')';
    expect(isSVG.isBackgroundSVG(svgValue)).toBeFalsy();
});
