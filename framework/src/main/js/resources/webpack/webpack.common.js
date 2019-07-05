const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js',
		venders: ['react-dom','babel-polyfill','react-router','redux-saga']
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.join(process.cwd(), '../webapp')//输出目录和清理目录要对应
	},
	plugins: [
		new CleanWebpackPlugin([path.join(process.cwd(), '../webapp')], {//输出目录和清理目录要对应
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
		new webpack.ProvidePlugin({//在全局范围内可以使用以下key
			// _: 'lodash',
			// $: 'jquery',
			// join: ['lodash', 'join']
			// 注意：lodash不能这样引用，而是应该需要什么引用什么
		}),
		//抽取css成一个独立的文件xxx.css
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		//优化压缩CSS资源
		new OptimizeCSSAssetsPlugin(),
		//忽略moment的国际化
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new BundleAnalyzerPlugin()
	],
	optimization: {//如果2个模块以上的文件引用了同一个文件，则会抽取出来作为公共文件引用。
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
	resolve: {
		alias: {//在全局范围内定义的别名，可以在import from的时候使用。
			styles: path.resolve(process.cwd(), './src/styles'),
			resources: path.resolve(process.cwd(), './resources'),
			components: path.resolve(process.cwd(), './src/components'),
			actions: path.resolve(process.cwd(), './src/actions')
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
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'sass-loader'
					}
				],
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
