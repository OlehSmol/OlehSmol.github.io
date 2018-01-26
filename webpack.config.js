const ExtractTextPlugin = require('extract-text-webpack-plugin');
const hbs = require('handlebars');
const webpack = require("webpack");

debugger;

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry: './src/app.js',

    output: {
        filename: 'build/bundle.js'
    },

    module: {


        rules: [{
            test: /\.less$/,
            use: [


                {
                    loader: "style-loader" // creates style nodes from JS strings
                },
                {
                    // loader: "css-loader!less-loader",
                    loader: "css-loader" // translates CSS into CommonJS
                },
                {
                    // loader: "css-loader!less-loader",
                    loader: "less-loader" // compiles Less to CSS
                },


            ]
        },
            { test: /\.handlebars$/, loader: "handlebars-loader"}

        ],
    },
    plugins: [
        extractLess,

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        modules: ["node_modules"]
    },

//         rules: [
//             {
//             test: /\.less$/,
//             use: [
//
//                 {loader: ExtractTextPlugin.extract({
//     loader:[ 'css', 'less' ],
//     fallbackLoader: 'style-loader'
// })}

    watch: true,


    watchOptions: {
        aggregateTimeout:100
    },

    devtool: "source-map"

};
