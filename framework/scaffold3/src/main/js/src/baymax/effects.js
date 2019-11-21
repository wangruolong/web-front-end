// Registry of namespaced effects
export const effects = {}
// 返回name对应的handler
export const addEffect = effects => (name, handler) => {
	effects[name] = handler
}
