const effects = {}
const addEffect = ets => (name, handler) => {
  ets[name] = handler
}

let baymax = {}
let addEffect1 = addEffect(baymax)
addEffect1('aaa','111')
console.log('baymax',baymax)



const addEffect2 = (args={})=>{
  return args['a']='111'
}
let myTest = {}
console.log('1111111111',myTest)
console.log('虽然是在函数内部给args赋值，但是同样对myTest有效',addEffect2(myTest))
console.log('2222222222',myTest)