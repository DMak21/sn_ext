module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: false
        }
    },
    css: {
        extract: false,
    },
    publicPath: './'
    // process.env.NODE_ENV === 'production'
}