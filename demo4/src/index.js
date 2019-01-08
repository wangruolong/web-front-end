import './style.css';
import Local from './local';
import Remote from './remote';

(function indexPage() {
    var html = `
                <div class="square" id="local">
                    <div class="title">我的游戏区</div>
                    <div class="game" id="local_game"></div>
                    <div class="next" id="local_next"></div>
                    <div class="info">
                        <div>已用时：
                            <span id="local_time">0</span>s</div>
                        <div>已得分：
                            <span id="local_score">0</span>分</div>
                        <div id="local_gameover"></div>
                    </div>
                    <div class='btn'>
                        <input type='button' id='btnStart' value='开始' ></input>
                    </div>
                    <div class='instructions'>
                        <em>操作说明：</em>
                        <div class='ins-item'>↑旋转</div>
                        <div class='ins-item'>←左 ↓下 →右</div>
                        <div class='ins-item'>空格坠落</div>
                    </div>
                </div>
                `
    $(document.body).append(html);
    var local = new Local();
    var remote = new Remote();
    $('#btnStart').click(function () {
        local.start();
        remote.start();
        remote.bindEvents();
        btnStart.setAttribute('disabled', 'disabled');
    });

})()
