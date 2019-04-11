const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.js',
        venders: ['jquery']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.join(process.cwd(), 'dist')
    },
    plugins: [
        new CleanWebpackPlugin([path.join(process.cwd(), 'dist')], {
            allowExternal: true,
            exclude: ['WEB-INF']
        }),
        new HtmlWebpackPlugin({
            title: '数独游戏',
            template: path.join(__dirname, '../template/index-template.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new OptimizeCSSAssetsPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
						loader: 'css-loader',
                    },
                    { 
                        loader: 'less-loader' 
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            outputPath:'assets/'
                        }
				    }
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
}
