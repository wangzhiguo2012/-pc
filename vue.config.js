module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 在webpack的配置对象 config的 optimization属性的minimizer数组的第一个元素的options中设置....
      // 在打包之后的js中去掉console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  lintOnSave: false,
  publicPath: './'
}
