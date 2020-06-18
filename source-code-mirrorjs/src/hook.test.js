// const hooks = []
// function hook(subscriber) {
//   // 把func放到钩子数组里面
//   hooks.push(subscriber)
//   // 删除钩子数组hooks里面func
//   return () => {
//     hooks.splice(hooks.indexOf(subscriber), 1)
//   }
// }



// function myTest1(action,getState){
//   console.log('myTest1',action,getState)
// }
// function myTest2(action,getState){
//   console.log('myTest2',action,getState)
// }
// function myTest3(action,getState){
//   console.log('myTest3',action,getState)
// }
// let hookCallback1 = hook(myTest1)
// let hookCallback2 = hook(myTest2)
// let hookCallback3 = hook(myTest3)

// console.log('1.用个钩子把函数勾起来\n',hooks)
// console.log('2.把钩子一个个拿起来看看')
// hooks.forEach(hookFun => {  hookFun('action', 'getState') })
// console.log('3.把第二个钩子删掉')
// hookCallback2()
// console.log(hooks)
// console.log('4.把钩子一个个拿起来看看')
// hooks.forEach((hookFun,index) => {  hookFun(index, index) })











const hooks = []
function hook(subscriber) {
  hooks.push(subscriber)
  return () => {
      let idx = hooks.indexOf(subscriber)
      if(idx>-1){
        let result = hooks.splice(idx, 1)
        return result[0]
      }else{
        return ()=>{console.log('找不到对象！',subscriber)}
      }
  }
}

function myTest1(){
  console.log('myTest1')
}
function myTest2(){
  console.log('myTest2')
}
function myTest3(){
  console.log('myTest3')
}

let hookCallback1 = hook(myTest1)
let hookCallback2 = hook(myTest2)
let hookCallback3 = hook(myTest3)

console.log('hookCallback1()===myTest1',hookCallback1()===myTest1)
hookCallback3()()
console.log('hooks',hooks)