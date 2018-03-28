const len = 20;

const container = document.createElement('div');
container.id = 'container';
document.body.append(container);

let dots = new Array(len);
let speeds = [];
let voff = 0;

for (let i = 0; i < len; i++) {
  dots[i] = new Array(len);

  let row = document.createElement('div');

  row.classList.add('row');
  container.append(row);

  for (let j = 0; j < len; j++) {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    row.append(dot);
    dots[i][j] = dot;

    speeds[i * len + j] = (Math.random() + 1) / 2;
  }
}

function draw(start = true) {
  let milli = Date.now();
  let offsum = 0;

  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len; j++) {
      let offset = Math.sin(milli * speeds[i * len + j] * 0.003) + 1;
      offsum += offset;
      dots[i][j].style.marginLeft = offset + 'vmin';
    }
  }

  let off = offsum/len/len;
  voff = start ? off : lerp(voff, off, 0.1);
  document.querySelectorAll('.row + .row')
    .forEach(row => row.style.marginTop = voff + 'vmin');

  requestAnimationFrame(()=>draw(false));
}

draw();

function lerp(a, b, c) {
  return a + (b-a) * c;
}
