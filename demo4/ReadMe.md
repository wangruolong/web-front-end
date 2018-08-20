
### 本地server环境
用node容器
> npm start

用webpack-dev-server
> npm run server

提供给node server.js和webpack-dev-server运行的环境配置。
1. √压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
2. √源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
3. √抽取css。
4. √压缩css。

### 开发环境
> npm run dev
1. ×压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
2. √源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
3. ×抽取css。
4. ×压缩css。

### 测试环境
> npm run debug
1. √压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
2. √源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
3. √抽取css。
4. ×压缩css。

### 生产环境
> npm run prod
1. √压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
2. ×源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
3. √抽取css。
4. √压缩css。
