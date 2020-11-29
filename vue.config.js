module.exports = {
  configureWebpack: {
    optimization: {
      // minimize: false,
      splitChunks: false,
    },
    output: {
      filename: "app.js",
    },
  },
  css: {
    extract: false,
  },
  publicPath: "./",
};
