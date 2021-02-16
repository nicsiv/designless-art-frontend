let polySynth

let width = this.innerWidth * .70
let height = this.innerHeight * .80

function setup() {
    frameRate(1)
    
    let cnv = createCanvas(width, height)
    cnv.parent('#col-2')
    // sound = new p5.PolySynth();
    // cnv.mousePressed(playSynth); 
}

function draw() {
    console.log('mouseposition:' + mouseX + ',' + mouseY);
    background(12, 12);
      
    let e = Math.ceil(Math.random() * 100)
    let f = Math.ceil(Math.random() * 100)
    let x = Math.ceil(random(width))
    let y = Math.ceil(random(height))
    
    r = random(255); // r is a random number between 0 - 255
    g = random(100,200); // g is a random number betwen 100 - 200
    b = random(100); // b is a random number between 0 - 100
    a = random(200,255); // a is a random number between 200 - 255
    
    fill(r, g, b, a);
    rect(x, y, e, f)  
    
}

// function playSynth(){
//     console.log('music')
//     userStartAudio();
//     let vel = .1
//     let dur = .05

//     sound.play(G2, vel, dur)
// }