
let start = false
let width = this.innerWidth *.9
let height = this.innerHeight *.7

let drawx, drawy;
let px, py;


function setup() {
    frameRate(50)
    
    let cnv = createCanvas(width, height)
    cnv.parent('#col-2')

    drawx = width / 2;
    drawy = height / 2;
    px = drawx;
    py = drawy;
    background(1)
    createButtons()
    strokeWeight(3);
}

function draw() {
  if (start){
    let showNorm = false;
      
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
 //
 
      if (keyIsPressed) {
        showNorm = !showNorm;
      }
    
    //   drawx = random(-5, 5) + mouseX;
    //   drawy = random(-5, 5) + mouseY;
    
    //   stroke(255);
    //   line(drawx, drawy, px, py);
    
    //   px = drawx;
    //   py = drawy;
    
    
      if (showNorm) {
        stroke(0, 0, 0);
        line(mouseX, mouseY, pmouseX, pmouseY);
        drawx = random(-5, 5) + mouseX;
        drawy = random(-5, 5) + mouseY;
    
        stroke(255);
        line(drawx, drawy, px, py);
    
        px = drawx;
        py = drawy;
      }
    }

    
    }




      


function shapeShift(){
    color = map(mouseY, 0, 300, 0, 255);
  
    if(mouseX < 100) {
      noStroke();
      fill(color);

      a = Math.ceil(random(width))
      b = Math.ceil(random(height))
      c = Math.ceil(random(50))

      ellipse(a, b, c, c);
    }
    
    if(mouseX >= 100 && mouseX <= 200) {
      noStroke();
      fill(color);
      a = random(width)
      b = random(height)
      c = Math.ceil(Math.random(50))
      d = Math.ceil(Math.random(50))

      rect(a, b, c, d);
    }
    
    if(mouseX > 200) {
      noStroke();
      fill(color);
      a = random(width)
      b = random(height)
      c = random(width)
      d = random(height)
      e = random(width) 
      f = random(height)

      triangle(a, b, c, d, e, f); 
    } 

    if (mousePressed){
        loop()
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
    clearBtn.mousePressed(clear); 

    saveBtn = createButton("Save");
    saveBtn.position(1, 325) 
    saveBtn.mousePressed(e => {
      noLoop()
      saveACanvas()
    }); 
}



