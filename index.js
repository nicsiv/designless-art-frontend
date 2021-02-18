let dropdownDisplay = false
const dropDown = document.querySelector('#myDropdown')
dropDown.style.display = 'none'

let loginDisplay = false
const login = document.querySelector('#loginForm')
login.style.display = 'none'

//when user signs in change to none
let canvasesDisplay = false
const canvaseButton = document.querySelector('#canvas-button')
canvaseButton.style.display = 'none'

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
        //display name
        let h5 = document.querySelector('h5')
        h5.innerText = user.username
        canvaseButton.style.display = 'block'
        let button = document.querySelector('#form-button')
        button.innerText = 'LOGOUT'
        
    }
}

function editUsername(){

}

function deleteUsername(){

}

function logout(){

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
        div.appendChild(newImg);
        
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
        } 
    })
}

function saveEasel(){
let saveEaselBtn = document.querySelectorAll('button')[2]
saveEaselBtn.addEventListener('click', event => {
    console.log(event.target)
})
}


main()







