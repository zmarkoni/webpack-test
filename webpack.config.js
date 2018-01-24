var path = require('path'); // for output
//var webpack = require('webpack'); // for plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: './src/js/app.js', // where to start, relative path
    output: {
        path: path.resolve(__dirname, 'dist'),  // create absolute path for output, __dirname give us current directory
        filename: 'bundle.js',
        publicPath: '/dist' // where to find assets
    },
    module: {
        rules: [
            {
                test: /\.js$/, // check only js files,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/, // check only js files
                //loader: 'css-loader'
                // use: [  // for multiple loader
                //     'style-loader', // include them in reverse order because WEBPACK execute from bottom to top
                //     'css-loader'
                // ]
                use: extractPlugin.extract({  // we tell the plugin what to extract
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        extractPlugin // store css code in separate file
        // new webpack.optimize.UglifyJsPlugin({
        //     // ...
        // })
    ]
};