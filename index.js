
const main = () => {
    showFormListener()
    formListener()
   
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




main()







