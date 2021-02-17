
const main = () => {
    showFormListener()
    formListener()
    saveEasel()
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
                // password_digest: e.target.firstElementChild.children[3].value 
            }
            event.target.reset()

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
                    //   users.forEach(user => {
                          console.log(users)
                          
                      })     
        }
    })
}

<<<<<<< HEAD

let div = document.querySelector('#col-1')
const saveButton = document.createElement('button')
saveButton.className = 'save'
saveButton.innerText = 'save'
div.append(saveButton)
saveButton.addEventListener('click', event => {
    let easel = window.canvas.toDataURL('image/jpeg')
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
    fetch('http://localhost:3000/easels', reqObj)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
})


=======
let dropdownDisplay = false
const dropDown = document.querySelector('#myDropdown')
dropDown.style.display = 'none'
const button = document.querySelector('.dropbtn')
button.addEventListener('click', event => {
	dropdownDisplay = !dropdownDisplay
       if (dropdownDisplay) {
		dropDown.style.display = 'block'	
	} else {
		dropDown.style.display = 'none'
	}
})

function saveEasel(){
let saveEaselBtn = document.querySelectorAll('button')[2]
saveEaselBtn.addEventListener('click', event => {
    console.log(event.target)
})
}
>>>>>>> 5f15c8d9bb17aba87f6aa6158bb738818f50cb4b


main()







