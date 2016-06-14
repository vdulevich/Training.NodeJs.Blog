'use strict';
var path = require('path');
var webpack = require('webpack');
//var NODE_ENV = 'production';
var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,
    context: path.join(__dirname, '/frontend'),
    entry: {
        client: ['./client.js']
    },
    output: {
        path: path.join(__dirname, "public/js/bundles"),
        filename:'[name].bundle.js',
        library:'[name]'
    },
    externals: {
        "jquery": 'jQuery',
        "react": 'React',
        "react-dom": 'ReactDOM'
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.NoErrorsPlugin(),
      /*  new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.bundle.js",
            minChunks: 3
        }),*/
    ],
    resolve: {
        path: __dirname,
        modulesDirectories: [
            '',
            'node_modules'
        ],
        /*alias: {
            "jquery": "jquery/dist/jquery.js",
            "jquery-loadmask": "jquery-loadmask/jquery.loadmask.js",
            "jquery-validation": "jquery-validation/dist/jquery.validate.js",
            "jquery-confirm": "jquery-confirm/jquery.confirm.js",
            "jquery-bar-rating": "jquery-bar-rating/jquery.barrating.js",
            "bootstrap": "public/js/vendor/bower_components/bootstrap/dist/js/bootstrap.js",
            "react": "public/js/vendor/bower_components/react/react.js",
            "react-dom": "public/js/vendor/bower_components/react/react-dom.js"
        }*/
    }
};

if(NODE_ENV === 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warning:false,
            drop_console:true,
            unsafe: true
        })
    );
}