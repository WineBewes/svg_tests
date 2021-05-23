const vp = document.getElementById('viewport');

document.addEventListener('keyup', (event) => {

});

export const maak = () => {
  vp.innerHTML = 
  '<style>' + 
      '.tp { font: 10px sans-serif; }' +
    '</style>' + 
    '<line class="bar" stroke-width="1" x1="20" y1="20" x2="20" y2="60" />' +
    '<line class="line" stroke-width="1" x1="20" y1="20" x2="780" y2="20" />' + 
    '<line class="line" stroke-width="1" x1="20" y1="30" x2="780" y2="30" />' + 
    '<line class="line" stroke-width="1" x1="20" y1="40" x2="780" y2="40" />' + 
    '<line class="line" stroke-width="1" x1="20" y1="50" x2="780" y2="50" />' + 
    '<line class="line" stroke-width="1" x1="20" y1="60" x2="780" y2="60" />' +
    '<line class="bar" stroke-width="1" x1="780" y1="20" x2="780" y2="60" />' 
    ;
    /*
  ' '+
    '<text x="20" y="35" class="tp" stroke="red">0</text>' + 
    '<text x="30" y="35" class="tp">1</text>' +
    '<text x="40" y="35" class="tp">2</text>' +
    '<text x="50" y="35" class="tp">3</text>' +
    '<text x="60" y="35" class="tp">4</text>'
    */       
}

export const clear = () => {
  vp.innerHTML = '';
}