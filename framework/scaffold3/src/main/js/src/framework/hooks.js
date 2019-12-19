// 钩子数组，我有很多把钩子。
const hooks = []
// 一根钩子抹点油。怎么样？我就问你这种注释看得懂吗？
function hook(subscriber) {
	if (typeof subscriber !== 'function') {
		throw new Error('Invalid hook, must be a function!')
	}
	const subscriberIndex = hooks.indexOf(subscriber)
	if (subscriberIndex == -1) {
		hooks.push(subscriber)
		return () => {
			const result = hooks.splice(hooks.indexOf(subscriber), 1)
			return result[0]
		}
	} else {
		return () => {
			const result = hooks.splice(subscriberIndex, 1)
			return result[0]
		}
	}
}
// 篮子
const baskets = {}
// 出钩
function goHook(key, func) {
	baskets[key] = hook(func)
}
// 收钩。把参数带上。
// 这个...args的作用是【rest】，接收剩余参数。
function backHook(key, ...args) {
	try {
		if (baskets[key]) {
			console.log('找到钩子', baskets[key])
			// 这个...args的作用是【spread】，把对象展开。
			baskets[key]()(...args)
			delete baskets[key]
		} else {
			console.log('没找到钩子')
		}
	} catch (e) {
		console.log(e)
	}
}

export { hooks, baskets, goHook, backHook }
