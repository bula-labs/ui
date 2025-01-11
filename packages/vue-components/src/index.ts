import type { Plugin } from "vue";

export * from "./components/button";
export * from "./components/modal";

export default <Plugin>{
  install: (_app) => {
    // app.component("BModal", Modal);
  },
};
