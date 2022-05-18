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


function handleNewUser(newUser) {

    let invalidEmail = false

    database.forEach((user) => {
        if (user.email === newUser.email)
            invalidEmail = true
    })

    if (invalidEmail)
        return alert("Esse email ja esta cadastrado!")

    database.push(newUser)
    localStorage.setItem("database", JSON.stringify(database))

    alert("Cadastro concluido com sucesso!")
}


//! Função principal
function createUser(event) {
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
    
    handleNewUser(user)

    document.querySelector("#name").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
}




