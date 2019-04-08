//生成数独解决方案
const Toolkit = require("./toolkit")
class Generator{
    generate(){
        this.matrix = Toolkit.matrix.makeMatrix();

        for(let n=1;n<=9;n++){
            this.fillNumber(n)
        }
    }
    fillNumber(n){
        this.fillRow(n,0);
    }
    fillRow(n,rowIndex){
        if(rowIndex>8){
            return true;
        }
        const row = this.matrix[rowIndex];
        for(let i = 0;i<9;i++){
            const colIndex = i;
            if(row[colIndex]){//如果已经填过了，如果不是0。则跳过。
                continue
            }
            // 检查这个位置是否可以填 n
            if(!Toolkit.matrix.checkFillable()){
                continue;
            }
            row[colIndex] = n;
            // 当前行填写 n 成功，递归调用 fillRow() 来在下一行中填写n
            //去下一行填写n，如果没填进去，就继续当前行下一个可以填写的位置
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