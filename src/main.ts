import * as svghandler from './svghandler';

const svg = document.getElementById('')
const bM = document.getElementById('btnMaak');

bM.addEventListener('click', (event) => {

  svghandler.maak();

});

const bC = document.getElementById('btnClear');

bC.addEventListener('click', (event) => {

  svghandler.clear();

});

svghandler.maak();