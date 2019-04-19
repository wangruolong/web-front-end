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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 矩阵和数组相关的工具
 */
var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        //Array.from第一个参数是数组长度等参数，第二个参数是一个map函数，用来对数组中的每个元素进行处理。
        return Array.from({ length: 9 }, function () {
            return _this.makeRow(v);
        });
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
    shuffle: function shuffle(array) {
        var endIndex = array.length - 1; //最后一位只能选到自己，如果交换也是自己交换自己，所以最后一位就不考虑。
        for (var i = 0; i <= endIndex; i++) {
            //从当前位置之后（包括当前位置）随机取一个值进行交换。
            var j = i + Math.floor(Math.random() * (array.length - i));
            //es6解构赋值
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },

    // const a = Array.from({length:9},(v,i)=>i)
    // console.log(a)
    // console.log(shuffle(a))
    // [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
    // [ 0, 7, 6, 4, 3, 5, 2, 8, 1 ]
    /**
     * 检查指定位置可以填写数字 n
     */
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex]; //行。
        var column = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        }); //列。v没用，主要是用i，不然这里的v都是0。

        var _boxToolkit$converToB = boxToolkit.converToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$converToB.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex); //宫。宫是3x3，但是实际上也是个数组。
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};
/**
 * 宫坐标系的工具
 */
var boxToolkit = {
    //获取第0-8个宫。
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        //1.先找到这个宫的左上角的坐标
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        //2.循环9次，把从左上角开始的9个数据获取出来
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },

    //行列坐标转换成宫序号和宫内序号
    converToBoxIndex: function converToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    //宫序号和宫内序号转换成行列坐标
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            colIndex: boxIndex % 3 * 3 + cellIndex % 3,
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3) //纵坐标
        };
    }
};
//工具集

var Toolkit = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        /**
         * 矩阵和数组相关的工具
         */
        get: function get() {
            return matrixToolkit;
        }
        /**
         * 宫坐标系相关的工具
         */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

exports.Toolkit = Toolkit;
;
exports.default = Toolkit;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
//生成九宫格
var sudoku_1 = __webpack_require__(5);
var checker_1 = __webpack_require__(3);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            // 生成解决方案
            // const generator = new Generator();
            // generator.generate();
            // const matrix = generator.matrix;
            var sudoku = new sudoku_1.default();
            sudoku.make();
            // const matrix = sudoku.solutionMatrix;//完成的解决方案
            console.log("答案：", sudoku.solutionMatrix);
            var matrix = sudoku.puzzleMatrix; //挖空后的解决方案
            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty") //cellValue如果存在就表示有值，如果不存在就表示是被挖空的。
                    .text(cellValue);
                });
            });
            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div />").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });
            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }
        //检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记

    }, {
        key: "check",
        value: function check() {
            //从界面获取要检查的数据。
            var data = this._$container.children().map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray() //对外层的转换
            .map(function ($data) {
                return $data.toArray();
            }); //对内层的转换
            // console.log('获取页面数据',data)
            var checker = new checker_1.default(data);
            if (checker.check()) {
                return true;
            }
            //检查不成功，进行标记
            var marks = checker.matrixMarks;
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span);
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
                        $span.addClass("error");
                    }
                });
            });
        }
        // 重置当前迷盘到初始状态

    }, {
        key: "reset",
        value: function reset() {
            this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
        }
        // 清理错误标记

    }, {
        key: "clear",
        value: function clear() {
            this._$container.find("span.error").removeClass("error");
        }
        // 开始新的一局

    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                if ($cell.is(".fixed")) {
                    return;
                }
                popupNumbers.popup($cell);
            });
        }
    }]);

    return Grid;
}();

exports.Grid = Grid;
exports.default = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//处理弹出的操作面板
// 1.点击cell弹出popup
// 2.点击popup面板，得到数字n，把数字填到cell中


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var PopupNumbers = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            //mark1，mark2回填样式
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                $cell.text(0).addClass("empty");
            } else {
                $cell.removeClass("empty") //1-9 回填数字
                .text($span.text());
            }
            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

exports.PopupNumbers = PopupNumbers;
exports.default = PopupNumbers;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//检查数据解决方案


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);
    for (var i = 0; i < length - 1; i++) {
        if (!marks[i]) {
            continue;
        }
        var v = array[i];
        // 是否有效，0 - 无效，1~9有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        // 是否有重复： i+1 ~ 9，是否和i位置的数据重复
        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}
// console.log(checkArray([1,2,3,4,5,6,7,8,9]))
// console.log(checkArray([1,2,3,4,0,6,7,8,9]))
// console.log(checkArray([1,2,3,4,0,6,2,2,9]))
var toolkit_1 = __webpack_require__(0);
// 输入：matrix，用户完成呢过的数独数据，9x9
// 处理：对matrix行、列、宫进行检查，并填写marks
// 输出：检查是否成功、marks对应位置中的值是false是错误，true是正确。

var Checker = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._success = false;
        this._matrix = matrix; //矩阵
        this._matrixMarks = toolkit_1.default.matrix.makeMatrix(true); //与矩阵一一对应的标记过的矩阵
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();
            // 检查是否成功
            // Array.prototype.every()对数组的每个元素进行检查返回true或者false，所有元素都是true才返回true，如果任意一个地方是false就返回false
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            }); //所有行都返回true，所有行里面的所有元素都返回true。
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex]; //获取每一行数组
                var marks = checkArray(row); //检查每一行数组后返回对应的状态标记
                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = []; //用来存储每一列的数组
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }
                var marks = checkArray(cols); //检查每一列
                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = toolkit_1.default.box.getBoxCells(this._matrix, boxIndex); //在矩阵中根据矩阵和宫序号获取宫
                var marks = checkArray(boxes); //检查这一宫的数据是否正确
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _toolkit_1$default$bo = toolkit_1.default.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _toolkit_1$default$bo.rowIndex,
                            colIndex = _toolkit_1$default$bo.colIndex; //把宫内序号转换成行列坐标


                        this._matrixMarks[rowIndex][colIndex] = false; //把宫内的标记状态同步到大数组中
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

exports.Checker = Checker;
exports.default = Checker;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
//生成数独解决方案
var toolkit_1 = __webpack_require__(0);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalGenerate()) {
                console.warn("try again");
            }
        }
    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            //生成二维数组
            this.matrix = toolkit_1.default.matrix.makeMatrix();
            //生成二维数组的序号0-8，并且把序号打乱。这样后面依次获取每个数组的元素的时候得到的就是一个随机序号。
            this.orders = toolkit_1.default.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }) //生成0-8
            .map(function (row) {
                return toolkit_1.default.matrix.shuffle(row);
            }); //把每一行进行洗牌算法打乱顺序
            //1.从1-9依次填充
            //2.每个数字从第0行-第8行依次填充
            //3.每个数字填充都会进行判断该位置能否填充
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
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

    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }
            var row = this.matrix[rowIndex];
            //orders里面存储的是0-8，并且已经被shuffle算法打乱，所以这里从0开始取，得到的其实是一个0-8的随机数。
            var orders = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                if (row[colIndex]) {
                    continue;
                }
                // 检查这个位置是否可以填 n
                if (!toolkit_1.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n;
                // 当前行填写 n 成功，递归调用 fillRow() 来在下一行中填写n
                // 去下一行填写n，如果没填进去，就继续当前行下一个可以填写的位置
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                //完成填写
                return true;
            }
            //填写失败
            return false;
        }
    }]);

    return Generator;
}();

exports.Generator = Generator;
exports.default = Generator;
// const generator =new Generator();
// generator.generate();
// console.log(generator.matrix);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//生成数独游戏
// 1.生成完成的解决方案：Generator
// 2.随机去除部分数据：按比例


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = __webpack_require__(4);

var Sudoku = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        // 生成完成的解决方案
        var generator = new generator_1.default();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            // 挖空算法
            // const shouldRid = Math.random()*9 <level
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell; //九分之五的概率返回0
                });
            });
        }
    }]);

    return Sudoku;
}();

exports.Sudoku = Sudoku;
exports.default = Sudoku;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = __webpack_require__(1);
var popupnumbers_1 = __webpack_require__(2);
var grid = new grid_1.default($("#container"));
grid.build();
grid.layout();
var popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$("#check").on("click", function (e) {
    if (grid.check()) {
        alert("恭喜！解谜成功！");
    }
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map