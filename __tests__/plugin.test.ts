import { test, expect } from 'vitest';
import postcss from 'postcss';
import plugin from '../src/index';

async function run(input: string): Promise<string> {
    const result = await postcss([plugin()]).process(input, { from: undefined });
    expect(result.warnings()).toHaveLength(0);
    return result.css;
}

test('plugin is a valid postcss 8 plugin', () => {
    expect(plugin.postcss).toBe(true);
    expect(plugin()).toHaveProperty('postcssPlugin', 'postcss-encode-background-svgs');
});

test('encodes an unencoded background svg', async () => {
    const input = 'a { background-image: url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg"></svg>\'); }';
    const output = 'a { background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3C/svg%3E"); }';
    expect(await run(input)).toBe(output);
});

test('preserves shorthand rules after the url', async () => {
    const input = 'a { background: url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg"></svg>\') no-repeat center center; }';
    const output = 'a { background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3C/svg%3E") no-repeat center center; }';
    expect(await run(input)).toBe(output);
});

test('already encoded svg stays stable (walk converges)', async () => {
    const input = 'a { background-image: url(\'data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E%3C%2Fsvg%3E\'); }';
    const output = 'a { background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%2F%3E%3C%2Fsvg%3E"); }';
    const first = await run(input);
    expect(first).toBe(output);
    // Running the plugin over its own output changes nothing
    expect(await run(first)).toBe(first);
});

test('leaves base64 encoded svgs untouched', async () => {
    const input = 'a { background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=); }';
    expect(await run(input)).toBe(input);
});

test('leaves non-svg declarations untouched', async () => {
    const input = 'a { color: red; background: url(image.png); }';
    expect(await run(input)).toBe(input);
});

test('rejects with a css syntax error on malformed svg', async () => {
    const input = 'a { background-image: url(\'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg">\'); }';
    await expect(
        postcss([plugin()]).process(input, { from: undefined }).then((result) => result.css)
    ).rejects.toThrow('Background SVG syntax error');
});
