import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const dtsOptions = {
  insertTypesEntry: true,
  copyDtsFiles: true,
};

export default defineConfig({
  plugins: [vue(), dts(dtsOptions)],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

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
