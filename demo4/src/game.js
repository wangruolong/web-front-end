import SquareFactory from './squareFactory'

var Game = function () {
    var squareFactory = new SquareFactory();
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
                newNode.className = 'none';
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
                    divs[i][j].className = 'none';
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done';
                } else if (data[i][j] == 2) {
                    divs[i][j].className = 'current';
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
    var checkGameover = function () {
        var gameOver = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[0][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver
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
}

export default Game;