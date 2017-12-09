const path = require('path');

const SRC_DIR = path.resolve(__dirname, "site");

module.exports = {
    entry: [
        SRC_DIR + "/js/index.js"
    ],
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    output: {
        path: SRC_DIR + "/build",
        filename: "app.js",
        publicPath: "/build/"
    }
}