import type { Plugin } from 'vue';

export * from './components';
export * from './lib';

export default <Plugin>{
  install: (_app) => {
    // app.component("BModal", Modal);
  },
};
