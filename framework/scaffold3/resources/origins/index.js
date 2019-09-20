/**
 * 各个环境的源
 */
let ORIGINS

try {
	ORIGINS = require(`./${process.env.APP_ENV}`)
} catch (e) {
	console.error(`APP_ENV 环境 ${process.env.APP_ENV} 不存在，将使用生产环境`)
	ORIGINS = require('./product')
}

window.ORIGINS = Object.assign({}, ORIGINS, window.ORIGINS)