function fetchUsers(){
    fetch("http://localhost:3000/users")
    .then( res => res.json() )
    .then( userInfo => {
        console.log(userInfo)
    })
}



function sayHello(){
    console.log("your app is working!")
}

sayHello()
fetchUsers()