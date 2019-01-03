import Game from './game'
import { generateType, generateDir } from './utils'

var Remote = function () {
    //游戏对象
    var game;
    //绑定按钮事件
    var bindEvents = function () {
        $('#performNext').click(function () {
            game.performNext(generateType(), generateDir());
        })
        $('#rotate').click(function () {
            game.rotate();
        })
        $('#left').click(function () {
            game.left();
        })
        $('#right').click(function () {
            game.right();
        })
        $('#down').click(function () {
            game.down();
        })
        $('#fall').click(function () {
            game.fall();
        })
        $('#addTailLindes').click(function () {
            game.addTailLindes();
        })
    }

    //开始
    var start = function (type, dir) {
        var doms = {
            gameDiv: document.getElementById('remote_game'),
            nextDiv: document.getElementById('remote_next'),
            timeDiv: document.getElementById('remote_time'),
            scoreDiv: document.getElementById('remote_score'),
            resultDiv: document.getElementById('remote_gameover')
        }
        game = new Game();
        game.init(doms, generateType(), generateDir());
        game.performNext(generateType(), generateDir())
    }
    //导出
    this.start = start;
    this.bindEvents = bindEvents;
}
export default Remote;