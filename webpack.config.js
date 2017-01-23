var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var filename = [packageData.name, packageData.version, 'js'];

module.exports = {
    entry: path.resolve(__dirname, 'app/', 'source/', packageData.main),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: filename.join('.')
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015,presets[]=react']
        }, {
            test: /\.css$/,
            loader:'style!css!'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};