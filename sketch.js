let userId = 1
let userIndex = 1
let width = this.innerWidth *.9
let height = this.innerHeight *.7

function setup() {
    frameRate(5)
    
    let cnv = createCanvas(width, height)
    cnv.parent('#col-2')
    background(1)
    createButtons()
}

function draw() {
    
      
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

function saveAsJSON() { 
    let exampleObj = [ 
      { 
        name: "Samuel", 
        age: 23, 
      }, 
      { 
        name: "Axel", 
        age: 15, 
      }, 
    ]; 
    save(exampleObj, "output_text.json"); 
  } 

function createButtons(){
    saveBtn = createButton("Save Canvas"); 
    saveBtn.position(5, 650) 
    saveBtn.mousePressed(saveAsJSON);
     

    // btn = createButton("Change Shape"); 
    // btn.position(5, 300) 
    
    stopBtn = createButton("Stop"); 
    stopBtn.position(5, 700) 
    stopBtn.mousePressed(noLoop); 
    
    resumeBtn = createButton("Resume");
    resumeBtn.position(5, 750) 
    resumeBtn.mousePressed(loop); 

    // triangleBtn = createButton('Triangle')
    // triangleBtn.position(5, 450)
    // triangleBtn.mousePressed(shapeOf('triangle'))

    // rectangleBtn = createButton('Rectangle')
    // rectangleBtn.position(5, 500)
    // rectangleBtn.mousePressed(shapeOf('rectangle'))
}



