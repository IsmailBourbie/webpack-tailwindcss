const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/js/index.js',
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/,
    },

    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.join(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader'
                ],
            },
        ],

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'My App',
            filename: 'index.html'

        }),
        new MiniCssExtractPlugin({
            filename: "css/app.[contenthash].css"
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: false,
        port: 9000,
        watchFiles: ['./src/*'],
    },
};