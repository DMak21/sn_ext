module.exports = {
  configureWebpack: {
    optimization: {
      minimize: false,
      splitChunks: false,
    },
    output: {
      filename: "deployFile.js",
    },
  },
  css: {
    extract: false,
  },
  publicPath: "./",
  // process.env.NODE_ENV === 'production'
};
