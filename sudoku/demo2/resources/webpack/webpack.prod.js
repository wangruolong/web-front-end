const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//生产环境
module.exports = merge(common, {
    devtool: 'none',
    mode: 'production', //当mode=production的时候会将 process.env.NODE_ENV 的值设为 production。
    //启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    plugins: [
        // new webpack.DefinePlugin({//定义环境变量
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // 启用压缩
        // new UglifyJSPlugin(),
    ]
});
