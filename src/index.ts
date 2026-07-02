import type { PluginCreator } from 'postcss';
import { encodeSVG } from './encode-svg';
import { isBackgroundSVG } from './is-background-svg';

/**
 * PostCSS plugin to urlencode background svgs
 * Search declaration values for 'data:image/svg+xml'
 * Encode the <svg /></svg> segment of it and amend the value
 */
const plugin: PluginCreator<void> = () => ({
    postcssPlugin: 'postcss-encode-background-svgs',
    // A single walk via Once rather than a Declaration visitor:
    // the visitor re-runs on values it has just rewritten, and the
    // encoded output of a non-self-closing <svg> would not re-match
    Once(root) {
        root.walkDecls((decl) => {
            if (isBackgroundSVG(decl.value)) {
                decl.value = encodeSVG(decl);
            }
        });
    }
});

plugin.postcss = true;

export default plugin;
