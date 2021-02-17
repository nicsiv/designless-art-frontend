
const main = () => {
    showFormListener()
    formListener()
}


document.getElementById('id01').style.display='none'
document.getElementById('id02').style.display='none'
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
        debugger
        if (e.target.id === "login form") {
            const newLogin = {
                username: e.target.firstElementChild.children[1].value,
                password_digest: e.target.firstElementChild.children[3].value
            }
        }
    })

    
    
}













main()







