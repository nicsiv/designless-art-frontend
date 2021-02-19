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
        
        
        let button = document.querySelector('button#canvas-button')
        button.innerText = `${user.username.toUpperCase()}'S CANVASES`
        
        let div = document.querySelector('#form-button').parentElement
        let buttonDiv = document.createElement('div')
        buttonDiv.id = 'button-div'
        
        let logoutButton = document.createElement('button')
        logoutButton.id = 'logout'
        logoutButton.innerText = 'LOGOUT'

        let editButton = document.createElement('button')
        editButton.id = 'edit'
        editButton.innerText = 'EDIT'
        
        let deleteButton = document.createElement('button')
        deleteButton.id = 'delete-user'
        deleteButton.innerText = 'DELETE'

        buttonDiv.append(logoutButton, editButton, deleteButton)
        div.append(buttonDiv)
        
        let loginButton = document.querySelector('#form-button')
        loginButton.style.display = 'none'
        start = true
    }
}

function logout(){ 
    let buttonDiv = document.querySelector('#button-div')
    buttonDiv.remove()
    let h5 = document.querySelector('h5')
    h5.innerText = ''
    let div = document.querySelector('div#myDropdown')
    div.replaceChildren()
    loginButton.style.display = 'block'
    canvasButton.style.display = 'none'
}

function saveACanvas(){
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

}


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
            editProfile(event)
        } else if (event.target.id === 'delete-user'){
            fetch(`http://localhost:3000/users/${userID}`, {method: 'DELETE'})
            .then(resp => resp.json())
            logout()
        }

    })
}

function editProfile(event){
    
    event.target.innerHTML = `              
        <form class = 'edit-form'>
            <input type="text" placeholder="New Username" name="uname" required>
            <button type="submit">Submit</button>
        </form>`
    let editForm = document.querySelector('.edit-form')
    editForm.addEventListener('submit', event => {
        event.preventDefault()
        let username = event.target.firstElementChild.value
        let reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: username
            }
        }
        editFetch(reqObj)
        editForm.remove()
    })

}

function editFetch(reqObj){
    fetch(`http://localhost:3000/users/${userID}`, reqObj)
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