
const KEY_VALUE = Symbol('__VALUE__')
const KEY_JSON = Symbol('__JSON__')

export function bind(func, context) {
	let f = func.bind(context)
	f.funcdict = {}
	f.context = context
	f.bindArgs = function (...args) {
		let root = f.funcdict

		// 当 args 长度 > 3 或者有 object 存在的时候用 json 方案
		let useJson = args.length > 3
		let canCache = true
		let hasSymbol = false
		if (!useJson) {
			for (let arg of args) {
				let type = typeof arg
				switch(type) {
					case 'object':
						useJson = true
						break
					case 'function':
						canCache = false
						break
					case 'symbol':
						hasSymbol = true
						break
					default:
						break
				}
			}
		}

		// symbol 无法序列化成 json，所以这种情况我们也不 cache
		canCache = canCache && !(hasSymbol && useJson)

		let fb, key, path
		let insert = false
		let parentNode = root
		if (canCache) {
			if (useJson) {
				key = JSON.stringify(args)
				path = [KEY_JSON]
			} else {
				// 非 json 节点在 root 下组织成树形式
				key = KEY_VALUE
				path = [...args]
			}

			for (let p of path) {
				let node = parentNode[p]
				if (!node) {
					node = parentNode[p] = {}
				}
				parentNode = node
			}
			fb = parentNode[key]
		}

		if (!fb) {
			fb = (...moreArgs) => {
				return func.apply(f.context, args.concat(moreArgs))
			}
			insert = canCache
		}

		if (insert) {
			parentNode[key] = fb
		}
		return fb
	}
	return f
}
