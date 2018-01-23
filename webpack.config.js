var path = require('path'); // for output
var webpack = require('webpack'); // for plugins
module.exports = {
    entry: './src/js/app.js', // where to start, relative path
    output: {
        path: path.resolve(__dirname, 'dist'),  // absolute path for output
        filename: 'bundle.js',
        publicPath: '/dist' // where to find assets
    },
    module: {
        rules: [
            {
                //test: /\.js$/, // check only js files
                test: /\.css$/, // check only js files
                //loader: 'css-loader'
                use: [  // for multiple loader
                    'style-loader', // include them in reverse order because WEBPACK execute from bottom to top
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            // ...
        })
    ]
};