
let start = false
let width = this.innerWidth
let height = this.innerHeight *.8

let drawx, drawy;
let px, py;
let slider


function setup() {
    frameRate(200)
    angleMode(DEGREES)
    let cnv = createCanvas(width, height)
    cnv.parent('#col-2')

    drawx = width / 2;
    drawy = height / 2;
    px = drawx;
    py = drawy;
    background(1)
    createButtons()
    strokeWeight(3);
    sizeSlider = createSlider(1, 32, 4, 0.1)
}
let symmetry = 6;   
let angle = 360 / symmetry;


function draw() {
  if (start){
    let showNorm = false;

    if (keyIsDown(DOWN_ARROW)){ 
      rectangles()
    }
 
 
    if (keyIsDown(LEFT_ARROW)) {
      freeDraw()
      }
    
    if(keyIsDown(UP_ARROW)){
      noises()
    }

    if(keyIsDown(RIGHT_ARROW)){
      variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
    }

    translate(width / 2, height / 2);
    
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      kalleidoscope()
    }

    //a
    if (keyIsDown(65)){
      let x=0;
      let y=0;
      let side= 50;
      let offset = 100;
      let r = 0;
      
      for (let a=0; a<10; a++){
      for(let b=0; b<5;b++){
      fill (250,(70*b),0);
      noStroke();
    	r = random(0, 50);
     side=random(0,100);
       if (mouseIsPressed)
        rect(x+offset*b,y+offset*a,side,side);
      else
      ellipse(x+offset*b+r,y+offset*a+r,side,side);
     
      }
    } 
  }
      
  }
}

  

function kalleidoscope(){
  stroke(255)
  if (keyIsDown(SHIFT)){
    stroke(random(255), random(255), random(255))
  }
      
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;

    if(mouseIsPressed) for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      let sw = sizeSlider.value();
      strokeWeight(sw);
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }
}

function freeDraw(){
  
  stroke(0, 0, 0);
  line(mouseX, mouseY, pmouseX, pmouseY);
  drawx = random(-5, 5) + mouseX;
  drawy = random(-5, 5) + mouseY;
  let sw = sizeSlider.value();
  strokeWeight(sw);
  
  stroke(255)
  if (keyIsDown(SHIFT)){
    stroke(random(255), random(255), random(255))
  }

  line(drawx, drawy, px, py);

  px = drawx;
  py = drawy;
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}

function rectangles(){
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

let noiseScale=0.02;

function noises(){
  
  for (let x=0; x < width; x++) {
    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    
    let color = (mouseX)
    stroke(noiseVal*250);
    line(x, mouseY+noiseVal*80, x, height);
  }
}

function saveThisCanvas(){
    let newCanvasName = `${userId}/${++userIndex}`
    saveCanvas(newCanvasName, 'png')
    let newCanvas = {
        user_id: userId,
        image: newCanvasName
    }

    reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCanvas)
    }
    addCanvasToApi(reqObj)
}

function addCanvasToApi(reqObj){
    fetch('http://localhost:3000/easels', reqObj)
    .then(resp => resp.json())
    .then(canvas => {
        console.log(canvas)  
    })
}


function createButtons(){

    stopBtn = createButton("Stop"); 
    stopBtn.position(1, 175) 
    stopBtn.mousePressed(noLoop); 
    
    resumeBtn = createButton("Resume");
    resumeBtn.position(1, 225) 
    resumeBtn.mousePressed(loop); 

    clearBtn = createButton("Clear");
    clearBtn.position(1, 275) 
    clearBtn.mousePressed(e => {
      clear()
      background(1)
    }); 

    saveBtn = createButton("Save");
    saveBtn.position(1, 325) 
    saveBtn.mousePressed(e => {
      
      saveACanvas()
    }); 
}



