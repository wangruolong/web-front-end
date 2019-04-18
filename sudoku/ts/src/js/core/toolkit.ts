/**
 * 矩阵和数组相关的工具
 */
const matrixToolkit  = {
    makeRow(v = 0){
        const array = new Array(9)
        array.fill(v)
        return array
    },
    makeMatrix(v = 0) {
        //Array.from第一个参数是数组长度等参数，第二个参数是一个map函数，用来对数组中的每个元素进行处理。
        return Array.from({length:9},()=>this.makeRow(v))
    },
    // const a = makeMatrix()
    // a[0][1]=2
    // console.log(a)
    // [ [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ]
    // const array = new Array(9)
    // array.fill(makeRow(v))//makeRow只运行了一次，然后把它的数据复制到了每一行。
    // return array
    // [ [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //   [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ] ]
    /**
     * fisher-yates 洗牌算法
     */
    shuffle(array){
        const endIndex = array.length - 1//最后一位只能选到自己，如果交换也是自己交换自己，所以最后一位就不考虑。
        for (let i = 0;i <=endIndex;i++){
            //从当前位置之后（包括当前位置）随机取一个值进行交换。
            const j = i + Math.floor(Math.random() * (array.length - i));
            //es6解构赋值
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    },
    // const a = Array.from({length:9},(v,i)=>i)
    // console.log(a)
    // console.log(shuffle(a))
    // [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
    // [ 0, 7, 6, 4, 3, 5, 2, 8, 1 ]
    /**
     * 检查指定位置可以填写数字 n
     */
    checkFillable(matrix, n, rowIndex, colIndex){
        const row = matrix[rowIndex];//行。
        const column = this.makeRow().map((v,i)=>matrix[i][colIndex]);//列。v没用，主要是用i，不然这里的v都是0。
        const { boxIndex } = boxToolkit.converToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);//宫。宫是3x3，但是实际上也是个数组。
        for(let i=0;i<9;i++){
            if(row[i] === n || column[i] ===n || box[i] === n){
                return false;
            }
        }
        return true
    }

};
/**
 * 宫坐标系的工具
 */
const boxToolkit = {
    //获取第0-8个宫。
    getBoxCells(matrix, boxIndex){
        //1.先找到这个宫的左上角的坐标
        const startRowIndex = Math.floor(boxIndex/3)*3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        //2.循环9次，把从左上角开始的9个数据获取出来
        for(let cellIndex = 0; cellIndex< 9;cellIndex ++){
            const rowIndex =startRowIndex +Math.floor(cellIndex/3);
            const colIndex =startColIndex + cellIndex %3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;

    },
    //行列坐标转换成宫序号和宫内序号
    converToBoxIndex(rowIndex, colIndex){
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor( colIndex / 3 ),
            cellIndex: rowIndex % 3 *3 + colIndex % 3
        }
    },
    //宫序号和宫内序号转换成行列坐标
    convertFromBoxIndex(boxIndex, cellIndex){
        return {
            colIndex: boxIndex % 3 * 3 + cellIndex % 3,//横坐标
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor( cellIndex / 3 )//纵坐标
        }
    }
}

//工具集

export class Toolkit {
    /**
     * 矩阵和数组相关的工具
     */
    static get matrix(){
        return matrixToolkit 
    }
    /**
     * 宫坐标系相关的工具
     */
    static get box(){
        return boxToolkit
    }
};
export default Toolkit;