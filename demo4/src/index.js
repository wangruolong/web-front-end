function indexPage(){
	var game = document.createElement('div');
    game.id='game';
    game.setAttribute('class','game');

    var next = document.createElement('div');
    next.id='next';
    next.setAttribute('class','next');
    $('#game').append(next)
    return game;
}
document.body.appendChild(indexPage());