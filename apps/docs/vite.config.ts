import path from 'node:path';
import { defineConfig } from 'vite';

import docs from './plugins/vite-plugin-docs';

// https://vite.dev/config/
export default defineConfig({
    plugins: [docs()],

    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), 'src')
        }
    }
});
