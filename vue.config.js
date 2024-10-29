const { defineConfig } = require("@vue/cli-service")
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/dist/',
  configureWebpack:{
    entry:process.env.NODE_ENV === 'development' ? './src/main.js' : './src/index.js',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      fallback: {
        stream: require.resolve("stream-browserify"),
        util:false
      },
    }
  },
  devServer: {
    open: false,
    port: 8081,
    proxy: {
    },
  },
})
