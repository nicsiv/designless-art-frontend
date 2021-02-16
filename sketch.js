function setup() {
    createCanvas(this.innerWidth-20, this.innerHeight-140)
    frameRate(2)
}

function draw() {
    console.log('mouseposition:' + mouseX + ',' + mouseY);
    background(12, 12);
}

