const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//hidden-oasis-31543.herokuapp.com/dist/',
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            util: path.resolve(__dirname, 'src/util'),
            service: path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            // react handler
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            // css handler
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
           },
           // sass handler
           {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // image handler
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        },
                    },
                ],
            },
            // font handler
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                'file-loader'
                ]
            }
        ]
    },
    // webpack dev server
    devServer: {
        port: 5000,
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy: {
            // key
            '/manage': {
                target: 'http://admintest.happymmall.com/',
                changeOrigin: true
            },
            '/user/logout.do': {
                target: 'http://admintest.happymmall.com/',
                changeOrigin: true
            }
        }
    },
    // specify files
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
};
