//! Fake database
const database = localStorage.getItem("database") == undefined
    ? [
        {
            name: 'Roberto',
            email: "roberto@gmail.com",
            password: 'robertando123',
        },
        {
            name: 'Andre',
            email: "andre@gmail.com",
            password: 'andre',
        },
    ] 
    : JSON.parse(localStorage.getItem("database"))
localStorage.setItem("database", JSON.stringify(database))

const getUserEmail = () => document.querySelector("#email").value
const getUserPassword = () => document.querySelector("#password").value
    
//? Validador de emails
function onValidateEmail(mail) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail.match(mailformat)) {
        return true
    }
    return false
}


function onValidateLogin(loginUser) {

    let validEmail = false
    let validPassword = false

    database.forEach((user) => {
        if (user.email === loginUser.email) {
            validEmail = true
            return
        }
    })

    database.forEach((user) => {
        if (user.password === loginUser.password) {
            validPassword = true
            return
        }
    })

    if (validEmail && validPassword) {
        return true
    }

    return false
}


function handleLogin(event) {
    event.preventDefault()

    const userEmail = getUserEmail()
    const userPassword = getUserPassword()

    if ((userEmail.trim() == "") || (userPassword.trim() == "")) 
        return alert("Todos os campos devem ser preenchidos")

    if (!onValidateEmail(userEmail)) 
        return alert("Email invalido!")

    const user = {
        email: userEmail,
        password: userPassword
    }

    if (!onValidateLogin(user))
        return alert("Credenciais de acesso errados, por favor tente novamente!")

    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
    alert("Login concluido com sucesso!")
    location.replace("https://odindin.netlify.app/pages/overview/")
}



