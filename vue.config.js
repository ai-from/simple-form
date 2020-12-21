module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/vars.sass"
          @import "@/styles/common.sass"
        `
      }
    }
  }
}