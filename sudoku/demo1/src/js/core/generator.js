//生成数独解决方案
const Toolkit = require("./toolkit")
class Generator{
    generate(){
        while(!this.internalGenerate()){
            console.warn("try again")
        }
    }
    internalGenerate(){
        //生成二维数组
        this.matrix = Toolkit.matrix.makeMatrix();
        //生成二维数组的序号0-8，并且把序号打乱。这样后面依次获取每个数组的元素的时候得到的就是一个随机序号。
        this.orders = Toolkit.matrix.makeMatrix()
        .map(row=>row.map((v,i) => i))//生成0-8
        .map(row => Toolkit.matrix.shuffle(row))//把每一行进行洗牌算法打乱顺序

        //1.从1-9依次填充
        //2.每个数字从第0行-第8行依次填充
        //3.每个数字填充都会进行判断该位置能否填充
        for(let n = 1; n <= 9; n++){
           if(!this.fillNumber(n)){
               return false;
           }
        }
        return true;
    }
    fillNumber(n){
        return this.fillRow(n,0);
    }
    // 取数字1
    // 第0行的0-8位置填一遍。
    // 第1行的0-8位置填一遍。
    // 第2行的0-8位置填一遍。
    // 第3行的0-8位置填一遍。
    // 第4行的0-8位置填一遍。
    // 第5行的0-8位置填一遍。
    // 第6行的0-8位置填一遍。
    // 第7行的0-8位置填一遍。
    // 第8行的0-8位置填一遍。
    // 这样1填完后，填2，填3...填9
    fillRow(n,rowIndex){
        if(rowIndex>8){//超过第8行说明已经填写结束。
            return true;
        }
        const row = this.matrix[rowIndex];
        //orders里面存储的是0-8，并且已经被shuffle算法打乱，所以这里从0开始取，得到的其实是一个0-8的随机数。
        const orders = this.orders[rowIndex];
        for(let i = 0;i<9;i++){
            const colIndex = orders[i];
            if(row[colIndex]){//如果已经填过了，如果不是0。则跳过。
                continue
            }
            // 检查这个位置是否可以填 n
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)){
                continue;
            }
            row[colIndex] = n;
            // 当前行填写 n 成功，递归调用 fillRow() 来在下一行中填写n
            // 去下一行填写n，如果没填进去，就继续当前行下一个可以填写的位置
            if(!this.fillRow(n,rowIndex+1)){
                row[colIndex]=0
                continue
            }
            //完成填写
            return true;
        }
        //填写失败
        return false
    }
}

module.exports = Generator;

// const generator =new Generator();
// generator.generate();
// console.log(generator.matrix);

