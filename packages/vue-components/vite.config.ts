// import fs from 'node:fs';
import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import glob from 'fast-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsCfgPaths from 'vite-tsconfig-paths';

// const PACKAGE_JSON = resolve(__dirname, 'package.json');
// const PKG_JSON_DATA = fs.readFileSync(PACKAGE_JSON, 'utf-8');
// const ENTRY_FILES = globSync('./src/**/*.{ts,js,vue}');

const COMPONENTS = glob
  .sync(['src/components/**/*.{ts,vue}', '!src/components/index.ts'])
  .map((file) => ({
    entry: file,
    name: file
      .replace('src/components/', '')
      .replace(/\.(ts|vue)$/, '')
      .split('/')
      .join('-'),
  }));

// async function updatePackageJson() {
//   try {
//     const pkg = JSON.parse(PKG_JSON_DATA.toString());
//     pkg.exports = {
//       '.': {
//         types: './dist/index.d.ts',
//         require: './dist/index.js',
//         import: './dist/index.mjs',
//       },
//     };

//     ENTRY_FILES.filter(
//       (entry) =>
//         entry.includes('components') &&
//         !entry.endsWith('components/index.ts') &&
//         entry.endsWith('index.ts'),
//     )
//       .map((entry) =>
//         entry.replace('./src/components/', '').replace(/\/index\.(ts|js)/g, ''),
//       )
//       .forEach((entry) => {
//         pkg.exports = {
//           ...pkg.exports,
//           [`./${entry}`]: {
//             types: `./distcomponents/${entry}/index.d.ts`,
//             require: `./dist/components/${entry}/index.js`,
//             import: `./dist/components/${entry}/index.mjs`,
//           },
//         };
//       });

//     const pkgString = JSON.stringify(pkg, null, 2);
//     fs.writeFileSync(PACKAGE_JSON, pkgString);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

export default defineConfig({
  plugins: [
    vue({
      features: {
        optionsAPI: false,
        propsDestructure: true,
      },
    }),
    tsCfgPaths({
      root: __dirname,
    }),
    dts({
      entryRoot: './src',
      tsconfigPath: './tsconfig.json',
      staticImport: true,
      rollupTypes: true,
    }),
  ],

  build: {
    lib: {
      name: '@bula-ui/vue',
      entry: {
        'index': 'src/index.ts',
        'lib/index': 'src/lib/index.ts',
        ...Object.fromEntries(
          COMPONENTS.map((c) => [c.name, resolve(__dirname, c.entry)]),
        ),
      },
      formats: ['es'],
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },

        preserveModules: true,
        preserveModulesRoot: 'src',

        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: ({ name }) => {
          if (name === 'index') return 'index.mjs';
          return `${name.replace('components-', 'components/')}.mjs`;
        },
        chunkFileNames: 'chunks/[name]-[hash].mjs',
        exports: 'named',
      },
    },

    emptyOutDir: true,
  },
});
