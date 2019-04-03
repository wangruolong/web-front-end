const martixToolkit = {
    makeRow(v = 0){
        const array = new Array(9)
        array.fill(v)
        return array
    },
    makeMatrix(v = 0) {
        //Array.from第一个参数是数组长度等参数，第二个参数是一个map函数，用来对数组中的每个元素进行处理。
        return Array.from({length:9},()=>this.makeRow(v))
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
    },
    // const a = makeMatrix()
    // a[0][1]=2
    // console.log(a)
    /**
     * fisher-yates 洗牌算法
     * @param {*} array 
     */
    shuffle(array){
        const endIndex = array.length - 1
        for (let i = 0;i <=endIndex;i++){
            //从当前位置之后（包括当前位置）随机取一个值进行交换。
            const j = i + Math.floor(Math.random() * (array.length - i));
            //es6解构赋值
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }
    
    // const a = Array.from({length:9},(v,i)=>i)
    // console.log(a)
    // console.log(shuffle(a))
    // [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
    // [ 0, 7, 6, 4, 3, 5, 2, 8, 1 ]

};
module.exports = martixToolkit;