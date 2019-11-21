export const hooks = []

export default function hook(subscriber) {

	if (typeof subscriber !== 'function') {
		throw new Error('Invalid hook, must be a function!')
	}

	hooks.push(subscriber)// 把subscriber注入到hooks里面

	return () => {
		hooks.splice(hooks.indexOf(subscriber), 1)// 返回一个闭包，外面可以在需要的时候再执行
	}
}
