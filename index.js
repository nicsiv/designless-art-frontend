let userID

let dropdownDisplay = false

const dropDown = document.querySelector('#myDropdown')
dropDown.style.display = 'none'

let loginButton = document.querySelector('#form-button')
loginButton.style.display = 'block'

let loginDisplay = false
const login = document.querySelector('#loginForm')
login.style.display = 'none'

let canvasesDisplay = false
const canvasButton = document.querySelector('#canvas-button')
canvasButton.style.display = 'none'

const main = () => {
    formListener()
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
                    populateEasels(user)
                })     
        }
    })
}

function loginAuth(user){
    if (user){
        userID = user.id
        canvasButton.style.display = 'block'
        debugger
        
        let h5 = document.querySelector('h5')
        h5.innerText = user.username
        
        let div = document.querySelector('#form-button').parentElement
        div.innerHTML += `<button id = 'logout'>LOGOUT</button>`
        div.innerHTML += `<button id = 'edit'>EDIT PROFILE</button>`
        div.innerHTML += `<button id = 'delete'>DELETE PROFILE</button>`
        
        let loginButton = document.querySelector('#form-button')
        loginButton.style.display = 'none'
    }
}

function logout(){ 
    let button = document.querySelector('button#logout')
    button.remove()
    let button2 = document.querySelector('button#edit')
    button2.remove()
    let button3 = document.querySelector('button#delete')
    button3.remove()
    let h5 = document.querySelector('h5')
    h5.innerText = ''
    let div = document.querySelector('div#myDropdown')
    div.replaceChildren()
    loginButton.style.display = 'block'
    canvasButton.style.display = 'none'
}

//create function
let div = document.querySelector('#col-1')
const saveButton = document.createElement('button')
saveButton.className = 'save'
saveButton.innerText = 'save'
div.append(saveButton)
//create function/listener

saveButton.addEventListener('click', event => {
    let newEasel = {}
    let context = canvas.getContext('2d')
    let img = canvas.toDataURL('image/png')
    
    newEasel = {
        image: img,
        user_id: userID
    }
    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEasel)
    }
    fetch('http://localhost:3000/easels', reqObj)
    .then(resp => resp.json())
    .then(easel => {
        addImage(easel)
    })

    
})

function populateEasels(user){
    let div = document.querySelector('div#myDropdown')
    
    user.easels.forEach(easel => {
        
        addImage(easel)      
    })

}

function addImage(easel){
    
    let newImg = document.createElement('img')
    newImg.src = easel.image;
    let div = document.querySelector('#myDropdown')
    let button = document.createElement('button')
    let newDiv = document.createElement('div')
    newDiv.dataset.id = easel.id
    button.id = 'delete'
    button.innerText = 'delete'
    newDiv.append(button, newImg)
    div.appendChild(newDiv);
    button.addEventListener('click', event => {
        deleteCanvas(event)
    })
}

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
            
        } else if (event.target.id === 'edit'){

        } else if (event.target.id === 'delete'){
            fetch(`http://localhost:3000/users/${userID}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {

            })
        }

    })
}

function saveListener(){
    let saveButton = document.querySelector('.save')
    saveButton.addEventListener('click', event => {
        noLoop()
    })
}

function deleteCanvas(event){
    
    event.target.parentElement.remove()
    id = parseInt(event.target.parentElement.dataset.id)
    fetch(`http://localhost:3000/easels/${id}`, {method: 'DELETE',})
    .then(resp => resp.json())
    .then(data => {
    })
}


main()









