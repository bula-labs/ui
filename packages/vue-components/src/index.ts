import type { Plugin } from "vue";

export * from "./components";
export * from "./shared";

export default <Plugin>{
  install: (_app) => {
    // app.component("BModal", Modal);
  },
};
