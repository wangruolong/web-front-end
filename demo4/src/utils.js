//随机生成一个方块种类
var generateType = function () {
    return Math.ceil(Math.random() * 7) - 1
}
//随机生成一个旋转次数
var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1
}
export { generateType, generateDir }