export class SvgHandler {

  private vp = document.getElementById('viewport');
  private vpDiv = document.getElementById('viewportContainer');
  private fretbusyDiv = document.getElementsByClassName('fretbusy');
  private lines: HTMLCollectionOf<Element>;
  private activeLineIndex;
  private svgTop;
  private topMargin = 20;
  private lineSpace = 15;
  private noteOffsetX = 12;
  private noteOffsetY = 5;
  private aantalSnaren = 5;
  private aantalFrets = 22;
  private keyMilliseconds = 300;
  private acceptedFretKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  private lastKeyPressed = Date.now();
  private lastKey = '';
  private keyBusy = false;
  private _fretBusy = false;
  private startPositionX = 20;
  private endPositionX = 780;
  private notePositionX = this.startPositionX;  
  private startPositionY = 20;
  private notePositionY = this.startPositionY + 20;  
  constructor() {

    this.svgTop = this.vpDiv.offsetTop;
    
    this.vp.addEventListener('click', (event: MouseEvent) => {
      this.activeLineIndex = Math.round((event.pageY - (this.svgTop + this.topMargin)) / this.lineSpace);
      this.activateLine();
    });
    
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.handleKeyUp(event);    
    });

    this.clear();
  }

  clear() {
    this.vp.innerHTML = this.getPristineSvg();
    this.grabElements();
    this.activeLineIndex = 0;
    this.activateLine();
  }

  private grabElements() {
    this.lines = document.getElementsByClassName('line');
  }

  private activateLine() {

    if (!this.lines) {
      return;
    }

    for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].classList.remove('activeline');    
    }
    if(this.activeLineIndex >= 0 && this.activeLineIndex < this.aantalSnaren) {
      this.lines[this.activeLineIndex].classList.add('activeline');
      this.notePositionY = parseInt(this.lines[this.activeLineIndex].getAttribute("y1")) + this.noteOffsetY;
    }
  }

  private getPristineSvg(): string {
    let svg = `
      <line class="bar" x1="${this.startPositionX}" y1="${this.startPositionY}" x2="${this.startPositionX}" y2="${this.startPositionY + ((this.aantalSnaren - 1) * this.lineSpace)}" />
      <line class="bar" x1="${this.endPositionX}" y1="${this.startPositionY}" x2="${this.endPositionX}" y2="${this.startPositionY + ((this.aantalSnaren - 1) * this.lineSpace)}" />
    `;

    for (var i = 0; i < this.aantalSnaren; i++){
      svg += `
      <line class="line" x1="${this.startPositionX}" y1="${this.startPositionY + (i * this.lineSpace)}" x2="${this.endPositionX}" y2="${this.startPositionY + (i * this.lineSpace)}" />
      `;
    }
    return svg; 
  }

  

  private handleKeyUp(event: KeyboardEvent): void {

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
          this.fretBusy = true;
  
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
      this.fretbusyDiv[i].classList.remove('not-visible');
      if (this._fretBusy) {
        this.fretbusyDiv[i].classList.remove('not-visible')
      } else {
        this.fretbusyDiv[i].classList.add('not-visible')
      }
    }
  }

  private maakNoot(fretAsString: string) {
    const fret = parseInt(fretAsString);
    if(fret > this.aantalFrets) {
      return;
    }
    const note =  `<text x="${this.notePositionX}" y="${this.notePositionY}" class="tp">${fretAsString}</text>`;
    
    this.vp.innerHTML += note;
    this.notePositionX += this.noteOffsetX;
  }

}
