let lines: HTMLCollectionOf<Element>;
let activeLineIndex;
let svgTop;
const topMargin = 20;
const lineSpace = 15;
const aantalSnaren = 5;
const aantalFrets = 22;
const keyMilliseconds = 500;
const acceptedFretKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const vp = document.getElementById('viewport');
const vpDiv = document.getElementById('viewportContainer');

svgTop = vpDiv.offsetTop;

document.addEventListener('click', (event: MouseEvent) => {
  activeLineIndex = Math.round((event.pageY - (svgTop + topMargin)) / lineSpace);
  activateLine();
});

let lastKeyPressed = Date.now();
let lastKey = '';
let keyBusy = false;

document.addEventListener('keyup', (event: KeyboardEvent) => {

  if(activeLineIndex >= 0 && activeLineIndex < aantalSnaren) {
    switch(event.key) {
      case 'ArrowUp':{
        activeLineIndex = Math.max(0, activeLineIndex - 1);
        activateLine();
        return;
      }
      case 'ArrowDown': {
        activeLineIndex = Math.min(aantalSnaren -1, activeLineIndex + 1);
        activateLine();
        return;
      }
      case acceptedFretKeys[event.key]: {
        const now = Date.now();
        const deadline = lastKeyPressed + keyMilliseconds;

        if (now >= deadline){
          keyBusy = false;
          lastKey = event.key;
        } else {
          keyBusy = true;
          lastKey += event.key;
        }
        lastKeyPressed = Date.now();

        setTimeout(() => { 
          if (!keyBusy) {
            MaakNoot(lastKey); 
          }
          keyBusy = false;
        }, keyMilliseconds);
        
        return;
      }
      default: {
        return;
      }
    }   
  }

});

const MaakNoot = (fretAsString: string) => {
  const fret = parseInt(fretAsString);
  if(fret > aantalFrets) {
    return;
  }
  console.log(`ik maak de noot ${fret}`);
}

export const maak = () => {
  vp.innerHTML = `
    <line class="bar" x1="20" y1="20" x2="20" y2="80" />
    <line class="line" x1="20" y1="20" x2="780" y2="20" />
    <line class="line" x1="20" y1="35" x2="780" y2="35" />
    <line class="line" x1="20" y1="50" x2="780" y2="50" />
    <line class="line" x1="20" y1="65" x2="780" y2="65" />
    <line class="line" x1="20" y1="80" x2="780" y2="80" />
    <line class="bar" x1="780" y1="20" x2="780" y2="80" /> 
    `
    ;

    grabElements();
    /*
   +
    <text x="20" y="35" class="tp" stroke="red">0</text> + 
    <text x="30" y="35" class="tp">1</text> +
    <text x="40" y="35" class="tp">2</text> +
    <text x="50" y="35" class="tp">3</text> +
    <text x="60" y="35" class="tp">4</text>
    */       
}

export const clear = () => {
  vp.innerHTML = '';
}

const grabElements = () => {
  lines = document.getElementsByClassName('line');
}

const activateLine = () => {

  if (!lines) {
    return;
  }

  for (let i = 0; i < lines.length; i++) {
    if(lines[i].classList.contains('activeline')){
      lines[i].classList.toggle('activeline');    
    }    
  }

  if(activeLineIndex >= 0 && activeLineIndex < aantalSnaren) {
    lines[activeLineIndex].classList.toggle('activeline');
  }
}