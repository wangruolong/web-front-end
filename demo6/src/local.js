import Game from './game'
import { generateType, generateDir } from './utils'

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
                game.performNext(generateType(), generateDir());
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
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir())
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

export default Local
