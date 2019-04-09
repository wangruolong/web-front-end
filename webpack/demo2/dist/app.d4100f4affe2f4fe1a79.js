/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _squareFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./squareFactory */ "./src/squareFactory.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);



var Game = function () {
    var squareFactory = new _squareFactory__WEBPACK_IMPORTED_MODULE_0__["default"]();
    //dom元素
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
    //分数
    var score = 0;
    //游戏矩阵
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    //当前方块
    var cur;
    //下一个方块
    var next;
    //divs
    var gameDivs = [];
    var nextDivs = [];
    /**
     * 初始化div。用二维数组把页面初始化成10X20（宽X高）的一小块一小块的div。
     * @param {*} container 在页面中要展示的位置。
     * @param {*} data 与页面对应的二维数组，具体数据。
     * @param {*} divs 与页面对应的二维数组，div元素。
     */
    var initDiv = function (container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div')
                newNode.className = `${_style_css__WEBPACK_IMPORTED_MODULE_1___default.a.none}`;
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div)
        }
    }
    /**
     * 刷新div。
     * 把操作后的数据刷新到10X20（宽X高）对应的位置上去。
     * none与背景色一致看起来就像是空的；done已经下落到底部的，已经不能动的div灰色；current当前操作的，正在动的div红色。
     * @param {*} data 
     * @param {*} divs 
     */
    var refreshDiv = function (data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = `${_style_css__WEBPACK_IMPORTED_MODULE_1___default.a.none}`;
                } else if (data[i][j] == 1) {
                    divs[i][j].className = `${_style_css__WEBPACK_IMPORTED_MODULE_1___default.a.done}`;
                } else if (data[i][j] == 2) {
                    divs[i][j].className = `${_style_css__WEBPACK_IMPORTED_MODULE_1___default.a.current}`;
                }
            }
        }
    }
    /**
     * 检测点是否合法
     * @param {*} pos 坐标
     * @param {*} x 竖下来的坐标
     * @param {*} y 横过去的坐标
     */
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] === 1) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * 检测数据是否合法
     * 检测方块中的每一块配上坐标之后是否有效。
     * @param {*} pos 坐标
     * @param {*} data 方块数据
     */
    var isValid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false
                    }
                }
            }
        }
        return true
    }
    //清除数据
    var clearData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0
                }
            }
        }
    }
    //设置数据
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j]
                }
            }
        }
    }
    //下移
    var down = function () {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true
        } else {
            return false
        }
    }
    //左移
    var left = function () {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    //右移
    var right = function () {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    //右移
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    //方块移动到底部，固定住
    var fixed = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++)
                if (check(cur.origin, i, j)) {
                    if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
        }
        refreshDiv(gameData, gameDivs);
    }
    //消行
    var checkClear = function () {
        var line = 0;
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line = line + 1
                for (var m = i; m >= 0; m--) {
                    for (var n = 0; n < gameData[0].length; n++) {
                        if (m > 0) {//所有行往下移一行
                            gameData[m][n] = gameData[m - 1][n];
                        } else if (m == 0) {//第一行填充0
                            gameData[0][n] = 0;
                        }
                    }
                }
                //举个例子：
                //消除19、18、17三行。
                //19行消除了，所有元素往下移一行，原来的17、18行下移到了18、19行。
                //然后i--，这样i指向了18，这样新的19行就没有被消除掉了。
                //所以每次消除完之后，让i+1重新回到19行，继续判断是否能消除。
                i = i + 1;
            }
        }
        return line;
    }
    //游戏结束
    var checkGameover = function () {
        var gameOver = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[0][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver
    }
    //底部增加行
    var addTailLindes = function (lines) {
        for (var i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines.length];
        }
        for (var i = 0; i < lines.length; i++) {
            gameData[gameData.length - lines.length + i] = lines[i];
        }

    }
    //使用下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = squareFactory.make(type, dir)
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    //设置时间
    var setTime = function (time) {
        timeDiv.innerHTML = time;
    }
    //加分
    var addScore = function (line) {
        var s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
        this.score = score;
    }
    var gameover = function (win) {
        if (win) {
            resultDiv.innerHTML = '你赢了';
        } else {
            resultDiv.innerHTML = '你输了'
        }
    }
    //初始化
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        next = squareFactory.make(type, dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    }
    //导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function () { while (down()); }
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameover = checkGameover;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameover = gameover;
    this.score = score;
    this.addTailLindes = addTailLindes;
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local */ "./src/local.js");


// import Remote from './remote';

(function indexPage() {
    var html = `
                <div class="${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.square}" id="local">
                    <div class="${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.game}" id="local_game"></div>
                    <div class="${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.next}" id="local_next"></div>
                    <div class="${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.info}">
                        <div>已用时：
                            <span id="local_time">0</span>s</div>
                        <div>已得分：
                            <span id="local_score">0</span>分</div>
                        <div id="local_gameover"></div>
                    </div>
                    <div class='${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.btn}'>
                        <input type='button' id='btnStart' value='开始' ></input>
                    </div>
                    <div class='${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.instructions}'>
                        <em>操作说明：</em>
                        <div class='${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.ins_item}'>↑旋转</div>
                        <div class='${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.ins_item}'>←左 ↓下 →右</div>
                        <div class='${_style_css__WEBPACK_IMPORTED_MODULE_0___default.a.ins_item}'>空格坠落</div>
                    </div>
                </div>
                `
    $(document.body).append(html);
    var local = new _local__WEBPACK_IMPORTED_MODULE_1__["default"]();
    // var remote = new Remote();
    $('#btnStart').click(function () {
        local.start();
        // remote.start();
        // remote.bindEvents();
        btnStart.setAttribute('disabled', 'disabled');
    });

})()

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/local.js":
/*!**********************!*\
  !*** ./src/local.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");



var Local = function() {
    //游戏对象
    var game;
    var INTERVAL = 300;
    var timer = null;
    var timeCount = 0;
    var time = 0;
    //绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 38) {
                game.rotate()
            } else if (e.keyCode == 39) {
                game.right()
            } else if (e.keyCode == 40) {
                game.down()
            } else if (e.keyCode == 37) {
                game.left()
            } else if (e.keyCode == 32) {//space
                game.fall()
            }
        }
    }
    //移动
    var move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            var gameOver = game.checkGameover();
            if (gameOver) {
                game.gameover(false);
                stop();
            } else {
                game.performNext(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["generateType"])(), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["generateDir"])());
            }
        }
    }
    //计时函数
    var timeFunc = function () {
        timeCount = timeCount + 1;
        if (timeCount == 5) {
            timeCount = 0;
            time = time + 1;
            game.setTime(time);
        }
    }
   
    //开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById('local_gameover')
        }
        game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
        game.init(doms, Object(_utils__WEBPACK_IMPORTED_MODULE_1__["generateType"])(), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["generateDir"])());
        bindKeyEvent();
        game.performNext(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["generateType"])(), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["generateDir"])())
        timer = setInterval(move, INTERVAL)
    }
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    //导出API
    this.start = start;
    this.stop = stop;
    
}

/* harmony default export */ __webpack_exports__["default"] = (Local);


/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Square = function () {
    //方块数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    //原点
    this.origin = {
        x: 0,
        y: 0
    }
    //方向
    this.dir = 0;

    //旋转数组
    this.rotates = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square.prototype.canDown = function (isValid) {
    var testPos = {}
    testPos.x = this.origin.x + 1;
    testPos.y = this.origin.y;
    return isValid(testPos, this.data)
}
Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1;
}
Square.prototype.canLeft = function (isValid) {
    var testPos = {}
    testPos.x = this.origin.x;
    testPos.y = this.origin.y - 1;
    return isValid(testPos, this.data)
}
Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1;
}
Square.prototype.canRight = function (isValid) {
    var testPos = {}
    testPos.x = this.origin.x;
    testPos.y = this.origin.y + 1;
    return isValid(testPos, this.data)
}
Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1;
}
Square.prototype.canRotate = function (isValid) {
    var d = (this.dir + 1) % 4;
    var testData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[0].length; j++) {
            testData[i][j] = this.rotates[d][i][j]
        }
    }
    return isValid(this.origin, testData)
}
Square.prototype.rotate = function (num) {
    if (!num) num = 1;
    this.dir = (this.dir + num) % 4;
    for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[0].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j]
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Square);

/***/ }),

/***/ "./src/squareFactory.js":
/*!******************************!*\
  !*** ./src/squareFactory.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square */ "./src/square.js");


var Square1 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square1.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var Square2 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [0, 2, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square2.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var Square3 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [2, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square3.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var Square4 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [2, 2, 2, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square4.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var Square5 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square5.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var Square6 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square6.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var Square7 = function () {
    _square__WEBPACK_IMPORTED_MODULE_0__["default"].call(this)
    //旋转数组
    this.rotates = [
        [
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square7.prototype = _square__WEBPACK_IMPORTED_MODULE_0__["default"].prototype

var SquareFactory = function () { }

/**
 * 
 * @param {*} index 方块的种类
 * @param {*} dir 旋转的序号
 */
SquareFactory.prototype.make = function (index, dir) {
    var s;
    index = index + 1;
    switch (index) {
        case 1:
            s = new Square1()
            break;
        case 2:
            s = new Square2()
            break;
        case 3:
            s = new Square3()
            break;
        case 4:
            s = new Square4()
            break;
        case 5:
            s = new Square5()
            break;
        case 6:
            s = new Square6()
            break;
        case 7:
            s = new Square7()
            break;
        default:
            break;
    }
    s.origin.x=0;
    s.origin.y=3;
    s.rotate(dir);
    return s
}

/* harmony default export */ __webpack_exports__["default"] = (SquareFactory);

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"square":"src-style__square--C9-55","title":"src-style__title--3Y9Ro","game":"src-style__game--HwxIo","next":"src-style__next--3KvZ1","info":"src-style__info--23R0D","btn":"src-style__btn--1iK5k","none":"src-style__none--2PVV_","current":"src-style__current--5KYrD","done":"src-style__done--Ifzym","instructions":"src-style__instructions--1mZVW","ins_item":"src-style__ins_item--1jGWI"};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: generateType, generateDir */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateType", function() { return generateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDir", function() { return generateDir; });
//随机生成一个方块种类
var generateType = function () {
    return Math.ceil(Math.random() * 7) - 1
}
//随机生成一个旋转次数
var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sb2NhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3F1YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9zcXVhcmVGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQix1QkFBdUI7QUFDdkM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RKQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsRUFBRTtBQUNqQixlQUFlLEVBQUU7QUFDakIsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0EsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBLHVDQUF1Qyx1REFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEVBQUU7QUFDakIsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQSw4Q0FBOEMsdURBQVk7QUFDMUQsaUJBQWlCO0FBQ2pCLDhDQUE4Qyx1REFBWTtBQUMxRCxpQkFBaUI7QUFDakIsOENBQThDLDBEQUFlO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsRUFBRTtBQUNqQixlQUFlLEVBQUU7QUFDakIsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsRUFBRTtBQUNqQixlQUFlLEVBQUU7QUFDakI7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEMsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QywyQkFBMkIsd0JBQXdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QywyQkFBMkIsd0JBQXdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsUUFBUTtBQUNqRDtBQUNBLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsUUFBUTtBQUN2QyxtQ0FBbUMsd0JBQXdCO0FBQzNELG9DQUFvQztBQUNwQztBQUNBLHlCQUF5QixtQkFBbUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQ0FBb0M7QUFDM0Q7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdCQUFnQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxRTs7Ozs7Ozs7Ozs7Ozs7OztBQzdUQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4Qix5REFBYztBQUM1QyxrQ0FBa0MsdURBQVk7QUFDOUMsa0NBQWtDLHVEQUFZO0FBQzlDLGtDQUFrQyx1REFBWTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0RBQVc7QUFDN0M7QUFDQTtBQUNBLGtDQUFrQywrREFBb0I7QUFDdEQ7QUFDQSxzQ0FBc0MsMkRBQWdCO0FBQ3RELHNDQUFzQywyREFBZ0I7QUFDdEQsc0NBQXNDLDJEQUFnQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDRDtBQUNvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDLHVCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekMsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1RTs7Ozs7Ozs7Ozs7Ozs7QUNoR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEU7Ozs7Ozs7Ozs7O0FDM1FBO0FBQ0Esa0JBQWtCLG1ZOzs7Ozs7Ozs7Ozs7OztBQ0RsQjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmQ0MTAwZjRhZmZlMmY0ZmUxYTc5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC5qc1wiLFwiY29tbW9uXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFNxdWFyZUZhY3RvcnkgZnJvbSAnLi9zcXVhcmVGYWN0b3J5J1xyXG5pbXBvcnQgU3R5bGVzIGZyb20gJy4vc3R5bGUuY3NzJ1xyXG5cclxudmFyIEdhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3F1YXJlRmFjdG9yeSA9IG5ldyBTcXVhcmVGYWN0b3J5KCk7XHJcbiAgICAvL2RvbeWFg+e0oFxyXG4gICAgdmFyIGdhbWVEaXY7XHJcbiAgICB2YXIgbmV4dERpdjtcclxuICAgIHZhciB0aW1lRGl2O1xyXG4gICAgdmFyIHNjb3JlRGl2O1xyXG4gICAgdmFyIHJlc3VsdERpdjtcclxuICAgIC8v5YiG5pWwXHJcbiAgICB2YXIgc2NvcmUgPSAwO1xyXG4gICAgLy/muLjmiI/nn6npmLVcclxuICAgIHZhciBnYW1lRGF0YSA9IFtcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXHJcbiAgICBdXHJcbiAgICAvL+W9k+WJjeaWueWdl1xyXG4gICAgdmFyIGN1cjtcclxuICAgIC8v5LiL5LiA5Liq5pa55Z2XXHJcbiAgICB2YXIgbmV4dDtcclxuICAgIC8vZGl2c1xyXG4gICAgdmFyIGdhbWVEaXZzID0gW107XHJcbiAgICB2YXIgbmV4dERpdnMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWZGl244CC55So5LqM57u05pWw57uE5oqK6aG16Z2i5Yid5aeL5YyW5oiQMTBYMjDvvIjlrr1Y6auY77yJ55qE5LiA5bCP5Z2X5LiA5bCP5Z2X55qEZGl244CCXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRhaW5lciDlnKjpobXpnaLkuK3opoHlsZXnpLrnmoTkvY3nva7jgIJcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSDkuI7pobXpnaLlr7nlupTnmoTkuoznu7TmlbDnu4TvvIzlhbfkvZPmlbDmja7jgIJcclxuICAgICAqIEBwYXJhbSB7Kn0gZGl2cyDkuI7pobXpnaLlr7nlupTnmoTkuoznu7TmlbDnu4TvvIxkaXblhYPntKDjgIJcclxuICAgICAqL1xyXG4gICAgdmFyIGluaXREaXYgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkYXRhLCBkaXZzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhWzBdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLmNsYXNzTmFtZSA9IGAke1N0eWxlcy5ub25lfWA7XHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnN0eWxlLnRvcCA9IChpICogMjApICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIG5ld05vZGUuc3R5bGUubGVmdCA9IChqICogMjApICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdOb2RlKTtcclxuICAgICAgICAgICAgICAgIGRpdi5wdXNoKG5ld05vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRpdnMucHVzaChkaXYpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrBkaXbjgIJcclxuICAgICAqIOaKiuaTjeS9nOWQjueahOaVsOaNruWIt+aWsOWIsDEwWDIw77yI5a69WOmrmO+8ieWvueW6lOeahOS9jee9ruS4iuWOu+OAglxyXG4gICAgICogbm9uZeS4juiDjOaZr+iJsuS4gOiHtOeci+i1t+adpeWwseWDj+aYr+epuueahO+8m2RvbmXlt7Lnu4/kuIvokL3liLDlupXpg6jnmoTvvIzlt7Lnu4/kuI3og73liqjnmoRkaXbngbDoibLvvJtjdXJyZW505b2T5YmN5pON5L2c55qE77yM5q2j5Zyo5Yqo55qEZGl257qi6Imy44CCXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKiBAcGFyYW0geyp9IGRpdnMgXHJcbiAgICAgKi9cclxuICAgIHZhciByZWZyZXNoRGl2ID0gZnVuY3Rpb24gKGRhdGEsIGRpdnMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhWzBdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXVtqXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2c1tpXVtqXS5jbGFzc05hbWUgPSBgJHtTdHlsZXMubm9uZX1gO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhW2ldW2pdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXZzW2ldW2pdLmNsYXNzTmFtZSA9IGAke1N0eWxlcy5kb25lfWA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFbaV1bal0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdnNbaV1bal0uY2xhc3NOYW1lID0gYCR7U3R5bGVzLmN1cnJlbnR9YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL54K55piv5ZCm5ZCI5rOVXHJcbiAgICAgKiBAcGFyYW0geyp9IHBvcyDlnZDmoIdcclxuICAgICAqIEBwYXJhbSB7Kn0geCDnq5bkuIvmnaXnmoTlnZDmoIdcclxuICAgICAqIEBwYXJhbSB7Kn0geSDmqKrov4fljrvnmoTlnZDmoIdcclxuICAgICAqL1xyXG4gICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKHBvcywgeCwgeSkge1xyXG4gICAgICAgIGlmIChwb3MueCArIHggPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBvcy54ICsgeCA+PSBnYW1lRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocG9zLnkgKyB5IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwb3MueSArIHkgPj0gZ2FtZURhdGFbMF0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGdhbWVEYXRhW3Bvcy54ICsgeF1bcG9zLnkgKyB5XSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvmlbDmja7mmK/lkKblkIjms5VcclxuICAgICAqIOajgOa1i+aWueWdl+S4reeahOavj+S4gOWdl+mFjeS4iuWdkOagh+S5i+WQjuaYr+WQpuacieaViOOAglxyXG4gICAgICogQHBhcmFtIHsqfSBwb3Mg5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEg5pa55Z2X5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHZhciBpc1ZhbGlkID0gZnVuY3Rpb24gKHBvcywgZGF0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbMF0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldW2pdICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrKHBvcywgaSwgaikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICAvL+a4hemZpOaVsOaNrlxyXG4gICAgdmFyIGNsZWFyRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ci5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY3VyLmRhdGFbMF0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVjayhjdXIub3JpZ2luLCBpLCBqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVEYXRhW2N1ci5vcmlnaW4ueCArIGldW2N1ci5vcmlnaW4ueSArIGpdID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/orr7nva7mlbDmja5cclxuICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VyLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjdXIuZGF0YVswXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrKGN1ci5vcmlnaW4sIGksIGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZURhdGFbY3VyLm9yaWdpbi54ICsgaV1bY3VyLm9yaWdpbi55ICsgal0gPSBjdXIuZGF0YVtpXVtqXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/kuIvnp7tcclxuICAgIHZhciBkb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjdXIuY2FuRG93bihpc1ZhbGlkKSkge1xyXG4gICAgICAgICAgICBjbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgY3VyLmRvd24oKTtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgICAgICByZWZyZXNoRGl2KGdhbWVEYXRhLCBnYW1lRGl2cyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lt6bnp7tcclxuICAgIHZhciBsZWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjdXIuY2FuTGVmdChpc1ZhbGlkKSkge1xyXG4gICAgICAgICAgICBjbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgY3VyLmxlZnQoKTtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgICAgICByZWZyZXNoRGl2KGdhbWVEYXRhLCBnYW1lRGl2cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lj7Pnp7tcclxuICAgIHZhciByaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY3VyLmNhblJpZ2h0KGlzVmFsaWQpKSB7XHJcbiAgICAgICAgICAgIGNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICBjdXIucmlnaHQoKTtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgICAgICByZWZyZXNoRGl2KGdhbWVEYXRhLCBnYW1lRGl2cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lj7Pnp7tcclxuICAgIHZhciByb3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGN1ci5jYW5Sb3RhdGUoaXNWYWxpZCkpIHtcclxuICAgICAgICAgICAgY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIGN1ci5yb3RhdGUoKTtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgICAgICByZWZyZXNoRGl2KGdhbWVEYXRhLCBnYW1lRGl2cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mlrnlnZfnp7vliqjliLDlupXpg6jvvIzlm7rlrprkvY9cclxuICAgIHZhciBmaXhlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ci5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY3VyLmRhdGFbMF0ubGVuZ3RoOyBqKyspXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2soY3VyLm9yaWdpbiwgaSwgaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZURhdGFbY3VyLm9yaWdpbi54ICsgaV1bY3VyLm9yaWdpbi55ICsgal0gPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lRGF0YVtjdXIub3JpZ2luLnggKyBpXVtjdXIub3JpZ2luLnkgKyBqXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZWZyZXNoRGl2KGdhbWVEYXRhLCBnYW1lRGl2cyk7XHJcbiAgICB9XHJcbiAgICAvL+a2iOihjFxyXG4gICAgdmFyIGNoZWNrQ2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBnYW1lRGF0YS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgY2xlYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGdhbWVEYXRhWzBdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZURhdGFbaV1bal0gIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZSArIDFcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG0gPSBpOyBtID49IDA7IG0tLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgZ2FtZURhdGFbMF0ubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0gPiAwKSB7Ly/miYDmnInooYzlvoDkuIvnp7vkuIDooYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVEYXRhW21dW25dID0gZ2FtZURhdGFbbSAtIDFdW25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG0gPT0gMCkgey8v56ys5LiA6KGM5aGr5YWFMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZURhdGFbMF1bbl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/kuL7kuKrkvovlrZDvvJpcclxuICAgICAgICAgICAgICAgIC8v5raI6ZmkMTnjgIExOOOAgTE35LiJ6KGM44CCXHJcbiAgICAgICAgICAgICAgICAvLzE56KGM5raI6Zmk5LqG77yM5omA5pyJ5YWD57Sg5b6A5LiL56e75LiA6KGM77yM5Y6f5p2l55qEMTfjgIExOOihjOS4i+enu+WIsOS6hjE444CBMTnooYzjgIJcclxuICAgICAgICAgICAgICAgIC8v54S25ZCOaS0t77yM6L+Z5qC3aeaMh+WQkeS6hjE477yM6L+Z5qC35paw55qEMTnooYzlsLHmsqHmnInooqvmtojpmaTmjonkuobjgIJcclxuICAgICAgICAgICAgICAgIC8v5omA5Lul5q+P5qyh5raI6Zmk5a6M5LmL5ZCO77yM6K6paSsx6YeN5paw5Zue5YiwMTnooYzvvIznu6fnu63liKTmlq3mmK/lkKbog73mtojpmaTjgIJcclxuICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGluZTtcclxuICAgIH1cclxuICAgIC8v5ri45oiP57uT5p2fXHJcbiAgICB2YXIgY2hlY2tHYW1lb3ZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZ2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdhbWVEYXRhWzBdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lRGF0YVswXVtpXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdhbWVPdmVyXHJcbiAgICB9XHJcbiAgICAvL+W6lemDqOWinuWKoOihjFxyXG4gICAgdmFyIGFkZFRhaWxMaW5kZXMgPSBmdW5jdGlvbiAobGluZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdhbWVEYXRhLmxlbmd0aCAtIGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGdhbWVEYXRhW2ldID0gZ2FtZURhdGFbaSArIGxpbmVzLmxlbmd0aF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZ2FtZURhdGFbZ2FtZURhdGEubGVuZ3RoIC0gbGluZXMubGVuZ3RoICsgaV0gPSBsaW5lc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLy/kvb/nlKjkuIvkuIDkuKrmlrnlnZdcclxuICAgIHZhciBwZXJmb3JtTmV4dCA9IGZ1bmN0aW9uICh0eXBlLCBkaXIpIHtcclxuICAgICAgICBjdXIgPSBuZXh0O1xyXG4gICAgICAgIHNldERhdGEoKTtcclxuICAgICAgICBuZXh0ID0gc3F1YXJlRmFjdG9yeS5tYWtlKHR5cGUsIGRpcilcclxuICAgICAgICByZWZyZXNoRGl2KGdhbWVEYXRhLCBnYW1lRGl2cyk7XHJcbiAgICAgICAgcmVmcmVzaERpdihuZXh0LmRhdGEsIG5leHREaXZzKTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5pe26Ze0XHJcbiAgICB2YXIgc2V0VGltZSA9IGZ1bmN0aW9uICh0aW1lKSB7XHJcbiAgICAgICAgdGltZURpdi5pbm5lckhUTUwgPSB0aW1lO1xyXG4gICAgfVxyXG4gICAgLy/liqDliIZcclxuICAgIHZhciBhZGRTY29yZSA9IGZ1bmN0aW9uIChsaW5lKSB7XHJcbiAgICAgICAgdmFyIHMgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAobGluZSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBzID0gMTA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcyA9IDMwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHMgPSA2MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBzID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc2NvcmUgPSBzY29yZSArIHM7XHJcbiAgICAgICAgc2NvcmVEaXYuaW5uZXJIVE1MID0gc2NvcmU7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG4gICAgfVxyXG4gICAgdmFyIGdhbWVvdmVyID0gZnVuY3Rpb24gKHdpbikge1xyXG4gICAgICAgIGlmICh3aW4pIHtcclxuICAgICAgICAgICAgcmVzdWx0RGl2LmlubmVySFRNTCA9ICfkvaDotaLkuoYnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdERpdi5pbm5lckhUTUwgPSAn5L2g6L6T5LqGJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyWXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uIChkb21zLCB0eXBlLCBkaXIpIHtcclxuICAgICAgICBnYW1lRGl2ID0gZG9tcy5nYW1lRGl2O1xyXG4gICAgICAgIG5leHREaXYgPSBkb21zLm5leHREaXY7XHJcbiAgICAgICAgdGltZURpdiA9IGRvbXMudGltZURpdjtcclxuICAgICAgICBzY29yZURpdiA9IGRvbXMuc2NvcmVEaXY7XHJcbiAgICAgICAgcmVzdWx0RGl2ID0gZG9tcy5yZXN1bHREaXY7XHJcbiAgICAgICAgbmV4dCA9IHNxdWFyZUZhY3RvcnkubWFrZSh0eXBlLCBkaXIpO1xyXG4gICAgICAgIGluaXREaXYoZ2FtZURpdiwgZ2FtZURhdGEsIGdhbWVEaXZzKTtcclxuICAgICAgICBpbml0RGl2KG5leHREaXYsIG5leHQuZGF0YSwgbmV4dERpdnMpO1xyXG4gICAgICAgIHJlZnJlc2hEaXYobmV4dC5kYXRhLCBuZXh0RGl2cyk7XHJcbiAgICB9XHJcbiAgICAvL+WvvOWHukFQSVxyXG4gICAgdGhpcy5pbml0ID0gaW5pdDtcclxuICAgIHRoaXMuZG93biA9IGRvd247XHJcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xyXG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xyXG4gICAgdGhpcy5yb3RhdGUgPSByb3RhdGU7XHJcbiAgICB0aGlzLmZhbGwgPSBmdW5jdGlvbiAoKSB7IHdoaWxlIChkb3duKCkpOyB9XHJcbiAgICB0aGlzLmZpeGVkID0gZml4ZWQ7XHJcbiAgICB0aGlzLnBlcmZvcm1OZXh0ID0gcGVyZm9ybU5leHQ7XHJcbiAgICB0aGlzLmNoZWNrQ2xlYXIgPSBjaGVja0NsZWFyO1xyXG4gICAgdGhpcy5jaGVja0dhbWVvdmVyID0gY2hlY2tHYW1lb3ZlcjtcclxuICAgIHRoaXMuc2V0VGltZSA9IHNldFRpbWU7XHJcbiAgICB0aGlzLmFkZFNjb3JlID0gYWRkU2NvcmU7XHJcbiAgICB0aGlzLmdhbWVvdmVyID0gZ2FtZW92ZXI7XHJcbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgICB0aGlzLmFkZFRhaWxMaW5kZXMgPSBhZGRUYWlsTGluZGVzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBTdHlsZXMgZnJvbSAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgTG9jYWwgZnJvbSAnLi9sb2NhbCc7XHJcbi8vIGltcG9ydCBSZW1vdGUgZnJvbSAnLi9yZW1vdGUnO1xyXG5cclxuKGZ1bmN0aW9uIGluZGV4UGFnZSgpIHtcclxuICAgIHZhciBodG1sID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7U3R5bGVzLnNxdWFyZX1cIiBpZD1cImxvY2FsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7U3R5bGVzLmdhbWV9XCIgaWQ9XCJsb2NhbF9nYW1lXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7U3R5bGVzLm5leHR9XCIgaWQ9XCJsb2NhbF9uZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7U3R5bGVzLmluZm99XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+5bey55So5pe277yaXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImxvY2FsX3RpbWVcIj4wPC9zcGFuPnM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj7lt7LlvpfliIbvvJpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwibG9jYWxfc2NvcmVcIj4wPC9zcGFuPuWIhjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibG9jYWxfZ2FtZW92ZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPScke1N0eWxlcy5idG59Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J2J1dHRvbicgaWQ9J2J0blN0YXJ0JyB2YWx1ZT0n5byA5aeLJyA+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPScke1N0eWxlcy5pbnN0cnVjdGlvbnN9Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGVtPuaTjeS9nOivtOaYju+8mjwvZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JyR7U3R5bGVzLmluc19pdGVtfSc+4oaR5peL6L2sPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JyR7U3R5bGVzLmluc19pdGVtfSc+4oaQ5bemIOKGk+S4iyDihpLlj7M8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nJHtTdHlsZXMuaW5zX2l0ZW19Jz7nqbrmoLzlnaDokL08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYFxyXG4gICAgJChkb2N1bWVudC5ib2R5KS5hcHBlbmQoaHRtbCk7XHJcbiAgICB2YXIgbG9jYWwgPSBuZXcgTG9jYWwoKTtcclxuICAgIC8vIHZhciByZW1vdGUgPSBuZXcgUmVtb3RlKCk7XHJcbiAgICAkKCcjYnRuU3RhcnQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbG9jYWwuc3RhcnQoKTtcclxuICAgICAgICAvLyByZW1vdGUuc3RhcnQoKTtcclxuICAgICAgICAvLyByZW1vdGUuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIGJ0blN0YXJ0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG5cclxufSkoKVxyXG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXHJcbmltcG9ydCB7IGdlbmVyYXRlVHlwZSwgZ2VuZXJhdGVEaXIgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxudmFyIExvY2FsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvL+a4uOaIj+WvueixoVxyXG4gICAgdmFyIGdhbWU7XHJcbiAgICB2YXIgSU5URVJWQUwgPSAzMDA7XHJcbiAgICB2YXIgdGltZXIgPSBudWxsO1xyXG4gICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICB2YXIgdGltZSA9IDA7XHJcbiAgICAvL+e7keWumumUruebmOS6i+S7tlxyXG4gICAgdmFyIGJpbmRLZXlFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDM4KSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnJvdGF0ZSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM5KSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnJpZ2h0KClcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gNDApIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuZG93bigpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM3KSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmxlZnQoKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzMikgey8vc3BhY2VcclxuICAgICAgICAgICAgICAgIGdhbWUuZmFsbCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+enu+WKqFxyXG4gICAgdmFyIG1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGltZUZ1bmMoKTtcclxuICAgICAgICBpZiAoIWdhbWUuZG93bigpKSB7XHJcbiAgICAgICAgICAgIGdhbWUuZml4ZWQoKTtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBnYW1lLmNoZWNrQ2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKGxpbmUpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuYWRkU2NvcmUobGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGdhbWVPdmVyID0gZ2FtZS5jaGVja0dhbWVvdmVyKCk7XHJcbiAgICAgICAgICAgIGlmIChnYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5nYW1lb3ZlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzdG9wKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnBlcmZvcm1OZXh0KGdlbmVyYXRlVHlwZSgpLCBnZW5lcmF0ZURpcigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6K6h5pe25Ye95pWwXHJcbiAgICB2YXIgdGltZUZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGltZUNvdW50ID0gdGltZUNvdW50ICsgMTtcclxuICAgICAgICBpZiAodGltZUNvdW50ID09IDUpIHtcclxuICAgICAgICAgICAgdGltZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGltZSA9IHRpbWUgKyAxO1xyXG4gICAgICAgICAgICBnYW1lLnNldFRpbWUodGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICBcclxuICAgIC8v5byA5aeLXHJcbiAgICB2YXIgc3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRvbXMgPSB7XHJcbiAgICAgICAgICAgIGdhbWVEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhbF9nYW1lJyksXHJcbiAgICAgICAgICAgIG5leHREaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhbF9uZXh0JyksXHJcbiAgICAgICAgICAgIHRpbWVEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhbF90aW1lJyksXHJcbiAgICAgICAgICAgIHNjb3JlRGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYWxfc2NvcmUnKSxcclxuICAgICAgICAgICAgcmVzdWx0RGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYWxfZ2FtZW92ZXInKVxyXG4gICAgICAgIH1cclxuICAgICAgICBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgICAgICBnYW1lLmluaXQoZG9tcywgZ2VuZXJhdGVUeXBlKCksIGdlbmVyYXRlRGlyKCkpO1xyXG4gICAgICAgIGJpbmRLZXlFdmVudCgpO1xyXG4gICAgICAgIGdhbWUucGVyZm9ybU5leHQoZ2VuZXJhdGVUeXBlKCksIGdlbmVyYXRlRGlyKCkpXHJcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChtb3ZlLCBJTlRFUlZBTClcclxuICAgIH1cclxuICAgIHZhciBzdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgdGltZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgLy/lr7zlh7pBUElcclxuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgIHRoaXMuc3RvcCA9IHN0b3A7XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxcclxuIiwidmFyIFNxdWFyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8v5pa55Z2X5pWw5o2uXHJcbiAgICB0aGlzLmRhdGEgPSBbXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdXHJcbiAgICAvL+WOn+eCuVxyXG4gICAgdGhpcy5vcmlnaW4gPSB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICB9XHJcbiAgICAvL+aWueWQkVxyXG4gICAgdGhpcy5kaXIgPSAwO1xyXG5cclxuICAgIC8v5peL6L2s5pWw57uEXHJcbiAgICB0aGlzLnJvdGF0ZXMgPSBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMiwgMl0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAyLCAyXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdXHJcbiAgICBdO1xyXG59XHJcblNxdWFyZS5wcm90b3R5cGUuY2FuRG93biA9IGZ1bmN0aW9uIChpc1ZhbGlkKSB7XHJcbiAgICB2YXIgdGVzdFBvcyA9IHt9XHJcbiAgICB0ZXN0UG9zLnggPSB0aGlzLm9yaWdpbi54ICsgMTtcclxuICAgIHRlc3RQb3MueSA9IHRoaXMub3JpZ2luLnk7XHJcbiAgICByZXR1cm4gaXNWYWxpZCh0ZXN0UG9zLCB0aGlzLmRhdGEpXHJcbn1cclxuU3F1YXJlLnByb3RvdHlwZS5kb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5vcmlnaW4ueCA9IHRoaXMub3JpZ2luLnggKyAxO1xyXG59XHJcblNxdWFyZS5wcm90b3R5cGUuY2FuTGVmdCA9IGZ1bmN0aW9uIChpc1ZhbGlkKSB7XHJcbiAgICB2YXIgdGVzdFBvcyA9IHt9XHJcbiAgICB0ZXN0UG9zLnggPSB0aGlzLm9yaWdpbi54O1xyXG4gICAgdGVzdFBvcy55ID0gdGhpcy5vcmlnaW4ueSAtIDE7XHJcbiAgICByZXR1cm4gaXNWYWxpZCh0ZXN0UG9zLCB0aGlzLmRhdGEpXHJcbn1cclxuU3F1YXJlLnByb3RvdHlwZS5sZWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5vcmlnaW4ueSA9IHRoaXMub3JpZ2luLnkgLSAxO1xyXG59XHJcblNxdWFyZS5wcm90b3R5cGUuY2FuUmlnaHQgPSBmdW5jdGlvbiAoaXNWYWxpZCkge1xyXG4gICAgdmFyIHRlc3RQb3MgPSB7fVxyXG4gICAgdGVzdFBvcy54ID0gdGhpcy5vcmlnaW4ueDtcclxuICAgIHRlc3RQb3MueSA9IHRoaXMub3JpZ2luLnkgKyAxO1xyXG4gICAgcmV0dXJuIGlzVmFsaWQodGVzdFBvcywgdGhpcy5kYXRhKVxyXG59XHJcblNxdWFyZS5wcm90b3R5cGUucmlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm9yaWdpbi55ID0gdGhpcy5vcmlnaW4ueSArIDE7XHJcbn1cclxuU3F1YXJlLnByb3RvdHlwZS5jYW5Sb3RhdGUgPSBmdW5jdGlvbiAoaXNWYWxpZCkge1xyXG4gICAgdmFyIGQgPSAodGhpcy5kaXIgKyAxKSAlIDQ7XHJcbiAgICB2YXIgdGVzdERhdGEgPSBbXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5kYXRhWzBdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHRlc3REYXRhW2ldW2pdID0gdGhpcy5yb3RhdGVzW2RdW2ldW2pdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzVmFsaWQodGhpcy5vcmlnaW4sIHRlc3REYXRhKVxyXG59XHJcblNxdWFyZS5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKG51bSkge1xyXG4gICAgaWYgKCFudW0pIG51bSA9IDE7XHJcbiAgICB0aGlzLmRpciA9ICh0aGlzLmRpciArIG51bSkgJSA0O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuZGF0YVswXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbaV1bal0gPSB0aGlzLnJvdGF0ZXNbdGhpcy5kaXJdW2ldW2pdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcXVhcmU7IiwiaW1wb3J0IFNxdWFyZSBmcm9tICcuL3NxdWFyZSdcclxuXHJcbnZhciBTcXVhcmUxID0gZnVuY3Rpb24gKCkge1xyXG4gICAgU3F1YXJlLmNhbGwodGhpcylcclxuICAgIC8v5peL6L2s5pWw57uEXHJcbiAgICB0aGlzLnJvdGF0ZXMgPSBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMiwgMl0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAyLCAyXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdXHJcbiAgICBdO1xyXG59XHJcblNxdWFyZTEucHJvdG90eXBlID0gU3F1YXJlLnByb3RvdHlwZVxyXG5cclxudmFyIFNxdWFyZTIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBTcXVhcmUuY2FsbCh0aGlzKVxyXG4gICAgLy/ml4vovazmlbDnu4RcclxuICAgIHRoaXMucm90YXRlcyA9IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDIsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMiwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzIsIDIsIDIsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF1cclxuICAgIF07XHJcbn1cclxuU3F1YXJlMi5wcm90b3R5cGUgPSBTcXVhcmUucHJvdG90eXBlXHJcblxyXG52YXIgU3F1YXJlMyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFNxdWFyZS5jYWxsKHRoaXMpXHJcbiAgICAvL+aXi+i9rOaVsOe7hFxyXG4gICAgdGhpcy5yb3RhdGVzID0gW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzIsIDIsIDIsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMiwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMiwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAyLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXVxyXG4gICAgXTtcclxufVxyXG5TcXVhcmUzLnByb3RvdHlwZSA9IFNxdWFyZS5wcm90b3R5cGVcclxuXHJcbnZhciBTcXVhcmU0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgU3F1YXJlLmNhbGwodGhpcylcclxuICAgIC8v5peL6L2s5pWw57uEXHJcbiAgICB0aGlzLnJvdGF0ZXMgPSBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMiwgMiwgMiwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCAyLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDIsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMiwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdXHJcbiAgICBdO1xyXG59XHJcblNxdWFyZTQucHJvdG90eXBlID0gU3F1YXJlLnByb3RvdHlwZVxyXG5cclxudmFyIFNxdWFyZTUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBTcXVhcmUuY2FsbCh0aGlzKVxyXG4gICAgLy/ml4vovazmlbDnu4RcclxuICAgIHRoaXMucm90YXRlcyA9IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF1cclxuICAgIF07XHJcbn1cclxuU3F1YXJlNS5wcm90b3R5cGUgPSBTcXVhcmUucHJvdG90eXBlXHJcblxyXG52YXIgU3F1YXJlNiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFNxdWFyZS5jYWxsKHRoaXMpXHJcbiAgICAvL+aXi+i9rOaVsOe7hFxyXG4gICAgdGhpcy5yb3RhdGVzID0gW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDIsIDIsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFsyLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMiwgMiwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzIsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXVxyXG4gICAgXTtcclxufVxyXG5TcXVhcmU2LnByb3RvdHlwZSA9IFNxdWFyZS5wcm90b3R5cGVcclxuXHJcbnZhciBTcXVhcmU3ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgU3F1YXJlLmNhbGwodGhpcylcclxuICAgIC8v5peL6L2s5pWw57uEXHJcbiAgICB0aGlzLnJvdGF0ZXMgPSBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAyLCAyLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMiwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDIsIDIsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFsyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgWzIsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgICAgICBdXHJcbiAgICBdO1xyXG59XHJcblNxdWFyZTcucHJvdG90eXBlID0gU3F1YXJlLnByb3RvdHlwZVxyXG5cclxudmFyIFNxdWFyZUZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7IH1cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHsqfSBpbmRleCDmlrnlnZfnmoTnp43nsbtcclxuICogQHBhcmFtIHsqfSBkaXIg5peL6L2s55qE5bqP5Y+3XHJcbiAqL1xyXG5TcXVhcmVGYWN0b3J5LnByb3RvdHlwZS5tYWtlID0gZnVuY3Rpb24gKGluZGV4LCBkaXIpIHtcclxuICAgIHZhciBzO1xyXG4gICAgaW5kZXggPSBpbmRleCArIDE7XHJcbiAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBzID0gbmV3IFNxdWFyZTEoKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHMgPSBuZXcgU3F1YXJlMigpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgcyA9IG5ldyBTcXVhcmUzKClcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBzID0gbmV3IFNxdWFyZTQoKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHMgPSBuZXcgU3F1YXJlNSgpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgcyA9IG5ldyBTcXVhcmU2KClcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICBzID0gbmV3IFNxdWFyZTcoKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHMub3JpZ2luLng9MDtcclxuICAgIHMub3JpZ2luLnk9MztcclxuICAgIHMucm90YXRlKGRpcik7XHJcbiAgICByZXR1cm4gc1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcXVhcmVGYWN0b3J5OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJzcXVhcmVcIjpcInNyYy1zdHlsZV9fc3F1YXJlLS1DOS01NVwiLFwidGl0bGVcIjpcInNyYy1zdHlsZV9fdGl0bGUtLTNZOVJvXCIsXCJnYW1lXCI6XCJzcmMtc3R5bGVfX2dhbWUtLUh3eElvXCIsXCJuZXh0XCI6XCJzcmMtc3R5bGVfX25leHQtLTNLdloxXCIsXCJpbmZvXCI6XCJzcmMtc3R5bGVfX2luZm8tLTIzUjBEXCIsXCJidG5cIjpcInNyYy1zdHlsZV9fYnRuLS0xaUs1a1wiLFwibm9uZVwiOlwic3JjLXN0eWxlX19ub25lLS0yUFZWX1wiLFwiY3VycmVudFwiOlwic3JjLXN0eWxlX19jdXJyZW50LS01S1lyRFwiLFwiZG9uZVwiOlwic3JjLXN0eWxlX19kb25lLS1JZnp5bVwiLFwiaW5zdHJ1Y3Rpb25zXCI6XCJzcmMtc3R5bGVfX2luc3RydWN0aW9ucy0tMW1aVldcIixcImluc19pdGVtXCI6XCJzcmMtc3R5bGVfX2luc19pdGVtLS0xakdXSVwifTsiLCIvL+maj+acuueUn+aIkOS4gOS4quaWueWdl+enjeexu1xyXG52YXIgZ2VuZXJhdGVUeXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNykgLSAxXHJcbn1cclxuLy/pmo/mnLrnlJ/miJDkuIDkuKrml4vovazmrKHmlbBcclxudmFyIGdlbmVyYXRlRGlyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNCkgLSAxXHJcbn1cclxuZXhwb3J0IHsgZ2VuZXJhdGVUeXBlLCBnZW5lcmF0ZURpciB9Il0sInNvdXJjZVJvb3QiOiIifQ==