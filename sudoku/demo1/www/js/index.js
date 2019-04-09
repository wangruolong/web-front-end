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
	const PopupNumbers = __webpack_require__(5)
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();
	
	const popupNumbers = new PopupNumbers($("#popupNumbers"));
	grid.bindPopup(popupNumbers);

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
	        const matrix = sudoku.puzzleMatrix;
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
	    bindPopup(popupNumbers){
	
	        this._$container.on("click","span",e=>{
	            const $cell = $(e.target);
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