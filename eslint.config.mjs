import config from '@antfu/eslint-config'

export default config({
  vue: true,
  typescript: true,

  formatters: {
    css: true,
    svg: true,
    html: true
  },

  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'double'
  }
})