import { resolve } from "node:path";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const dtsOptions = {
  insertTypesEntry: true,
  copyDtsFiles: true,
};

export default defineConfig({
  plugins: [vue(), dts(dtsOptions)],

  build: {
    lib: {
      name: "@bula-ui/vue",
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["cjs", "es"],
      fileName: "lib",
    },

    rollupOptions: {
      external: ["vue"],

      output: {
        exports: "named",
        manualChunks: undefined,
      },
    },
    sourcemap: true,
  },
});
