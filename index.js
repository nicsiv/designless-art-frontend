let dropdownDisplay = false
const dropDown = document.querySelector('#myDropdown')
dropDown.style.display = 'none'

let loginButton = document.querySelector('#form-button')
loginButton.style.display = 'block'

let loginDisplay = false
const login = document.querySelector('#loginForm')
login.style.display = 'none'

//when user signs in change to none
let canvasesDisplay = false
const canvasButton = document.querySelector('#canvas-button')
canvasButton.style.display = 'none'

const main = () => {
    formListener()
    saveEasel()
    createButtonListener()
}

const formListener = () => {
    
    const form = document.querySelector('form')
    
    form.addEventListener('submit', function(e){
    
        if (e.target.className === "login") {
            e.preventDefault()
            const newLogin = {
                username: e.target.firstElementChild.value,
            }
            e.target.reset()

            const reqObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLogin)
              }

                fetch('http://localhost:3000/users/auth', reqObj)
                .then(resp => resp.json())
                .then(user => {
                    login.style.display = 'none'
                    loginAuth(user)
                })     
        }
    })
}

function loginAuth(user){
    if (user){
        // add canvases

        let h5 = document.querySelector('h5')
        h5.innerText = user.username
        canvasButton.style.display = 'block'
        let div = document.querySelector('#form-button').parentElement
        let button = document.createElement('button')
        button.id = 'logout'
        button.innerText = 'LOGOUT'
        div.append(button)
        let loginButton = document.querySelector('#form-button')
        loginButton.style.display = 'none'


        //create canvas
        // let col = document.querySelector('#col-2')
        // let easel = document.createElement('canvas')
        // easel.id = 'newCanvas'
        
    }
}


function editUsername(){

}

function deleteUsername(){

}

function logout(){ 
    loginButton.style.display = 'block'
    canvasButton.style.display = 'none'
    let button = document.querySelector('button#logout')
    button.remove()
    let h5 = document.querySelector('h5')
    h5.innerText = ''
    
}

function logoutListener(){

}

function deleteEasel(){
    
}

//create function
let div = document.querySelector('#col-1')
const saveButton = document.createElement('button')
saveButton.className = 'save'
saveButton.innerText = 'save'
div.append(saveButton)

//create function/listener
saveButton.addEventListener('click', event => {
    canvas.toBlob(function(blob) {
        let newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);
      
        newImg.onload = function() {
        //   URL.revokeObjectURL(url);
        };
      
        newImg.src = url;
        let div = document.querySelector('#myDropdown')
        let button = document.createElement('button')
        let newDiv = document.createElement('div')
        button.id = 'delete'
        button.innerText = 'delete'
        newDiv.append(button, newImg)
        div.appendChild(newDiv);
        button.addEventListener('click', event => {
            deleteCanvas(event)
        })

        newEasel = {
            image: url,
            user_id: userId,
            photo: 'x'
        }
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEasel)
        }
        fetch('http://localhost:3000/easels/image', reqObj)
        .then(resp => resp.json())
        .then(data => {
            // debugger
            console.log(data)
        })
    })
})

function createButtonListener(){    
    document.addEventListener('click', event => {
        
        if (event.target.id === 'canvas-button'){
            dropdownDisplay = !dropdownDisplay
            if (dropdownDisplay) {
                dropDown.style.display = 'block'	
            } else {
                dropDown.style.display = 'none'
            }
        } else if (event.target.id === 'form-button'){
            loginDisplay = !loginDisplay
            if (loginDisplay){
                login.style.display = 'block'
            } else {
                login.style.display = 'none'
            }
        } else if (event.target.innerText === 'LOGOUT'){
            logout()
        } else if (event.target.nodeName === 'IMG'){
            debugger
        }

    })
}

function saveListener(){
    let saveButton = document.querySelector('.save')
    saveButton.addEventListener('click', event => {
        noLoop()
        debugger
        `touch /${newfilexxx}`
    })
}

function deleteCanvas(event){
    event.target.parentElement.remove() 
}

function saveEasel(){
let saveEaselBtn = document.querySelectorAll('button')[2]
saveEaselBtn.addEventListener('click', event => {
    console.log(event.target)
})
}


main()







