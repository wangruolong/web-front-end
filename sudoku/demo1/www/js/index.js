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
	
	const grid = new Grid($("#container"));
	grid.build();
	grid.layout();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * 矩阵和数组相关的工具
	 */
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
	        return true;
	    }
	
	};
	/**
	 * 宫坐标系的工具
	 */
	const boxToolit = {
	
	}
	
	//工具集
	
	
	module.exports = class Toolkit {
	    /**
	     * 矩阵和数组相关的工具
	     */
	    static get matrix(){
	        return martixToolkit
	    }
	    /**
	     * 宫坐标系相关的工具
	     */
	    static get box(){
	        return boxToolit
	    }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	//生成九宫格
	const Toolkit = __webpack_require__(1)
	
	class Grid {
	    constructor(container){
	        this._$container = container;
	    }
	
	    build(){
	        const matrix = Toolkit.matrix.makeMatrix();
	        const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"];
	        const colGroupClasses = ["col_g_left","col_g_center","col_g_right"];
	        const $cells = matrix.map(rowValues => rowValues.map((cellValue,colIndex)=>{
	            return $("<span>")
	            .addClass(colGroupClasses[colIndex % 3])
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
	}
	module.exports = Grid

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map