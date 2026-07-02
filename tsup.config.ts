import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    splitting: true,
    cjsInterop: true,
    sourcemap: false,
    target: 'node20'
});
