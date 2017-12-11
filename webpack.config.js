const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'site')

module.exports = {
    entry: [
        SRC_DIR + '/js/index.js'
    ],
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            },
            {
                test: /\.js?/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    output: {
        path: SRC_DIR + '/build',
        filename: 'app.js',
        publicPath: '/build/'
    },
    plugins: [
        new UglifyJsPlugin()
    ]
}
