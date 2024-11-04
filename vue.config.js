const {defineConfig} = require("@vue/cli-service")
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/file-preview-vue2/',
  productionSourceMap: false,
  css: {
    extract: true, // 确保 CSS 被提取到单独的文件
    sourceMap: false, // 关闭 source map 以减少构建时间
  },
  configureWebpack: {
    entry: process.env.NODE_ENV === 'development' ? './src/main.js' : './src/index.js',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      fallback: {
        stream: require.resolve("stream-browserify"),
        util: false
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    ],
  },
  devServer: {
    open: false,
    port: 8081,
    proxy: {
    },
  },
})
