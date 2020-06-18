const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')

module.exports = {
	entry: {
		app: './src/index.js',
		// venders: ['react-dom','core-js','react-router','redux-saga']
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
			description: '网站描述',
			template: path.join(__dirname, '../template/index-template.html'),
			hash: true
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
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new OptimizeCSSAssetsPlugin(),
		//忽略moment的国际化
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		// new BundleAnalyzerPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, '../polyfill'),
				to: path.join(process.cwd(), '../webapp/polyfill')
			}
		], {
			ignore: [],
			copyUnmodified: true
		}),
		new SpritesmithPlugin({
			src: {
				cwd: path.join(process.cwd(), 'src/assets/icons'),
				glob: '*.png'
			},
			target: {
				image: path.join(process.cwd(), 'src/styles/common/sprite/sprite.png'),
				css: path.join(process.cwd(), 'src/styles/common/sprite/sprite.css')
			},
			//设置sprite.png的引用格式，会自己加入sprite.css的头部
			apiOptions: {
				cssImageRef: './sprite.png'
			},
			//配置spritesmith选项，非必选
			spritesmithOptions: {
			  algorithm: 'top-down',//设置图标的排列方式
			  padding: 4 //每张小图的补白,避免雪碧图中边界部分的bug
			}
		})
	],
	// optimization: {
	// 	splitChunks: {
	// 		//如果2个模块以上的文件引用了同一个文件，则会抽取出来作为公共文件引用。
	// 		cacheGroups: {
	// 			commons: {
	// 				name: 'common',
	// 				chunks: 'initial',
	// 				minChunks: 2
	// 			}
	// 		},
	// 		// 把全部加入比较
	// 		chunks: 'all'
	// 	}
	// },
	optimization: {
		splitChunks:{
			chunks: 'all',// 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
			minSize: 30000,// （默认值：30000）块的最小大小
			minChunks: 1,// （默认值：1）在拆分之前共享模块的最小块数
			maxAsyncRequests: 5,//（默认为5）按需加载时并行请求的最大数量
			maxInitialRequests: 3,//（默认值为3）入口点的最大并行请求数
			automaticNameDelimiter: '~',// 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
			cacheGroups: {// 以上条件都满足后会走入cacheGroups进一步进行优化的判断
				vendors: {
					test: /[\\/]node_modules[\\/]/,// 判断引入库是否是node_modules里的
					priority: -10,// 数字越大优先级越高 （-10大于-20）
					name: 'vendors'// 设置代码分割后的文件名
				},
				default: {//所有代码分割快都符合默认值，此时判断priority优先级
					priority: -20,
					reuseExistingChunk: true,// 允许在模块完全匹配时重用现有的块，而不是创建新的块。
					name: 'common'
				}
		  	}
		}
	  },
	resolve: {
		alias: {//在全局范围内定义的别名，可以在import from的时候使用。
			'fish': '@sdp.nd/fish',
			styles: path.resolve(process.cwd(), './src/styles'),
			resources: path.resolve(process.cwd(), './resources'),
			components: path.resolve(process.cwd(), './src/components'),
			actions: path.resolve(process.cwd(), './src/actions'),
			utils: path.resolve(process.cwd(), './src/utils'),
			assets: path.resolve(process.cwd(), './src/assets'),
			framework: path.resolve(process.cwd(), './src/framework'),
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
				test: /\.(sc|c)ss$/,
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
				include: /node_modules/,
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader' },
					{ loader: 'less-loader', options: { javascriptEnabled: true } }
				]
			},
			{	// 图片优化。通过url-loader配合file-loader进行实现。
				// 小于8k的图片可以转成base64一起打入css，大于的则用file-loader加载，这样可以减少图片请求数，并兼顾了css文件不要太大。
				test:/\.(jpg|png|svg|gif)/,
				use:[{
				  loader:'url-loader',
				  options:{
						limit:8129,//小于limit限制8k 的图片将转为base64嵌入引用位置
						fallback:'file-loader',//大于limit限制的将转交给指定的loader处理
						outputPath:'imgs/'//options会直接传给fallback指定的loader
				  }
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/'
						}
					}
				]
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			}
		]
	}
}
