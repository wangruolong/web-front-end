const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.join(process.cwd(), './dist')
	},
	plugins: [
		new CleanWebpackPlugin([path.join(process.cwd(), './dist')], {
			allowExternal: true,
			exclude: ['WEB-INF']
		}),
		new HtmlWebpackPlugin({
			title: '网站标题',
			template: path.join(__dirname, '../template/index-template.html')
		}),
		new webpack.DefinePlugin({
			'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV)
		}),
		new webpack.ProvidePlugin({
			_: 'lodash',
			$: 'jquery',
			join: ['lodash', 'join']
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		//优化压缩CSS资源
		new OptimizeCSSAssetsPlugin()
		// new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vender',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	},
	resolve: {
		alias: {
			styles: path.resolve(process.cwd(), './src/styles'),
			resources: path.resolve(process.cwd(), './resources')
		}
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				loader: ['babel-loader','eslint-loader']
			},
			{
				test: /\.css$/,
				use: [
					// 'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					},
					{loader: 'sass-loader'}
				]
			},
			{
				test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			}
		]
	}
}
