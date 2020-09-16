module.exports = {

    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: "deployFile.js",
        }
    },
    css: {
        extract: false,
    },
    publicPath: './'
    // process.env.NODE_ENV === 'production'
};