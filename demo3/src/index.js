import {test} from './print.js'
function component() {
    var element = document.createElement('div');
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    test()
    return element;
}

document.body.appendChild(component());
