import './style.css';
import Local from './local';
import Remote from './remote';

(function indexPage() {
    var html = `
                <div>请使用方向键和空格键进行操作：↑旋转，←左移，→右移，↓下移，空格坠落</div>
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
                    <input type='button' id='btnStart' class='btn btn_start' value='开始' ></input>
                </div>
                <div class="square" id="remote">
                    <div class="title">对方游戏区</div>
                    <div class="game" id="remote_game"></div>
                    <div class="next" id="remote_next"></div>
                    <div class="info">
                        <div>已用时：
                            <span id="remote_time">0</span>s</div>
                        <div>已得分：
                            <span id="remote_score">0</span>分</div>
                        <div id="remote_gameover"></div>
                        <button id='performNext'>performNext</button><br />
                        <button id='rotate'>rotate</button><br />
                        <button id='left'>left</button> <button id='right'>right</button><br />
                        <button id='down'>down</button><br />
                        <button id='fall'>fall</button><br />
                        <button id='addTailLindes'>addTailLindes</button><br />
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
