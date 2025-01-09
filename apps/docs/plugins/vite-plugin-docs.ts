import type { Plugin } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import { transformMdToVue } from './transformers/transform-md-to-vue';

const FILE_EXT = /\.(mdx?)$/;

const vuePlugin = createVuePlugin({
    include: [/\.vue$/, /\.md$/]
});

function createDocsPlugin(): Plugin[] {
    const vitePlugin: Plugin = {
        name: 'docs-plugin',
        version: '1.0.0',

        transform(_code, id) {
            if (FILE_EXT.test(id)) {
                return transformMdToVue(id);
            }
        },

        async handleHotUpdate(ctx) {
            const { file } = ctx;
            if (FILE_EXT.test(file)) {
                const code = await transformMdToVue(file);
                const read = () => code;

                return typeof vuePlugin.handleHotUpdate === 'function'
                    ? await vuePlugin.handleHotUpdate({ ...ctx, read })
                    : undefined;
            }
        }
    };

    return [vitePlugin, vuePlugin];
}

export default createDocsPlugin;
