module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import '~carbon-components/scss/globals/scss/styles';
        @import "~carbon-components/scss/globals/scss/colors";
        `
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  }
}
