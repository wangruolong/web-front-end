/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Toolkit = __webpack_require__(1)
	const Grid = __webpack_require__(2)
	const PopupNumbers = __webpack_require__(6)
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();
	
	const popupNumbers = new PopupNumbers($("#popupNumbers"));
	grid.bindPopup(popupNumbers);
	$("#check").on("click",e=>{
	    if(grid.check()){
	        alert("恭喜！解谜成功！")
	    }
	})
	$("#reset").on("click",e=>{
	    grid.reset();
	})
	$("#clear").on("click",e=>{
	    grid.clear();
	})
	$("#rebuild").on("click",e=>{
	    grid.rebuild();
	})

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
	        const row = matrix[rowIndex];
	        const column = this.makeRow().map((v,i)=>matrix[i][colIndex]);
	        const { boxIndex } = boxToolkit.converToBoxIndex(rowIndex, colIndex);
	        const box = boxToolkit.getBoxCells(matrix, boxIndex);
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
	    getBoxCells(matrix, boxIndex){
	        const startRowIndex = Math.floor(boxIndex/3)*3;
	        const startColIndex = boxIndex % 3 * 3;
	        const result = [];
	        for(let cellIndex = 0; cellIndex< 9;cellIndex ++){
	            const rowIndex =startRowIndex +Math.floor(cellIndex/3);
	            const colIndex =startColIndex + cellIndex %3;
	            result.push(matrix[rowIndex][colIndex]);
	        }
	        return result;
	
	    },
	    converToBoxIndex(rowIndex, colIndex){
	        return {
	            boxIndex: Math.floor(rowIndex / 3)*3+Math.floor(colIndex/3),
	            cellIndex: rowIndex % 3 *3 + colIndex % 3
	        }
	    },
	    convertFromBoxIndex(boxIndex, cellIndex){
	        return {
	            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
	            colIndex: boxIndex % 3 * 3 + cellIndex % 3
	        }
	    }
	}
	
	//工具集
	
	
	module.exports = class Toolkit {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	//生成九宫格
	const Toolkit = __webpack_require__(1)
	const Generator = __webpack_require__(3)
	const Sudoku = __webpack_require__(4)
	const Checker = __webpack_require__(5)
	class Grid {
	    constructor(container){
	        this._$container = container;
	    }
	
	    build(){
	        // 生成解决方案
	        // const generator = new Generator();
	        // generator.generate();
	        // const matrix = generator.matrix;
	        const sudoku = new Sudoku();
	        sudoku.make();
	        // const matrix = sudoku.solutionMatrix;//完成的解决方案
	        console.log("答案：",sudoku.solutionMatrix)
	        const matrix = sudoku.puzzleMatrix;//挖空后的解决方案
	        const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"];
	        const colGroupClasses = ["col_g_left","col_g_center","col_g_right"];
	        const $cells = matrix.map(rowValues => rowValues.map((cellValue,colIndex)=>{
	            return $("<span>")
	            .addClass(colGroupClasses[colIndex % 3])
	            .addClass(cellValue ? "fixed" : "empty")
	            .text(cellValue)
	        }))
	        const $divArray = $cells.map(($spanArray,rowIndex) =>{
	            return $("<div />")
	            .addClass("row")
	            .addClass(rowGroupClasses[rowIndex % 3])
	            .append($spanArray)
	        })
	        this._$container.append($divArray)
	    }
	    layout(){
	        const width = $("span:first", this._$container).width();
	        $("span", this._$container)
	        .height(width)
	        .css({
	            "line-height":`${width}px`,
	            "font-size": width <32 ?`${width/2}px`:""
	        })
	    }
	    //检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记
	    check(){
	        //从界面获取要检查的数据。
	        const data = this._$container.children().map((rowIndex,div) =>{//这是jquery的map不是es6的map
	            return $(div).children()
	            .map((colIndex,span)=>parseInt($(span).text())||0);
	        })
	        .toArray()//对外层的转换
	        .map($data => $data.toArray());//对内层的转换
	        // console.log('获取页面数据',data)
	        const checker = new Checker(data);
	        if(checker.check()){
	            return true;
	        }
	        //检查不成功，进行标记
	        const marks = checker.matrixMarks;
	        this._$container.children()
	        .each((rowIndex,div)=>{
	            $(div).children().each((colIndex,span)=>{
	                const $span = $(span);
	                if($span.is(".fixed") || marks[rowIndex][colIndex]){//如果是fixed或者标记true，则删除error
	                    $span.removeClass("error")
	                }else{//否则加入error
	                    $span.addClass("error");
	                }
	            })
	        })
	    }
	
	    // 充值当前迷盘到初始状态
	    reset(){
	        this._$container.find("span:not(.fixed)")
	        .removeClass("error mark1 mark2")
	        .addClass("empty")
	        .text(0)
	    }
	    // 清理错误标记
	    clear(){
	        this._$container.find("span.error")
	        .removeClass("error")
	    }
	    // 开始新的一局
	    rebuild(){
	        this._$container.empty();
	        this.build();
	        this.layout();
	    }
	    bindPopup(popupNumbers){
	        this._$container.on("click","span",e=>{
	            const $cell = $(e.target);
	            if($cell.is(".fixed")){//如果是fixed不让用户点击
	                return;
	            }
	            popupNumbers.popup($cell);
	        })
	    }
	}
	module.exports = Grid

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	//生成数独解决方案
	const Toolkit = __webpack_require__(1)
	class Generator{
	    generate(){
	        while(!this.internalGenerate()){
	            console.warn("try again")
	        }
	    }
	    internalGenerate(){
	        this.matrix = Toolkit.matrix.makeMatrix();
	        this.orders = Toolkit.matrix.makeMatrix()
	        .map(row=>row.map((v,i) => i))//生成0-8
	        .map(row => Toolkit.matrix.shuffle(row))//把每一行进行洗牌算法打乱顺序
	
	        // Toolkit.matrix.makeRow()
	        // every()
	        for(let n=1;n<=9;n++){
	           if(!this.fillNumber(n)){
	               return false;
	           }
	        }
	        return true;
	    }
	    fillNumber(n){
	        return this.fillRow(n,0);
	    }
	    fillRow(n,rowIndex){
	        if(rowIndex>8){//超过第8行说明已经填写结束。
	            return true;
	        }
	        const row = this.matrix[rowIndex];
	        //随机选择列
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
	
	// const generator =new Generator();
	// generator.generate();
	// console.log(generator.matrix);
	module.exports = Generator

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	//生成数独游戏
	// 1.生成完成的解决方案：Generator
	// 2.随机去除部分数据：按比例
	
	const Generator = __webpack_require__(3);
	module.exports = class Sudoku {
	    constructor(){
	        // 生成完成的解决方案
	        const generator = new Generator();
	        generator.generate();
	        this.solutionMatrix = generator.matrix;
	    }
	    make(level = 5){
	        // const shouldRid = Math.random()*9 <level
	        this.puzzleMatrix = this.solutionMatrix.map(row=>row.map(cell=>{
	            return Math.random()*9 <level?0:cell;//九分之五的概率返回0
	        }))
	    }
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
	const Toolkit = __webpack_require__(1)
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
	module.exports = Checker;
	
	// const Generator = require("./generator")
	// const gen = new Generator();
	// gen.generate();
	// const matrix = gen.matrix;
	// console.log("gen matrix");
	// console.log(matrix)
	// const checker = new Checker(matrix);
	// console.log("check result1111111111",checker.check())
	// console.log(checker.matrixMarks);
	
	// matrix[1][1] = 0;
	// matrix[2][3] = matrix[3][5] = 5;
	// console.log("gen matrix");
	// console.log(matrix)
	// const checker2 = new Checker(matrix);
	// console.log("check result2222222222",checker2.check());
	// console.log(checker2.matrixMarks);
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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	//处理弹出的操作面板
	// 1.点击cell弹出popup
	// 2.点击popup面板，得到数字n，把数字填到cell中
	
	class PopupNumbers {
	    constructor($panel){
	        this._$panel = $panel.hide().removeClass("hidden");
	        this._$panel.on("click","span",e=>{
	            const $cell = this._$targetCell;
	            const $span = $(e.target);
	
	            //mark1，mark2回填样式
	            if($span.hasClass("mark1")){
	                if($cell.hasClass("mark1")){
	                    $cell.removeClass("mark1")
	                }else{
	                    $cell.removeClass("mark2")
	                    .addClass("mark1")
	                }
	            }else  if($span.hasClass("mark2")){
	                if($cell.hasClass("mark2")){
	                    $cell.removeClass("mark2")
	                }else{
	                    $cell.removeClass("mark1")
	                    .addClass("mark2")
	                }
	            }else if($span.hasClass("empty")){//empty，取消数字填写，取消mark样式
	                $cell.text(0)
	                .addClass("empty");
	            }else{
	                $cell.removeClass("empty")//1-9 回填数字
	                .text($span.text());
	            }
	            this.hide();
	        })
	    }
	
	    popup($cell){
	        this._$targetCell = $cell;
	        const {left, top} = $cell.position();
	        this._$panel.css({
	            left:`${left}px`,
	            top:`${top}px`,
	        })
	        .show()
	    }
	    hide(){
	        this._$panel.hide();
	    }
	
	}
	
	module.exports = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map