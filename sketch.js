

let userId = 1
let polySynth

let width = this.innerWidth
let height = this.innerHeight * .80

function setup() {
    frameRate(1)
    
    let cnv = createCanvas(width, height)
    cnv.parent('#col-2')

    saveBtn = createButton("Save Canvas"); 
    saveBtn.position(5, 250) 
    saveBtn.mousePressed(saveThisCanvas); 

    btn = createButton("Change Shape"); 
    btn.position(5, 300) 
    
    stopBtn = createButton("Stop"); 
    stopBtn.position(5, 350) 
    stopBtn.mousePressed(noLoop); 
    
    resumeBtn = createButton("Resume");
    resumeBtn.position(5, 400) 
    resumeBtn.mousePressed(loop); 

    triangleBtn = createButton('Triangle')
    triangleBtn.position(5, 450)
    triangleBtn.mousePressed(shapeOf('triangle'))

    rectangleBtn = createButton('Rectangle')
    rectangleBtn.position(5, 500)
    rectangleBtn.mousePressed(shapeOf('rectangle'))
}

function draw() {
    console.log('mouseposition:' + mouseX + ',' + mouseY);
    background(12, 12);
     
    shapeOf(shape)

}

function saveThisCanvas(){
    let newCanvasName = `${userId}/8++`
    saveCanvas(newCanvasName, 'png')
    let newCanvas = {canvas: newCanvasName}

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
    fetch(`http://localhost:3000/${userId}`, reqObj)
    .then(resp => resp.json())
    .then(canvas => {
        console.log(canvas)
    })
}

function shapeOf(shape){

    
    r = random(255); // r is a random number between 0 - 255
    g = random(100,200); // g is a random number betwen 100 - 200
    b = random(100); // b is a random number between 0 - 100
    a = random(200,255); // a is a random number between 200 - 255
    
    fill(r, g, b, a);

    if (shape === 'rectangle'){
        let e = Math.ceil(Math.random() * 100)
        let f = Math.ceil(Math.random() * 100)
        let x = Math.ceil(random(width))
        let y = Math.ceil(random(height))

        rect(x, y, e, f) 

    } else if (shape == 'triangle'){
        let c = Math.ceil(Math.random() * 100)
        let d = Math.ceil(Math.random() * 100)
        let e = Math.ceil(Math.random() * 100)
        let f = Math.ceil(Math.random() * 100)
        let g = Math.ceil(Math.random() * 100)
        let h = Math.ceil(Math.random() * 100)
        
        triangle(c, d, e, f, g, h)
    }


}



