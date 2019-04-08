//检查数据解决方案

function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for (let i = 0; i < length-1; i++) {
        if(!marks[i]){//如果这个位置已经检查过了是false，就不用检查直接跳过。
            continue
        }
        const v = array[i];
        // 是否有效，0 - 无效，1~9有效
        if(!v){
            marks[i] = false;
            continue;
        }
        // 是否有重复： i+1 ~ 9，是否和i位置的数据重复
        for(let j=i+1;j<length;j++){
            if(v===array[j]){
                marks[i]=marks[j]=false;
            }
        }
    }
    return marks;
}
// console.log(checkArray([1,2,3,4,5,6,7,8,9]))
// console.log(checkArray([1,2,3,4,0,6,7,8,9]))
// console.log(checkArray([1,2,3,4,0,6,2,2,9]))
const Toolkit = require("./toolkit")
// 输入：matrix，用户完成呢过的数独数据，9x9
// 处理：对matrix行、列、宫进行检查，并填写marks
// 输出：检查是否成功、marks对应位置中的值是false是错误，true是正确。
class Checker {
    constructor(matrix){
        this._matrix = matrix;
        this._matrixMarks  = Toolkit.matrix.makeMatrix(true);
    }
    get matrixMarks(){
        return this._matrixMarks;
    }
    get isSuccess(){
        return this._success;
    }
    check(){
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        // 检查是否成功
        // Array.prototype.every()对数组的每个元素进行检查返回true或者false，所有元素都是true才返回true，如果任意一个地方是false就返回false
        this._success = this._matrixMarks.every(row=>row.every(mark=>mark))//所有行都返回true，所有行里面的所有元素都返回true。
        return this._success

    }
    checkRows(){
        for(let rowIndex=0;rowIndex<9;rowIndex++){
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);
            for(let colIndex=0;colIndex<marks.length;colIndex++){
                if(!marks[colIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkCols(){
        for(let colIndex = 0; colIndex<9;colIndex++){
            const cols = [];
            for(let rowIndex = 0;rowIndex<9;rowIndex++){
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            const marks = checkArray(cols);
            for(let rowIndex = 0;rowIndex < marks.length; rowIndex++){
                if(!marks[rowIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkBoxes(){
        for(let boxIndex = 0;boxIndex < 9;boxIndex++){
            const boxes = Toolkit.box.getBoxCells(this._matrix,boxIndex);
            const marks = checkArray(boxes);
            for(let cellIndex = 0;cellIndex<9;cellIndex++){
                if(!marks[cellIndex]){
                    const {rowIndex,colIndex}=Toolkit.box.convertFromBoxIndex(boxIndex,cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

}

const Generator = require("./generator")
const gen = new Generator();
gen.generate();
const matrix = gen.matrix;
console.log("gen matrix");
console.log(matrix)
const checker = new Checker(matrix);
console.log("check result1111111111",checker.check())
console.log(checker.matrixMarks);

matrix[1][1] = 0;
matrix[2][3] = matrix[3][5] = 5;
console.log("gen matrix");
console.log(matrix)
const checker2 = new Checker(matrix);
console.log("check result2222222222",checker2.check());
console.log(checker2.matrixMarks);
// gen matrix
// [ [ 1, 7, 8, 3, 6, 5, 4, 2, 9 ],
//   [ 5, 2, 3, 7, 9, 4, 8, 1, 6 ],
//   [ 6, 4, 9, 1, 8, 2, 7, 5, 3 ],
//   [ 7, 9, 1, 2, 5, 8, 6, 3, 4 ],
//   [ 8, 3, 5, 4, 1, 6, 2, 9, 7 ],
//   [ 4, 6, 2, 9, 7, 3, 5, 8, 1 ],
//   [ 9, 8, 4, 5, 3, 7, 1, 6, 2 ],
//   [ 2, 1, 6, 8, 4, 9, 3, 7, 5 ],
//   [ 3, 5, 7, 6, 2, 1, 9, 4, 8 ] ]
// check result1111111111 true
// [ [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ] ]
// gen matrix
// [ [ 1, 7, 8, 3, 6, 5, 4, 2, 9 ],
//   [ 5, 0, 3, 7, 9, 4, 8, 1, 6 ],
//   [ 6, 4, 9, 5, 8, 2, 7, 5, 3 ],
//   [ 7, 9, 1, 2, 5, 5, 6, 3, 4 ],
//   [ 8, 3, 5, 4, 1, 6, 2, 9, 7 ],
//   [ 4, 6, 2, 9, 7, 3, 5, 8, 1 ],
//   [ 9, 8, 4, 5, 3, 7, 1, 6, 2 ],
//   [ 2, 1, 6, 8, 4, 9, 3, 7, 5 ],
//   [ 3, 5, 7, 6, 2, 1, 9, 4, 8 ] ]
// check result2222222222 false
// [ [ true, true, true, true, true, false, true, true, true ],
//   [ true, false, true, true, true, true, true, true, true ],
//   [ true, true, true, false, true, true, true, false, true ],
//   [ true, true, true, true, false, false, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, false, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ],
//   [ true, true, true, true, true, true, true, true, true ] ]