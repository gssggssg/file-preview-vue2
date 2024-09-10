const { defineConfig } = require("@vue/cli-service")
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/dist/',
  configureWebpack:{
    externals: {
      vue: 'Vue'
    },
    entry:process.env.NODE_ENV === 'development' ? './src/main.js' : './src/index.js',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
    // output: {
    //   path: path.resolve(__dirname, './dist'), // 修改打包出口，在最外级目录打包出一个 index.js 文件，我们 import 默认会指向这个文件
    //
    //   // filename: 'build.js'
    //   filename: "file-preview-vue2.js",
    //   library: "file-preview-vue2", // 指定的就是你使用require时的模块名
    //   // libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
    //   // umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    // },
  },
  devServer: {
    open: false, // 设置浏览器自动打开项目
    port: 8081, // 设置端口
    // host:"0.0.0.0",
    // 设置代理

    proxy: {
      "/safe-production/app.js": {
        target: "http://202.99.99.125:5204/safe-production/app.js",
        changeOrigin: false, // 开启跨域
        source: true, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          // 路径重写，
          "^/safe-production/app.js": "",
        },
      },
      "/safe-production/api": {
        target: "http://202.99.99.125:5204/safe-production/api",
        changeOrigin: false,
        source: true,
        pathRewrite: {
          "^/safe-production/api": "",
        },
      },
      "/safe-production/app": {
        target: "http://202.99.99.125:5204/safe-production/app",
        changeOrigin: false,
        source: true,
        pathRewrite: {
          "^/safe-production/app": "",
        },
      },
      "/safe-production/apc": {
        target: "http://202.99.99.125:5204/safe-production/apc",
        changeOrigin: false,
        pathRewrite: {
          "^/safe-production/apc": "",
        },
      },
      "/safe-production/editor": {
        target: "http://202.99.99.125:5204/safe-production/editor",
        changeOrigin: false,
        source: true,
        pathRewrite: {
          "^/safe-production/editor": "",
        },
      },
      "/safe-production/flow": {
        target: "http://202.99.99.125:5204/safe-production/flow",
        changeOrigin: false,
        source: true,
        pathRewrite: {
          "^/safe-production/flow": "",
        },
      },
    },
  },
})
