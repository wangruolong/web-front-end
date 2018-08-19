import './style.css';
import Local from './local';

function indexPage(){
	var main = document.createElement('div');
	
	var game = document.createElement('div');
    game.id='game';
    game.setAttribute('class','game');
    main.appendChild(game);

    var next = document.createElement('div');
    next.id='next';
    next.setAttribute('class','next');
    main.appendChild(next);
    
    var info = document.createElement('div');
    info.setAttribute('class','info');

    var label10 = document.createElement('label');
    label10.innerText = '已用时：';
    var label11 = document.createElement('label');
    label11.innerText = 's';
    var div1 = document.createElement('div');
    div1.appendChild(label10);
    var time = document.createElement('span');
    time.id='time';
    time.innerText='0'
    div1.appendChild(time);
    div1.appendChild(label11);
    info.appendChild(div1);

    var label20 = document.createElement('label');
    label20.innerText = '已得分：';
    var label21 = document.createElement('label');
    label21.innerText = '分';
    var div2 = document.createElement('div');
    div2.appendChild(label20);
    var score = document.createElement('span');
    score.id='score';
    score.innerText='0'
    div2.appendChild(score);
    div2.appendChild(label21);
    info.appendChild(div2);

    main.appendChild(info);

    var btn = document.createElement('button');
    btn.id = 'btn';
    btn.className = 'btn';
    btn.innerText = '开始';
    var local = new Local();
    // btn.setAttribute('click',local.start());
    btn.onclick = local.start;
    main.appendChild(btn);

    return main;
}

document.body.appendChild(indexPage());
