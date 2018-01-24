var path = require('path'); // for output
//var webpack = require('webpack'); // for plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js', // where to start, relative path
    output: {
        path: path.resolve(__dirname, 'dist'),  // create absolute path for output, __dirname give us current directory
        filename: 'bundle.js'
        //publicPath: '/dist' // where to find assets inside index.html file, we need it because it was in root folder
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
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'file-loader', // google for webpack file loader options
                    options: {
                        name: '[name].[ext]', //keep original name and extension
                        outputPath: 'img/',  // by default will go in dist folder
                        //publicPath: 'img/' // need also to keep correct reference to new folder 'img'
                    }
                }
            }
        ]
    },
    plugins: [
        extractPlugin, // store css code in separate file
        // new webpack.optimize.UglifyJsPlugin({
        //     // ...
        // })
        new HtmlWebpackPlugin({ //automatically inject css and js bundle
            template: 'src/index.html'
        })
    ]
};