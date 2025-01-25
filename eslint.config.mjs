import config from '@antfu/eslint-config';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default config(
  {
    vue: true,
    typescript: true,

    formatters: {
      css: true,
      svg: true,
      html: true,
    },

    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
    },
  },
  {
    name: 'tailwindcss:recommended',
    ...tailwindcss.configs['flat/recommended'],
  },
);
