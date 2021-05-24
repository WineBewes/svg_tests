export class SvgHandler {

  private pristineSvg = `
  <line class="bar" x1="20" y1="20" x2="20" y2="80" />
  <line class="line" x1="20" y1="20" x2="780" y2="20" />
  <line class="line" x1="20" y1="35" x2="780" y2="35" />
  <line class="line" x1="20" y1="50" x2="780" y2="50" />
  <line class="line" x1="20" y1="65" x2="780" y2="65" />
  <line class="line" x1="20" y1="80" x2="780" y2="80" />
  <line class="bar" x1="780" y1="20" x2="780" y2="80" /> 
  `;
  private vp = document.getElementById('viewport');
  private vpDiv = document.getElementById('viewportContainer');
  private fretbusyDiv = document.getElementsByClassName('fretbusy');
  private lines: HTMLCollectionOf<Element>;
  private activeLineIndex;
  private svgTop;
  private topMargin = 20;
  private lineSpace = 15;
  private aantalSnaren = 5;
  private aantalFrets = 22;
  private keyMilliseconds = 300;
  private acceptedFretKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  private lastKeyPressed = Date.now();
  private lastKey = '';
  private keyBusy = false;
  private _fretBusy = false;
    
  constructor() {

    this.svgTop = this.vpDiv.offsetTop;
    
    document.addEventListener('click', (event: MouseEvent) => {
      this.activeLineIndex = Math.round((event.pageY - (this.svgTop + this.topMargin)) / this.lineSpace);
      this.activateLine();
    });
    
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.handleKeyUp(event);    
    });

    this.clear();
  }

      /*
    +
      <text x="20" y="35" class="tp" stroke="red">0</text> + 
      <text x="30" y="35" class="tp">1</text> +
      <text x="40" y="35" class="tp">2</text> +
      <text x="50" y="35" class="tp">3</text> +
      <text x="60" y="35" class="tp">4</text>
      */       

  clear() {
    this.vp.innerHTML = this.pristineSvg;
    this.grabElements();;
  }

  private grabElements() {
    this.lines = document.getElementsByClassName('line');
  }

  private activateLine() {

    if (!this.lines) {
      return;
    }

    for (let i = 0; i < this.lines.length; i++) {
      if(this.lines[i].classList.contains('activeline')){
        this.lines[i].classList.toggle('activeline');    
      }    
    }

    if(this.activeLineIndex >= 0 && this.activeLineIndex < this.aantalSnaren) {
      this.lines[this.activeLineIndex].classList.toggle('activeline');
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {

    this.fretBusy = true;

    if(this.activeLineIndex >= 0 && this.activeLineIndex < this.aantalSnaren) {
      switch(event.key) {
        case 'ArrowUp':{
          this.activeLineIndex = Math.max(0, this.activeLineIndex - 1);
          this.activateLine();
          return;
        }
        case 'ArrowDown': {
          this.activeLineIndex = Math.min(this.aantalSnaren -1, this.activeLineIndex + 1);
          this.activateLine();
          return;
        }
        case this.acceptedFretKeys[event.key]: {
          const now = Date.now();
          const deadline = this.lastKeyPressed + this.keyMilliseconds;
  
          if (now >= deadline){
            this.keyBusy = false;
            this.lastKey = event.key;
          } else {
            this.keyBusy = true;
            this.lastKey += event.key;
          }
          this.lastKeyPressed = Date.now();
  
          setTimeout(() => { 
            if (!this.keyBusy) {
              this.maakNoot(this.lastKey); 
            }
            this.fretBusy = false;
            this.keyBusy = false;
          }, this.keyMilliseconds);
          
          return;
        }
        default: {
          return;
        }
      }   
    }
  }

  get fretBusy(): boolean {
    return this._fretBusy;
  }

  set fretBusy(value: boolean) {
    this._fretBusy = value;
    for (let i = 0; i < this.fretbusyDiv.length; i++){
      if (this._fretBusy) {
        this.fretbusyDiv[i].classList.remove('not-visible')
        this.fretbusyDiv[i].classList.add('visible')
      } else {
        this.fretbusyDiv[i].classList.remove('visible')
        this.fretbusyDiv[i].classList.add('not-visible')
      }
    }
  }

  private maakNoot(fretAsString: string) {
    const fret = parseInt(fretAsString);
    if(fret > this.aantalFrets) {
      return;
    }
    console.log(`ik maak de noot ${fret}`);
  }

}
