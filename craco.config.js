// const CracoAlias = require('craco-alias')

const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
  // plugins: [
  //   {
  //     plugin: CracoAlias,
  //     options: {
  //       source: 'options',
  //       baseUrl: './',
  //       aliases: {
  //         '@': './src/'
  //       }
  //     }
  //   }
  // ]
}
