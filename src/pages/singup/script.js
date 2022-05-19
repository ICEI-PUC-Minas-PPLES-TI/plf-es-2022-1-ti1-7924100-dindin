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


//? Funções para pegar os valores dos inputs
const getUserName = () => document.querySelector("#name").value
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


function onValidateNewUser(newUser) {

    let invalidEmail = false

    database.forEach((user) => {
        if (user.email === newUser.email){
            invalidEmail = true
            return
        }
    })

    if (invalidEmail)
        return false

    return true
}


//! Função principal
function handleCreateUser(event) {
    event.preventDefault()

    const userName = getUserName()
    const userEmail = getUserEmail()
    const userPassword = getUserPassword()

    if ((userName.trim() == "") || (userEmail.trim() == "") || (userPassword.trim() == "")) 
        return alert("Todos os campos devem ser preenchidos")

    if (!onValidateEmail(userEmail)) 
        return alert("Email invalido!")


    user = {
        name: userName,
        email: userEmail,
        password: userPassword,
    }
    
    if (!onValidateNewUser(user)) 
        return alert("Este email já esta sendo usado")


    database.push(user)
    localStorage.setItem("database", JSON.stringify(database))

    document.querySelector("#name").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
    alert("Cadastro concluido com sucesso!")
}




