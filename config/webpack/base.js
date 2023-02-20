const path = require('path')

const { webpackConfig } = require('@rails/webpacker')

// point to the postcss config
const css = webpackConfig.module.rules.find(module => module.test && module.test.toString().includes('css'))
if (css) {
  const postcss = css.use.find(config => config?.loader?.includes('postcss-loader'))
  if (postcss) {
    postcss.options.postcssOptions = {
      config: path.resolve(__dirname, 'postcss.config.js'),
    }
  }
}

module.exports = webpackConfig
