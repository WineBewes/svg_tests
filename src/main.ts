import { SvgHandler } from './svghandler';

const svghandler = new SvgHandler();

const bC = document.getElementById('btnClear');

bC.addEventListener('click', (event) => {

  svghandler.clear();

});
