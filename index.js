let dropdownDisplay = false
const dropDown = document.querySelector('#myDropdown')
dropDown.style.display = 'none'

const main = () => {

    showFormListener()
    formListener()
    saveEasel()
    createButtonListener()
}

document.getElementById('id01').style.display='none'
// document.getElementById('id02').style.display='none'
let formButton = document.querySelector('.form-button')

function showFormListener(){

    formButton.addEventListener('click', event => {
        if (event.target.dataset.id === 'login'){
            document.getElementById('id01').style.display='block'
        } else if (event.target.dataset.id === 'signup'){
            document.getElementById('id02').style.display='block'
        }
    })
}

const formListener = () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', function(e){
        if (e.target.id === "login form") {
            e.preventDefault()
            const newLogin = {
                username: e.target.firstElementChild.children[1].value,
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
                .then(users => {
                    console.log(users)
                })     
        }
    })
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
          URL.revokeObjectURL(url);
        };
      
        newImg.src = url;
        let div = document.querySelector('#myDropdown')
        div.appendChild(newImg);
        debugger
      })

    newEasel = {
        image: easel,
        user_id: userId,
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
        console.log(data)
    })
})


function createButtonListener(){
    const button = document.querySelector('.dropbtn')
    button.addEventListener('click', event => {
        dropdownDisplay = !dropdownDisplay
        if (dropdownDisplay) {
            dropDown.style.display = 'block'	
        } else {
            dropDown.style.display = 'none'
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







